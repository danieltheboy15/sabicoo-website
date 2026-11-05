import React, { useState } from 'react';
import { FAQS, BRAND_ASSETS } from '../data/sabiData';

interface FaqSectionProps {
  onOpenContact: (track?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenContact }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 md:py-28 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Swiftform faqs-head) */}
        <div className="max-w-2xl mb-14">
          <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-[42px] text-[#050c0b] leading-[1.2] tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        {/* 2-Column Grid: Left Accordion, Right Swiftform 3D Toys Mascot Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#f1f1f1] rounded-2xl border border-gray-200/80 transition-all duration-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-lg sm:text-xl text-[#021347] leading-snug">
                      {faq.question}
                    </span>

                    <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                      <img
                        src={
                          isOpen
                            ? "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69dfcd67443009047b964f6a_plus%20(8).svg"
                            : "https://cdn.prod.website-files.com/69db77b97c71293341bfa085/69dfcd6772535fd909a3c421_plus%20(7).svg"
                        }
                        alt="Toggle"
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-base sm:text-lg text-[#021347] leading-relaxed font-bold border-t border-gray-200/60 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Swiftform 3D Mascot Toy Visual (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-sm w-full">
              <img
                src={BRAND_ASSETS.faq3dToys}
                alt="Swiftform 3D Toys"
                className="w-full h-auto object-contain filter drop-shadow-xl"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
