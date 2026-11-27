import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle,
  EditPencil,
  Eye,
  LogOut,
  Plus,
  Refresh,
  Trash,
  Upload
} from 'iconoir-react';
import {
  auth,
  signInWithPortalCredentials,
  signOutUser
} from '../firebase';
import { InsightSectionBlock } from '../data/sabiData';
import {
  CmsInsightArticle,
  EDITORIAL_COVER_PRESETS,
  PortalAccessState,
  checkPortalAccess,
  deleteInsightArticle,
  fetchPortalArticles,
  formatReadableDate,
  resolveInsightCoverUrl,
  saveInsightArticle,
  seedStarterInsights,
  slugifyArticleId,
  submitAccessRequest
} from '../services/insightsService';

interface PortalPageProps {
  onNavigate: (page: string, tab?: 'tier-1' | 'tier-2', articleId?: string | null) => void;
  onArticlesUpdated?: () => void;
}

const DEFAULT_CATEGORIES = [
  'Operator Playbook',
  'Governance & Scale',
  'Cash & Capital',
  'Leadership',
  'Systems & SOPs',
  'Execution'
];

interface EditorFormState {
  id: string;
  isNew: boolean;
  title: string;
  tag: string;
  customTag: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  authorRole: string;
  pullQuote: string;
  keyTakeaways: string[];
  sections: { heading: string; bodyText: string }[];
  status: 'published' | 'draft';
  authorUid: string;
  publishedOrder: number;
}

function estimateReadTime(sections: { heading: string; bodyText: string }[], excerpt: string): string {
  const words = [
    excerpt,
    ...sections.map((s) => `${s.heading} ${s.bodyText}`)
  ]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const mins = Math.max(2, Math.round(words / 180));
  return `${mins} min read`;
}

function buildEmptyForm(user: User): EditorFormState {
  return {
    id: '',
    isNew: true,
    title: '',
    tag: 'Operator Playbook',
    customTag: '',
    readTime: '4 min read',
    date: formatReadableDate(),
    excerpt: '',
    image: EDITORIAL_COVER_PRESETS[0].key,
    author: user.displayName || 'Sabi COO Editorial',
    authorRole: 'Operations Practice',
    pullQuote: '',
    keyTakeaways: [],
    sections: [
      {
        heading: '',
        bodyText: ''
      }
    ],
    status: 'published',
    authorUid: user.uid,
    publishedOrder: Date.now()
  };
}

function articleToForm(article: CmsInsightArticle): EditorFormState {
  const isPresetTag = DEFAULT_CATEGORIES.includes(article.tag);
  return {
    id: article.id,
    isNew: false,
    title: article.title,
    tag: isPresetTag ? article.tag : '__custom__',
    customTag: isPresetTag ? '' : article.tag,
    readTime: article.readTime,
    date: article.date,
    excerpt: article.excerpt,
    image: article.image,
    author: article.author,
    authorRole: article.authorRole,
    pullQuote: article.pullQuote || '',
    keyTakeaways: article.keyTakeaways.length > 0 ? article.keyTakeaways : [],
    sections:
      article.sections.length > 0
        ? article.sections.map((s) => ({
            heading: s.heading,
            bodyText: s.paragraphs.join('\n\n')
          }))
        : [{ heading: '', bodyText: '' }],
    status: article.status,
    authorUid: article.authorUid,
    publishedOrder: article.publishedOrder || Date.now()
  };
}

