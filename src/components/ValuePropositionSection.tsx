import React, { useRef, useState, useEffect } from 'react';
import { RollingButton } from './RollingButton';
import { XCircle, CheckCircle } from '@phosphor-icons/react';

interface ValuePropositionSectionProps {
  onOpenContact: (track?: string) => void;
  onOpenScreener?: () => void;
}

export const ValuePropositionSection: React.FC<ValuePropositionSectionProps> = ({ 
  onOpenContact 
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const scrollToCard = (ref: React.RefObject<HTMLDivElement | null>, stepIndex: number) => {
    setActiveStep(stepIndex);
    if (ref.current) {
      const yOffset = -100;
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      for (let i = cards.length - 1; i >= 0; i--) {
        const card = cards[i];
        if (card && card.offsetTop <= scrollPos) {
          setActiveStep(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="value-proposition" 
      className="relative py-20 sm:py-28 bg-[#FAFAFA] border-b border-gray-100"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Sticky Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">
            STRATEGIC COMPARISON
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#0A0F1D] leading-[1.12]">
            Why Small Businesses Get Trapped
          </h2>
          <p className="mt-3 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-semibold">
            Most business owners know something is broken, but traditional routes lead to dead ends.
          </p>

          {/* Step Progress Indicators */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 max-w-md mx-auto">
            <button 
              type="button" 
              onClick={() => scrollToCard(card1Ref, 0)}
              className="flex-1 text-left cursor-pointer group py-1"
            >
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    activeStep >= 0 ? 'bg-[#0A0F1D] w-full' : 'w-0'
                  }`} 
                />
              </div>
              <span className={`text-[11px] sm:text-xs font-bold mt-1.5 block transition-colors ${
                activeStep === 0 ? 'text-[#0A0F1D]' : 'text-slate-400'
              }`}>
                1. Corporate Advisory
              </span>
            </button>

            <button 
              type="button" 
              onClick={() => scrollToCard(card2Ref, 1)}
              className="flex-1 text-left cursor-pointer group py-1"
            >
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    activeStep >= 1 ? 'bg-[#0A0F1D] w-full' : 'w-0'
                  }`} 
                />
              </div>
              <span className={`text-[11px] sm:text-xs font-bold mt-1.5 block transition-colors ${
                activeStep === 1 ? 'text-[#0A0F1D]' : 'text-slate-400'
              }`}>
                2. Full-Time Hire
              </span>
            </button>

            <button 
              type="button" 
              onClick={() => scrollToCard(card3Ref, 2)}
              className="flex-1 text-left cursor-pointer group py-1"
            >
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    activeStep >= 2 ? 'bg-[#1896FA] w-full' : 'w-0'
                  }`} 
                />
              </div>
              <span className={`text-[11px] sm:text-xs font-bold mt-1.5 block transition-colors ${
                activeStep === 2 ? 'text-[#1896FA]' : 'text-slate-400'
              }`}>
                3. Sabi COO Model
              </span>
            </button>
          </div>
        </div>

        {/* Physical Sticky Stacking Cards Container */}
        <div className="relative pb-24 sm:pb-36">
          
          {/* Card 1: Traditional Consulting */}
          <div 
            ref={card1Ref}
            className="sticky top-24 sm:top-28 z-10 pb-[30vh] sm:pb-[40vh]"
          >
            <div className="bg-white text-[#0A0F1D] rounded-3xl p-6 sm:p-9 md:p-11 border border-slate-200 shadow-xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-slate-100 mb-5">
                <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#0A0F1D]">
                  Traditional Consulting
                </h3>
                <div className="font-bold text-sm sm:text-base text-slate-500 shrink-0 font-mono">
                  ₦30M - ₦60M Retainers
                </div>
              </div>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed font-semibold text-slate-700 mb-6">
                They charge ₦30M-₦60M. They send junior analysts who have never run a warehouse or closed payroll in Nigeria. They deliver an 80-page PowerPoint slide deck and leave the founder to figure out execution alone.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                {[
                  "Junior analysts learning on your dime",
                  "80-page theoretical PowerPoint decks that gather dust",
                  "Zero hands-on SOP authoring or software configuration",
                  "Leaves the exhausted founder to execute alone"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" weight="fill" />
                    <span className="text-sm sm:text-base font-semibold leading-snug text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl font-bold text-sm sm:text-base bg-red-50/70 text-red-900 border border-red-200/80">
                RESULT: Expensive slides, zero operational change.
              </div>
            </div>
          </div>

          {/* Card 2: Hiring a Full-Time Senior COO */}
          <div 
            ref={card2Ref}
            className="sticky top-28 sm:top-36 z-20 pb-[30vh] sm:pb-[40vh]"
          >
            <div className="bg-white text-[#0A0F1D] rounded-3xl p-6 sm:p-9 md:p-11 border border-slate-200 shadow-2xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-slate-100 mb-5">
                <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#0A0F1D]">
                  Hiring a Full-Time Senior COO
                </h3>
                <div className="font-bold text-sm sm:text-base text-slate-500 shrink-0 font-mono">
                  ₦2.5M - ₦3.5M / month + Equity
                </div>
              </div>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed font-semibold text-slate-700 mb-6">
                A high-caliber COO demands ₦2.5M-₦3.5M per month plus significant equity. A business doing ₦30m-₦60m cannot support that ongoing payroll overhead, and hiring a junior ops manager simply adds another employee to micromanage.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                {[
                  "₦30M–₦40M+ annual fixed payroll commitment",
                  "Massive equity dilution for pre-growth companies",
                  "Junior ops managers require founder micromanagement",
                  "Unproven operational fit under high risk"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" weight="fill" />
                    <span className="text-sm sm:text-base font-semibold leading-snug text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl font-bold text-sm sm:text-base bg-amber-50/70 text-amber-900 border border-amber-200/80">
                RESULT: Heavy cash burn, mismatched capabilities.
              </div>
            </div>
          </div>

          {/* Card 3: Surgical, Milestone Execution (The Winning Breakthrough Model) */}
          <div 
            ref={card3Ref}
            className="sticky top-32 sm:top-44 z-30"
          >
            <div className="bg-white text-[#0A0F1D] rounded-3xl p-6 sm:p-9 md:p-11 border-2 border-[#1896FA] shadow-[0_25px_60px_-15px_rgba(24,150,250,0.2)] transition-all duration-300 relative overflow-hidden">
              {/* Subtle Ambient Blueprint Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-slate-100 mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1896FA] animate-pulse" />
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#0A0F1D]">
                    Surgical, Milestone Execution
                  </h3>
                </div>
                <div className="font-bold text-xs sm:text-sm text-[#1896FA] shrink-0 font-mono uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                  Milestone-Based • Zero Bloat • 6-12 Weeks
                </div>
              </div>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed font-bold text-slate-800 mb-6 relative z-10">
                Sabi COO walks directly into the trenches. We diagnose problems forensically. We don't deliver slide decks; we physically write the SOPs, configure the software, install the dashboards, and train your staff.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6 relative z-10">
                {[
                  "Forensic root-cause diagnosis in the first 72 hours",
                  "Physical SOPs, configured ERPs & live KPI dashboards",
                  "Complete frontline staff training & handover",
                  "Founder freed to focus purely on revenue & scale"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1896FA] shrink-0 mt-0.5" weight="fill" />
                    <span className="text-sm sm:text-base font-bold leading-snug text-[#0A0F1D]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                <div className="p-3.5 rounded-xl font-bold text-sm sm:text-base bg-blue-50/70 text-[#0A0F1D] border border-blue-200/80 w-full sm:w-auto">
                  RESULT: Autonomous machinery built in 6-12 weeks.
                </div>

                <RollingButton
                  variant="dark"
                  size="lg"
                  onClick={() => onOpenContact('Sabi COO Execution Model')}
                  className="w-full sm:w-auto shadow-lg"
                >
                  Book a Discovery Call
                </RollingButton>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
