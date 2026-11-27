import { User } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type Unsubscribe
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { INSIGHTS_ARTICLES, InsightItem, InsightSectionBlock } from '../data/sabiData';
import insightBottlenecksImg from '../assets/images/insight_bottlenecks_1795714618250.jpg';
import insightStructureImg from '../assets/images/insight_business_structure_1795714618389.jpg';
import insightCashImg from '../assets/images/insight_cash_forecasts_1795714619678.jpg';
import insightDelegationImg from '../assets/images/insight_delegation_systems_1795714619665.jpg';
import insightSopImg from '../assets/images/insight_sop_execution_1795714620546.jpg';
import insightScorecardsImg from '../assets/images/insight_scorecards_metrics_1795714620589.jpg';

export const PORTAL_EDITORIAL_EMAIL = 'sabicooeditorial@sabicoo.com';
export const BOOTSTRAPPED_ADMIN_EMAILS = [
  'fatunsed@gmail.com',
  'info@sabicoo.com',
  PORTAL_EDITORIAL_EMAIL
];

export interface EditorialCoverPreset {
  key: string;
  label: string;
  src: string;
}

export const EDITORIAL_COVER_PRESETS: EditorialCoverPreset[] = [
  { key: 'preset:bottlenecks', label: 'Operations Floor & Strategy', src: insightBottlenecksImg },
  { key: 'preset:structure', label: 'Leadership & Org Architecture', src: insightStructureImg },
  { key: 'preset:cash', label: 'Capital & 13-Week Forecasting', src: insightCashImg },
  { key: 'preset:delegation', label: 'Founder Delegation & Rhythm', src: insightDelegationImg },
  { key: 'preset:sop', label: 'Playbooks & Checklists', src: insightSopImg },
  { key: 'preset:scorecards', label: 'Weekly Executive Scorecards', src: insightScorecardsImg }
];

const PRESET_MAP: Record<string, string> = Object.fromEntries(
  EDITORIAL_COVER_PRESETS.map((p) => [p.key, p.src])
);

const SRC_TO_PRESET_KEY: Record<string, string> = Object.fromEntries(
  EDITORIAL_COVER_PRESETS.map((p) => [p.src, p.key])
);

export function resolveInsightCoverUrl(imageValue: string): string {
  const trimmed = (imageValue || '').trim();
  if (!trimmed) return insightBottlenecksImg;
  if (PRESET_MAP[trimmed]) return PRESET_MAP[trimmed];
  return trimmed;
}

