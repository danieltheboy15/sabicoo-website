import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ComparisonSection } from './components/ComparisonSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FaqSection } from './components/FaqSection';
import { HomeCtaSection } from './components/HomeCtaSection';
import { Footer } from './components/Footer';
import { BottleneckScreenerModal } from './components/BottleneckScreenerModal';
import { ContactModal } from './components/ContactModal';
import { ServicesPage } from './pages/ServicesPage';
import { ExtraordinaryPage } from './pages/ExtraordinaryPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ContactPage } from './pages/ContactPage';
import { ArrowUpRight } from 'iconoir-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [servicesTab, setServicesTab] = useState<'tier-1' | 'tier-2'>('tier-1');
  const [showPreloader, setShowPreloader] = useState(true);
  const [screenerOpen, setScreenerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedTrackForContact, setSelectedTrackForContact] = useState<string>('');

  // Auto-popup 60s Screener 7 seconds after the home page has loaded and preloader cleared
  useEffect(() => {
    if (currentPage !== 'home') return;
    if (showPreloader) return;

    const hasAutoOpened = sessionStorage.getItem('sabi_screener_auto_opened');
    if (hasAutoOpened) return;

    const timer = setTimeout(() => {
      setScreenerOpen(true);
      sessionStorage.setItem('sabi_screener_auto_opened', 'true');
    }, 7000);

    return () => clearTimeout(timer);
  }, [currentPage, showPreloader]);

  // Handle URL sync and browser back/forward buttons
  useEffect(() => {
    const getInitialState = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      const searchParams = new URLSearchParams(window.location.search);
      const searchParam = searchParams.get('page');
      const tabParam = searchParams.get('tab');
      const hash = window.location.hash;
      const validPages = ['home', 'services', 'extraordinary', 'how-it-works', 'contact'];

      let page = 'home';
      if (searchParam && validPages.includes(searchParam)) {
        page = searchParam;
      } else if (path && validPages.includes(path)) {
        page = path;
      }

      let tab: 'tier-1' | 'tier-2' = 'tier-1';
      if (tabParam === 'tier-2' || hash === '#tier-2') {
        tab = 'tier-2';
      }

      return { page, tab };
    };

    const { page, tab } = getInitialState();
    setCurrentPage(page);
    setServicesTab(tab);

    const handlePopState = () => {
      const state = getInitialState();
      setCurrentPage(state.page);
      setServicesTab(state.tab);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Ensure scroll position resets to the top whenever the page or service tab changes
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    };

    // Immediate scroll
    scrollToTop();

    // Additional passes after paint and DOM layout updates
    const rafId = requestAnimationFrame(() => {
      scrollToTop();
    });

    const timer = setTimeout(() => {
      scrollToTop();
    }, 40);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [currentPage, servicesTab]);

  const handleNavigate = (page: string, tab?: 'tier-1' | 'tier-2') => {
    const isSamePage = page === currentPage && (!tab || tab === servicesTab);

    setCurrentPage(page);
    if (page === 'services') {
      setServicesTab(tab || 'tier-1');
    }
    try {
      let url = page === 'home' ? '/' : `/?page=${page}`;
      if (page === 'services' && tab) {
        url += `&tab=${tab}`;
      }
      window.history.pushState({ page, tab }, '', url);
    } catch {
      // Fallback if pushState fails
    }

    if (isSamePage) {
      // If clicking a link to the page the user is currently on, smoothly return to top
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      // When navigating to a new page, immediately scroll to the top of the new page
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
  };

  const handleSelectTrack = (track: string) => {
    setSelectedTrackForContact(track);
  };

  const handleOpenContactModal = (track?: string) => {
    setSelectedTrackForContact(track || '');
    setContactOpen(true);
  };

  const handleOpenScreener = () => {
    setScreenerOpen(true);
  };

  const handleBookWithDiagnosis = (diagnosisSummary: string) => {
    setSelectedTrackForContact(`Diagnostic Result: ${diagnosisSummary}`);
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#010926] text-[#021347] selection:bg-[#DE9B35] selection:text-[#021347]">
      {/* Spectacular Executive Cinematic Preloader */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Swiftform Clean Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenDiagnostic={handleOpenScreener}
      />

      {/* Main Dynamic View */}
      <main className={`flex-1 w-full ${currentPage !== 'home' ? 'pt-24 sm:pt-28' : ''}`}>
        {currentPage === 'home' && (
          <>
            {/* 01. Static Full-Screen Edge-to-Edge Hero Section */}
            <HeroSection
              onOpenScreener={handleOpenScreener}
              onOpenContact={() => handleNavigate('contact')}
            />

            {/* 02. Content Layer - Scrolls up to meet and slide over the static hero, then continues upward */}
            <div className="relative z-20 bg-white">
              {/* Built for Speed / Structure, Visibility & Control */}
              <ComparisonSection
                onOpenContact={handleOpenContactModal}
                onNavigate={handleNavigate}
              />

              {/* How It Works / 4-Step Sequential Blueprint */}
              <HowItWorksSection
                onOpenContact={() => handleNavigate('contact')}
                onOpenScreener={handleOpenScreener}
              />

              {/* Home Page Discovery Call Pre-Footer CTA */}
              <HomeCtaSection
                onOpenContact={() => handleNavigate('contact')}
                onOpenScreener={handleOpenScreener}
              />
            </div>
          </>
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onSelectTrack={handleSelectTrack}
            initialTab={servicesTab}
          />
        )}

        {currentPage === 'extraordinary' && (
          <ExtraordinaryPage
            onNavigate={handleNavigate}
            onSelectTrack={handleSelectTrack}
          />
        )}

        {currentPage === 'how-it-works' && (
          <HowItWorksPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            preselectedTrack={selectedTrackForContact}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigatePage={handleNavigate}
        onOpenContact={handleOpenContactModal}
        onOpenScreener={handleOpenScreener}
      />

      {/* Interactive 60-Second Bottleneck Screener Modal */}
      <BottleneckScreenerModal
        isOpen={screenerOpen}
        onClose={() => setScreenerOpen(false)}
        onBookWithDiagnosis={handleBookWithDiagnosis}
      />

      {/* Discovery Call / Scoping Brief Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        preselectedTrack={selectedTrackForContact}
      />

      {/* Floating Screener Trigger for quick access */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={handleOpenScreener}
          className="group flex items-center gap-2 px-4 py-2.5 bg-[#021347] text-white rounded-full border border-[#1896FA]/40 hover:border-[#1896FA] transition-all duration-300 cursor-pointer text-xs font-semibold shadow-xl shadow-blue-900/20 hover:bg-[#010C2E]"
        >
          <span>60s Screener</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white" />
        </button>
      </div>
    </div>
  );
}
