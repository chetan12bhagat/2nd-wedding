import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EnvelopeOpening from './components/EnvelopeOpening';
import HeroInvitation from './components/HeroInvitation';
import FamilyBlessings from './components/FamilyBlessings';
import CoupleIntroduction from './components/CoupleIntroduction';
import WeddingEvents from './components/WeddingEvents';
import WardrobeInspiration from './components/WardrobeInspiration';
import PhotoGallery from './components/PhotoGallery';
import LoveAndBlessings from './components/LoveAndBlessings';
import RsvpSection from './components/RsvpSection';
import FinalMessage from './components/FinalMessage';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';

export const App: React.FC = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    // Smooth scroll to top when opened
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-navy-950 text-ivory selection:bg-gold/30 selection:text-ivory">
      <AnimatePresence mode="wait">
        {!isEnvelopeOpen ? (
          /* Screen 1: Initial Name Stamp & Luxury Envelope Opening */
          <EnvelopeOpening key="envelope" onOpen={handleOpenEnvelope} />
        ) : (
          /* Screens 2 - 10: Complete Wedding Website Experience */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            {/* Global Top Navigation */}
            <Navigation />

            {/* Screen 2: Hero Invitation */}
            <div id="invitation">
              <HeroInvitation />
            </div>

            {/* Screen 3: Family Blessings */}
            <div id="blessings">
              <FamilyBlessings />
            </div>

            {/* Screen 4: Couple Introduction */}
            <div id="couple">
              <CoupleIntroduction />
            </div>

            {/* Screen 5: Wedding Celebration Events & Live Countdown */}
            <div id="events">
              <WeddingEvents />
            </div>

            {/* Screen 6: Wardrobe / Style Inspiration */}
            <div id="wardrobe">
              <WardrobeInspiration />
            </div>

            {/* Screen 7: Photo Gallery */}
            <div id="gallery">
              <PhotoGallery />
            </div>

            {/* Screen 8: With Love & Blessings */}
            <div id="blessings-note">
              <LoveAndBlessings />
            </div>

            {/* Screen 9: RSVP Section */}
            <div id="rsvp">
              <RsvpSection />
            </div>

            {/* Screen 10: Final Wedding Message & Monogram Closing */}
            <div id="conclusion">
              <FinalMessage />
            </div>

            {/* Floating Audio / Music Player */}
            <MusicPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

