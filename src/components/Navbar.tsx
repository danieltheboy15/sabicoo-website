import React, { useState } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { RollingButton } from './RollingButton';
import { BRAND_ASSETS } from '../data/sabiData';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenDiagnostic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenDiagnostic
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'extraordinary', label: 'Extraordinary Engagements' },
    { id: 'how-it-works', label: 'How It Works' }
  ];

  const handleNavClick = (pageId: string) => {
    setMobileMenuOpen(false);
    onNavigate(pageId);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-3 sm:px-6 md:px-8 pt-3 sm:pt-4 pb-2 transition-all duration-300 pointer-events-none">
      {/* Floating Capsule Bar with deep navy #010926 background and high opacity for crisp logo contrast */}
      <div className="max-w-[73rem] mx-auto w-full bg-[#010926]/96 backdrop-blur-xl rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.15)] border border-white/20 pointer-events-auto transition-all duration-200">
        
        {/* Brand Logo - Left (White in logo is 100% visible on #010926 deep navy) */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavClick('home')}
            className="text-left cursor-pointer focus:outline-none rounded-lg p-0.5 transition-opacity hover:opacity-90 block"
            aria-label="Sabi COO Home"
          >
            <div className="flex items-center overflow-hidden select-none h-6 sm:h-7 w-[115px] sm:w-[130px]">
              <img
                src={BRAND_ASSETS.logo}
                alt="Sabi COO"
                className="shrink-0 max-w-none transform origin-left pointer-events-none select-none"
                style={{ width: "211.86%", transform: "translateX(-26.4%)" }}
                referrerPolicy="no-referrer"
              />
            </div>
          </button>
        </div>

        {/* Desktop Nav Links - Center (Exact Previous Content) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-[#010926] bg-white font-bold shadow-sm'
                    : 'text-white/85 hover:text-white hover:bg-white/15'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button - Book Discovery Call */}
        <div className="hidden sm:flex items-center gap-3">
          <RollingButton
            variant="blue"
            size="md"
            onClick={() => handleNavClick('contact')}
            className="shadow-md shadow-blue-950/20"
          >
            Book Discovery Call
          </RollingButton>
        </div>

        {/* Mobile Hamburger Button (Animated 3 white lines) */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className="w-10 h-10 flex flex-col items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer select-none"
          >
            <span
              className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white rounded-full my-1 transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Drawer (Deep navy matching theme) */}
      {mobileMenuOpen && (
        <div className="max-w-[73rem] mx-auto w-full mt-2 pointer-events-auto animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="bg-[#010926]/98 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-white/20 space-y-2 text-white">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-3.5 px-4 flex items-center justify-between rounded-2xl transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#010926] font-bold'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-base font-semibold">{item.label}</span>
                  <ArrowUpRight className={`w-4 h-4 ${isActive ? 'text-[#010926]' : 'text-white/50'}`} />
                </button>
              );
            })}

            {/* Contact Nav Item in Drawer */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left py-3.5 px-4 flex items-center justify-between rounded-2xl transition-colors cursor-pointer ${
                currentPage === 'contact'
                  ? 'bg-white text-[#010926] font-bold'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-base font-semibold">Contact</span>
              <ArrowUpRight className={`w-4 h-4 ${currentPage === 'contact' ? 'text-[#010926]' : 'text-white/50'}`} />
            </button>

            <div className="pt-3 border-t border-white/15">
              <RollingButton
                variant="blue"
                size="lg"
                onClick={() => handleNavClick('contact')}
                className="w-full shadow-md text-center justify-center"
              >
                Book Discovery Call
              </RollingButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

