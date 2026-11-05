import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND_ASSETS } from '../data/sabiData';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total animation runtime: ~2.1s
    // 0.0s - 1.15s: 4 corner logos roll inward from the 4 corners and meet in the center
    // 1.15s - 1.75s: All 4 lock and turn into the authentic single master logo
    // 1.75s - 2.15s: Smooth fade dissolve into the website
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400);
    }, 1800);

    return () => clearTimeout(exitTimer);
  }, [onComplete]);

  // Identical logo graphic and cropping used in the Navbar
  const LogoGraphic = ({ className = 'w-56 sm:w-72 md:w-84 aspect-[135/32]' }: { className?: string }) => (
    <div className={`relative flex items-center overflow-hidden select-none pointer-events-none ${className}`}>
      <img
        src={BRAND_ASSETS.logo}
        alt="Sabi COO"
        className="shrink-0 max-w-none transform origin-left pointer-events-none select-none"
        style={{ width: '211.86%', transform: 'translateX(-26.4%)' }}
        referrerPolicy="no-referrer"
      />
    </div>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="logo-preloader-canvas"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-[#010926] flex items-center justify-center overflow-hidden select-none pointer-events-none"
          aria-label="Sabi COO Loading"
        >
          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#1896FA]/10 blur-[140px] rounded-full" />
          </div>

          {/* Central Convergence Stage */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">

            {/* 1. TOP-LEFT LOGO: Rolls in from top-left corner */}
            <motion.div
              initial={{
                x: '-75vw',
                y: '-75vh',
                rotate: -360,
                opacity: 0,
                scale: 0.7
              }}
              animate={{
                x: ['-75vw', '0vw', '0vw'],
                y: ['-75vh', '0vh', '0vh'],
                rotate: [-360, 0, 0],
                opacity: [0, 0.9, 0.95, 0],
                scale: [0.7, 1, 1, 0.98]
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.8, 0.9, 1],
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute flex items-center justify-center pointer-events-none"
            >
              <LogoGraphic />
            </motion.div>

            {/* 2. TOP-RIGHT LOGO: Rolls in from top-right corner */}
            <motion.div
              initial={{
                x: '75vw',
                y: '-75vh',
                rotate: 360,
                opacity: 0,
                scale: 0.7
              }}
              animate={{
                x: ['75vw', '0vw', '0vw'],
                y: ['-75vh', '0vh', '0vh'],
                rotate: [360, 0, 0],
                opacity: [0, 0.9, 0.95, 0],
                scale: [0.7, 1, 1, 0.98]
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.8, 0.9, 1],
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute flex items-center justify-center pointer-events-none"
            >
              <LogoGraphic />
            </motion.div>

            {/* 3. BOTTOM-LEFT LOGO: Rolls in from bottom-left corner */}
            <motion.div
              initial={{
                x: '-75vw',
                y: '75vh',
                rotate: 360,
                opacity: 0,
                scale: 0.7
              }}
              animate={{
                x: ['-75vw', '0vw', '0vw'],
                y: ['75vh', '0vh', '0vh'],
                rotate: [360, 0, 0],
                opacity: [0, 0.9, 0.95, 0],
                scale: [0.7, 1, 1, 0.98]
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.8, 0.9, 1],
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute flex items-center justify-center pointer-events-none"
            >
              <LogoGraphic />
            </motion.div>

            {/* 4. BOTTOM-RIGHT LOGO: Rolls in from bottom-right corner */}
            <motion.div
              initial={{
                x: '75vw',
                y: '75vh',
                rotate: -360,
                opacity: 0,
                scale: 0.7
              }}
              animate={{
                x: ['75vw', '0vw', '0vw'],
                y: ['75vh', '0vh', '0vh'],
                rotate: [-360, 0, 0],
                opacity: [0, 0.9, 0.95, 0],
                scale: [0.7, 1, 1, 0.98]
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.8, 0.9, 1],
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute flex items-center justify-center pointer-events-none"
            >
              <LogoGraphic />
            </motion.div>

            {/* MASTER FUSED ACTUAL LOGO: Turns into the actual logo right as they meet in the middle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: [0, 0, 1, 1],
                scale: [0.9, 0.92, 1.05, 1]
              }}
              transition={{
                duration: 1.6,
                times: [0, 0.58, 0.75, 1],
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative z-20 flex items-center justify-center filter drop-shadow-[0_0_30px_rgba(24,150,250,0.55)] pointer-events-none"
            >
              {/* Convergence Fusion Ring Pulse */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: [0.5, 0.5, 1.8],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 1.6,
                  times: [0, 0.6, 1],
                  ease: 'easeOut'
                }}
                className="absolute inset-0 rounded-full border border-[#1896FA]/60 pointer-events-none"
              />

              <LogoGraphic className="w-64 sm:w-80 md:w-96 aspect-[135/32]" />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
