import React, { useState, useMemo } from 'react';
import { INSIGHTS_ARTICLES, InsightItem } from '../data/sabiData';
import { RollingButton } from '../components/RollingButton';
import { ArrowLeft, ArrowUpRight, CheckCircle } from 'iconoir-react';

interface InsightsPageProps {
  articles?: InsightItem[];
  selectedArticleId?: string | null;
  onSelectArticle: (articleId: string | null) => void;
  onNavigate: (page: string) => void;
  onOpenScreener?: () => void;
}

const ArticleCoverImage: React.FC<{
  article: InsightItem;
  aspectClass?: string;
}> = ({ article, aspectClass = 'aspect-[16/9]' }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative w-full ${aspectClass} bg-slate-100 overflow-hidden`}>
      {!failed ? (
        <img
          src={article.image}
          alt={article.title}
          onError={() => setFailed(true)}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#021347] to-[#0A2463] flex flex-col justify-end p-8 text-white">
          <span className="text-xs font-semibold text-[#38BDF8] mb-2">{article.tag}</span>
          <p className="font-display font-bold text-2xl leading-snug">{article.title}</p>
        </div>
      )}
    </div>
  );
};

export const InsightsPage: React.FC<InsightsPageProps> = ({
  articles,
  selectedArticleId,
  onSelectArticle,
  onNavigate,
  onOpenScreener
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const allArticles = articles && articles.length > 0 ? articles : INSIGHTS_ARTICLES;

  const categories = useMemo(() => {
    const tags = Array.from(new Set(allArticles.map((a) => a.tag)));
    return ['All', ...tags];
  }, [allArticles]);

  const activeArticle = useMemo(() => {
    if (!selectedArticleId) return null;
    return allArticles.find((a) => a.id === selectedArticleId) || null;
  }, [allArticles, selectedArticleId]);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return allArticles;
    return allArticles.filter((a) => a.tag === activeCategory);
  }, [allArticles, activeCategory]);

  // ================= FULL ARTICLE READER VIEW =================
  if (activeArticle) {
    const relatedArticles = allArticles.filter((a) => a.id !== activeArticle.id).slice(0, 2);

    return (
      <div className="w-full bg-white text-[#0A0F1D]">
        {/* Reader Header Masthead */}
        <section className="pt-12 pb-12 sm:pt-16 sm:pb-16 bg-[#021347] text-white border-b border-[#0A1C40]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => onSelectArticle(null)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#38BDF8] hover:text-white transition-colors mb-8 cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Insights from SabiCoo</span>
            </button>

            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-300 mb-4">
              <span className="text-[#38BDF8]">{activeArticle.tag}</span>
              <span aria-hidden="true">·</span>
              <span>{activeArticle.date}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{activeArticle.readTime}</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.14] [text-wrap:balance]">
              {activeArticle.title}
            </h1>

            <p className="mt-5 text-base sm:text-xl text-slate-200 leading-relaxed font-normal max-w-3xl">
              {activeArticle.excerpt}
            </p>
          </div>
        </section>

        {/* Article Body Content */}
        <article className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Editorial Feature Image */}
            <div className="rounded-3xl overflow-hidden border border-gray-200 mb-12 shadow-sm">
              <ArticleCoverImage article={activeArticle} aspectClass="aspect-[16/9]" />
            </div>

            {/* Structured Long-Form Sections */}
            <div className="max-w-3xl mx-auto space-y-10">
              {activeArticle.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#021347] tracking-tight leading-snug">
                    {section.heading}
                  </h2>
                  <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-[1.75] font-normal">
                    {section.paragraphs.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              {/* Editorial Pull Quote (Clean hairline container, optional) */}
              {activeArticle.pullQuote && activeArticle.pullQuote.trim().length > 0 && (
                <blockquote className="my-10 p-7 sm:p-9 rounded-2xl bg-[#F8FAFC] border border-gray-200">
                  <p className="font-display font-bold text-xl sm:text-2xl text-[#021347] leading-snug">
                    “{activeArticle.pullQuote}”
                  </p>
                </blockquote>
              )}

              {/* Practical Key Takeaways (Optional) */}
              {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
                <div className="pt-8 border-t border-gray-200 space-y-5">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#021347]">
                    Key Takeaways for Founders
                  </h3>
                  <ul className="space-y-3.5">
                    {activeArticle.keyTakeaways.map((point, kIdx) => (
                      <li key={kIdx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#1896FA] shrink-0 mt-0.5" />
                        <span className="text-base text-slate-700 leading-relaxed font-medium">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article Bottom Action Banner */}
              <div className="mt-12 p-7 sm:p-10 bg-[#021347] text-white rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-lg">
                  <h4 className="font-display font-bold text-2xl text-white leading-snug">
                    Want help putting this into practice?
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 mt-1.5 font-normal">
                    Book a confidential 30-minute discussion with our managing operators or run the 60s screener.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <RollingButton
                    variant="blue"
                    size="md"
                    onClick={() => onNavigate('contact')}
                    className="whitespace-nowrap shrink-0"
                  >
                    Book Discovery Call
                  </RollingButton>
                  {onOpenScreener && (
                    <button
                      onClick={onOpenScreener}
                      className="px-5 py-2.5 rounded-full border border-white/25 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Run 60s Screener
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Continue Reading Section */}
        <section className="py-16 bg-[#F8FAFC] border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 mb-10">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#021347]">
                More from SabiCoo
              </h3>
              <button
                onClick={() => onSelectArticle(null)}
                className="text-sm font-bold text-[#1896FA] hover:text-[#021347] transition-colors cursor-pointer whitespace-nowrap"
              >
                View All Articles
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {relatedArticles.map((post) => (
                <article
                  key={post.id}
                  onClick={() => onSelectArticle(post.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectArticle(post.id);
                    }
                  }}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200 flex flex-col sm:flex-row transition-all duration-300 hover:shadow-lg hover:border-[#1896FA]/40 cursor-pointer group"
                >
                  <div className="sm:w-48 md:w-56 shrink-0 bg-slate-100 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
                        <span className="text-[#1896FA]">{post.tag}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{post.readTime}</span>
                      </div>
                      <h4 className="font-display font-bold text-lg text-[#021347] group-hover:text-[#1896FA] transition-colors leading-snug mb-2">
                        {post.title}
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#021347] group-hover:text-[#1896FA]">
                      <span>Read Article</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ================= INSIGHTS ARCHIVE LISTING VIEW =================
  return (
    <div className="w-full bg-white text-[#0A0F1D]">
      {/* Page Header Masthead */}
      <section className="pt-14 pb-16 sm:pt-16 sm:pb-20 bg-[#021347] text-white border-b border-[#0A1C40]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12]">
              Insight from SabiCoo
            </h1>
            <p className="mt-4 text-base sm:text-xl text-slate-200 leading-relaxed font-normal">
              Practical playbooks and straight-talking guidance on fixing bottlenecks, organizing growing teams, and building businesses that run reliably.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Category Filter Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#021347] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#021347]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* All Articles Grid */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredArticles.map((post) => (
              <article
                key={post.id}
                onClick={() => onSelectArticle(post.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectArticle(post.id);
                  }
                }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 hover:border-[#1896FA]/40 hover:-translate-y-1 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1896FA]"
              >
                <div>
                  <ArticleCoverImage article={post} aspectClass="aspect-[4/3]" />

                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                      <span className="text-[#1896FA]">{post.tag}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.date}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{post.readTime}</span>
                    </div>

                    <h2 className="font-display font-bold text-xl text-[#021347] group-hover:text-[#1896FA] transition-colors leading-snug mb-3">
                      {post.title}
                    </h2>

                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-7 py-4 border-t border-gray-100 flex items-center justify-end text-xs font-bold text-[#021347] group-hover:text-[#1896FA] transition-colors">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
