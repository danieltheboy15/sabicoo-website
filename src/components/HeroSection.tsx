import React from 'react';
import { RollingButton } from './RollingButton';
import heroBg from '../assets/images/sabi_coo_hero_hq_1792766414154.jpg';

interface HeroSectionProps {
  onOpenScreener: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenScreener,
  onOpenContact
}) => {
  return (
    <div
      id="hero-track"
      className="sticky top-0 h-[100dvh] w-full z-0 overflow-hidden bg-[#010926] select-none m-0 p-0 flex items-center justify-center"
    >
      {/* High-Resolution Brand Operations Studio & War Room Background Image - Full screen edge-to-edge */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={heroBg}
          onError={(e) => {
            e.currentTarget.src = '/sabi_coo_hero.jpg';
          }}
          alt="Sabi COO Executive Operations Strategy War Room"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[center_30%] brightness-[0.68] contrast-[1.08]"
        />
        {/* Crisp static darkening scrim - text stays 100% visible and sharp at all times with zero fade */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010926]/80 via-transparent to-[#010926]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/40 via-transparent to-black/70" />
        
        {/* Subtle Luxury Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      </div>

      {/* Main Hero Centerpiece - Static, crisp, and fully visible */}
      <div className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
        {/* Major Hero Headline - Bold, Centered, and Commanding */}
        <h1 className="font-display font-bold text-center mx-auto text-[27px] min-[380px]:text-[32px] sm:text-4xl md:text-5xl lg:text-[58px] xl:text-[64px] leading-[1.12] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] max-w-4xl">
          Helping businesses{' '}
          <span className="relative inline-block px-2.5 sm:px-4 py-0.5 mx-0.5 sm:mx-1 bg-[#1896FA] text-white rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/30 -rotate-1 font-bold">
            fix
          </span>{' '}
          what’s broken,{' '}
          <span className="relative inline-block px-2.5 sm:px-4 py-0.5 mx-0.5 sm:mx-1 bg-[#DE9B35] text-white rounded-lg sm:rounded-xl shadow-lg shadow-amber-600/30 rotate-1 font-bold">
            build
          </span>{' '}
          what’s missing, and{' '}
          <span className="relative inline-block px-2.5 sm:px-4 py-0.5 mx-0.5 sm:mx-1 bg-[#1896FA] text-white rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/30 -rotate-1 font-bold">
            scale
          </span>{' '}
          what works.
        </h1>

        {/* Supporting Paragraph / Value Proposition */}
        <p className="mt-4 sm:mt-6 text-[14px] min-[380px]:text-[15px] sm:text-lg md:text-xl text-white/95 max-w-2xl sm:max-w-3xl leading-relaxed font-semibold text-center mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          We work with founders at every stage — from turning an early idea into a viable business to strengthening operations, stabilizing cash flow, and building a company that scales with surgical predictability.
        </p>

        {/* Button Group: Aligned to the Middle / Centered Horizontally */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mx-auto text-center">
          <RollingButton
            variant="blue"
            size="lg"
            showIcon={true}
            onClick={onOpenContact}
            className="w-full sm:w-auto shadow-2xl shadow-[#1896FA]/40 border border-white/30"
          >
            BOOK A DISCOVERY CALL
          </RollingButton>

          <button
            onClick={onOpenScreener}
            className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/30 hover:border-white transition-all flex items-center justify-center text-center shadow-lg backdrop-blur-md cursor-pointer select-none active:scale-98"
          >
            <span className="w-full text-center">RUN 60s BOTTLENECK SCREENER</span>
          </button>
        </div>
      </div>
    </div>
  );
};


