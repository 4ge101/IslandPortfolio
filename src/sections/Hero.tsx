import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Eye, Sparkles, Monitor, BookOpen, Layers, Camera, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import type { SectionId } from '../types/portfolio';

interface HeroProps {
  onSelectSection: (id: SectionId) => void;
  isOverview: boolean;
}

export function Hero({ onSelectSection, isOverview }: HeroProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const { personal } = portfolioData;

  const quickSpots: { id: SectionId; icon: typeof Monitor; label: string; desc: string }[] = [
    { id: 'projects', icon: Monitor, label: 'Projects', desc: 'Laptop' },
    { id: 'about', icon: BookOpen, label: 'About', desc: 'Journal' },
    { id: 'skills', icon: Layers, label: 'Skills', desc: 'Bookshelf' },
    { id: 'gallery', icon: Camera, label: 'Gallery', desc: 'Camera' },
    { id: 'contact', icon: Mail, label: 'Contact', desc: 'Mailbox' },
  ];

  if (!isOverview) return null;

  return (
    <div className="fixed bottom-20 md:bottom-10 left-4 md:left-10 right-4 md:right-auto z-20 pointer-events-none max-w-xl">
      <AnimatePresence mode="wait">
        {!isMinimized ? (
          <motion.div
            key="hero-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto glass-panel rounded-3xl p-5 md:p-8 shadow-xl border border-[#C99B9B]/25 relative"
          >
            {/* Minimize button */}
            <button
              onClick={() => setIsMinimized(true)}
              className="absolute top-4 right-4 p-2 text-[#292827]/50 hover:text-[#292827] rounded-full hover:bg-[#E8CFCB]/30 transition-colors text-xs flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
              title="Hide panel to inspect 3D world"
              aria-label="Hide panel"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px] font-medium">Free View</span>
            </button>

            {/* Status Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8CFCB]/40 text-[#613F4D] text-[11px] font-medium tracking-wide mb-3">
              <span className="w-2 h-2 rounded-full bg-[#8B9E87] animate-pulse" />
              <span>{personal.status}</span>
            </div>

            {/* Editorial Heading */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#292827] leading-[1.08] mb-3">
              {personal.name}
            </h1>

            {/* Subtitle / Role */}
            <p className="text-sm md:text-base text-[#613F4D] font-medium mb-3">
              {personal.title}
            </p>

            {/* Description */}
            <p className="text-xs md:text-sm text-[#292827]/75 leading-relaxed mb-6">
              {personal.subheadline}
            </p>

            {/* Interactive World Guide */}
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#292827]/60 font-semibold mb-2.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#613F4D]" />
                <span>Explore Interactive World</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickSpots.map((spot) => {
                  const Icon = spot.icon;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => onSelectSection(spot.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#F8F5EF] hover:bg-[#613F4D] hover:text-[#F8F5EF] text-[#292827] text-xs font-medium border border-[#C99B9B]/30 transition-all duration-200 flex items-center gap-1.5 shadow-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
                    >
                      <Icon className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                      <span>{spot.label}</span>
                      <span className="text-[10px] opacity-60">({spot.desc})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Minimized Pill to restore */
          <motion.button
            key="restore-pill"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsMinimized(false)}
            className="pointer-events-auto glass-panel px-4 py-2.5 rounded-full shadow-lg border border-[#C99B9B]/30 text-xs font-medium text-[#292827] hover:text-[#613F4D] flex items-center gap-2 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
          >
            <Sparkles className="w-4 h-4 text-[#613F4D]" />
            <span>Show Introduction &amp; Guide</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
