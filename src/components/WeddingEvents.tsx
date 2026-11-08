import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getTimeRemaining } from '../utils/weddingData';

/* ─── Types ─────────────────────────────────────────────────────── */

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

interface WeddingEvent {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  time?: string;
  venue?: string;
  venueSubline?: string;
  mapsUrl?: string;
  isPlaceholder?: boolean;
}

/* ─── Data ──────────────────────────────────────────────────────── */

const events: WeddingEvent[] = [
  {
    id: 'wedding-ceremony',
    title: 'WEDDING CEREMONY',
    date: 'Monday, 21 December 2026',
    time: '11:00 AM',
    venue: 'Ashirwad Celebration',
    venueSubline: 'Wardha, Maharashtra',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Ashirwad+Celebration+Wardha+Maharashtra+India',
  },
  {
    id: 'placeholder-1',
    title: 'MORE EVENTS',
    subtitle: 'COMING SOON',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-2',
    title: 'MORE EVENTS',
    subtitle: 'COMING SOON',
    isPlaceholder: true,
  },
];

/* ─── SVG Decorations ───────────────────────────────────────────── */

const DharmaChakra = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="32" cy="32" r="2.5" fill="currentColor" />
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const x1 = 32 + 8 * Math.cos(angle);
      const y1 = 32 + 8 * Math.sin(angle);
      const x2 = 32 + 28 * Math.cos(angle);
      const y2 = 32 + 28 * Math.sin(angle);
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="1.2"
        />
      );
    })}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const cx = 32 + 18 * Math.cos(angle);
      const cy = 32 + 18 * Math.sin(angle);
      return (
        <circle key={`dot-${i}`} cx={cx} cy={cy} r="1.8" fill="currentColor" />
      );
    })}
  </svg>
);

const LotusDecoration = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 120 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Center petal */}
    <path
      d="M60 8 C54 20, 48 32, 60 44 C72 32, 66 20, 60 8Z"
      fill="currentColor"
      opacity="0.3"
    />
    {/* Left petals */}
    <path
      d="M60 18 C50 14, 36 18, 32 34 C40 30, 52 28, 60 32Z"
      fill="currentColor"
      opacity="0.25"
    />
    <path
      d="M60 22 C46 12, 28 16, 20 36 C30 30, 46 28, 60 34Z"
      fill="currentColor"
      opacity="0.15"
    />
    {/* Right petals */}
    <path
      d="M60 18 C70 14, 84 18, 88 34 C80 30, 68 28, 60 32Z"
      fill="currentColor"
      opacity="0.25"
    />
    <path
      d="M60 22 C74 12, 92 16, 100 36 C90 30, 74 28, 60 34Z"
      fill="currentColor"
      opacity="0.15"
    />
    {/* Stem accent */}
    <path
      d="M56 44 Q60 48 64 44"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.4"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-4 h-4 flex-shrink-0"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-4 h-4 flex-shrink-0"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-4 h-4 flex-shrink-0"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-5 h-5"
  >
    {direction === 'left' ? (
      <polyline points="15 18 9 12 15 6" />
    ) : (
      <polyline points="9 6 15 12 9 18" />
    )}
  </svg>
);

const OrnamentDivider = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 200 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line
      x1="10"
      y1="10"
      x2="85"
      y2="10"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.6"
    />
    <circle cx="100" cy="10" r="3" fill="currentColor" opacity="0.5" />
    <circle cx="100" cy="10" r="1.2" fill="currentColor" />
    <line
      x1="115"
      y1="10"
      x2="190"
      y2="10"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.6"
    />
    <circle cx="90" cy="10" r="1" fill="currentColor" opacity="0.35" />
    <circle cx="110" cy="10" r="1" fill="currentColor" opacity="0.35" />
  </svg>
);

const CardDivider = () => (
  <svg
    viewBox="0 0 160 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-32 h-2 text-gold-400 mx-auto"
  >
    <line
      x1="10"
      y1="5"
      x2="65"
      y2="5"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.5"
    />
    <path
      d="M76 5 L80 2 L84 5 L80 8Z"
      fill="currentColor"
      opacity="0.6"
    />
    <line
      x1="95"
      y1="5"
      x2="150"
      y2="5"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.5"
    />
  </svg>
);

