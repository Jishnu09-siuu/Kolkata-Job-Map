import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  }[size];

  const svgDimensions = {
    sm: 18,
    md: 22,
    lg: 28,
  }[size];

  return (
    <div className="flex items-center gap-2.5 flex-shrink-0 select-none group cursor-pointer">
      <div
        className={`${iconDimensions} rounded-xl bg-zinc-950 flex items-center justify-center text-white shadow-md ring-1 ring-white/10 transition-all duration-300 relative overflow-hidden`}
      >
        <svg
          width={svgDimensions}
          height={svgDimensions}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <path
            d="M16 3L27.25 9.5V22.5L16 29L4.75 22.5V9.5L16 3Z"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M16 7C12.6863 7 10 9.68629 10 13C10 17.5 16 23.5 16 23.5C16 23.5 22 17.5 22 13C22 9.68629 19.3137 7 16 7Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="13" r="2.5" fill="#ffffff" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-bold text-zinc-950 tracking-tight text-sm sm:text-base">
              KOLKATA<span className="font-extrabold ml-0.5">JOB</span>MAP
            </span>
          </div>
          <span className="text-[10.5px] font-medium text-zinc-400 tracking-normal mt-0.5 hidden sm:block">
            Verified Geospatial Job Discovery
          </span>
        </div>
      )}
    </div>
  );
};
