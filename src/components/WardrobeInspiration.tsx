import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LotusFlower, OrnamentalDivider, BodhiLeaf } from './Decorations';

interface ColorSwatch {
  name: string;
  hex: string;
  border?: string;
  textColor?: string;
  description: string;
}

const colorPalette: ColorSwatch[] = [
  { name: 'Navy Blue', hex: '#0f1b3d', border: '#d4a547', textColor: '#faf3e5', description: 'Deep & Regal' },
  { name: 'Champagne Gold', hex: '#d4a547', border: '#f7e7ce', textColor: '#0a1128', description: 'Luminous & Warm' },
  { name: 'Warm Ivory', hex: '#faf3e5', border: '#d4a547', textColor: '#0a1128', description: 'Classic & Pure' },
  { name: 'Dusty Rose', hex: '#c48b8b', border: '#e8c4c4', textColor: '#ffffff', description: 'Soft & Romantic' },
  { name: 'Sage Green', hex: '#7a9a7a', border: '#b5ccb5', textColor: '#ffffff', description: 'Calm & Earthy' },
  { name: 'Burgundy', hex: '#6b1d2e', border: '#d4a547', textColor: '#faf3e5', description: 'Rich & Festive' },
  { name: 'Soft Lavender', hex: '#9b8ec4', border: '#d8d0ee', textColor: '#ffffff', description: 'Graceful & Gentle' },
  { name: 'Pewter Slate', hex: '#5c6b7d', border: '#a8b5c4', textColor: '#ffffff', description: 'Modern & Subtle' },
];

const WardrobeInspiration: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const swatchVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
  };

  return (
    <section
      ref={ref}
      id="wardrobe"
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-navy-gradient text-ivory overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <BodhiLeaf size={600} color="#d4a547" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-4">
            <LotusFlower size={36} color="#d4a547" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="font-sans-elegant text-xs sm:text-sm tracking-[0.3em] uppercase text-gold mb-3"
          >
            A Little Style Inspiration
          </motion.p>

          <motion.div variants={itemVariants} className="mb-4">
            <OrnamentalDivider className="text-gold" width={220} />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-display text-3xl sm:text-5xl text-ivory mb-6 font-normal tracking-wide"
          >
            What To Wear
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="font-serif text-lg sm:text-xl text-ivory/70 max-w-xl mx-auto italic leading-relaxed"
          >
            We would love for our guests to complement the celebration's aesthetic.
            Here is a curated palette of complementary shades to inspire your ensemble.
          </motion.p>
        </motion.div>

        {/* Color Palette Swatches */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-20 max-w-4xl mx-auto"
        >
          {colorPalette.map((swatch, idx) => (
            <motion.div
              key={idx}
              variants={swatchVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="flex flex-col items-center group cursor-default"
            >
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-lg relative flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(212,165,71,0.35)]"
                style={{
                  backgroundColor: swatch.hex,
                  border: `2px solid ${swatch.border || '#d4a547'}`,
                }}
              >
                <div className="absolute inset-1 rounded-full border border-white/20 pointer-events-none" />
              </div>
              <span className="font-display text-base text-ivory mt-3 tracking-wide text-center">
                {swatch.name}
              </span>
              <span className="font-sans-elegant text-[11px] text-gold/70 tracking-wider uppercase text-center mt-0.5">
                {swatch.description}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Style Guidelines (His & Hers) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto"
        >
          {/* For Him */}
          <motion.div
            variants={itemVariants}
            className="relative bg-navy-800/60 backdrop-blur-sm p-8 sm:p-10 rounded-xl border border-gold/25 shadow-xl"
          >
            <div className="absolute top-4 right-4 opacity-20">
              <BodhiLeaf size={40} color="#d4a547" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              {/* Suit icon */}
              <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-gold/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a547" strokeWidth="1.5">
                  <path d="M6 3h12v4l-3 4 3 10H6l3-10-3-4V3z" />
                  <path d="M9 3v5l3 3 3-3V3" />
                  <circle cx="12" cy="15" r="0.8" fill="#d4a547" />
                  <circle cx="12" cy="18" r="0.8" fill="#d4a547" />
                </svg>
              </div>
              <div>
                <p className="font-sans-elegant text-xs text-gold tracking-[0.25em] uppercase">For The Gentlemen</p>
                <h3 className="font-display text-xl text-ivory">Classic & Formal</h3>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-gold/40 via-gold/10 to-transparent mb-5" />

            <ul className="space-y-3 font-serif text-ivory/80 text-base leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-gold mt-1">✦</span>
                <span>Tailored suits or blazers in deep navy, charcoal, or elegant neutrals</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-gold mt-1">✦</span>
                <span>Bandhgala, Jodhpuri, or formal sherwani in rich subtle textures</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-gold mt-1">✦</span>
                <span>Accessories with understated champagne gold, brass, or ivory accents</span>
              </li>
            </ul>
          </motion.div>

          {/* For Her */}
          <motion.div
            variants={itemVariants}
            className="relative bg-navy-800/60 backdrop-blur-sm p-8 sm:p-10 rounded-xl border border-gold/25 shadow-xl"
          >
            <div className="absolute top-4 right-4 opacity-20">
              <LotusFlower size={40} color="#d4a547" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              {/* Dress icon */}
              <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-gold/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a547" strokeWidth="1.5">
                  <path d="M9 3h6l2 5-3 3 4 10H6l4-10-3-3 2-5z" />
                  <path d="M12 3v8" />
                  <path d="M9 8h6" />
                </svg>
              </div>
              <div>
                <p className="font-sans-elegant text-xs text-gold tracking-[0.25em] uppercase">For The Ladies</p>
                <h3 className="font-display text-xl text-ivory">Graceful & Elegant</h3>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-gold/40 via-gold/10 to-transparent mb-5" />

            <ul className="space-y-3 font-serif text-ivory/80 text-base leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-gold mt-1">✦</span>
                <span>Silk or georgette sarees, lehengas, or anarkalis in the celebration palette</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-gold mt-1">✦</span>
                <span>Navy, warm ivory, champagne, dusty rose, or soft pastel gowns</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-gold mt-1">✦</span>
                <span>Delicate gold, pearl, or antique jewelry that harmonizes naturally</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Gentle Note */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/20 bg-navy-900/40">
            <span className="text-gold text-xs">✦</span>
            <p className="font-serif text-sm sm:text-base text-ivory/60 italic">
              This is simply a gentle guide — please wear whatever makes you feel joyful and comfortable!
            </p>
            <span className="text-gold text-xs">✦</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WardrobeInspiration;
