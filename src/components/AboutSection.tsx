import React from 'react';
import { STATS_DATA } from '../data/sabiData';
import { RollingButton } from './RollingButton';
import { ArrowRight } from 'iconoir-react';

interface AboutSectionProps {
  onOpenContact: (track?: string) => void;
  onOpenScreener: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenContact,
  onOpenScreener
}) => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#F8FAFC] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Badge & Statement */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#EFF6FF] border border-[#1896FA]/20 text-[#1896FA] text-xs font-semibold mb-5 shadow-sm">
            About Us
          </div>

          <h2 className="font-display font-medium text-2xl sm:text-4xl md:text-[42px] text-[#021347] leading-[1.2] tracking-tight">
            Sabi COO is a business-building consultancy built for founders who value speed, clarity, and autonomous execution.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto font-normal">
            We work with founders 0–5 years into a business — generating between ₦0 and ₦100m in revenue — whose growth is held hostage by chaotic operations, unpredictable cash flow, or total dependence on the founder's daily physical stamina.
          </p>
        </div>

        {/* 3 Large Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {STATS_DATA.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:border-[#1896FA]/40 hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-6">
                  <span className="font-mono-tag text-xs font-semibold text-[#1896FA]">
                    0{idx + 1}
                  </span>
                  <span className="text-xs text-[#1896FA] bg-[#EFF6FF] px-2 py-0.5 rounded font-medium">
                    {stat.highlight}
                  </span>
                </div>

                <div className="font-display font-semibold text-3xl sm:text-4xl text-[#021347] tracking-tight group-hover:text-[#1896FA] transition-colors">
                  {stat.value}
                </div>

                <div className="font-display font-medium text-base text-[#021347] mt-3">
                  {stat.label}
                </div>

                <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {stat.subtext}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-700 group-hover:text-[#1896FA] transition-colors">
                <span>Operational Milestone</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
