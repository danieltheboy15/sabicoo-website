import React from 'react';
import { TEAM_MEMBERS } from '../data/sabiData';
import { RollingButton } from './RollingButton';
import { Linkedin } from 'iconoir-react';

interface TeamSectionProps {
  onOpenContact: (track?: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onOpenContact }) => {
  return (
    <section className="py-20 md:py-28 bg-[#f1f1f1] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Swiftform team head) */}
        <div className="max-w-2xl mx-auto text-center mb-16">

          <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-[42px] text-[#021347] leading-[1.2] tracking-tight">
            We have Huge Form Experts
          </h2>

          <p className="mt-4 text-base text-gray-600 leading-relaxed font-normal">
            Real operators who have run warehouses, closed payrolls, and scaled business architectures across emerging markets.
          </p>
        </div>

        {/* 4-Card Team Grid matching Swiftform team ellipse cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:border-[#1896FA]/30 hover:-translate-y-1 group"
            >
              <div>
                {/* Circular Profile Avatar (Swiftform ellipse_3.webp etc.) */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gray-100 border-2 border-[#1896FA]/20 group-hover:border-[#1896FA] transition-colors">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Name & Role */}
                <div className="text-center">
                  <h3 className="font-display font-medium text-lg text-[#021347] group-hover:text-[#1896FA] transition-colors">
                    {member.name}
                  </h3>

                  <div className="text-xs text-[#1896FA] font-medium mt-1 mb-3">
                    {member.role}
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Bottom Card Link */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span className="font-mono-tag uppercase text-[10px]">{member.tag}</span>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-gray-50 hover:bg-[#050c0b] hover:text-white flex items-center justify-center text-gray-600 transition-colors"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
