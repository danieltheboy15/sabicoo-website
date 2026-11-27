import React, { useState } from 'react';
import { INSIGHTS_ARTICLES, InsightItem } from '../data/sabiData';
import { RollingButton } from './RollingButton';
import { ArrowUpRight } from 'iconoir-react';

interface InsightsSectionProps {
  articles?: InsightItem[];
  onSelectArticle: (articleId: string) => void;
  onViewAllArticles: () => void;
}

const InsightThumbnail: React.FC<{ post: InsightItem }> = ({ post }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
      {!imgFailed ? (
        <img
          src={post.image}
          alt={post.title}
          onError={() => setImgFailed(true)}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#021347] to-[#0A2463] flex flex-col justify-end p-6 text-white">
          <span className="text-xs font-medium text-[#38BDF8] mb-1">{post.tag}</span>
          <p className="font-display font-bold text-base leading-snug line-clamp-2">{post.title}</p>
        </div>
      )}
    </div>
  );
};

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  articles,
  onSelectArticle,
  onViewAllArticles
}) => {
  const sourceArticles = articles && articles.length > 0 ? articles : INSIGHTS_ARTICLES;
  const featuredArticles = sourceArticles.slice(0, 3);

  return (
    <section id="insights" className="py-20 md:py-28 bg-[#F8FAFC] border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-14">
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[42px] text-[#021347] leading-[1.15] tracking-tight">
              Insight from SabiCoo
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Practical guides on fixing operational bottlenecks, structuring teams, and keeping cash flow predictable as your business grows.
            </p>
          </div>

          <div className="shrink-0">
            <RollingButton
              variant="dark"
              size="md"
              onClick={onViewAllArticles}
              className="whitespace-nowrap shrink-0"
            >
              View All Articles
            </RollingButton>
          </div>
        </div>

        {/* 3-Column Editorial Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredArticles.map((post) => (
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
                <InsightThumbnail post={post} />

                <div className="p-6 sm:p-7">
                  {/* Unboxed quiet metadata line */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                    <span className="text-[#1896FA]">{post.tag}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{post.readTime}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#021347] group-hover:text-[#1896FA] transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Clean Footer Action Row */}
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
  );
};
