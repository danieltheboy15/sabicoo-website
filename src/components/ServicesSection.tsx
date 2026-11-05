import React, { useState } from 'react';
import { SERVICES_MANDATES, ServiceItem } from '../data/sabiData';
import { RollingButton } from './RollingButton';
import { ArrowUpRight, Suitcase, GraphUp, GitFork, Compass, Group, Spark } from 'iconoir-react';

interface ServicesSectionProps {
  onOpenContact: (track?: string) => void;
}

const renderServiceIcon = (id: string) => {
  switch (id) {
    case 'consulting-projects':
      return <Suitcase className="w-6 h-6 text-[#1896FA]" />;
    case 'benchmarking-studies':
      return <GraphUp className="w-6 h-6 text-[#1896FA]" />;
    case 'bpo-management':
      return <GitFork className="w-6 h-6 text-[#1896FA]" />;
    case 'strategic-advisory':
      return <Compass className="w-6 h-6 text-[#1896FA]" />;
    case 'organisational-reviews':
      return <Group className="w-6 h-6 text-[#1896FA]" />;
    case 'special-projects':
    default:
      return <Spark className="w-6 h-6 text-[#1896FA]" />;
  }
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F8FAFC] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#021347] leading-[1.2] tracking-tight">
            Business Services That Power Growth
          </h2>

          <p className="mt-4 text-lg sm:text-xl text-[#021347] leading-relaxed font-bold">
            From forensic bottleneck diagnosis to ongoing operational management and board-level advisory, our senior team executes across six structured mandates.
          </p>
        </div>

        {/* 6-Card Services Grid (Swiftform work-list _02) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_MANDATES.map((svc) => (
            <div
              key={svc.id}
              onClick={() => setSelectedService(svc)}
              className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:border-[#1896FA]/40 hover:-translate-y-1 cursor-pointer group"
            >
              <div>
                {/* Icon (Pure Electric Blue, ZERO Green) */}
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#1896FA]/25 flex items-center justify-center p-2.5 mb-6 transition-all duration-300 group-hover:bg-[#1896FA]/15 group-hover:scale-110">
                  {renderServiceIcon(svc.id)}
                </div>

                {/* Title & Description */}
                <h3 className="font-display font-bold text-xl text-[#021347] mb-3 group-hover:text-[#1896FA] transition-colors">
                  {svc.title}
                </h3>
                
                <p className="text-base text-[#021347] leading-relaxed mb-6 font-bold">
                  {svc.description}
                </p>
              </div>

              {/* Bottom Meta */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-bold text-[#021347]">
                <span>{svc.typicalDuration}</span>
                <span className="text-[#1896FA] font-bold group-hover:text-[#021347] inline-flex items-center gap-1 transition-colors">
                  <span>View Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <span className="text-xs font-extrabold text-[#1896FA]">
                  Mandate 0{selectedService.number}
                </span>
                <h3 className="font-display font-bold text-2xl text-[#021347] mt-1">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-base text-[#021347] leading-relaxed mb-6 font-bold">
              {selectedService.description}
            </p>

            <div className="bg-[#EFF6FF] border border-[#1896FA]/20 rounded-2xl p-5 mb-6 space-y-2.5">
              <div className="text-sm font-bold text-[#1896FA]">
                Deliverables & Outcomes:
              </div>
              {selectedService.deliverables.map((del, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#021347]">
                  <span className="text-[#1896FA] font-bold">✓</span>
                  <span>{del}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <RollingButton
                variant="blue"
                className="flex-1 justify-between"
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onOpenContact(`Mandate: ${title}`);
                }}
              >
                Inquire About Mandate
              </RollingButton>
              <button
                onClick={() => setSelectedService(null)}
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
