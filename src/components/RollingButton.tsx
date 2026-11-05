import React from 'react';

interface RollingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'blue' | 'dark' | 'primary' | 'white' | 'outline';
  showIcon?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
  centerText?: boolean;
}

export const RollingButton: React.FC<RollingButtonProps> = ({
  children,
  onClick,
  variant = 'blue',
  showIcon = true,
  className = '',
  type = 'button',
  size = 'md',
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'primary':
      case 'blue':
        return {
          container:
            'bg-[#1896FA] text-white hover:bg-[#0d84e3] shadow-lg shadow-[#1896FA]/25 border border-white/20',
          iconBox: 'bg-[#021347] text-white',
          arrowColor: 'text-white',
        };
      case 'dark':
        return {
          container:
            'bg-[#021347] text-white hover:bg-[#010C2E] border border-white/20 shadow-md',
          iconBox: 'bg-[#1896FA] text-white',
          arrowColor: 'text-white',
        };
      case 'white':
        return {
          container:
            'bg-white text-[#021347] hover:bg-[#EFF6FF] border border-[#1896FA]/20 shadow-sm',
          iconBox: 'bg-[#1896FA] text-white',
          arrowColor: 'text-white',
        };
      case 'outline':
        return {
          container:
            'bg-transparent text-[#1896FA] border-2 border-[#1896FA] hover:bg-[#1896FA] hover:text-white',
          iconBox: 'bg-[#1896FA] text-white group-hover:bg-[#021347]',
          arrowColor: 'text-white',
        };
      default:
        return {
          container: 'bg-[#1896FA] text-white hover:bg-[#0d84e3] border border-white/20',
          iconBox: 'bg-[#021347] text-white',
          arrowColor: 'text-white',
        };
    }
  };

  const { container, iconBox, arrowColor } = getStyles();

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          button: 'px-2 py-1.5 text-xs',
          iconDisc: 'w-6 h-6 min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px]',
          iconSvg: 'w-3.5 h-3.5 min-w-[14px] min-h-[14px]',
        };
      case 'lg':
        return {
          button: 'px-3 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base',
          iconDisc: 'w-8 h-8 min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px]',
          iconSvg: 'w-4.5 h-4.5 min-w-[18px] min-h-[18px]',
        };
      default:
        return {
          button: 'px-2.5 py-2 sm:py-2.5 text-xs sm:text-sm',
          iconDisc: 'w-7 h-7 min-w-[28px] min-h-[28px] max-w-[28px] max-h-[28px]',
          iconSvg: 'w-4 h-4 min-w-[16px] min-h-[16px]',
        };
    }
  };

  const sizes = getSizeClasses();

  // Strip any conflicting 'justify-between' classes so the button text is always strictly centered
  const sanitizedClassName = className.replace(/\bjustify-between\b/g, '').trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={`group relative rounded-full inline-flex items-center justify-center font-bold transition-all duration-300 cursor-pointer select-none active:scale-[0.98] ${container} ${sizes.button} ${sanitizedClassName}`}
    >
      {/* Symmetrical Left Spacer (Counterbalances the Right Icon so Text is 100% Centered) */}
      {showIcon && (
        <span
          className={`shrink-0 aspect-square select-none pointer-events-none opacity-0 ${sizes.iconDisc}`}
          style={{ aspectRatio: '1 / 1' }}
          aria-hidden="true"
        />
      )}

      {/* Centered Button Text */}
      <span className="flex-1 text-center px-2.5 sm:px-4 leading-tight whitespace-nowrap tracking-tight font-bold select-none">
        {children}
      </span>

      {/* 100% Mathematically Crisp, Distortion-Proof 45° Diagonal Arrow */}
      {showIcon && (
        <span
          className={`rounded-full aspect-square flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 ${iconBox} ${sizes.iconDisc}`}
          style={{ aspectRatio: '1 / 1' }}
          aria-hidden="true"
        >
          <svg
            className={`${sizes.iconSvg} ${arrowColor} shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              display: 'block',
              transformOrigin: 'center',
              flexShrink: 0,
            }}
          >
            {/* The 45° Diagonal Shaft */}
            <line
              x1="7"
              y1="17"
              x2="17"
              y2="7"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
            />
            {/* The Connected Arrowhead Polyline (Round Joined Corner) */}
            <polyline
              points="9 7 17 7 17 15"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </button>
  );
};
