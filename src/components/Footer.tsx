import React, { useState, useEffect } from 'react';
import { BRAND_ASSETS } from '../data/sabiData';
import { Instagram, Mail, ArrowUp } from 'iconoir-react';
import { submitToSabiInbox, TARGET_INBOX_EMAIL } from '../services/mailService';

interface FooterProps {
  onNavigatePage: (page: string, tab?: 'tier-1' | 'tier-2') => void;
  onOpenContact: (track?: string) => void;
  onOpenScreener: () => void;
}

interface LetterPathData {
  char: string;
  id: number;
  viewBox: string;
  path: string;
  isDotChar?: boolean;
  dotCoords?: { cx: number; cy: number; r: number };
}

interface WordGroupData {
  word: string;
  letters: LetterPathData[];
}

const FOOTER_WORD_GROUPS: WordGroupData[] = [
  {
    word: 'Sabi',
    letters: [
      {
        char: 'S',
        id: 0,
        viewBox: '0 0 86 120',
        path: 'M 68 36 C 66 23 44 23 30 32 C 16 42 18 55 34 61 C 54 67 68 74 65 89 C 61 102 36 102 18 90 C 13 86 11 78 12 73',
      },
      {
        char: 'a',
        id: 1,
        viewBox: '0 0 76 120',
        path: 'M 56 52 C 50 45 34 45 24 54 C 13 64 13 82 24 91 C 36 99 50 97 56 88 L 56 48 L 56 98',
      },
      {
        char: 'b',
        id: 2,
        viewBox: '0 0 76 120',
        path: 'M 18 24 L 18 98 C 26 99 42 99 52 91 C 64 82 64 63 52 54 C 40 46 26 48 18 56',
      },
      {
        char: 'i',
        id: 3,
        viewBox: '0 0 46 120',
        path: 'M 23 48 L 23 98',
        isDotChar: true,
        dotCoords: { cx: 23, cy: 28, r: 5.5 },
      },
    ],
  },
  {
    word: 'COO',
    letters: [
      {
        char: 'C',
        id: 4,
        viewBox: '0 0 86 120',
        path: 'M 72 38 C 64 24 42 23 28 36 C 14 50 14 74 28 88 C 42 101 64 100 72 86',
      },
      {
        char: 'O',
        id: 5,
        viewBox: '0 0 90 120',
        path: 'M 45 23 C 20 23 14 41 14 62 C 14 83 20 101 45 101 C 70 101 76 83 76 62 C 76 41 70 23 45 23 Z',
      },
      {
        char: 'O',
        id: 6,
        viewBox: '0 0 90 120',
        path: 'M 45 23 C 20 23 14 41 14 62 C 14 83 20 101 45 101 C 70 101 76 83 76 62 C 76 41 70 23 45 23 Z',
      },
    ],
  },
];

