import React from 'react';
import { TESTIMONIALS } from '../data/sabiData';
import { RollingButton } from './RollingButton';
import { Star } from 'iconoir-react';

interface TestimonialsSectionProps {
  onOpenContact: (track?: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenContact }) => {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Swiftform testimonials-head) */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#EFF6FF] border border-[#1896FA]/20 text-[#1896FA] text-xs font-semibold mb-4 shadow-sm">
            Testimonials
          </div>

          <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-[42px] text-[#021347] leading-[1.2] tracking-tight">
            Confidence Backed by Clients
          </h2>

          <p className="mt-4 text-base text-gray-600 leading-relaxed font-normal">
            What founders and managing directors experience when chaotic operations are turned into disciplined, autonomous systems.
          </p>
        </div>

        {/* 2-Column Testimonials Grid matching Swiftform layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#f1f1f1] rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md group"
            >
              <div>
                {/* 5-Star Row */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/60">
                  <div className="flex items-center gap-1 text-[#DE9B35]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#DE9B35]" />
                    ))}
                  </div>

                  <span className="text-xs font-mono-tag font-semibold text-gray-500">
                    {t.metric} {t.metricLabel}
                  </span>
                </div>

                {/* Quote (Swiftform testimonial-quote-text) */}
                <blockquote className="font-display font-medium text-lg sm:text-xl text-[#050c0b] leading-relaxed mb-8">
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Bottom Author Row with Avatar & Swiftform Signature SVG */}
              <div className="pt-6 border-t border-gray-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <div className="font-display font-semibold text-sm text-[#050c0b]">
                      {t.author}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t.role}, <span className="text-[#050c0b] font-medium">{t.company}</span>
                    </div>
                  </div>
                </div>

                {/* Client Signature (Swiftform singnature-img) */}
                <div className="w-20 opacity-70 group-hover:opacity-100 transition-opacity">
                  <img
                    src={t.signatureSvg}
                    alt="Signature"
                    className="w-full h-auto object-contain filter invert brightness-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
