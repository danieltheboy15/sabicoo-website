import React from 'react';
import { RollingButton } from './RollingButton';
import { ArrowRight } from 'iconoir-react';

interface ComparisonSectionProps {
  onOpenContact: (track?: string) => void;
  onNavigate?: (page: string) => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ 
  onOpenContact,
  onNavigate 
}) => {
  const handleCardNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      onOpenContact(`Track: ${page}`);
    }
  };

  return (
    <section 
      id="frameworks" 
      className="relative z-20 py-16 sm:py-20 md:py-28 bg-white border-b border-gray-200 rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-30px_70px_rgba(1,9,38,0.45)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* MOBILE VIEW (< 1024px): Conventional Vertical Scroll Cards */}
        {/* ========================================================= */}
        <div className="block lg:hidden space-y-8">
          {/* Mobile Overview Header */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#1896FA] uppercase tracking-widest">
              EXPLORE OUR FRAMEWORKS & SERVICES
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#021347] leading-[1.12] tracking-tight">
              Built for Speed: Structure, Visibility & Control
            </h2>

            <p className="text-base sm:text-lg text-[#021347] leading-relaxed font-bold">
              We bring structure, visibility, and control to your business operations. Inspect each engagement track below.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <RollingButton
                variant="blue"
                size="sm"
                onClick={() => onOpenContact('Built for Speed: Frameworks')}
              >
                Book a Discovery Call
              </RollingButton>
            </div>
          </div>

          {/* Conventional Vertical Cards Stack on Mobile */}
          <div className="space-y-6">
            {/* Mobile Card 1: 01 // ENGAGEMENT TRACKS */}
            <div 
              onClick={() => handleCardNavigate('services')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardNavigate('services');
                }
              }}
              className="w-full bg-[#F8FAFC] rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-md flex flex-col justify-between cursor-pointer group active:scale-[0.99] transition-transform"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#1896FA] uppercase tracking-wider">
                    01 // ENGAGEMENT TRACKS
                  </span>
                  <span className="text-xs text-[#021347] font-bold">
                    Tier 1 & Tier 2
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#021347] mb-2 group-hover:text-[#1896FA] transition-colors">
                  Services & Operating Tracks
                </h3>

                <p className="text-xs sm:text-sm text-[#021347] leading-relaxed mb-4 font-bold">
                  Tier 1 offers structured, fixed-fee operational and organisational builds for established businesses, delivered over 3–12 months. Tier 2 is a selective equity or revenue-share partnership for promising early-stage ventures.
                </p>

                <div className="rounded-xl overflow-hidden bg-white border border-gray-200 mb-4 shadow-sm">
                  <img
                    src="https://res.cloudinary.com/dpsvazol5/image/upload/v1793467077/Strategic_Teamwork_in_a_Modern_Office_ermezb.png"
                    alt="Services & Operating Tracks"
                    className="w-full h-44 sm:h-52 object-cover"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs sm:text-sm font-bold text-[#021347] group-hover:text-[#1896FA] transition-colors">
                <span>View More Information</span>
                <div className="w-7 h-7 rounded-full bg-[#021347] text-white flex items-center justify-center group-hover:bg-[#1896FA] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Mobile Card 2: 02 // INSTITUTIONAL MANDATES */}
            <div 
              onClick={() => handleCardNavigate('extraordinary')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardNavigate('extraordinary');
                }
              }}
              className="w-full bg-[#F8FAFC] rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-md flex flex-col justify-between cursor-pointer group active:scale-[0.99] transition-transform"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#1896FA] uppercase tracking-wider">
                    02 // INSTITUTIONAL MANDATES
                  </span>
                  <span className="text-xs text-[#021347] font-bold">
                    Board & Enterprise
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#021347] mb-2 group-hover:text-[#1896FA] transition-colors">
                  Extraordinary Engagements
                </h3>

                <p className="text-xs sm:text-sm text-[#021347] leading-relaxed mb-4 font-bold">
                  Designed for established organizations, mid-sized companies, institutions, and boards that require high-value, time-bound work executed at a senior level across 6 defined disciplines.
                </p>

                <div className="rounded-xl overflow-hidden bg-white border border-gray-200 mb-4 shadow-sm">
                  <img
                    src="https://res.cloudinary.com/dpsvazol5/image/upload/v1793467075/Sunlit_Boardroom_Overlooking_the_City_lkey8t.png"
                    alt="Institutional Mandates"
                    className="w-full h-44 sm:h-52 object-cover"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs sm:text-sm font-bold text-[#021347] group-hover:text-[#1896FA] transition-colors">
                <span>View More Information</span>
                <div className="w-7 h-7 rounded-full bg-[#021347] text-white flex items-center justify-center group-hover:bg-[#1896FA] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Mobile Card 3: 03 // METHODOLOGY & BLUEPRINT */}
            <div 
              onClick={() => handleCardNavigate('how-it-works')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardNavigate('how-it-works');
                }
              }}
              className="w-full bg-[#021347] text-white rounded-3xl p-5 sm:p-6 border-2 border-[#1896FA] shadow-xl flex flex-col justify-between cursor-pointer group active:scale-[0.99] transition-transform"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                    03 // METHODOLOGY & BLUEPRINT
                  </span>
                  <span className="text-xs text-white/80 font-bold">
                    4-Step Sequence
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
                  How It Works
                </h3>

                <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-4 font-bold">
                  Four simple steps: Intake → Diagnostic → Build → Handover. We inspect your operations, write clear checklists, and train your staff until the business runs without you.
                </p>

                <div className="rounded-xl overflow-hidden bg-[#0A1C40] border border-white/20 mb-4 shadow-sm">
                  <img
                    src="https://res.cloudinary.com/dpsvazol5/image/upload/v1793467074/Four-Stage_Business_Journey_yuvqy3.png"
                    alt="How It Works"
                    className="w-full h-44 sm:h-52 object-cover"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/15 text-xs sm:text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                <span>View More Information</span>
                <div className="w-7 h-7 rounded-full bg-[#1896FA] text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#021347] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* ========================================================= */}
        {/* DESKTOP VIEW (>= 1024px): Swiftform Sticky Left + Vertical Cards Right */}
        {/* ========================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Section Overview (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="text-xs font-bold text-[#1896FA] uppercase tracking-widest">
              EXPLORE OUR FRAMEWORKS & SERVICES
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#021347] leading-[1.12] tracking-tight">
              Built for Speed: Structure, Visibility & Control
            </h2>

            <p className="text-lg sm:text-xl text-[#021347] leading-relaxed font-bold">
              We bring structure, visibility, and control to your business operations. Click on any engagement track below to inspect full specifications, deliverables, and timelines.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <RollingButton
                variant="blue"
                size="md"
                onClick={() => onOpenContact('Built for Speed: Frameworks')}
              >
                Book a Discovery Call
              </RollingButton>
            </div>
          </div>

          {/* Right Column: Visual System Cards Built Off Explore Frameworks & Services (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Framework Card 1: 01 // ENGAGEMENT TRACKS (Services) */}
            <div 
              onClick={() => handleCardNavigate('services')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardNavigate('services');
                }
              }}
              className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-gray-200/80 transition-all duration-300 hover:shadow-xl hover:border-[#1896FA]/40 hover:-translate-y-1 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm font-bold text-[#1896FA] uppercase tracking-wider">
                  01 // ENGAGEMENT TRACKS
                </span>
                <span className="text-xs sm:text-sm text-[#021347] font-bold">
                  Tier 1 & Tier 2
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#021347] mb-2 group-hover:text-[#1896FA] transition-colors">
                Services & Operating Tracks
              </h3>

              <p className="text-base sm:text-lg text-[#021347] leading-relaxed mb-6 font-bold">
                Tier 1 offers structured, fixed-fee operational and organisational builds for established businesses, delivered over 3–12 months. Tier 2 is a selective equity or revenue-share partnership for promising early-stage ventures.
              </p>

              <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 mb-5 shadow-sm">
                <img
                  src="https://res.cloudinary.com/dpsvazol5/image/upload/v1793467077/Strategic_Teamwork_in_a_Modern_Office_ermezb.png"
                  alt="Services & Operating Tracks"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 text-sm font-bold text-[#021347] group-hover:text-[#1896FA] transition-colors">
                <span>View More Information</span>
                <div className="w-8 h-8 rounded-full bg-[#021347] text-white flex items-center justify-center group-hover:bg-[#1896FA] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Framework Card 2: 02 // INSTITUTIONAL MANDATES (Extraordinary Engagements) */}
            <div 
              onClick={() => handleCardNavigate('extraordinary')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardNavigate('extraordinary');
                }
              }}
              className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-gray-200/80 transition-all duration-300 hover:shadow-xl hover:border-[#1896FA]/40 hover:-translate-y-1 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm font-bold text-[#1896FA] uppercase tracking-wider">
                  02 // INSTITUTIONAL MANDATES
                </span>
                <span className="text-xs sm:text-sm text-[#021347] font-bold">
                  Board & Enterprise
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#021347] mb-2 group-hover:text-[#1896FA] transition-colors">
                Extraordinary Engagements
              </h3>

              <p className="text-base sm:text-lg text-[#021347] leading-relaxed mb-6 font-bold">
                Designed for established organizations, mid-sized companies, institutions, and boards that require high-value, time-bound work executed at a senior level across 6 defined disciplines.
              </p>

              <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 mb-5 shadow-sm">
                <img
                  src="https://res.cloudinary.com/dpsvazol5/image/upload/v1793467075/Sunlit_Boardroom_Overlooking_the_City_lkey8t.png"
                  alt="Extraordinary Engagements"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 text-sm font-bold text-[#021347] group-hover:text-[#1896FA] transition-colors">
                <span>View More Information</span>
                <div className="w-8 h-8 rounded-full bg-[#021347] text-white flex items-center justify-center group-hover:bg-[#1896FA] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Framework Card 3: 03 // METHODOLOGY & BLUEPRINT (How It Works) */}
            <div 
              onClick={() => handleCardNavigate('how-it-works')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardNavigate('how-it-works');
                }
              }}
              className="bg-[#021347] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#1896FA]/40 transition-all duration-300 shadow-2xl shadow-blue-950/20 hover:border-[#1896FA] hover:-translate-y-1 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm font-bold text-[#1896FA] uppercase tracking-wider">
                  03 // METHODOLOGY & BLUEPRINT
                </span>
                <span className="text-xs sm:text-sm text-white/80 font-bold">
                  4-Step Sequence
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2 group-hover:text-[#1896FA] transition-colors">
                How It Works: Sequential Blueprint
              </h3>

              <p className="text-base sm:text-lg text-white/95 leading-relaxed mb-6 font-bold">
                Four steps: Intake → Diagnostic → Build → Handover.
              </p>

              <div className="rounded-2xl overflow-hidden bg-[#0A1C40] border border-white/10 mb-5 shadow-sm">
                <img
                  src="https://res.cloudinary.com/dpsvazol5/image/upload/v1793467074/Four-Stage_Business_Journey_yuvqy3.png"
                  alt="How It Works Blueprint"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/15 text-sm font-bold text-white group-hover:text-[#1896FA] transition-colors">
                <span>View More Information</span>
                <div className="w-8 h-8 rounded-full bg-[#1896FA] text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#021347] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