/* ─── Flip Counter Digit ────────────────────────────────────────── */

const FlipDigit = ({ value, label }: { value: number; label: string }) => {
  const displayValue = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-[#d4a547]/40 bg-[#0f1b3d] overflow-hidden flex items-center justify-center">
        {/* Subtle shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={displayValue}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="font-display text-3xl sm:text-4xl text-[#d4a547] tabular-nums relative z-10"
          >
            {displayValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-sans-elegant text-[10px] sm:text-xs tracking-[0.15em] uppercase text-[#1e3366]/70">
        {label}
      </span>
    </div>
  );
};

/* ─── Event Card ────────────────────────────────────────────────── */

const EventCard = ({
  event,
  index,
}: {
  event: WeddingEvent;
  index: number;
}) => {
  const isPlaceholder = event.isPlaceholder;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 60, scale: 0.95 },
        visible: {
          opacity: 1,
          x: 0,
          scale: 1,
          transition: {
            duration: 0.7,
            delay: index * 0.15,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={`flex-shrink-0 w-[300px] sm:w-[340px] lg:w-[380px] snap-center ${
        isPlaceholder ? 'opacity-40' : ''
      }`}
    >
      <div
        className={`relative h-[440px] sm:h-[460px] rounded-2xl border overflow-hidden flex flex-col items-center justify-between py-8 px-6 ${
          isPlaceholder
            ? 'border-[#d4a547]/20 bg-[#0f1b3d]/70'
            : 'border-[#d4a547]/50 bg-[#0f1b3d]'
        }`}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/20 pointer-events-none" />

        {/* Top: Dharma Chakra */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <DharmaChakra
            className={`w-10 h-10 ${
              isPlaceholder ? 'text-[#d4a547]/30' : 'text-[#d4a547]/70'
            }`}
          />

          <h3
            className={`font-display text-2xl text-center tracking-wide ${
              isPlaceholder ? 'text-[#d4a547]/50' : 'text-[#d4a547]'
            }`}
          >
            {event.title}
          </h3>

          <CardDivider />
        </div>

        {/* Middle: Details */}
        <div className="relative z-10 flex flex-col items-center gap-3 flex-1 justify-center">
          {isPlaceholder ? (
            <p className="font-serif text-lg text-[#faf3e5]/40 tracking-wider">
              {event.subtitle}
            </p>
          ) : (
            <>
              {event.date && (
                <div className="flex items-center gap-2.5 text-[#faf3e5]/90">
                  <CalendarIcon />
                  <span className="font-serif text-lg">{event.date}</span>
                </div>
              )}
              {event.time && (
                <div className="flex items-center gap-2.5 text-[#faf3e5]/90">
                  <ClockIcon />
                  <span className="font-serif text-lg">{event.time}</span>
                </div>
              )}
              {event.venue && (
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex items-center gap-2.5 text-[#faf3e5]/90">
                    <MapPinIcon />
                    <span className="font-serif text-lg">{event.venue}</span>
                  </div>
                  {event.venueSubline && (
                    <span className="font-serif text-sm text-[#faf3e5]/50 ml-6">
                      {event.venueSubline}
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom: Lotus + Button */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <LotusDecoration
            className={`w-24 h-10 ${
              isPlaceholder ? 'text-[#d4a547]/20' : 'text-[#d4a547]/60'
            }`}
          />

          {!isPlaceholder && event.mapsUrl && (
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#d4a547]/50 hover:border-[#d4a547] hover:bg-[#d4a547]/10 transition-all duration-300"
            >
              <span className="font-sans-elegant text-xs tracking-[0.2em] text-[#d4a547]/90 group-hover:text-[#d4a547]">
                VIEW ON MAP
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Carousel ──────────────────────────────────────────────────── */

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  const totalSlides = events.length;

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, totalSlides - 1));
      setCurrentIndex(clamped);
      if (containerRef.current) {
        const card = containerRef.current.children[clamped] as HTMLElement;
        if (card) {
          const containerWidth = containerRef.current.offsetWidth;
          const cardLeft = card.offsetLeft;
          const cardWidth = card.offsetWidth;
          const scrollTarget =
            cardLeft - containerWidth / 2 + cardWidth / 2;
          containerRef.current.scrollTo({
            left: scrollTarget,
            behavior: 'smooth',
          });
        }
      }
    },
    [totalSlides]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const threshold = 50;
      const velocity = info.velocity.x;
      const offset = info.offset.x;

      if (offset < -threshold || velocity < -200) {
        goNext();
      } else if (offset > threshold || velocity > 200) {
        goPrev();
      }
    },
    [goNext, goPrev]
  );

  // Handle scroll-based index tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      let closestIdx = 0;
      let closestDist = Infinity;

      Array.from(container.children).forEach((child, idx) => {
        const el = child as HTMLElement;
        const cardCenter = el.offsetLeft + el.offsetWidth / 2;
        const viewCenter = scrollLeft + containerWidth / 2;
        const dist = Math.abs(cardCenter - viewCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });

      setCurrentIndex(closestIdx);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      {/* Carousel track */}
      <motion.div
        ref={containerRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-hide px-[calc(50%-150px)] sm:px-[calc(50%-170px)] lg:px-[calc(50%-190px)] py-4 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        dragMomentum={false}
      >
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </motion.div>

      {/* Desktop Arrow Buttons */}
      <button
        onClick={goPrev}
        disabled={currentIndex === 0}
        aria-label="Previous event"
        className={`hidden lg:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border items-center justify-center transition-all duration-300 ${
          currentIndex === 0
            ? 'border-[#d4a547]/20 text-[#d4a547]/20 cursor-default'
            : 'border-[#d4a547]/50 text-[#d4a547] hover:border-[#d4a547] hover:bg-[#d4a547]/10 cursor-pointer'
        }`}
      >
        <ArrowIcon direction="left" />
      </button>

      <button
        onClick={goNext}
        disabled={currentIndex === totalSlides - 1}
        aria-label="Next event"
        className={`hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border items-center justify-center transition-all duration-300 ${
          currentIndex === totalSlides - 1
            ? 'border-[#d4a547]/20 text-[#d4a547]/20 cursor-default'
            : 'border-[#d4a547]/50 text-[#d4a547] hover:border-[#d4a547] hover:bg-[#d4a547]/10 cursor-pointer'
        }`}
      >
        <ArrowIcon direction="right" />
      </button>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-2.5 mt-6">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to event ${index + 1}`}
            className={`rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'w-8 h-2 bg-[#d4a547]'
                : 'w-2 h-2 bg-[#d4a547]/30 hover:bg-[#d4a547]/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Countdown Timer ───────────────────────────────────────────── */

const CountdownTimer = () => {
  const [time, setTime] = useState<TimeRemaining>(getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-6 sm:gap-8 mt-16 sm:mt-20"
    >
      <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-[#1e3366]/60">
        Counting Down to the Celebration
      </p>

      <div className="flex items-start gap-3 sm:gap-5">
        <FlipDigit value={time.days} label="Days" />
        <span className="font-display text-2xl text-[#d4a547]/50 mt-4 sm:mt-5">
          :
        </span>
        <FlipDigit value={time.hours} label="Hours" />
        <span className="font-display text-2xl text-[#d4a547]/50 mt-4 sm:mt-5">
          :
        </span>
        <FlipDigit value={time.minutes} label="Minutes" />
        <span className="font-display text-2xl text-[#d4a547]/50 mt-4 sm:mt-5">
          :
        </span>
        <FlipDigit value={time.seconds} label="Seconds" />
      </div>
    </motion.div>
  );
};

/* ─── Main Section ──────────────────────────────────────────────── */

const WeddingEvents = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: carouselRef, inView: carouselInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      className="relative py-20 sm:py-32 overflow-hidden"
      style={{ backgroundColor: '#faf3e5' }}
    >
      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16"
        >
          <span className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-[#d4a547] mb-4">
            THE CELEBRATION
          </span>

          <OrnamentDivider className="w-40 h-4 text-[#d4a547] mb-4" />

          <h2 className="font-display text-4xl sm:text-5xl text-[#0a1128]">
            Wedding Events
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          ref={carouselRef}
          initial="hidden"
          animate={carouselInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <Carousel />
        </motion.div>

        {/* Countdown */}
        <CountdownTimer />
      </div>
    </section>
  );
};

export default WeddingEvents;
