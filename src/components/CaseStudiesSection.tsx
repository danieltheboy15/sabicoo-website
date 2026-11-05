import React, { useState } from 'react';
import { CASE_STUDIES, CaseStudyItem } from '../data/sabiData';
import { RollingButton } from './RollingButton';
import { ArrowUpRight } from 'iconoir-react';

interface CaseStudiesSectionProps {
  onOpenContact: (track?: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenContact }) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudyItem | null>(null);

  return (
    <section id="case-studies" className="py-20 md:py-28 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Swiftform horizontal-scroll head) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">

            <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-[42px] text-[#021347] leading-[1.2] tracking-tight">
              Measurable Wins <br />for Growing Businesses
            </h2>
          </div>

          <div className="shrink-0">
            <RollingButton
              variant="blue"
              size="md"
              onClick={() => onOpenContact('Case Studies Discussion')}
            >
              Talk to an Advisor
            </RollingButton>
          </div>
        </div>

        {/* 3-Column Case Studies Grid matching Swiftform frame_40 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              onClick={() => setSelectedCase(study)}
              className="bg-[#F8FAFC] rounded-3xl overflow-hidden border border-gray-200/80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:border-[#1896FA]/40 hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Image (Swiftform case-study-thumb-img frame_40) */}
                <div className="relative aspect-[16/11] bg-gray-200 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#021347]/85 backdrop-blur text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                    {study.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="text-xs text-[#1896FA] font-mono-tag font-semibold mb-1">
                    {study.clientType}
                  </div>

                  <h3 className="font-display font-medium text-xl text-[#021347] group-hover:text-[#1896FA] transition-colors leading-snug mb-3">
                    {study.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed mb-6 font-normal">
                    {study.summary}
                  </p>

                  {/* Impact Stats */}
                  <div className="grid grid-cols-3 gap-2 bg-white rounded-2xl p-3 border border-gray-200/60 shadow-sm">
                    {study.results.map((res, i) => (
                      <div key={i} className="text-center">
                        <div className="font-display font-bold text-sm text-[#021347]">
                          {res.value}
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono-tag uppercase mt-0.5">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-7 py-4 border-t border-gray-200/60 flex items-center justify-between text-xs font-semibold text-gray-700 group-hover:text-[#1896FA] transition-colors">
                <span>Read Full Teardown</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <span className="text-xs font-semibold text-[#1896FA] uppercase font-mono-tag">
                  CASE STUDY // {selectedCase.tag}
                </span>
                <h3 className="font-display font-medium text-2xl text-[#021347] mt-1">
                  {selectedCase.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200 mb-6 aspect-video">
              <img
                src={selectedCase.image}
                alt={selectedCase.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 mb-6 text-sm text-gray-700 leading-relaxed">
              <div>
                <strong className="text-xs uppercase text-red-500 font-mono-tag block mb-1">
                  The Constraint / Challenge:
                </strong>
                <p className="p-3.5 rounded-xl bg-red-50/60 border border-red-100">
                  {selectedCase.challenge}
                </p>
              </div>

              <div>
                <strong className="text-xs uppercase text-[#1896FA] font-mono-tag block mb-1">
                  The Sabi COO Intervention:
                </strong>
                <p className="p-3.5 rounded-xl bg-[#EFF6FF] border border-[#1896FA]/20">
                  {selectedCase.intervention}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-[#021347] text-white rounded-2xl p-4 mb-6">
              {selectedCase.results.map((res, i) => (
                <div key={i} className="text-center">
                  <div className="font-display font-semibold text-lg text-[#1896FA]">
                    {res.value}
                  </div>
                  <div className="text-[10px] text-white/70 font-mono-tag uppercase mt-0.5">
                    {res.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <RollingButton
                variant="blue"
                className="flex-1"
                onClick={() => {
                  setSelectedCase(null);
                  onOpenContact(`Case Study Teardown: ${selectedCase.title}`);
                }}
              >
                Replicate These Results
              </RollingButton>
              <button
                onClick={() => setSelectedCase(null)}
                className="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
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
