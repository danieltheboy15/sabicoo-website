import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createServer as createViteServer } from 'vite';

interface FirebaseAppletConfig {
  projectId: string;
  apiKey: string;
}

const rootDir = process.cwd();
const uploadsDir = path.resolve(rootDir, 'uploads');
const distDir = path.resolve(rootDir, 'dist');
const configPath = path.resolve(rootDir, 'firebase-applet-config.json');

fs.mkdirSync(uploadsDir, { recursive: true });

function loadFirebaseConfig(): FirebaseAppletConfig {
  const raw = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(raw) as FirebaseAppletConfig;
}

const PORTAL_EDITORIAL_EMAIL = 'sabicooeditorial@sabicoo.com';
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

interface VerifiedUserInfo {
  localId: string;
  email: string;
  emailVerified: boolean;
}

async function verifyFirebaseToken(idToken: string): Promise<VerifiedUserInfo | null> {
  const { apiKey } = loadFirebaseConfig();
  if (!apiKey || !idToken) return null;

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    users?: Array<{
      localId?: string;
      email?: string;
      emailVerified?: boolean;
    }>;
  };

  const user = data.users?.[0];
  if (!user || !user.localId || !user.email) {
    return null;
  }

  return {
    localId: user.localId,
    email: user.email,
    emailVerified: Boolean(user.emailVerified)
  };
}

function detectImageExtension(buffer: Buffer): { ext: string; mime: string } | null {
  if (buffer.length < 12) return null;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { ext: 'jpg', mime: 'image/jpeg' };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { ext: 'png', mime: 'image/png' };
  }

  // GIF87a / GIF89a
  if (
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38
  ) {
    return { ext: 'gif', mime: 'image/gif' };
  }

  // WEBP: RIFF....WEBP
  if (
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return { ext: 'webp', mime: 'image/webp' };
  }

  return null;
}

const MIME_BY_EXT: Record<string, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif'
};

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '7mb' }));

  // Authenticated editorial artwork upload endpoint
  app.post('/api/upload-cover', async (req, res) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice('Bearer '.length).trim()
        : '';

      if (!token) {
        res.status(401).json({ error: 'Authentication required.' });
        return;
      }

      const verifiedUser = await verifyFirebaseToken(token);
      if (!verifiedUser) {
        res.status(401).json({ error: 'Invalid or expired session.' });
        return;
      }

      const isAllowedPortalUser =
        verifiedUser.emailVerified ||
        verifiedUser.email.toLowerCase() === PORTAL_EDITORIAL_EMAIL;

      if (!isAllowedPortalUser) {
        res.status(403).json({ error: 'Account email is not authorized for uploads.' });
        return;
      }

      const body = req.body as { dataUrl?: unknown };
      if (typeof body?.dataUrl !== 'string') {
        res.status(400).json({ error: 'Missing image payload.' });
        return;
      }

      const match = body.dataUrl.match(
        /^data:image\/(?:jpeg|jpg|png|webp|gif);base64,([A-Za-z0-9+/=]+)$/
      );
      if (!match) {
        res.status(400).json({ error: 'Unsupported image format. Use PNG, JPG, WebP, or GIF.' });
        return;
      }

      const buffer = Buffer.from(match[1], 'base64');
      if (buffer.length === 0 || buffer.length > MAX_UPLOAD_BYTES) {
        res.status(400).json({ error: 'Image file must be under 5MB.' });
        return;
      }

      const detected = detectImageExtension(buffer);
      if (!detected) {
        res.status(400).json({ error: 'File contents do not match a valid PNG, JPG, WebP, or GIF image.' });
        return;
      }

      const filename = `${crypto.randomUUID()}.${detected.ext}`;
      const targetPath = path.resolve(uploadsDir, filename);
      if (!targetPath.startsWith(uploadsDir + path.sep)) {
        res.status(400).json({ error: 'Invalid target file path.' });
        return;
      }

      await fs.promises.writeFile(targetPath, buffer);
      res.status(201).json({ url: `/api/uploads/${filename}` });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to store uploaded artwork.' });
    }
  });

  // Publicly serve validated uploaded cover artwork with strict path confinement
  app.get('/api/uploads/:filename', async (req, res) => {
    const filename = req.params.filename || '';
    const filenameMatch = filename.match(/^[0-9a-f-]{36}\.(jpg|png|webp|gif)$/i);
    if (!filenameMatch) {
      res.status(400).json({ error: 'Invalid file identifier.' });
      return;
    }

    const ext = filenameMatch[1].toLowerCase();
    const resolvedPath = path.resolve(uploadsDir, filename);
    if (!resolvedPath.startsWith(uploadsDir + path.sep)) {
      res.status(403).json({ error: 'Access denied.' });
      return;
    }

    try {
      await fs.promises.access(resolvedPath, fs.constants.R_OK);
      res.setHeader('Content-Type', MIME_BY_EXT[ext] || 'application/octet-stream');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.sendFile(resolvedPath);
    } catch {
      res.status(404).json({ error: 'Artwork not found.' });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(3000, '0.0.0.0', () => {
    console.log('Sabi COO server listening on http://0.0.0.0:3000');
  });
}

void startServer();
