import React, { useState } from 'react';
import { ENGAGEMENT_TRACKS } from '../data/sabiData';
import { RollingButton } from '../components/RollingButton';
import { CheckCircle } from 'iconoir-react';

interface ServicesPageProps {
  onNavigate: (page: string, tab?: 'tier-1' | 'tier-2') => void;
  onSelectTrack: (track: string) => void;
  initialTab?: 'tier-1' | 'tier-2';
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectTrack,
  initialTab = 'tier-1'
}) => {
  const [activeTab, setActiveTab] = useState<'tier-1' | 'tier-2'>(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const tabParam = searchParams.get('tab');
      if (tabParam === 'tier-2' || window.location.hash === '#tier-2') {
        return 'tier-2';
      }
      if (tabParam === 'tier-1' || window.location.hash === '#tier-1') {
        return 'tier-1';
      }
    }
    return initialTab;
  });

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabChange = (tab: 'tier-1' | 'tier-2') => {
    setActiveTab(tab);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('page', 'services');
      url.searchParams.set('tab', tab);
      window.history.replaceState({ page: 'services', tab }, '', url.toString());
    } catch {
      // Fallback
    }
  };

  const handleBook = (trackName: string) => {
    onSelectTrack(trackName);
    onNavigate('contact');
  };

  const t1 = ENGAGEMENT_TRACKS.tier1;
  const t2 = ENGAGEMENT_TRACKS.tier2;

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0A0F1D]">
      {/* Editorial Page Masthead */}
      <section className="pt-16 pb-20 bg-[#021347] text-white border-b border-[#0A1C40]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12]">
              Two Standard Tracks. <br />
              <span className="text-[#38BDF8]">Pick The One For Your Stage.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Editorial Nav Strip / Ledger Mode Selector - Standard non-sticky flow */}
      <div className="relative z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:flex sm:items-center sm:gap-8 py-2.5 sm:py-3.5">
            <button
              onClick={() => handleTabChange('tier-1')}
              className={`pb-2 text-center sm:text-left text-xs sm:text-sm md:text-base font-bold tracking-tight cursor-pointer transition-all border-b-2 ${
                activeTab === 'tier-1'
                  ? 'border-[#1896FA] text-[#021347]'
                  : 'border-transparent text-gray-500 hover:text-[#021347]'
              }`}
            >
              <span className="sm:hidden">01 // Tier 1: Fixed-Fee</span>
              <span className="hidden sm:inline">01 // Tier 1: Fixed-Fee Engagement</span>
            </button>
            <button
              onClick={() => handleTabChange('tier-2')}
              className={`pb-2 text-center sm:text-left text-xs sm:text-sm md:text-base font-bold tracking-tight cursor-pointer transition-all border-b-2 ${
                activeTab === 'tier-2'
                  ? 'border-[#1896FA] text-[#021347]'
                  : 'border-transparent text-gray-500 hover:text-[#021347]'
              }`}
            >
              <span className="sm:hidden">02 // Tier 2: Partner Track</span>
              <span className="hidden sm:inline">02 // Tier 2: Partner Track</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dossier Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        
        {/* ================= TIER 1 SECTION ================= */}
        {activeTab === 'tier-1' && (
          <div className="space-y-16">
            {/* Top Overview: Clean Editorial Layout */}
            <div className="pb-12 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                <div className="max-w-3xl space-y-4">
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#021347] tracking-tight leading-[1.15]">
                    Tier 1 — Fixed-Fee Engagement
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-normal">
                    A structured engagement for businesses that need operational and organisational build. Delivered over 3, 6, 9, or 12 months. Priced at a fixed fee with a % paid upfront and the remainder invoiced at the midpoint or on agreed milestones. This is SabiCOO's primary revenue product.
                  </p>
                </div>
                <div className="shrink-0 pt-2">
                  <RollingButton
                    variant="blue"
                    size="md"
                    onClick={() => handleBook('Tier 1 - Fixed-Fee Engagement')}
                  >
                    Book a Discovery Call
                  </RollingButton>
                </div>
              </div>
            </div>

            {/* Core Deliverables Ledger Breakdown */}
            <div className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-[#1896FA] uppercase tracking-wider block">
                    DELIVERABLE ARCHITECTURE
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#021347]">
                    What Founders Receive In Tier 1
                  </h3>
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase">
                  Milestone-Gated SLA
                </span>
              </div>

              {/* Clean Ledger Row System (Open layout, no heavy box container) */}
              <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {t1.deliverables.map((item, i) => (
                  <div key={i} className="py-5 sm:py-6 flex items-start gap-4">
                    <span className="font-mono text-xs font-bold text-[#1896FA] shrink-0 mt-0.5">
                      0{i + 1} //
                    </span>
                    <div className="flex-1">
                      <p className="text-base sm:text-lg font-bold text-[#021347] leading-snug">
                        {item}
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-[#1896FA] shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Founder Qualification (Clean editorial layout, no box card styling) */}
            <div className="max-w-3xl space-y-3 pt-4">
              <span className="text-xs font-bold text-[#1896FA] uppercase tracking-wider block">
                IDEAL FOUNDER PROFILE
              </span>
              <p className="text-base font-normal text-[#021347] leading-relaxed">
                {t1.profile}
              </p>
            </div>

            {/* Bottom Direct CTA */}
            <div className="p-8 sm:p-12 bg-[#021347] text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h4 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Ready to eliminate operational bottlenecks?
                </h4>
                <p className="text-base sm:text-lg text-slate-200 mt-1 font-bold">
                  Book a confidential 30-minute discussion with our managing operators.
                </p>
              </div>
              <RollingButton
                variant="blue"
                size="md"
                onClick={() => handleBook('Tier 1 - Fixed-Fee Engagement')}
                className="shrink-0"
              >
                Book a Discovery Call
              </RollingButton>
            </div>
          </div>
        )}

        {/* ================= TIER 2 SECTION ================= */}
        {activeTab === 'tier-2' && (
          <div className="space-y-16">
            {/* Top Overview: Clean Editorial Layout (No nested boxes/cards, no badges) */}
            <div className="space-y-10 pb-12 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                <div className="max-w-3xl space-y-4">
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#021347] tracking-tight leading-[1.15]">
                    Tier 2 — Partner Track
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-normal">
                    Reserved for pre-revenue or very early-stage businesses where cash is constrained but the opportunity is strong. SabiCo takes equity or a revenue share arrangement in exchange for equivalent engagement depth as Tier 1.
                  </p>
                </div>
                <div className="shrink-0 pt-2">
                  <RollingButton
                    variant="blue"
                    size="md"
                    onClick={() => handleBook('Tier 2 - Partner Track')}
                  >
                    Apply for Partner Track
                  </RollingButton>
                </div>
              </div>
            </div>

            {/* Core Deliverables Ledger Breakdown */}
            <div className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-[#1896FA] uppercase tracking-wider block">
                    DELIVERABLE ARCHITECTURE
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#021347]">
                    What Founders Receive In Tier 2
                  </h3>
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase">
                  Milestone-Gated SLA
                </span>
              </div>

              {/* Clean Ledger Row System (Open layout, no heavy box container) */}
              <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {t2.deliverables.map((item, i) => (
                  <div key={i} className="py-5 sm:py-6 flex items-start gap-4">
                    <span className="font-mono text-xs font-bold text-[#1896FA] shrink-0 mt-0.5">
                      0{i + 1} //
                    </span>
                    <div className="flex-1">
                      <p className="text-base sm:text-lg font-bold text-[#021347] leading-snug">
                        {item}
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-[#1896FA] shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Direct CTA */}
            <div className="p-8 sm:p-12 bg-[#021347] text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h4 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Apply for the Sabi COO Partner Track
                </h4>
                <p className="text-base sm:text-lg text-slate-200 mt-1 font-bold">
                  Submit your venture brief and metrics for partner review.
                </p>
              </div>
              <RollingButton
                variant="blue"
                size="md"
                onClick={() => handleBook('Tier 2 - Partner Track')}
                className="shrink-0"
              >
                Apply for Partner Track
              </RollingButton>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