export function normalizeCoverValueForStorage(imageValue: string): string {
  const trimmed = (imageValue || '').trim();
  if (!trimmed) return 'preset:bottlenecks';
  if (SRC_TO_PRESET_KEY[trimmed]) return SRC_TO_PRESET_KEY[trimmed];
  if (/^data:image\/(?:jpeg|jpg|png|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(trimmed)) {
    return trimmed.length <= 350000 ? trimmed : 'preset:bottlenecks';
  }
  return trimmed.slice(0, 1000);
}

export type ArticleStatus = 'published' | 'draft';

export interface CmsInsightArticle extends InsightItem {
  status: ArticleStatus;
  authorUid: string;
  publishedOrder: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface AdminUserRecord {
  uid: string;
  email: string;
  name: string;
  grantedBy: string;
  createdAt?: unknown;
}

export interface AuthorizedAuthorRecord {
  uid: string;
  email: string;
  name: string;
  role: 'author' | 'editor';
  approvedBy: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface AccessRequestRecord {
  uid: string;
  email: string;
  name: string;
  roleTitle: string;
  note: string;
  status: 'pending' | 'approved' | 'declined';
  createdAt?: unknown;
  updatedAt?: unknown;
}

export type PortalAccessState =
  | { kind: 'admin'; isBootstrapped: boolean }
  | { kind: 'author'; record: AuthorizedAuthorRecord }
  | { kind: 'pending'; request: AccessRequestRecord }
  | { kind: 'declined'; request: AccessRequestRecord }
  | { kind: 'none' };

const ARTICLE_ID_REGEX = /^[a-zA-Z0-9_-]+$/;

export function slugifyArticleId(title: string): string {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
  if (slug.length >= 2 && ARTICLE_ID_REGEX.test(slug)) {
    return slug;
  }
  return `insight-${Date.now()}`;
}

export function formatReadableDate(date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function sanitizeInsightPayload(
  input: Omit<CmsInsightArticle, 'createdAt' | 'updatedAt'>
): Omit<CmsInsightArticle, 'createdAt' | 'updatedAt'> {
  let cleanId = input.id.trim().replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
  if (cleanId.length < 2) {
    cleanId = slugifyArticleId(input.title || 'insight');
  }

  const cleanTakeaways = (input.keyTakeaways || [])
    .map((item) => item.trim().slice(0, 300))
    .filter((item) => item.length > 0)
    .slice(0, 10);

  const rawSections: InsightSectionBlock[] = (input.sections || [])
    .map((sec) => {
      const heading = sec.heading.trim().slice(0, 160);
      const paragraphs = (sec.paragraphs || [])
        .map((p) => p.trim().slice(0, 5000))
        .filter((p) => p.length > 0)
        .slice(0, 20);
      return { heading, paragraphs };
    })
    .filter((sec) => sec.heading.length > 0 && sec.paragraphs.length > 0)
    .slice(0, 15);

  const safeSections: InsightSectionBlock[] =
    rawSections.length > 0
      ? rawSections
      : [{ heading: 'Overview', paragraphs: [input.excerpt.trim().slice(0, 5000) || 'Insight overview.'] }];

  const safeTitle = input.title.trim().slice(0, 180);
  const safeExcerpt = input.excerpt.trim().slice(0, 500);

  return {
    id: cleanId,
    title: safeTitle.length >= 3 ? safeTitle : `${safeTitle} Insight`,
    tag: (input.tag.trim() || 'Operator Playbook').slice(0, 60),
    readTime: (input.readTime.trim() || '4 min read').slice(0, 40),
    date: (input.date.trim() || formatReadableDate()).slice(0, 40),
    excerpt: safeExcerpt.length >= 10 ? safeExcerpt : `${safeExcerpt} — Operational guidance from Sabi COO.`,
    image: normalizeCoverValueForStorage(input.image),
    author: (input.author.trim() || 'Sabi COO Editorial').slice(0, 100),
    authorRole: (input.authorRole.trim() || 'Operations Practice').slice(0, 100),
    pullQuote: (input.pullQuote || '').trim().slice(0, 400),
    keyTakeaways: cleanTakeaways,
    sections: safeSections,
    status: input.status === 'draft' ? 'draft' : 'published',
    authorUid: input.authorUid.slice(0, 128),
    publishedOrder: Number(input.publishedOrder) > 0 ? Number(input.publishedOrder) : Date.now()
  };
}

function hydrateArticleDoc(raw: Record<string, unknown>, id: string): CmsInsightArticle {
  const sectionsRaw = Array.isArray(raw.sections) ? raw.sections : [];
  const sections: InsightSectionBlock[] = sectionsRaw
    .map((sec) => {
      const obj = (sec || {}) as Record<string, unknown>;
      const paragraphs = Array.isArray(obj.paragraphs)
        ? obj.paragraphs.map((p) => String(p))
        : [];
      return {
        heading: String(obj.heading || ''),
        paragraphs
      };
    })
    .filter((sec) => sec.heading && sec.paragraphs.length > 0);

  const takeaways = Array.isArray(raw.keyTakeaways)
    ? raw.keyTakeaways.map((t) => String(t))
    : [];

  return {
    id: String(raw.id || id),
    tag: String(raw.tag || 'Operator Playbook'),
    title: String(raw.title || ''),
    readTime: String(raw.readTime || '4 min read'),
    date: String(raw.date || ''),
    excerpt: String(raw.excerpt || ''),
    image: resolveInsightCoverUrl(String(raw.image || '')),
    author: String(raw.author || 'Sabi COO Editorial'),
    authorRole: String(raw.authorRole || 'Operations Practice'),
    pullQuote: String(raw.pullQuote || ''),
    keyTakeaways: takeaways,
    sections,
    status: raw.status === 'draft' ? 'draft' : 'published',
    authorUid: String(raw.authorUid || ''),
    publishedOrder: typeof raw.publishedOrder === 'number' ? raw.publishedOrder : 0,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt
  };
}

export function mergeWithStarterArticles(cmsArticles: CmsInsightArticle[]): InsightItem[] {
  const cmsById = new Map<string, CmsInsightArticle>();
  for (const item of cmsArticles) {
    cmsById.set(item.id, item);
  }

  const mergedPublished: { item: InsightItem; order: number }[] = [];

  for (const cmsItem of cmsArticles) {
    if (cmsItem.status === 'published') {
      mergedPublished.push({ item: cmsItem, order: cmsItem.publishedOrder || 0 });
    }
  }

  // Include baseline starter articles that haven't been overridden or drafted in Firestore
  INSIGHTS_ARTICLES.forEach((starter, index) => {
    if (!cmsById.has(starter.id)) {
      mergedPublished.push({
        item: starter,
        order: 1000 - index
      });
    }
  });

  mergedPublished.sort((a, b) => b.order - a.order);
  return mergedPublished.map((entry) => entry.item);
}

export function subscribePublishedInsights(
  onData: (articles: InsightItem[]) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const path = 'insights';
  const q = query(collection(db, path), where('status', '==', 'published'));

  return onSnapshot(
    q,
    (snapshot) => {
      const cmsList = snapshot.docs.map((d) =>
        hydrateArticleDoc(d.data() as Record<string, unknown>, d.id)
      );
      onData(mergeWithStarterArticles(cmsList));
    },
    (error) => {
      if (onError) {
        onError(error);
      } else {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    }
  );
}

export function isBootstrappedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return BOOTSTRAPPED_ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function checkPortalAccess(user: User): Promise<PortalAccessState> {
  const isPortalCredentialsUser =
    user.email?.toLowerCase() === PORTAL_EDITORIAL_EMAIL;

  if (!user.emailVerified && !isPortalCredentialsUser) {
    return { kind: 'none' };
  }

  if (isBootstrappedAdminEmail(user.email)) {
    return { kind: 'admin', isBootstrapped: true };
  }

  const adminPath = `admins/${user.uid}`;
  try {
    const adminSnap = await getDoc(doc(db, 'admins', user.uid));
    if (adminSnap.exists()) {
      return { kind: 'admin', isBootstrapped: false };
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, adminPath);
  }

  const authorPath = `authorized_authors/${user.uid}`;
  try {
    const authorSnap = await getDoc(doc(db, 'authorized_authors', user.uid));
    if (authorSnap.exists()) {
      return {
        kind: 'author',
        record: authorSnap.data() as AuthorizedAuthorRecord
      };
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, authorPath);
  }

  const requestPath = `access_requests/${user.uid}`;
  try {
    const reqSnap = await getDoc(doc(db, 'access_requests', user.uid));
    if (reqSnap.exists()) {
      const reqData = reqSnap.data() as AccessRequestRecord;
      if (reqData.status === 'declined') {
        return { kind: 'declined', request: reqData };
      }
      if (reqData.status === 'pending') {
        return { kind: 'pending', request: reqData };
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, requestPath);
  }

  return { kind: 'none' };
}

export async function fetchPortalArticles(
  uid: string,
  isBootstrapped: boolean
): Promise<CmsInsightArticle[]> {
  const path = 'insights';
  try {
    if (isBootstrapped) {
      const snap = await getDocs(collection(db, path));
      return snap.docs
        .map((d) => hydrateArticleDoc(d.data() as Record<string, unknown>, d.id))
        .sort((a, b) => (b.publishedOrder || 0) - (a.publishedOrder || 0));
    }

    const [publishedSnap, ownSnap] = await Promise.all([
      getDocs(query(collection(db, path), where('status', '==', 'published'))),
      getDocs(query(collection(db, path), where('authorUid', '==', uid)))
    ]);

    const byId = new Map<string, CmsInsightArticle>();
    for (const d of publishedSnap.docs) {
      byId.set(d.id, hydrateArticleDoc(d.data() as Record<string, unknown>, d.id));
    }
    for (const d of ownSnap.docs) {
      byId.set(d.id, hydrateArticleDoc(d.data() as Record<string, unknown>, d.id));
    }

    return Array.from(byId.values()).sort(
      (a, b) => (b.publishedOrder || 0) - (a.publishedOrder || 0)
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function saveInsightArticle(
  draft: Omit<CmsInsightArticle, 'createdAt' | 'updatedAt'>,
  isNew: boolean
): Promise<CmsInsightArticle> {
  const clean = sanitizeInsightPayload(draft);
  const path = `insights/${clean.id}`;
  const ref = doc(db, 'insights', clean.id);

  try {
    if (isNew) {
      const existing = await getDoc(ref);
      const uniqueId = existing.exists()
        ? `${clean.id.slice(0, 100)}-${Date.now().toString().slice(-5)}`
        : clean.id;

      const finalPayload = { ...clean, id: uniqueId };
      const finalRef = doc(db, 'insights', uniqueId);
      await setDoc(finalRef, {
        ...finalPayload,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return {
        ...finalPayload,
        image: resolveInsightCoverUrl(finalPayload.image)
      };
    }

    const existingSnap = await getDoc(ref);
    if (existingSnap.exists()) {
      const existingData = existingSnap.data();
      await updateDoc(ref, {
        ...clean,
        authorUid: existingData.authorUid,
        createdAt: existingData.createdAt,
        updatedAt: serverTimestamp()
      });
    } else {
      await setDoc(ref, {
        ...clean,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }

    return {
      ...clean,
      image: resolveInsightCoverUrl(clean.image)
    };
  } catch (error) {
    handleFirestoreError(error, isNew ? OperationType.CREATE : OperationType.UPDATE, path);
  }
}

export async function deleteInsightArticle(articleId: string): Promise<void> {
  const path = `insights/${articleId}`;
  try {
    await deleteDoc(doc(db, 'insights', articleId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function seedStarterInsights(authorUid: string): Promise<number> {
  let count = 0;
  for (let i = 0; i < INSIGHTS_ARTICLES.length; i++) {
    const starter = INSIGHTS_ARTICLES[i];
    const ref = doc(db, 'insights', starter.id);
    const path = `insights/${starter.id}`;
    try {
      const existing = await getDoc(ref);
      if (!existing.exists()) {
        const clean = sanitizeInsightPayload({
          ...starter,
          status: 'published',
          authorUid,
          publishedOrder: Date.now() - i * 1000
        });
        await setDoc(ref, {
          ...clean,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        count++;
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }
  return count;
}

export async function submitAccessRequest(
  user: User,
  roleTitle: string,
  note: string
): Promise<AccessRequestRecord> {
  const path = `access_requests/${user.uid}`;
  const cleanName = (user.displayName || user.email?.split('@')[0] || 'Contributor').trim().slice(0, 120);
  const cleanRole = (roleTitle.trim() || 'Operations Writer').slice(0, 100);
  const cleanNote = note.trim().slice(0, 300);

  const payload = {
    uid: user.uid,
    email: (user.email || '').slice(0, 200),
    name: cleanName,
    roleTitle: cleanRole,
    note: cleanNote,
    status: 'pending' as const
  };

  try {
    await setDoc(doc(db, 'access_requests', user.uid), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return payload;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function fetchTeamDirectory(isBootstrapped: boolean): Promise<{
  requests: AccessRequestRecord[];
  authors: AuthorizedAuthorRecord[];
  admins: AdminUserRecord[];
}> {
  if (!isBootstrapped) {
    return { requests: [], authors: [], admins: [] };
  }

  try {
    const [reqSnap, authorSnap, adminSnap] = await Promise.all([
      getDocs(collection(db, 'access_requests')),
      getDocs(collection(db, 'authorized_authors')),
      getDocs(collection(db, 'admins'))
    ]);

    return {
      requests: reqSnap.docs.map((d) => d.data() as AccessRequestRecord),
      authors: authorSnap.docs.map((d) => d.data() as AuthorizedAuthorRecord),
      admins: adminSnap.docs.map((d) => d.data() as AdminUserRecord)
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'authorized_authors');
  }
}

export async function approveAccessRequest(
  request: AccessRequestRecord,
  adminUid: string,
  role: 'author' | 'editor' = 'author'
): Promise<void> {
  const authorPath = `authorized_authors/${request.uid}`;
  const reqPath = `access_requests/${request.uid}`;

  try {
    await setDoc(doc(db, 'authorized_authors', request.uid), {
      uid: request.uid.slice(0, 128),
      email: request.email.slice(0, 200),
      name: request.name.slice(0, 120),
      role,
      approvedBy: adminUid.slice(0, 128),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, authorPath);
  }

  try {
    await updateDoc(doc(db, 'access_requests', request.uid), {
      status: 'approved',
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, reqPath);
  }
}

export async function declineAccessRequest(request: AccessRequestRecord): Promise<void> {
  const reqPath = `access_requests/${request.uid}`;
  try {
    await updateDoc(doc(db, 'access_requests', request.uid), {
      status: 'declined',
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, reqPath);
  }
}

export async function revokeAuthorizedAuthor(uid: string): Promise<void> {
  const path = `authorized_authors/${uid}`;
  try {
    await deleteDoc(doc(db, 'authorized_authors', uid));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function promoteAuthorToAdmin(
  author: AuthorizedAuthorRecord,
  adminUid: string
): Promise<void> {
  const path = `admins/${author.uid}`;
  try {
    await setDoc(doc(db, 'admins', author.uid), {
      uid: author.uid.slice(0, 128),
      email: author.email.slice(0, 200),
      name: author.name.slice(0, 120),
      grantedBy: adminUid.slice(0, 128),
      createdAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function revokeAdminPrivilege(uid: string): Promise<void> {
  const path = `admins/${uid}`;
  try {
    await deleteDoc(doc(db, 'admins', uid));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
