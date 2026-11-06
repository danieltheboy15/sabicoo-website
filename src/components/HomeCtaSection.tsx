import React from 'react';
import { RollingButton } from './RollingButton';

interface HomeCtaSectionProps {
  onOpenContact?: () => void;
  onOpenScreener?: () => void;
}

export const HomeCtaSection: React.FC<HomeCtaSectionProps> = ({
  onOpenContact
}) => {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 bg-[#0A0F1D] text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden border border-slate-800">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1896FA]/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 max-w-2xl text-left">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
              Ready to build the business behind the idea?
            </h3>
            <p className="text-base sm:text-lg text-slate-300 mt-2 font-semibold leading-relaxed">
              Book a confidential 30-minute discussion with our managing operators.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full sm:w-auto flex justify-center">
            <RollingButton
              variant="blue"
              size="lg"
              onClick={onOpenContact}
              className="w-full sm:w-auto shadow-xl shadow-blue-500/20"
            >
              Book a Discovery Call
            </RollingButton>
          </div>
        </div>
      </div>
    </section>
  );
};
