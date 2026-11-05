import React, { useState } from 'react';
import { ENGAGEMENT_TRACKS, BRAND_ASSETS } from '../data/sabiData';
import { RollingButton } from './RollingButton';
import { Spark, ArrowRight, Check } from 'iconoir-react';

interface PricingSectionProps {
  onOpenContact: (track?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenContact }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  const t1 = ENGAGEMENT_TRACKS.tier1;
  const t2 = ENGAGEMENT_TRACKS.tier2;

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#F8FAFC] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Swiftform pricing-head) */}
        <div className="max-w-3xl mx-auto text-center mb-12">

          <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-[42px] text-[#021347] leading-[1.2] tracking-tight">
            Why Smart Founders Choose Sabi COO
          </h2>

          <p className="mt-4 text-base text-gray-600 leading-relaxed font-normal">
            Transparent, milestone-scoped engagements designed to align incentives and protect working capital.
          </p>

          {/* Swiftform Exact Pricing Switch with Blue Accent */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 bg-white border border-gray-300 rounded-full shadow-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#1896FA] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#021347]'
              }`}
            >
              Post-Revenue (Tier 1)
            </button>

            <div className={`p-1 rounded-full bg-[#EFF6FF] border border-[#1896FA]/30 transition-transform duration-300 ${
              billingCycle === 'annually' ? 'rotate-180' : ''
            }`}>
              <ArrowRight className="w-4 h-4 text-[#1896FA]" />
            </div>

            <button
              onClick={() => setBillingCycle('annually')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'annually'
                  ? 'bg-[#1896FA] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#021347]'
              }`}
            >
              Partner Track (Tier 2)
            </button>
          </div>
        </div>

        {/* 3-Card Pricing List matching Swiftform layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          
          {/* Card 1: Starter Audit */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#1896FA]/30 hover:-translate-y-1">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase font-mono-tag mb-1">
                Phase 01 Intake
              </div>
              <h3 className="font-display font-medium text-2xl text-[#021347] mb-2">
                Diagnostic Audit
              </h3>
              <p className="text-xs text-gray-500 mb-6 font-normal">
                Forensic investigation of cash flow, inventory leakage, and founder lock-in.
              </p>
              
              <div className="font-display font-semibold text-3xl text-[#021347] mb-1">
                Fixed Scope
              </div>
              <div className="text-xs text-gray-400 mb-6">2 to 3 Weeks Sprint</div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="text-xs font-semibold text-gray-700 font-mono-tag uppercase">
                  What's included:
                </div>
                {[
                  "Targeted operational diagnostic report",
                  "Root-cause bottleneck & drag analysis",
                  "Prioritized remediation roadmap",
                  "13-week cash visibility audit"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-gray-600 font-normal">
                    <div className="w-4 h-4 rounded-full bg-[#EFF6FF] text-[#1896FA] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      ✓
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => onOpenContact('Diagnostic Audit')}
                className="w-full py-3 rounded-full border border-[#1896FA]/30 hover:border-[#1896FA] text-xs font-semibold text-[#021347] hover:bg-[#EFF6FF] transition-all cursor-pointer"
              >
                Inquire for Audit
              </button>
            </div>
          </div>

          {/* Card 2: Pro (Tier 1 Full Sprint) - Deep Navy with Electric Blue Highlights */}
          <div className="bg-[#021347] text-white rounded-3xl p-8 border-2 border-[#1896FA]/40 shadow-xl shadow-blue-900/15 flex flex-col justify-between relative transform md:-translate-y-2 group">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1896FA] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              Most Popular
            </div>

            <div>
              <div className="text-xs font-semibold text-[#1896FA] uppercase font-mono-tag mb-1">
                Track 01 // Primary Revenue Product
              </div>
              <h3 className="font-display font-medium text-2xl text-white mb-2">
                Tier 1 — Fixed-Fee
              </h3>
              <p className="text-xs text-white/70 mb-6 font-normal">
                Structured operational and organisational build delivered over 3, 6, 9, or 12 months.
              </p>
              
              <div className="font-display font-semibold text-3xl text-white mb-1">
                Fixed Milestone Fee
              </div>
              <div className="text-xs text-[#1896FA] mb-6 font-medium">Delivered over 3, 6, 9, or 12 Months • Upfront % + Milestones</div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-xs font-semibold text-white/90 font-mono-tag uppercase">
                  What's included:
                </div>
                {t1.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-white/90 font-normal">
                    <div className="w-4 h-4 rounded-full bg-[#1896FA]/25 text-[#1896FA] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      ✓
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <RollingButton
                variant="blue"
                className="w-full"
                onClick={() => onOpenContact('Tier 1 - Fixed-Fee Engagement')}
              >
                Book Discovery Call
              </RollingButton>
            </div>
          </div>

          {/* Card 3: Tier 2 Partner Track */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#1896FA]/30 hover:-translate-y-1">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase font-mono-tag mb-1">
                Track 02 // Pre-Scale
              </div>
              <h3 className="font-display font-medium text-2xl text-[#021347] mb-2">
                Tier 2 - Partner Track
              </h3>
              <p className="text-xs text-gray-500 mb-6 font-normal">
                For selective early-stage ventures; equity or revenue share in lieu of cash.
              </p>
              
              <div className="font-display font-semibold text-3xl text-[#021347] mb-1">
                Co-Building
              </div>
              <div className="text-xs text-gray-400 mb-6">Max 2–3 ventures per year</div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="text-xs font-semibold text-gray-700 font-mono-tag uppercase">
                  What's included:
                </div>
                {t2.deliverables.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-gray-600 font-normal">
                    <div className="w-4 h-4 rounded-full bg-[#EFF6FF] text-[#1896FA] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      ✓
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => onOpenContact('Tier 2 - Partner Track')}
                className="w-full py-3 rounded-full border border-[#1896FA]/30 hover:border-[#1896FA] text-xs font-semibold text-[#021347] hover:bg-[#EFF6FF] transition-all cursor-pointer"
              >
                Apply for Partner Track
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