export const Footer: React.FC<FooterProps> = ({
  onNavigatePage,
  onOpenContact,
  onOpenScreener
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [activeLetter, setActiveLetter] = useState(0);

  useEffect(() => {
    // Cycle through 7 letters (0..6) + 1 brief quiet pause index (7) before restarting
    const timer = setInterval(() => {
      setActiveLetter((prev) => (prev + 1) % 8);
    }, 700);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribing(true);
    try {
      await submitToSabiInbox({
        formType: 'Executive Playbook & Operational Newsletter',
        subject: `[Sabi COO Newsletter] New Subscriber: ${email.trim()}`,
        senderEmail: email.trim(),
        fields: {
          'Subscriber Email': email.trim(),
          'Subscription Channel': 'Executive Playbooks & Operations Notes',
          'Target Recipient': TARGET_INBOX_EMAIL,
        }
      });
      setSubscribed(true);
    } finally {
      setIsSubscribing(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 bg-[#021347] text-white pt-8 sm:pt-14 pb-0 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 relative z-10">
        
        {/* Top Section: Compact Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 md:gap-10 lg:gap-12 pb-6 sm:pb-10 md:pb-12 border-b border-white/10 items-start">
          
          {/* Column 1: Logo, Description & Social Icons (3 Cols) */}
          <div className="md:col-span-3 flex flex-col gap-2 sm:gap-3">
            <button
              onClick={() => onNavigatePage('home')}
              className="inline-block text-left cursor-pointer focus:outline-none w-fit"
              aria-label="Sabi COO"
            >
              <div className="flex items-center overflow-hidden select-none h-8 sm:h-10 w-[140px] sm:w-[170px]">
                <img
                  src={BRAND_ASSETS.logo}
                  alt="Sabi COO"
                  className="shrink-0 max-w-none transform origin-left pointer-events-none select-none"
                  style={{ width: "211.86%", transform: "translateX(-26.4%)" }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </button>

            <p className="text-xs text-white/70 font-semibold max-w-xs leading-normal">
              Operational architecture and fractional COO embed for high-growth ventures and scaleups.
            </p>

            {/* Social Icons Aligned Under Logo: X, Instagram, Mail */}
            <div className="flex items-center gap-2 pt-0.5">
              {/* X */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white hover:text-[#1896FA] transition-colors"
                aria-label="X"
                title="X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white hover:text-[#1896FA] transition-colors"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Mail */}
              <a
                href="mailto:info@sabicoo.com"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white hover:text-[#1896FA] transition-colors"
                aria-label="Email info@sabicoo.com"
                title="info@sabicoo.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links Grid (6 Cols) */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            
            {/* Pages Column */}
            <div>
              <div className="text-xs font-mono font-bold text-[#1896FA] uppercase tracking-widest mb-2 sm:mb-3 flex items-center">
                Pages
              </div>
              <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm text-white font-bold">
                <li>
                  <button onClick={() => onNavigatePage('home')} className="hover:text-[#1896FA] transition-colors cursor-pointer text-left">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigatePage('services')} className="hover:text-[#1896FA] transition-colors cursor-pointer text-left">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigatePage('extraordinary')} className="hover:text-[#1896FA] transition-colors cursor-pointer text-left">
                    Extraordinary Engagements
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigatePage('how-it-works')} className="hover:text-[#1896FA] transition-colors cursor-pointer text-left">
                    How It Works
                  </button>
                </li>
              </ul>
            </div>

            {/* Tracks Column */}
            <div>
              <div className="text-xs font-mono font-bold text-[#1896FA] uppercase tracking-widest mb-2 sm:mb-3 flex items-center">
                Tracks
              </div>
              <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm text-white font-bold">
                <li>
                  <button onClick={() => onNavigatePage('services', 'tier-1')} className="hover:text-[#1896FA] transition-colors cursor-pointer text-left">
                    Tier 1 Fixed-Fee
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigatePage('services', 'tier-2')} className="hover:text-[#1896FA] transition-colors cursor-pointer text-left">
                    Tier 2 Partner Track
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigatePage('contact')} className="hover:text-[#1896FA] transition-colors cursor-pointer text-left">
                    Book Discovery Call
                  </button>
                </li>
              </ul>
            </div>

            {/* Utility Column */}
            <div>
              <div className="text-xs font-mono font-bold text-[#1896FA] uppercase tracking-widest mb-2 sm:mb-3 flex items-center">
                Utility
              </div>
              <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm text-white font-bold">
                <li>
                  <button onClick={onOpenScreener} className="hover:text-blue-300 transition-colors cursor-pointer text-[#1896FA] font-extrabold text-left">
                    <span>60s Screener</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigatePage('contact')} className="hover:text-blue-300 transition-colors cursor-pointer text-left">
                    Contact Sabi COO
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Column 3: Newsletter Box (3 Cols) */}
          <div className="md:col-span-3 space-y-2 sm:space-y-3">
            <div className="text-xs font-mono font-bold text-[#1896FA] uppercase tracking-widest flex items-center">
              Newsletter
            </div>
            <p className="text-xs sm:text-sm text-white font-semibold leading-relaxed">
              Subscribe to our newsletter for notes on scaling operations and operational playbooks.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-0.5">
                <div className="relative">
                  <input
                    required
                    type="email"
                    placeholder="hey@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#1896FA] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full py-2 sm:py-2.5 rounded-full bg-[#1896FA] text-white hover:bg-blue-600 disabled:bg-slate-500 text-xs sm:text-sm font-extrabold transition-colors cursor-pointer shadow-md active:scale-98 flex items-center justify-center gap-1.5"
                >
                  {isSubscribing ? (
                    <span>Subscribing...</span>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-xs sm:text-sm text-[#1896FA] font-bold p-2.5 bg-white/10 rounded-2xl border border-white/20">
                ✓ Subscribed! Confirmation sent to <span className="underline">info@sabicoo.com</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar: Compact */}
        <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/80 font-semibold">
          <div>
            © {new Date().getFullYear()} Sabi COO Consultancy. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-white hover:text-[#1896FA] font-bold transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Monumental Sabi COO Wordmark Across Footer Floor with Authentic Vector Stroke Tracing & Moving Neon Comet Spark */}
      <div
        aria-label="Sabi COO"
        className="w-full flex items-center justify-center overflow-hidden pt-4 sm:pt-8 md:pt-10 pb-6 sm:pb-10 md:pb-14 select-none pointer-events-none"
      >
        <div className="flex flex-nowrap items-center justify-center max-w-full px-2 sm:px-4">
          {FOOTER_WORD_GROUPS.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className={`inline-flex items-center gap-1 sm:gap-2.5 md:gap-4 lg:gap-5 ${
                groupIdx === 0 ? 'mr-3.5 sm:mr-7 md:mr-11 lg:mr-14' : ''
              }`}
            >
              {group.letters.map((letter) => {
                const isActive = activeLetter === letter.id;
                return (
                  <div
                    key={letter.id}
                    className="relative flex items-center justify-center transition-transform duration-300 select-none"
                    style={{
                      transform: isActive ? 'scale(1.08) translateY(-4px)' : 'scale(1) translateY(0)',
                    }}
                  >
                    {/* Radiant Ambient Bloom: Only present behind active letter */}
                    {isActive && (
                      <div
                        className="absolute inset-0 -m-4 sm:-m-8 md:-m-12 bg-radial from-[#38BDF8]/40 via-[#1896FA]/18 to-transparent rounded-full blur-2xl pointer-events-none z-0"
                        style={{
                          animation: 'letterBloomPulse 0.7s ease-out forwards',
                        }}
                      />
                    )}

                    {/* Architectural Vector Letter SVG */}
                    <svg
                      viewBox={letter.viewBox}
                      className="h-[15vw] sm:h-[18vw] md:h-[20vw] lg:h-[22vw] max-h-[170px] sm:max-h-[220px] md:max-h-[260px] lg:max-h-[300px] w-auto overflow-visible relative z-10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <filter id={`neon-filter-${letter.id}`} x="-40%" y="-40%" width="180%" height="180%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
                          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2" />
                          <feMerge>
                            <feMergeNode in="blur2" />
                            <feMergeNode in="blur1" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* 1. Base Resting Letter Stroke (Always visible with subtle blueprint white line) */}
                      <path
                        d={letter.path}
                        stroke="rgba(255, 255, 255, 0.12)"
                        strokeWidth="11"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {letter.isDotChar && letter.dotCoords && (
                        <circle
                          cx={letter.dotCoords.cx}
                          cy={letter.dotCoords.cy}
                          r={letter.dotCoords.r}
                          fill="rgba(255, 255, 255, 0.12)"
                        />
                      )}

                      {/* 2. Active Glowing Traced Stroke: Completely removed when not active */}
                      {isActive && (
                        <g>
                          {/* Wide Neon Cyan Halo Aura */}
                          <path
                            d={letter.path}
                            stroke="#38BDF8"
                            strokeWidth="16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="100"
                            pathLength="100"
                            filter={`url(#neon-filter-${letter.id})`}
                            className="opacity-90"
                            style={{
                              animation: 'vectorStrokeTrace 0.65s cubic-bezier(0.2, 0.8, 0.35, 1) forwards',
                            }}
                          />

                          {/* Vibrant Core Electric Blue Stroke */}
                          <path
                            d={letter.path}
                            stroke="#00E5FF"
                            strokeWidth="11"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="100"
                            pathLength="100"
                            style={{
                              animation: 'vectorStrokeTrace 0.65s cubic-bezier(0.2, 0.8, 0.35, 1) forwards',
                            }}
                          />

                          {/* Hot Plasma White Center Core */}
                          <path
                            d={letter.path}
                            stroke="#FFFFFF"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="100"
                            pathLength="100"
                            style={{
                              animation: 'vectorStrokeTrace 0.65s cubic-bezier(0.2, 0.8, 0.35, 1) forwards',
                            }}
                          />

                          {/* Blazing Comet / Laser Spark Tip Tracing Exactly Along the Letter Contour */}
                          <path
                            d={letter.path}
                            stroke="#FFFFFF"
                            strokeWidth="17"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="4 96"
                            pathLength="100"
                            style={{
                              filter: 'drop-shadow(0 0 6px #FFFFFF) drop-shadow(0 0 14px #38BDF8) drop-shadow(0 0 24px #1896FA)',
                              animation: 'vectorSparkLead 0.65s cubic-bezier(0.2, 0.8, 0.35, 1) forwards',
                            }}
                          />

                          {/* For 'i': The Dot ignites with a burst */}
                          {letter.isDotChar && letter.dotCoords && (
                            <g
                              style={{
                                transformOrigin: `${letter.dotCoords.cx}px ${letter.dotCoords.cy}px`,
                                animation: 'vectorDotPop 0.65s cubic-bezier(0.3, 1.2, 0.5, 1) forwards',
                              }}
                            >
                              <circle
                                cx={letter.dotCoords.cx}
                                cy={letter.dotCoords.cy}
                                r={letter.dotCoords.r + 3}
                                fill="#38BDF8"
                                filter={`url(#neon-filter-${letter.id})`}
                              />
                              <circle
                                cx={letter.dotCoords.cx}
                                cy={letter.dotCoords.cy}
                                r={letter.dotCoords.r}
                                fill="#FFFFFF"
                                style={{
                                  filter: 'drop-shadow(0 0 6px #FFFFFF) drop-shadow(0 0 12px #38BDF8)',
                                }}
                              />
                            </g>
                          )}
                        </g>
                      )}
                    </svg>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
