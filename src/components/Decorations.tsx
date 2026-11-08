import React from 'react';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  1. LotusFlower                                                     */
/* ------------------------------------------------------------------ */
interface LotusFlowerProps {
  size?: number;
  className?: string;
  color?: string;
}

export const LotusFlower: React.FC<LotusFlowerProps> = ({
  size = 64,
  className = '',
  color = '#d4a547',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Center petal */}
    <path
      d="M50 15 C53 30, 58 40, 50 55 C42 40, 47 30, 50 15Z"
      fill={color}
      opacity="0.95"
    />
    {/* Inner left petal */}
    <path
      d="M50 55 C40 40, 28 38, 25 25 C35 30, 44 38, 50 55Z"
      fill={color}
      opacity="0.85"
    />
    {/* Inner right petal */}
    <path
      d="M50 55 C60 40, 72 38, 75 25 C65 30, 56 38, 50 55Z"
      fill={color}
      opacity="0.85"
    />
    {/* Mid-left petal */}
    <path
      d="M50 58 C36 48, 18 48, 12 35 C24 38, 38 45, 50 58Z"
      fill={color}
      opacity="0.75"
    />
    {/* Mid-right petal */}
    <path
      d="M50 58 C64 48, 82 48, 88 35 C76 38, 62 45, 50 58Z"
      fill={color}
      opacity="0.75"
    />
    {/* Outer left petal */}
    <path
      d="M50 62 C34 55, 14 58, 5 48 C18 48, 36 52, 50 62Z"
      fill={color}
      opacity="0.65"
    />
    {/* Outer right petal */}
    <path
      d="M50 62 C66 55, 86 58, 95 48 C82 48, 64 52, 50 62Z"
      fill={color}
      opacity="0.65"
    />
    {/* Base / Calyx */}
    <path
      d="M42 62 C44 68, 46 72, 50 75 C54 72, 56 68, 58 62 C55 64, 50 65, 45 64Z"
      fill={color}
      opacity="0.9"
    />
    {/* Inner detail lines */}
    <path
      d="M50 22 C51 32, 53 42, 50 52"
      stroke={color}
      strokeWidth="0.5"
      opacity="0.5"
    />
    <path
      d="M35 30 C40 38, 45 45, 50 52"
      stroke={color}
      strokeWidth="0.4"
      opacity="0.4"
    />
    <path
      d="M65 30 C60 38, 55 45, 50 52"
      stroke={color}
      strokeWidth="0.4"
      opacity="0.4"
    />
    {/* Small water drops / dots */}
    <circle cx="50" cy="70" r="1.2" fill={color} opacity="0.8" />
    <circle cx="46" cy="68" r="0.8" fill={color} opacity="0.6" />
    <circle cx="54" cy="68" r="0.8" fill={color} opacity="0.6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  2. DharmaChakra                                                    */
/* ------------------------------------------------------------------ */
interface DharmaChakraProps {
  size?: number;
  className?: string;
  color?: string;
  spinning?: boolean;
}

export const DharmaChakra: React.FC<DharmaChakraProps> = ({
  size = 64,
  className = '',
  color = '#d4a547',
  spinning = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${spinning ? 'chakra-spin' : ''} ${className}`}
  >
    {/* Outer rim */}
    <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="2.5" />
    <circle cx="50" cy="50" r="41" stroke={color} strokeWidth="0.5" opacity="0.5" />
    {/* Inner hub */}
    <circle cx="50" cy="50" r="10" stroke={color} strokeWidth="2" />
    <circle cx="50" cy="50" r="4" fill={color} opacity="0.8" />
    {/* 8 Spokes */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 50 + 10 * Math.cos(rad);
      const y1 = 50 + 10 * Math.sin(rad);
      const x2 = 50 + 41 * Math.cos(rad);
      const y2 = 50 + 41 * Math.sin(rad);
      return (
        <line
          key={angle}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth="1.5"
        />
      );
    })}
    {/* Spoke-end decorations (small circles at rim) */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const cx = 50 + 42.5 * Math.cos(rad);
      const cy = 50 + 42.5 * Math.sin(rad);
      return <circle key={`dot-${angle}`} cx={cx} cy={cy} r="2" fill={color} />;
    })}
    {/* Crescent-shaped details between spokes */}
    {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const cx = 50 + 26 * Math.cos(rad);
      const cy = 50 + 26 * Math.sin(rad);
      return (
        <circle
          key={`mid-${angle}`}
          cx={cx}
          cy={cy}
          r="1"
          fill={color}
          opacity="0.6"
        />
      );
    })}
  </svg>
);

/* ------------------------------------------------------------------ */
/*  3. BodhiLeaf                                                       */
/* ------------------------------------------------------------------ */
interface BodhiLeafProps {
  size?: number;
  className?: string;
  color?: string;
}

export const BodhiLeaf: React.FC<BodhiLeafProps> = ({
  size = 64,
  className = '',
  color = '#d4a547',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Main leaf body – heart shaped */}
    <path
      d="M50 10
         C50 10, 15 35, 15 60
         C15 82, 32 98, 50 108
         C68 98, 85 82, 85 60
         C85 35, 50 10, 50 10Z"
      fill={color}
      opacity="0.2"
      stroke={color}
      strokeWidth="1.5"
    />
    {/* Central vein */}
    <path d="M50 15 L50 108" stroke={color} strokeWidth="1.2" opacity="0.8" />
    {/* Extended drip tip */}
    <path
      d="M50 108 C50 108, 49 115, 50 120"
      stroke={color}
      strokeWidth="1"
      opacity="0.7"
    />
    {/* Left veins */}
    <path d="M50 30 C42 38, 28 42, 22 46" stroke={color} strokeWidth="0.7" opacity="0.6" />
    <path d="M50 45 C42 52, 28 56, 20 58" stroke={color} strokeWidth="0.7" opacity="0.6" />
    <path d="M50 60 C42 66, 28 70, 22 72" stroke={color} strokeWidth="0.7" opacity="0.6" />
    <path d="M50 75 C44 80, 34 84, 28 86" stroke={color} strokeWidth="0.7" opacity="0.6" />
    <path d="M50 88 C46 92, 40 95, 36 96" stroke={color} strokeWidth="0.7" opacity="0.5" />
    {/* Right veins */}
    <path d="M50 30 C58 38, 72 42, 78 46" stroke={color} strokeWidth="0.7" opacity="0.6" />
    <path d="M50 45 C58 52, 72 56, 80 58" stroke={color} strokeWidth="0.7" opacity="0.6" />
    <path d="M50 60 C58 66, 72 70, 78 72" stroke={color} strokeWidth="0.7" opacity="0.6" />
    <path d="M50 75 C56 80, 66 84, 72 86" stroke={color} strokeWidth="0.7" opacity="0.6" />
    <path d="M50 88 C54 92, 60 95, 64 96" stroke={color} strokeWidth="0.7" opacity="0.5" />
    {/* Secondary veinlets (left) */}
    <path d="M38 40 C36 44, 30 48, 26 50" stroke={color} strokeWidth="0.35" opacity="0.35" />
    <path d="M38 55 C34 60, 28 63, 24 65" stroke={color} strokeWidth="0.35" opacity="0.35" />
    <path d="M40 70 C36 74, 30 77, 27 79" stroke={color} strokeWidth="0.35" opacity="0.35" />
    {/* Secondary veinlets (right) */}
    <path d="M62 40 C64 44, 70 48, 74 50" stroke={color} strokeWidth="0.35" opacity="0.35" />
    <path d="M62 55 C66 60, 72 63, 76 65" stroke={color} strokeWidth="0.35" opacity="0.35" />
    <path d="M60 70 C64 74, 70 77, 73 79" stroke={color} strokeWidth="0.35" opacity="0.35" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  4. OrnamentalDivider                                               */
/* ------------------------------------------------------------------ */
interface OrnamentalDividerProps {
  className?: string;
  width?: number;
}

export const OrnamentalDivider: React.FC<OrnamentalDividerProps> = ({
  className = '',
  width = 400,
}) => (
  <svg
    width={width}
    height={40}
    viewBox="0 0 400 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Left line */}
    <line x1="20" y1="20" x2="155" y2="20" stroke="#d4a547" strokeWidth="1" />
    {/* Left curve flourish */}
    <path
      d="M155 20 C160 12, 168 10, 175 14"
      stroke="#d4a547"
      strokeWidth="1"
      fill="none"
    />
    <path
      d="M155 20 C160 28, 168 30, 175 26"
      stroke="#d4a547"
      strokeWidth="1"
      fill="none"
    />
    {/* Left diamond */}
    <polygon points="130,20 135,16 140,20 135,24" fill="#d4a547" opacity="0.7" />
    <polygon points="60,20 63,18 66,20 63,22" fill="#d4a547" opacity="0.5" />
    {/* Central lotus motif */}
    <path d="M200 8 C202 14, 205 17, 200 22 C195 17, 198 14, 200 8Z" fill="#d4a547" opacity="0.9" />
    <path d="M200 22 C194 16, 187 15, 185 10 C190 13, 196 16, 200 22Z" fill="#d4a547" opacity="0.75" />
    <path d="M200 22 C206 16, 213 15, 215 10 C210 13, 204 16, 200 22Z" fill="#d4a547" opacity="0.75" />
    <path d="M200 24 C192 20, 182 20, 178 15 C186 17, 194 19, 200 24Z" fill="#d4a547" opacity="0.6" />
    <path d="M200 24 C208 20, 218 20, 222 15 C214 17, 206 19, 200 24Z" fill="#d4a547" opacity="0.6" />
    <circle cx="200" cy="27" r="1.5" fill="#d4a547" opacity="0.8" />
    {/* Right curve flourish */}
    <path
      d="M245 20 C240 12, 232 10, 225 14"
      stroke="#d4a547"
      strokeWidth="1"
      fill="none"
    />
    <path
      d="M245 20 C240 28, 232 30, 225 26"
      stroke="#d4a547"
      strokeWidth="1"
      fill="none"
    />
    {/* Right line */}
    <line x1="245" y1="20" x2="380" y2="20" stroke="#d4a547" strokeWidth="1" />
    {/* Right diamonds */}
    <polygon points="260,20 265,16 270,20 265,24" fill="#d4a547" opacity="0.7" />
    <polygon points="334,20 337,18 340,20 337,22" fill="#d4a547" opacity="0.5" />
    {/* End caps */}
    <circle cx="20" cy="20" r="2" fill="#d4a547" opacity="0.6" />
    <circle cx="380" cy="20" r="2" fill="#d4a547" opacity="0.6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  5. GoldFiligree                                                    */
/* ------------------------------------------------------------------ */
interface GoldFiligreeProps {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const GoldFiligree: React.FC<GoldFiligreeProps> = ({
  className = '',
  position = 'top-left',
}) => {
  const transforms: Record<string, string> = {
    'top-left': 'scale(1,1)',
    'top-right': 'scale(-1,1)',
    'bottom-left': 'scale(1,-1)',
    'bottom-right': 'scale(-1,-1)',
  };

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: transforms[position] }}
    >
      {/* Main corner scroll */}
      <path
        d="M5 5 C5 5, 5 50, 15 70 C20 80, 30 88, 45 92
           C55 95, 70 95, 80 90"
        stroke="#d4a547"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner parallel scroll */}
      <path
        d="M10 5 C10 5, 10 42, 20 60 C25 70, 34 76, 45 80
           C52 82, 62 82, 70 78"
        stroke="#d4a547"
        strokeWidth="1"
        opacity="0.7"
        fill="none"
      />
      {/* Spiral curl at end */}
      <path
        d="M80 90 C85 87, 88 82, 86 77 C84 72, 78 72, 76 76
           C74 80, 77 84, 82 83"
        stroke="#d4a547"
        strokeWidth="1"
        fill="none"
      />
      {/* Secondary branch */}
      <path
        d="M15 45 C22 42, 30 42, 38 45 C42 47, 44 52, 42 56
           C40 60, 35 60, 34 57"
        stroke="#d4a547"
        strokeWidth="0.8"
        fill="none"
        opacity="0.7"
      />
      {/* Small leaf details */}
      <path
        d="M28 55 C30 50, 35 48, 38 50 C35 53, 30 54, 28 55Z"
        fill="#d4a547"
        opacity="0.4"
      />
      <path
        d="M55 85 C58 80, 63 78, 66 80 C63 83, 58 84, 55 85Z"
        fill="#d4a547"
        opacity="0.4"
      />
      <path
        d="M40 72 C43 68, 48 67, 50 69 C48 72, 43 73, 40 72Z"
        fill="#d4a547"
        opacity="0.35"
      />
      {/* Tiny accent dots */}
      <circle cx="20" cy="30" r="1.2" fill="#d4a547" opacity="0.5" />
      <circle cx="30" cy="60" r="1" fill="#d4a547" opacity="0.5" />
      <circle cx="50" cy="78" r="1" fill="#d4a547" opacity="0.5" />
      <circle cx="65" cy="88" r="1.2" fill="#d4a547" opacity="0.4" />
      {/* Corner accent line */}
      <path d="M5 5 L25 5" stroke="#d4a547" strokeWidth="1" opacity="0.6" />
      <path d="M5 5 L5 25" stroke="#d4a547" strokeWidth="1" opacity="0.6" />
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/*  6. FloralFrame                                                     */
/* ------------------------------------------------------------------ */
interface FloralFrameProps {
  className?: string;
  children?: React.ReactNode;
}

export const FloralFrame: React.FC<FloralFrameProps> = ({
  className = '',
  children,
}) => (
  <div className={`relative ${className}`}>
    {/* Corner filigrees */}
    <div className="absolute -top-2 -left-2 pointer-events-none">
      <GoldFiligree position="top-left" />
    </div>
    <div className="absolute -top-2 -right-2 pointer-events-none">
      <GoldFiligree position="top-right" />
    </div>
    <div className="absolute -bottom-2 -left-2 pointer-events-none">
      <GoldFiligree position="bottom-left" />
    </div>
    <div className="absolute -bottom-2 -right-2 pointer-events-none">
      <GoldFiligree position="bottom-right" />
    </div>

    {/* Border lines */}
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer border */}
      <rect
        x="8"
        y="8"
        width="calc(100% - 16px)"
        height="calc(100% - 16px)"
        rx="2"
        stroke="#d4a547"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
        style={{ width: 'calc(100% - 16px)', height: 'calc(100% - 16px)' }}
      />
      {/* Inner border */}
      <rect
        x="14"
        y="14"
        rx="2"
        stroke="#d4a547"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
        style={{ width: 'calc(100% - 28px)', height: 'calc(100% - 28px)' }}
      />
      {/* Top center lotus bud */}
      <g transform="translate(50%, 4)" style={{ transform: 'translate(50%, 0)' }}>
        <path d="M0 8 C1 4, 3 2, 0 0 C-3 2, -1 4, 0 8Z" fill="#d4a547" opacity="0.6" />
        <path d="M0 8 C-3 4, -6 4, -7 2 C-4 3, -2 5, 0 8Z" fill="#d4a547" opacity="0.5" />
        <path d="M0 8 C3 4, 6 4, 7 2 C4 3, 2 5, 0 8Z" fill="#d4a547" opacity="0.5" />
      </g>
      {/* Side vine accents – left */}
      <path
        d="M8 30% C4 32%, 4 36%, 8 38%"
        stroke="#d4a547"
        strokeWidth="0.8"
        fill="none"
        opacity="0.3"
      />
      {/* Side vine accents – right */}
      <path
        d="M100% 30% C104% 32%, 104% 36%, 100% 38%"
        stroke="#d4a547"
        strokeWidth="0.8"
        fill="none"
        opacity="0.3"
      />
    </svg>

    {/* Content */}
    <div className="relative z-10 p-10 md:p-14">{children}</div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  7. MonogramStamp                                                   */
/* ------------------------------------------------------------------ */
interface MonogramStampProps {
  size?: number;
  className?: string;
}

export const MonogramStamp: React.FC<MonogramStampProps> = ({
  size = 120,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer ornamental border */}
    <circle cx="60" cy="60" r="56" stroke="#d4a547" strokeWidth="2" />
    <circle cx="60" cy="60" r="52" stroke="#d4a547" strokeWidth="0.5" opacity="0.5" />
    {/* Dotted ring */}
    <circle
      cx="60"
      cy="60"
      r="49"
      stroke="#d4a547"
      strokeWidth="0.8"
      strokeDasharray="2 4"
      opacity="0.6"
    />
    {/* Inner circle */}
    <circle cx="60" cy="60" r="44" stroke="#d4a547" strokeWidth="1.5" />
    {/* Small lotus details at cardinal points */}
    {/* Top lotus */}
    <path d="M60 4 C61 8, 63 10, 60 14 C57 10, 59 8, 60 4Z" fill="#d4a547" opacity="0.7" />
    <path d="M60 14 C57 10, 54 9, 53 6 C56 8, 58 10, 60 14Z" fill="#d4a547" opacity="0.5" />
    <path d="M60 14 C63 10, 66 9, 67 6 C64 8, 62 10, 60 14Z" fill="#d4a547" opacity="0.5" />
    {/* Bottom lotus */}
    <path d="M60 116 C61 112, 63 110, 60 106 C57 110, 59 112, 60 116Z" fill="#d4a547" opacity="0.7" />
    <path d="M60 106 C57 110, 54 111, 53 114 C56 112, 58 110, 60 106Z" fill="#d4a547" opacity="0.5" />
    <path d="M60 106 C63 110, 66 111, 67 114 C64 112, 62 110, 60 106Z" fill="#d4a547" opacity="0.5" />
    {/* Left lotus */}
    <path d="M4 60 C8 61, 10 63, 14 60 C10 57, 8 59, 4 60Z" fill="#d4a547" opacity="0.7" />
    {/* Right lotus */}
    <path d="M116 60 C112 61, 110 63, 106 60 C110 57, 112 59, 116 60Z" fill="#d4a547" opacity="0.7" />
    {/* Monogram letters */}
    <text
      x="34"
      y="72"
      fontFamily="'Playfair Display', serif"
      fontSize="32"
      fill="#d4a547"
      fontWeight="600"
    >
      S
    </text>
    <text
      x="50"
      y="68"
      fontFamily="'Playfair Display', serif"
      fontSize="16"
      fill="#d4a547"
      opacity="0.8"
      fontStyle="italic"
    >
      &amp;
    </text>
    <text
      x="66"
      y="72"
      fontFamily="'Playfair Display', serif"
      fontSize="32"
      fill="#d4a547"
      fontWeight="600"
    >
      P
    </text>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  8. WaxSeal                                                         */
/* ------------------------------------------------------------------ */
interface WaxSealProps {
  size?: number;
  className?: string;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  size = 120,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      {/* Wax radial gradient */}
      <radialGradient id="waxGrad" cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#c0392b" />
        <stop offset="40%" stopColor="#922b21" />
        <stop offset="75%" stopColor="#6e2119" />
        <stop offset="100%" stopColor="#4a1710" />
      </radialGradient>
      {/* Highlight */}
      <radialGradient id="waxHighlight" cx="35%" cy="30%" r="30%">
        <stop offset="0%" stopColor="#e74c3c" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#c0392b" stopOpacity="0" />
      </radialGradient>
      {/* Emboss shadow */}
      <radialGradient id="embossGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#4a1710" stopOpacity="0.3" />
        <stop offset="70%" stopColor="#4a1710" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#4a1710" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Wax blob – irregular circle */}
    <path
      d="M60 6
         C72 4, 85 10, 94 18
         C103 26, 110 38, 112 52
         C114 66, 110 80, 100 90
         C92 98, 78 108, 64 110
         C50 112, 36 106, 24 96
         C14 86, 6 74, 6 60
         C6 46, 10 32, 20 22
         C30 12, 46 8, 60 6Z"
      fill="url(#waxGrad)"
    />
    {/* Highlight sheen */}
    <path
      d="M60 6
         C72 4, 85 10, 94 18
         C103 26, 110 38, 112 52
         C114 66, 110 80, 100 90
         C92 98, 78 108, 64 110
         C50 112, 36 106, 24 96
         C14 86, 6 74, 6 60
         C6 46, 10 32, 20 22
         C30 12, 46 8, 60 6Z"
      fill="url(#waxHighlight)"
    />
    {/* Embossed circle border */}
    <circle cx="60" cy="58" r="34" stroke="#4a1710" strokeWidth="2" opacity="0.4" />
    <circle cx="60" cy="58" r="30" stroke="#4a1710" strokeWidth="1" opacity="0.3" />
    {/* Dotted ring */}
    <circle
      cx="60"
      cy="58"
      r="32"
      stroke="#4a1710"
      strokeWidth="0.8"
      strokeDasharray="1.5 3"
      opacity="0.3"
    />
    {/* Embossed S & P */}
    <text
      x="37"
      y="68"
      fontFamily="'Playfair Display', serif"
      fontSize="24"
      fill="#4a1710"
      fillOpacity="0.5"
      fontWeight="700"
    >
      S
    </text>
    <text
      x="51"
      y="64"
      fontFamily="'Playfair Display', serif"
      fontSize="12"
      fill="#4a1710"
      fillOpacity="0.4"
      fontStyle="italic"
    >
      &amp;
    </text>
    <text
      x="64"
      y="68"
      fontFamily="'Playfair Display', serif"
      fontSize="24"
      fill="#4a1710"
      fillOpacity="0.5"
      fontWeight="700"
    >
      P
    </text>
    {/* Light embossed letters (raised effect) – offset slightly */}
    <text
      x="36.5"
      y="67.5"
      fontFamily="'Playfair Display', serif"
      fontSize="24"
      fill="#c0392b"
      fillOpacity="0.3"
      fontWeight="700"
    >
      S
    </text>
    <text
      x="50.5"
      y="63.5"
      fontFamily="'Playfair Display', serif"
      fontSize="12"
      fill="#c0392b"
      fillOpacity="0.25"
      fontStyle="italic"
    >
      &amp;
    </text>
    <text
      x="63.5"
      y="67.5"
      fontFamily="'Playfair Display', serif"
      fontSize="24"
      fill="#c0392b"
      fillOpacity="0.3"
      fontWeight="700"
    >
      P
    </text>
    {/* Edge texture – subtle bumps */}
    <circle cx="25" cy="40" r="1" fill="#922b21" opacity="0.3" />
    <circle cx="90" cy="45" r="1.2" fill="#922b21" opacity="0.25" />
    <circle cx="35" cy="90" r="0.8" fill="#922b21" opacity="0.2" />
    <circle cx="80" cy="85" r="1" fill="#922b21" opacity="0.2" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  9. GoldBorderLine                                                  */
/* ------------------------------------------------------------------ */
interface GoldBorderLineProps {
  className?: string;
}

export const GoldBorderLine: React.FC<GoldBorderLineProps> = ({
  className = '',
}) => (
  <svg
    width="100%"
    height="4"
    viewBox="0 0 800 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d4a547" stopOpacity="0" />
        <stop offset="15%" stopColor="#d4a547" stopOpacity="0.6" />
        <stop offset="35%" stopColor="#e5c97b" stopOpacity="1" />
        <stop offset="50%" stopColor="#d4a547" stopOpacity="1" />
        <stop offset="65%" stopColor="#e5c97b" stopOpacity="1" />
        <stop offset="85%" stopColor="#d4a547" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#d4a547" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="0" y="1" width="800" height="2" fill="url(#goldLineGrad)" rx="1" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  10. ScrollDownArrow                                                */
/* ------------------------------------------------------------------ */
interface ScrollDownArrowProps {
  className?: string;
  onClick?: () => void;
}

export const ScrollDownArrow: React.FC<ScrollDownArrowProps> = ({
  className = '',
  onClick,
}) => (
  <motion.div
    className={`cursor-pointer ${className}`}
    onClick={onClick}
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg
      width="32"
      height="42"
      viewBox="0 0 32 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Thin chevron arrows */}
      <path
        d="M6 8 L16 18 L26 8"
        stroke="#d4a547"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M6 18 L16 28 L26 18"
        stroke="#d4a547"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M10 28 L16 34 L22 28"
        stroke="#d4a547"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.3"
      />
    </svg>
  </motion.div>
);
