import React, { useState } from 'react';
import { BLOG_POSTS, BlogItem } from '../data/sabiData';
import { ArrowUpRight } from 'iconoir-react';

export const BlogSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<BlogItem | null>(null);

  return (
    <section className="py-20 md:py-28 bg-[#f1f1f1] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Swiftform feature-blog-content head) */}
        <div className="max-w-2xl mx-auto text-center mb-16">

          <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-[42px] text-[#021347] leading-[1.2] tracking-tight">
            Expert Insights & Guidance
          </h2>

          <p className="mt-4 text-base text-gray-600 leading-relaxed font-normal">
            Field notes on operational diagnostics, 13-week cash models, and breaking founder dependency in fast-moving emerging markets.
          </p>
        </div>

        {/* 3-Column Blog Grid matching Swiftform blog-item */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:border-[#1896FA]/40 hover:-translate-y-1 cursor-pointer group"
            >
              <div>
                {/* Thumbnail (Swiftform Blog Image 31, 30, 29) */}
                <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-[#021347] text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase font-mono-tag border border-gray-200/60 shadow-sm">
                    {post.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="text-xs text-[#1896FA] font-mono-tag mb-2 font-semibold">
                    {post.date} • {post.readTime}
                  </div>

                  <h3 className="font-display font-medium text-xl text-[#021347] group-hover:text-[#1896FA] transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Link with Swiftform Arrow */}
              <div className="px-7 py-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-700 group-hover:text-[#050c0b]">
                <span>Read Insight</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <span className="text-xs font-semibold text-[#1896FA] uppercase font-mono-tag">
                  {activeArticle.tag} • {activeArticle.readTime}
                </span>
                <h3 className="font-display font-medium text-2xl text-[#021347] mt-1">
                  {activeArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-200 mb-6 aspect-video">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm text-gray-700 leading-relaxed space-y-4 mb-6 font-normal">
              <p>
                {activeArticle.excerpt}
              </p>
              <p>
                When an enterprise surpasses initial product-market fit, the bottleneck inevitably transitions from customer demand to operating throughput. Early founders rely heavily on personal heroics and informal WhatsApp messages to compensate for missing documentation.
              </p>
              <div className="p-4 bg-[#f1f1f1] rounded-xl text-xs font-mono-tag text-[#050c0b]">
                "Systems run the business, people run the systems, and founders steer the strategy."
              </div>
              <p>
                At Sabi COO, we write SOPs directly alongside your frontline team to guarantee autonomous execution, predictable billing cadences, and sustainable unit economics.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 rounded-full bg-[#050c0b] text-white text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