export const PortalPage: React.FC<PortalPageProps> = ({
  onNavigate,
  onArticlesUpdated
}) => {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessState, setAccessState] = useState<PortalAccessState>({ kind: 'none' });
  const [loadingAccess, setLoadingAccess] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [fatalError, setFatalError] = useState<Error | null>(null);

  // Access request form
  const [reqRoleTitle, setReqRoleTitle] = useState('Operations Contributor');
  const [reqNote, setReqNote] = useState('');
  const [submittingReq, setSubmittingReq] = useState(false);

  // CMS Data
  const [articles, setArticles] = useState<CmsInsightArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [seedingStarters, setSeedingStarters] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Editor state
  const [editorForm, setEditorForm] = useState<EditorFormState | null>(null);
  const [editorMode, setEditorMode] = useState<'edit' | 'preview'>('edit');
  const [coverMode, setCoverMode] = useState<'upload' | 'url' | 'library'>('upload');
  const [customImageInput, setCustomImageInput] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [savingArticle, setSavingArticle] = useState(false);
  const [editorError, setEditorError] = useState('');

  if (fatalError) {
    throw fatalError;
  }

  const showNotice = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? '' : prev));
    }, 4000);
  }, []);

  const loadWorkspaceData = useCallback(
    async (currentUser: User, currentAccess: PortalAccessState) => {
      if (currentAccess.kind !== 'admin' && currentAccess.kind !== 'author') {
        return;
      }

      const isBootstrapped = currentAccess.kind === 'admin' && currentAccess.isBootstrapped;
      setLoadingArticles(true);
      try {
        const list = await fetchPortalArticles(currentUser.uid, isBootstrapped);
        setArticles(list);
      } catch (err) {
        setFatalError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoadingArticles(false);
      }
    },
    []
  );

  const refreshAccess = useCallback(
    async (currentUser: User) => {
      setLoadingAccess(true);
      try {
        const state = await checkPortalAccess(currentUser);
        setAccessState(state);
        if (state.kind === 'admin' || state.kind === 'author') {
          await loadWorkspaceData(currentUser, state);
        }
      } catch (err) {
        setFatalError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoadingAccess(false);
      }
    },
    [loadWorkspaceData]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);
      if (firebaseUser) {
        void refreshAccess(firebaseUser);
      } else {
        setAccessState({ kind: 'none' });
        setArticles([]);
        setEditorForm(null);
      }
    });
    return () => unsubscribe();
  }, [refreshAccess]);

  const handlePortalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!loginUsername.trim() || !loginPassword) {
      setAuthError('Please enter both your username and password.');
      return;
    }

    setSigningIn(true);
    try {
      await signInWithPortalCredentials(loginUsername, loginPassword);
      setLoginPassword('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('operation-not-allowed')) {
        setAuthError(
          'Email/Password sign-in is not yet enabled in Firebase Authentication. Enable Email/Password in Firebase Console and add the editorial account under Users.'
        );
      } else if (
        msg.includes('invalid-credential') ||
        msg.includes('wrong-password') ||
        msg.includes('user-not-found') ||
        msg.includes('invalid-email')
      ) {
        setAuthError('Invalid username or password. Please check your credentials and try again.');
      } else if (msg.includes('too-many-requests')) {
        setAuthError('Too many failed sign-in attempts. Please wait a moment and try again.');
      } else {
        setAuthError('Unable to sign in right now. Please try again.');
      }
    } finally {
      setSigningIn(false);
    }
  };

  const handleLogout = async () => {
    await signOutUser();
    setEditorForm(null);
  };

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmittingReq(true);
    try {
      const record = await submitAccessRequest(user, reqRoleTitle, reqNote);
      setAccessState({ kind: 'pending', request: record });
    } catch (err) {
      setFatalError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setSubmittingReq(false);
    }
  };

  const handleOpenNewEditor = () => {
    if (!user) return;
    const form = buildEmptyForm(user);
    setEditorForm(form);
    setEditorMode('edit');
    setCoverMode('upload');
    setCustomImageInput('');
    setUploadedImageUrl('');
    setUploadError('');
    setSlugTouched(false);
    setEditorError('');
  };

  const handleOpenEditEditor = (article: CmsInsightArticle) => {
    const form = articleToForm(article);
    const matchesPreset = EDITORIAL_COVER_PRESETS.some(
      (p) => p.src === article.image || p.key === article.image
    );
    const isUploadedAsset = article.image.startsWith('/api/uploads/');
    setEditorForm(form);
    setEditorMode('edit');
    if (matchesPreset) {
      setCoverMode('library');
      setCustomImageInput('');
      setUploadedImageUrl('');
    } else if (isUploadedAsset) {
      setCoverMode('upload');
      setUploadedImageUrl(article.image);
      setCustomImageInput('');
    } else {
      setCoverMode('url');
      setCustomImageInput(article.image);
      setUploadedImageUrl('');
    }
    setUploadError('');
    setSlugTouched(true);
    setEditorError('');
  };

  const handleCoverFileUpload = async (file: File | null | undefined) => {
    if (!file || !user) return;
    setUploadError('');

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload a PNG, JPG, WebP, or GIF image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image file must be 5MB or smaller.');
      return;
    }

    setUploadingCover(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(new Error('Could not read the selected file.'));
        reader.readAsDataURL(file);
      });

      const idToken = await user.getIdToken();
      const response = await fetch('/api/upload-cover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({ dataUrl })
      });

      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) {
        throw new Error(result.error || 'Artwork upload failed.');
      }

      const uploadedUrl = result.url;
      setUploadedImageUrl(uploadedUrl);
      setEditorForm((prev) => (prev ? { ...prev, image: uploadedUrl } : prev));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Artwork upload failed.');
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSaveArticle = async (targetStatus: 'published' | 'draft') => {
    if (!editorForm || !user) return;
    setEditorError('');

    const resolvedTag =
      editorForm.tag === '__custom__' ? editorForm.customTag.trim() : editorForm.tag.trim();
    const resolvedTitle = editorForm.title.trim();
    const resolvedExcerpt = editorForm.excerpt.trim();
    const resolvedImage =
      coverMode === 'url' ? customImageInput.trim() : editorForm.image.trim();

    if (resolvedTitle.length < 3) {
      setEditorError('Please enter a headline of at least 3 characters.');
      return;
    }
    if (resolvedExcerpt.length < 10) {
      setEditorError('Please write a short summary excerpt (at least 10 characters).');
      return;
    }
    if (!resolvedTag || resolvedTag.length < 2) {
      setEditorError('Please choose or enter an article category.');
      return;
    }
    if (!resolvedImage) {
      setEditorError('Please choose a cover image or enter a valid image URL.');
      return;
    }

    const builtSections: InsightSectionBlock[] = editorForm.sections
      .map((s) => ({
        heading: s.heading.trim(),
        paragraphs: s.bodyText
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean)
      }))
      .filter((s) => s.heading.length > 0 && s.paragraphs.length > 0);

    if (builtSections.length === 0) {
      setEditorError('Add at least one section with both a heading and body text.');
      return;
    }

    const cleanTakeaways = editorForm.keyTakeaways
      .map((k) => k.trim())
      .filter(Boolean);

    const finalId = editorForm.isNew
      ? slugifyArticleId(editorForm.id || resolvedTitle)
      : editorForm.id;

    setSavingArticle(true);
    try {
      await saveInsightArticle(
        {
          id: finalId,
          title: resolvedTitle,
          tag: resolvedTag,
          readTime:
            editorForm.readTime.trim() ||
            estimateReadTime(editorForm.sections, resolvedExcerpt),
          date: editorForm.date.trim() || formatReadableDate(),
          excerpt: resolvedExcerpt,
          image: resolvedImage,
          author: editorForm.author.trim() || user.displayName || 'Sabi COO Editorial',
          authorRole: editorForm.authorRole.trim() || 'Operations Practice',
          pullQuote: editorForm.pullQuote.trim(),
          keyTakeaways: cleanTakeaways,
          sections: builtSections,
          status: targetStatus,
          authorUid: editorForm.authorUid || user.uid,
          publishedOrder: editorForm.isNew ? Date.now() : editorForm.publishedOrder
        },
        editorForm.isNew
      );

      setEditorForm(null);
      await loadWorkspaceData(user, accessState);
      onArticlesUpdated?.();
      showNotice(
        targetStatus === 'published'
          ? 'Article published to Insight from SabiCoo.'
          : 'Draft saved privately to your portal.'
      );
    } catch (err) {
      setFatalError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setSavingArticle(false);
    }
  };

  const handleToggleStatus = async (article: CmsInsightArticle) => {
    if (!user) return;
    const nextStatus = article.status === 'published' ? 'draft' : 'published';
    try {
      await saveInsightArticle(
        {
          ...article,
          status: nextStatus
        },
        false
      );
      await loadWorkspaceData(user, accessState);
      onArticlesUpdated?.();
      showNotice(
        nextStatus === 'published'
          ? `"${article.title}" is now live.`
          : `"${article.title}" moved to drafts.`
      );
    } catch (err) {
      setFatalError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (!user) return;
    try {
      await deleteInsightArticle(articleId);
      setConfirmDeleteId(null);
      await loadWorkspaceData(user, accessState);
      onArticlesUpdated?.();
      showNotice('Article removed.');
    } catch (err) {
      setFatalError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  const handleSeedStarterArticles = async () => {
    if (!user) return;
    setSeedingStarters(true);
    try {
      const added = await seedStarterInsights(user.uid);
      await loadWorkspaceData(user, accessState);
      onArticlesUpdated?.();
      showNotice(
        added > 0
          ? `Imported ${added} starter insight article${added === 1 ? '' : 's'} into the CMS.`
          : 'All starter insight articles are already synced in the CMS.'
      );
    } catch (err) {
      setFatalError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setSeedingStarters(false);
    }
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [articles, statusFilter, searchQuery]);

  const isAuthorized = accessState.kind === 'admin' || accessState.kind === 'author';
  const canEditArticle = (article: CmsInsightArticle) =>
    accessState.kind === 'admin' || (user && article.authorUid === user.uid);

  // ================= LOADING STATE =================
  if (!authReady || (user && loadingAccess && !isAuthorized && accessState.kind === 'none')) {
    return (
      <div className="w-full min-h-[70vh] bg-[#F8FAFC] flex items-center justify-center px-4">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#021347] border-t-[#1896FA] animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Opening Sabi COO Editorial Portal...</p>
        </div>
      </div>
    );
  }

  // ================= SIGNED-OUT GATE =================
  if (!user) {
    return (
      <div className="w-full bg-[#F8FAFC] min-h-[78vh] flex flex-col">
        <section className="flex-1 py-16 px-4 flex items-center justify-center">
          <form
            onSubmit={handlePortalLogin}
            className="max-w-md w-full bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-sm space-y-6"
          >
            <div className="space-y-2">
              <h1 className="font-display font-bold text-2xl text-[#021347]">
                Sign In
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enter your username and password to login.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 leading-relaxed">
                {authError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="portal-username"
                  className="block text-xs font-bold text-[#021347] mb-1.5"
                >
                  Username
                </label>
                <input
                  id="portal-username"
                  type="text"
                  required
                  autoComplete="username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter editorial username"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#021347] focus:outline-none focus:border-[#1896FA]"
                />
              </div>

              <div>
                <label
                  htmlFor="portal-password"
                  className="block text-xs font-bold text-[#021347] mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="portal-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-4 pr-16 py-3 rounded-xl border border-gray-200 text-sm text-[#021347] focus:outline-none focus:border-[#1896FA]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-[#021347] cursor-pointer px-1.5 py-1"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={signingIn}
              className="w-full py-3.5 px-6 rounded-full bg-[#021347] hover:bg-[#0A2463] disabled:bg-slate-400 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>{signingIn ? 'Signing in...' : 'Sign In'}</span>
            </button>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-slate-500">
              <button
                type="button"
                onClick={() => onNavigate('insights')}
                className="font-semibold text-[#1896FA] hover:text-[#021347] cursor-pointer"
              >
                ← View Public Insights
              </button>
              <span>Sabi COO CMS</span>
            </div>
          </form>
        </section>
      </div>
    );
  }

  // ================= ACCESS REQUEST / PENDING / DECLINED VIEW =================
  if (!isAuthorized) {
    return (
      <div className="w-full bg-[#F8FAFC] min-h-[78vh] flex flex-col">
        <section className="pt-12 pb-14 bg-[#021347] text-white border-b border-[#0A1C40]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                Contributor Access
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-300">
                Signed in as <span className="font-semibold text-white">{user.email}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white cursor-pointer w-fit"
            >
              <LogOut className="w-4 h-4" />
              <span>Switch Account</span>
            </button>
          </div>
        </section>

        <section className="flex-1 py-14 px-4 flex items-center justify-center">
          {accessState.kind === 'pending' ? (
            <div className="max-w-lg w-full bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-sm space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
                Approval Pending
              </div>
              <h2 className="font-display font-bold text-2xl text-[#021347]">
                Your writer access request is in review
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We logged your request for <span className="font-semibold text-[#021347]">{user.email}</span> ({accessState.request.roleTitle}). Once a Sabi COO portal admin approves it, this page will unlock the full article publisher.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => void refreshAccess(user)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#021347] text-white text-xs sm:text-sm font-bold hover:bg-[#0A2463] transition-colors cursor-pointer"
                >
                  <Refresh className="w-4 h-4" />
                  <span>Check Status</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('insights')}
                  className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Read Published Insights
                </button>
              </div>
            </div>
          ) : accessState.kind === 'declined' ? (
            <div className="max-w-lg w-full bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-sm space-y-5">
              <h2 className="font-display font-bold text-2xl text-[#021347]">
                Access Request Not Approved
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your previous contributor request for {user.email} was not approved. Please contact info@sabicoo.com if you believe this was in error.
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-full bg-[#021347] text-white text-xs sm:text-sm font-bold hover:bg-[#0A2463] cursor-pointer"
              >
                Sign In With Another Account
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleRequestAccess}
              className="max-w-lg w-full bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-sm space-y-5"
            >
              <div>
                <h2 className="font-display font-bold text-2xl text-[#021347]">
                  Request Editorial Portal Access
                </h2>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  Only approved Sabi COO contributors can upload and edit articles. Submit a quick request below for immediate admin approval.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#021347] mb-1.5">
                    Your Role or Team Title
                  </label>
                  <input
                    required
                    type="text"
                    maxLength={100}
                    value={reqRoleTitle}
                    onChange={(e) => setReqRoleTitle(e.target.value)}
                    placeholder="e.g. Operations Lead, Editorial Partner"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#021347] focus:outline-none focus:border-[#1896FA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#021347] mb-1.5">
                    Brief Note (Optional)
                  </label>
                  <textarea
                    rows={3}
                    maxLength={300}
                    value={reqNote}
                    onChange={(e) => setReqNote(e.target.value)}
                    placeholder="Share what topics or playbooks you will be publishing..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#021347] focus:outline-none focus:border-[#1896FA]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submittingReq}
                  className="px-6 py-3 rounded-full bg-[#1896FA] hover:bg-blue-600 disabled:bg-slate-400 text-white text-sm font-bold transition-colors cursor-pointer"
                >
                  {submittingReq ? 'Submitting Request...' : 'Request Writer Access'}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('insights')}
                  className="px-5 py-3 rounded-full text-slate-600 hover:text-[#021347] text-sm font-semibold cursor-pointer"
                >
                  Back to Insights
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    );
  }

  // ================= AUTHORIZED ARTICLE EDITOR / LIVE PREVIEW =================
  if (editorForm) {
    const resolvedTag =
      editorForm.tag === '__custom__' ? editorForm.customTag.trim() || 'Operator Playbook' : editorForm.tag;
    const previewImageUrl = resolveInsightCoverUrl(
      coverMode === 'url' ? customImageInput || editorForm.image : editorForm.image
    );
    const previewSections = editorForm.sections
      .map((s) => ({
        heading: s.heading.trim() || 'Section Heading',
        paragraphs: s.bodyText
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean)
      }))
      .filter((s) => s.paragraphs.length > 0 || s.heading);

    return (
      <div className="w-full bg-[#F8FAFC] min-h-screen pb-20">
        {/* Sticky Editor Toolbar */}
        <div className="bg-[#021347] text-white border-b border-[#0A1C40] py-5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setEditorForm(null)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#38BDF8] hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Articles</span>
              </button>
              <span className="text-white/30" aria-hidden="true">|</span>
              <span className="font-display font-bold text-base sm:text-lg text-white truncate max-w-xs sm:max-w-md">
                {editorForm.isNew ? 'New Insight Article' : editorForm.title || 'Edit Article'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex rounded-full bg-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setEditorMode('edit')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    editorMode === 'edit' ? 'bg-white text-[#021347]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  Write & Structure
                </button>
                <button
                  type="button"
                  onClick={() => setEditorMode('preview')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    editorMode === 'preview' ? 'bg-white text-[#021347]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>

              <button
                type="button"
                disabled={savingArticle}
                onClick={() => void handleSaveArticle('draft')}
                className="px-4 py-2 rounded-full border border-white/25 text-xs font-bold text-white hover:bg-white/10 disabled:opacity-50 cursor-pointer"
              >
                Save Draft
              </button>

              <button
                type="button"
                disabled={savingArticle}
                onClick={() => void handleSaveArticle('published')}
                className="px-5 py-2 rounded-full bg-[#1896FA] hover:bg-blue-500 disabled:bg-slate-500 text-xs font-bold text-white cursor-pointer shadow-sm"
              >
                {savingArticle
                  ? 'Saving...'
                  : editorForm.isNew || editorForm.status === 'draft'
                    ? 'Publish Article'
                    : 'Publish Update'}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {editorError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-sm font-semibold text-red-700">
              {editorError}
            </div>
          )}

          {editorMode === 'preview' ? (
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-8 sm:p-12 bg-[#021347] text-white">
                <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-300 mb-3">
                  <span className="text-[#38BDF8]">{resolvedTag}</span>
                  <span aria-hidden="true">·</span>
                  <span>{editorForm.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{editorForm.readTime}</span>
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                  {editorForm.title || 'Untitled Insight Article'}
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
                  {editorForm.excerpt || 'Your short summary will appear here.'}
                </p>
              </div>

              <div className="p-8 sm:p-12 max-w-3xl mx-auto space-y-8">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-gray-200 bg-slate-100">
                  <img
                    src={previewImageUrl}
                    alt={editorForm.title || 'Cover preview'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {previewSections.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="font-display font-bold text-2xl text-[#021347]">
                      {sec.heading}
                    </h3>
                    <div className="space-y-3 text-base text-slate-700 leading-relaxed">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </div>
                ))}

                {editorForm.pullQuote.trim() && (
                  <blockquote className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-gray-200">
                    <p className="font-display font-bold text-xl text-[#021347] leading-snug">
                      “{editorForm.pullQuote.trim()}”
                    </p>
                  </blockquote>
                )}

                {editorForm.keyTakeaways.some((k) => k.trim()) && (
                  <div className="pt-6 border-t border-gray-200 space-y-3">
                    <h4 className="font-display font-bold text-xl text-[#021347]">
                      Key Takeaways for Founders
                    </h4>
                    <ul className="space-y-2.5">
                      {editorForm.keyTakeaways
                        .filter((k) => k.trim())
                        .map((point, kIdx) => (
                          <li key={kIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                            <CheckCircle className="w-5 h-5 text-[#1896FA] shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Headline & Core Metadata Card */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-5">
                <h2 className="font-display font-bold text-lg text-[#021347]">
                  Article Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#021347] mb-1.5">
                      Headline *
                    </label>
                    <input
                      type="text"
                      maxLength={180}
                      value={editorForm.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditorForm((prev) => {
                          if (!prev) return prev;
                          return {
                            ...prev,
                            title: val,
                            id: prev.isNew && !slugTouched ? slugifyArticleId(val) : prev.id
                          };
                        });
                      }}
                      placeholder="e.g. How to Fix Inventory Rework Without Slowing Dispatch"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base font-semibold text-[#021347] focus:outline-none focus:border-[#1896FA]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#021347] mb-1.5">
                      Article URL Slug {editorForm.isNew ? '(auto-generated)' : '(locked)'}
                    </label>
                    <input
                      type="text"
                      maxLength={128}
                      disabled={!editorForm.isNew}
                      value={editorForm.id}
                      onChange={(e) => {
                        setSlugTouched(true);
                        const cleaned = e.target.value.replace(/[^a-zA-Z0-9_-]/g, '-');
                        setEditorForm((prev) => (prev ? { ...prev, id: cleaned } : prev));
                      }}
                      placeholder="how-to-fix-inventory-rework"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-slate-50/70 text-xs font-mono text-slate-700 disabled:opacity-70 focus:outline-none focus:border-[#1896FA]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#021347] mb-1.5">
                      Category *
                    </label>
                    <select
                      value={editorForm.tag}
                      onChange={(e) =>
                        setEditorForm((prev) => (prev ? { ...prev, tag: e.target.value } : prev))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#021347] bg-white focus:outline-none focus:border-[#1896FA]"
                    >
                      {DEFAULT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="__custom__">Custom Category...</option>
                    </select>
                    {editorForm.tag === '__custom__' && (
                      <input
                        type="text"
                        maxLength={60}
                        value={editorForm.customTag}
                        onChange={(e) =>
                          setEditorForm((prev) =>
                            prev ? { ...prev, customTag: e.target.value } : prev
                          )
                        }
                        placeholder="Enter category name"
                        className="mt-2 w-full px-4 py-2 rounded-xl border border-gray-200 text-sm text-[#021347] focus:outline-none focus:border-[#1896FA]"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#021347] mb-1.5">
                      Display Date *
                    </label>
                    <input
                      type="text"
                      maxLength={40}
                      value={editorForm.date}
                      onChange={(e) =>
                        setEditorForm((prev) => (prev ? { ...prev, date: e.target.value } : prev))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#021347] focus:outline-none focus:border-[#1896FA]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#021347]">Read Time *</label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditorForm((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  readTime: estimateReadTime(prev.sections, prev.excerpt)
                                }
                              : prev
                          )
                        }
                        className="text-xs font-semibold text-[#1896FA] hover:text-[#021347] cursor-pointer"
                      >
                        Auto-estimate
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={40}
                      value={editorForm.readTime}
                      onChange={(e) =>
                        setEditorForm((prev) =>
                          prev ? { ...prev, readTime: e.target.value } : prev
                        )
                      }
                      placeholder="4 min read"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#021347] focus:outline-none focus:border-[#1896FA]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#021347]">
                        Short Summary / Card Excerpt *
                      </label>
                      <span className="text-xs text-slate-400 tabular-nums">
                        {editorForm.excerpt.length}/500
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      maxLength={500}
                      value={editorForm.excerpt}
                      onChange={(e) =>
                        setEditorForm((prev) =>
                          prev ? { ...prev, excerpt: e.target.value } : prev
                        )
                      }
                      placeholder="Write a crisp 2-sentence overview that draws readers in..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#021347] focus:outline-none focus:border-[#1896FA]"
                    />
                  </div>
                </div>
              </div>

              {/* Cover Artwork Selector */}
              {/* Cover Artwork Selector */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display font-bold text-lg text-[#021347]">
                      Cover Artwork
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Upload an image from your device, paste an external image URL, or pick from the editorial library.
                    </p>
                  </div>
                  <div className="inline-flex flex-wrap rounded-full bg-slate-100 p-1 gap-1">
                    <button
                      type="button"
                      onClick={() => setCoverMode('upload')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                        coverMode === 'upload' ? 'bg-[#021347] text-white' : 'text-slate-600 hover:text-[#021347]'
                      }`}
                    >
                      Upload Artwork
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoverMode('url')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                        coverMode === 'url' ? 'bg-[#021347] text-white' : 'text-slate-600 hover:text-[#021347]'
                      }`}
                    >
                      Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setCoverMode('library')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                        coverMode === 'library' ? 'bg-[#021347] text-white' : 'text-slate-600 hover:text-[#021347]'
                      }`}
                    >
                      Editorial Library
                    </button>
                  </div>
                </div>

                {coverMode === 'upload' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
                    <div className="md:col-span-2 space-y-3">
                      <label
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const dropped = e.dataTransfer.files?.[0];
                          void handleCoverFileUpload(dropped);
                        }}
                        className="flex flex-col items-center justify-center gap-2.5 p-6 sm:p-8 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#1896FA] bg-[#F8FAFC] transition-colors cursor-pointer text-center"
                      >
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/gif"
                          className="sr-only"
                          disabled={uploadingCover}
                          onChange={(e) => {
                            const selected = e.target.files?.[0];
                            void handleCoverFileUpload(selected);
                            e.target.value = '';
                          }}
                        />
                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1896FA]">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-[#021347]">
                            {uploadingCover
                              ? 'Uploading artwork...'
                              : uploadedImageUrl
                                ? 'Click or drop another image to replace cover'
                                : 'Click to upload cover artwork, or drag & drop'}
                          </p>
                          <p className="text-xs text-slate-500">
                            PNG, JPG, WebP, or GIF up to 5MB (16:9 or 4:3 recommended)
                          </p>
                        </div>
                      </label>

                      {uploadError && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                          {uploadError}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-[#021347]">
                        {uploadedImageUrl ? 'Uploaded Cover Preview' : 'Current Cover Preview'}
                      </div>
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 bg-slate-100">
                        <img
                          src={resolveInsightCoverUrl(uploadedImageUrl || editorForm.image)}
                          alt="Cover artwork preview"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {coverMode === 'url' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-[#021347] mb-1.5">
                        External Image URL (HTTPS)
                      </label>
                      <input
                        type="url"
                        maxLength={1000}
                        value={customImageInput}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomImageInput(val);
                          if (val.trim()) {
                            setEditorForm((prev) => (prev ? { ...prev, image: val.trim() } : prev));
                          }
                        }}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#021347] focus:outline-none focus:border-[#1896FA]"
                      />
                    </div>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 bg-slate-100">
                      <img
                        src={resolveInsightCoverUrl(customImageInput || editorForm.image)}
                        alt="Custom URL preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {coverMode === 'library' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {EDITORIAL_COVER_PRESETS.map((preset) => {
                      const isSelected =
                        editorForm.image === preset.key || editorForm.image === preset.src;
                      return (
                        <button
                          key={preset.key}
                          type="button"
                          onClick={() =>
                            setEditorForm((prev) =>
                              prev ? { ...prev, image: preset.key } : prev
                            )
                          }
                          className={`group rounded-2xl overflow-hidden border-2 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#1896FA] ring-2 ring-[#1896FA]/25'
                              : 'border-gray-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                            <img
                              src={preset.src}
                              alt={preset.label}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-2 bg-white text-[11px] font-semibold text-[#021347] line-clamp-1">
                            {preset.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Article Sections Builder */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display font-bold text-lg text-[#021347]">
                      Article Content Sections
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Separate paragraphs inside a section with a blank line.
                    </p>
                  </div>
                  {editorForm.sections.length < 15 && (
                    <button
                      type="button"
                      onClick={() =>
                        setEditorForm((prev) =>
                          prev
                            ? {
                                ...prev,
                                sections: [...prev.sections, { heading: '', bodyText: '' }]
                              }
                            : prev
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#021347] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Section</span>
                    </button>
                  )}
                </div>

                <div className="space-y-5">
                  {editorForm.sections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#F8FAFC] border border-gray-200 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#1896FA]">
                          Section {idx + 1}
                        </span>
                        {editorForm.sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setEditorForm((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      sections: prev.sections.filter((_, i) => i !== idx)
                                    }
                                  : prev
                              )
                            }
                            className="text-xs font-semibold text-slate-500 hover:text-red-600 cursor-pointer"
                          >
                            Remove Section
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        maxLength={160}
                        value={sec.heading}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditorForm((prev) => {
                            if (!prev) return prev;
                            const next = [...prev.sections];
                            next[idx] = { ...next[idx], heading: val };
                            return { ...prev, sections: next };
                          });
                        }}
                        placeholder="Section heading..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-bold text-[#021347] focus:outline-none focus:border-[#1896FA]"
                      />

                      <textarea
                        rows={5}
                        value={sec.bodyText}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditorForm((prev) => {
                            if (!prev) return prev;
                            const next = [...prev.sections];
                            next[idx] = { ...next[idx], bodyText: val };
                            return { ...prev, sections: next };
                          });
                        }}
                        placeholder="Write paragraphs for this section..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-700 leading-relaxed focus:outline-none focus:border-[#1896FA]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pull Quote & Key Takeaways */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#021347] mb-1.5">
                    Featured Pull Quote (Optional)
                  </label>
                  <input
                    type="text"
                    maxLength={400}
                    value={editorForm.pullQuote}
                    onChange={(e) =>
                      setEditorForm((prev) =>
                        prev ? { ...prev, pullQuote: e.target.value } : prev
                      )
                    }
                    placeholder="One memorable takeaway line highlighted inside the article..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#021347] focus:outline-none focus:border-[#1896FA]"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-xs font-bold text-[#021347]">
                      Key Takeaways for Founders (Optional, up to 10)
                    </label>
                    {editorForm.keyTakeaways.length < 10 && (
                      <button
                        type="button"
                        onClick={() =>
                          setEditorForm((prev) =>
                            prev
                              ? { ...prev, keyTakeaways: [...prev.keyTakeaways, ''] }
                              : prev
                          )
                        }
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#1896FA] hover:text-[#021347] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Takeaway</span>
                      </button>
                    )}
                  </div>

                  {editorForm.keyTakeaways.length === 0 ? (
                    <p className="text-xs text-slate-500">
                      Optional — leave empty or click &ldquo;Add Takeaway&rdquo; to include bullet highlights at the end of the article.
                    </p>
                  ) : (
                    <div className="space-y-2.5">
                      {editorForm.keyTakeaways.map((point, kIdx) => (
                        <div key={kIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            maxLength={300}
                            value={point}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditorForm((prev) => {
                                if (!prev) return prev;
                                const next = [...prev.keyTakeaways];
                                next[kIdx] = val;
                                return { ...prev, keyTakeaways: next };
                              });
                            }}
                            placeholder={`Takeaway #${kIdx + 1}`}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#021347] focus:outline-none focus:border-[#1896FA]"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setEditorForm((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      keyTakeaways: prev.keyTakeaways.filter(
                                        (_, i) => i !== kIdx
                                      )
                                    }
                                  : prev
                              )
                            }
                            aria-label="Remove takeaway"
                            className="p-2 text-slate-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================= MAIN PORTAL DASHBOARD =================
  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const draftCount = articles.filter((a) => a.status === 'draft').length;

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen pb-20">
      {/* Portal Top Header */}
      <section className="pt-10 pb-10 bg-[#021347] text-white border-b border-[#0A1C40]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-slate-300 mb-2">
              <span className="text-[#38BDF8]">
                {accessState.kind === 'admin' ? 'Portal Admin' : 'Approved Author'}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {user.email?.toLowerCase() === 'sabicooeditorial@sabicoo.com'
                  ? 'sabicooeditorial'
                  : user.email}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Content Management System (Sabi Coo)
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('insights')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-bold text-white transition-colors cursor-pointer"
            >
              <span>View Public Insights</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-xs sm:text-sm font-bold text-slate-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>

            <button
              type="button"
              onClick={handleOpenNewEditor}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1896FA] hover:bg-blue-500 text-xs sm:text-sm font-bold text-white transition-colors cursor-pointer shadow-sm whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>New Article</span>
            </button>
          </div>
        </div>
      </section>

      {/* Articles Summary Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 py-3.5">
          <div className="text-xs sm:text-sm font-bold text-[#021347]">
            Articles ({articles.length})
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 tabular-nums">
            <span>{publishedCount} Published</span>
            <span aria-hidden="true">·</span>
            <span>{draftCount} Drafts</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {toastMsg && (
          <div className="p-4 rounded-2xl bg-[#021347] text-white text-sm font-semibold flex items-center justify-between shadow-sm">
            <span>{toastMsg}</span>
            <button
              type="button"
              onClick={() => setToastMsg('')}
              className="text-xs text-[#38BDF8] hover:text-white cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        <>
            {/* Filter & Starter Sync Toolbar */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {(['all', 'published', 'draft'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize cursor-pointer ${
                      statusFilter === status
                        ? 'bg-[#021347] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="px-4 py-2 rounded-full border border-gray-200 text-xs sm:text-sm text-[#021347] w-full sm:w-64 focus:outline-none focus:border-[#1896FA]"
                />

                {accessState.kind === 'admin' && (
                  <button
                    type="button"
                    disabled={seedingStarters}
                    onClick={() => void handleSeedStarterArticles()}
                    className="px-4 py-2 rounded-full border border-gray-200 hover:border-[#1896FA] text-xs font-bold text-[#021347] hover:text-[#1896FA] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {seedingStarters ? 'Syncing...' : 'Sync Starter Articles'}
                  </button>
                )}
              </div>
            </div>

            {loadingArticles ? (
              <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center text-sm text-slate-500">
                Loading articles...
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center space-y-4">
                <h2 className="font-display font-bold text-xl text-[#021347]">
                  {articles.length === 0 ? 'No articles in the portal yet' : 'No matching articles'}
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {articles.length === 0
                    ? 'Create your first insight article right here, or sync the 6 starter articles so you can edit them directly in the portal.'
                    : 'Try clearing your search filter or switching status tabs.'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleOpenNewEditor}
                    className="px-5 py-2.5 rounded-full bg-[#1896FA] text-white text-xs sm:text-sm font-bold hover:bg-blue-600 cursor-pointer"
                  >
                    + Create New Article
                  </button>
                  {articles.length === 0 && accessState.kind === 'admin' && (
                    <button
                      type="button"
                      disabled={seedingStarters}
                      onClick={() => void handleSeedStarterArticles()}
                      className="px-5 py-2.5 rounded-full bg-slate-100 text-[#021347] text-xs sm:text-sm font-bold hover:bg-slate-200 cursor-pointer"
                    >
                      Sync Starter Articles
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredArticles.map((article) => {
                  const editable = canEditArticle(article);
                  const isDeleting = confirmDeleteId === article.id;

                  return (
                    <div
                      key={article.id}
                      className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                    >
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="w-24 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-gray-200 hidden sm:block">
                          <img
                            src={article.image}
                            alt={article.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                            <span
                              className={`font-bold ${
                                article.status === 'published'
                                  ? 'text-emerald-700'
                                  : 'text-amber-700'
                              }`}
                            >
                              {article.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#1896FA]">{article.tag}</span>
                            <span aria-hidden="true">·</span>
                            <span>{article.date}</span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{article.readTime}</span>
                          </div>
                          <h3 className="font-display font-bold text-lg text-[#021347] leading-snug">
                            {article.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 line-clamp-1">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {article.status === 'published' && (
                          <button
                            type="button"
                            onClick={() => onNavigate('insights', undefined, article.id)}
                            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#021347] cursor-pointer"
                          >
                            <span>View</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {editable && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleOpenEditEditor(article)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#021347] hover:bg-[#0A2463] text-xs font-bold text-white cursor-pointer"
                            >
                              <EditPencil className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => void handleToggleStatus(article)}
                              className="px-3.5 py-2 rounded-full border border-gray-200 hover:border-[#1896FA] text-xs font-bold text-slate-700 hover:text-[#1896FA] cursor-pointer"
                            >
                              {article.status === 'published' ? 'Unpublish' : 'Publish'}
                            </button>

                            {isDeleting ? (
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => void handleDeleteArticle(article.id)}
                                  className="px-3 py-2 rounded-full bg-red-600 text-white text-xs font-bold cursor-pointer"
                                >
                                  Confirm Delete
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="px-3 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-bold cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(article.id)}
                                aria-label="Delete article"
                                className="p-2 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </>
      </div>
    </div>
  );
};
