import React from 'react';
import { SERVICES_MANDATES } from '../data/sabiData';
import {
  ArrowUpRight,
  Briefcase,
  ChartLineUp,
  GitFork,
  Compass,
  UsersThree,
  Sparkle
} from '@phosphor-icons/react';

interface ExtraordinaryPageProps {
  onNavigate: (page: string) => void;
  onSelectTrack: (track: string) => void;
}

const renderMandateIcon = (id: string) => {
  switch (id) {
    case 'consulting-projects':
      return <Briefcase className="w-5 h-5 text-[#0A0F1D]" weight="bold" />;
    case 'benchmarking-studies':
      return <ChartLineUp className="w-5 h-5 text-[#0A0F1D]" weight="bold" />;
    case 'bpo-management':
      return <GitFork className="w-5 h-5 text-[#0A0F1D]" weight="bold" />;
    case 'strategic-advisory':
      return <Compass className="w-5 h-5 text-[#0A0F1D]" weight="bold" />;
    case 'organisational-reviews':
      return <UsersThree className="w-5 h-5 text-[#0A0F1D]" weight="bold" />;
    case 'special-projects':
    default:
      return <Sparkle className="w-5 h-5 text-[#0A0F1D]" weight="bold" />;
  }
};

export const ExtraordinaryPage: React.FC<ExtraordinaryPageProps> = ({
  onNavigate,
  onSelectTrack
}) => {
  const handleDiscuss = (mandateTitle: string) => {
    onSelectTrack(`Extraordinary Mandate - ${mandateTitle}`);
    onNavigate('contact');
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0A0F1D]">
      {/* Page Header */}
      <section className="pt-16 pb-20 border-b border-white/10 bg-[#010924] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight">
            Extraordinary Engagements
          </h1>

          <p className="mt-5 text-base sm:text-xl md:text-2xl text-white/95 max-w-3xl leading-relaxed font-semibold">
            Designed for organizations, companies, institutions, and boards that require high-value, time-bound work executed at a senior level.
          </p>

          {/* Institutional Highlights - Pure White Text */}
          <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center gap-6 font-mono text-xs sm:text-sm text-white font-bold">
            <div className="flex items-center gap-2 text-white">
              <span className="text-white">●</span>
              <span className="text-white">Audience: Senior HR Leaders, CEOs, Boards</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span className="text-white">●</span>
              <span className="text-white">Format: High-Impact Defined Mandates</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span className="text-white">●</span>
              <span className="text-white">SLA: 24-Hour Scoping Call Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Defined Mandates Section */}
      <section className="py-20 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A0F1D] tracking-tight">
              The 6 Defined Mandate Disciplines
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-semibold">
              These are not open-ended retainer client accounts. You bring us a defined strategic challenge; we deliver rigorous senior execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES_MANDATES.map((item, idx) => (
              <div
                key={item.id}
                className="bg-[#FAFAFA] rounded-3xl border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-slate-400 hover:shadow-xl hover:bg-white hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-2 group-hover:scale-105 transition-transform shadow-xs">
                      {renderMandateIcon(item.id)}
                    </div>
                    <span className="text-slate-400 font-mono font-bold text-xs uppercase">
                      0{idx + 1} // MANDATE
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#0A0F1D] group-hover:text-[#1896FA] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-mono text-xs text-[#1896FA] mt-1 mb-3 font-semibold">
                    {item.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-semibold">
                    {item.description}
                  </p>

                  <div className="border-t border-slate-200/80 pt-4">
                    <div className="font-mono text-[11px] text-slate-400 uppercase font-bold mb-2.5">
                      Primary Scope Deliverables:
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-semibold">
                      {item.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#1896FA] font-bold">✓</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-end">
                  <button
                    onClick={() => handleDiscuss(item.title)}
                    className="px-4 py-2 bg-[#0A0F1D] hover:bg-[#1896FA] text-white text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Discuss Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" weight="bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
