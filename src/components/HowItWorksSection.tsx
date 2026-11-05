import React from 'react';
import { METHODOLOGY_STEPS } from '../data/sabiData';
import { ArrowRight } from 'iconoir-react';

interface HowItWorksSectionProps {
  onOpenContact?: (track?: string) => void;
  onOpenScreener: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onOpenScreener
}) => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Swiftform Content Section 2 Layout: Left 4-Step Sequence, Right card profile.webp */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 4-Step Sequence (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[40px] text-[#021347] leading-[1.15] tracking-tight">
              How Sabi COO Supports Growth
            </h2>

            <p className="text-lg sm:text-xl text-[#021347] leading-relaxed font-bold">
              Get a clear overview of how our operator approach helps founders and growing companies structure smarter and scale with confidence.
            </p>

            {/* 4 Steps Breakdown: Intake, Diagnostic, Build, Handover */}
            <div className="space-y-3.5 pt-2">
              {METHODOLOGY_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F8FAFC] border border-gray-200/80 transition-all duration-300 hover:bg-[#EFF6FF]/60 hover:border-[#1896FA]/30 hover:shadow-sm group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-extrabold text-[#1896FA] uppercase tracking-wider">
                      Step 0{idx + 1}
                    </span>
                    <span className="text-sm font-bold text-[#021347] group-hover:text-[#1896FA] transition-colors">
                      {step.name}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#021347] leading-relaxed font-bold">
                    {step.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Swiftform image card + 60s Screener underneath (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#1896FA]/15 shadow-xl shadow-blue-500/5 max-w-lg w-full group transition-all duration-500 hover:border-[#1896FA]/40 hover:shadow-2xl hover:shadow-blue-500/10">
              <img
                src="https://res.cloudinary.com/dpsvazol5/image/upload/v1792779795/Business-Growth-Stages_clvado.png"
                alt="Business Growth Stages"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-103"
              />
            </div>

            {/* 60s Screener Part Placed Under the Image */}
            <div className="mt-4 pt-1 w-full max-w-lg flex items-center justify-center sm:justify-start">
              <button
                onClick={onOpenScreener}
                className="text-xs sm:text-sm font-bold text-[#021347] hover:text-[#1896FA] flex items-center gap-2 cursor-pointer transition-colors px-4 py-2.5 rounded-full bg-[#F8FAFC] border border-gray-200/80 hover:border-[#1896FA]/40 hover:bg-[#EFF6FF]/60 shadow-xs"
              >
                <span>Run 60s Bottleneck Screener</span>
                <ArrowRight className="w-4 h-4 text-[#1896FA]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
