import { Volume2, VolumeX, Sparkles, Compass, ArrowLeft } from 'lucide-react';
import type { SectionId } from '../../types/portfolio';


interface NavigationProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  lowPower: boolean;
  onToggleLowPower: () => void;
}

export function Navigation({
  activeSection,
  onSelectSection,
  soundEnabled,
  onToggleSound,
  lowPower,
  onToggleLowPower,
}: NavigationProps) {
  const isZoomedIn = activeSection !== 'overview';

  const navItems: { id: SectionId; label: string }[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none p-4 md:p-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Name & Role */}
        <button
          onClick={() => onSelectSection('overview')}
          className="pointer-events-auto flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D] rounded-lg p-1.5"
          aria-label="Return to Island Overview"
        >
          <div className="w-8 h-8 rounded-full bg-[#613F4D] flex items-center justify-center text-[#F8F5EF] shadow-sm transition-transform duration-300 group-hover:scale-105">
            <span className="font-serif text-sm font-semibold italic">C</span>
          </div>
          <div>
            <div className="font-serif text-lg md:text-xl font-medium tracking-tight text-[#292827] group-hover:text-[#613F4D] transition-colors">
              Mehzabin Islam Doua
            </div>
            <div className="text-[10px] md:text-xs text-[#292827]/60 tracking-wider uppercase font-medium">
              Mathematician
            </div>
          </div>
        </button>

        {/* Center Nav Links (Desktop) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 glass-pill px-3 py-1.5 rounded-full pointer-events-auto shadow-sm"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D] ${
                  isActive
                    ? 'bg-[#613F4D] text-[#F8F5EF] shadow-sm'
                    : 'text-[#292827]/80 hover:text-[#613F4D] hover:bg-[#E8CFCB]/25'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Return to Island Button (when zoomed in) */}
          {isZoomedIn && (
            <button
              onClick={() => onSelectSection('overview')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#613F4D] text-[#F8F5EF] shadow-md hover:bg-[#4E313D] transition-all duration-200 animate-fade-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
              title="Return to Island Overview (Esc)"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Island</span>
              <kbd className="hidden lg:inline-block ml-1 px-1.5 py-0.2 text-[9px] bg-white/20 rounded">
                Esc
              </kbd>
            </button>
          )}

          {/* Low Power Mode Toggle */}
          <button
            onClick={onToggleLowPower}
            className={`p-2 rounded-full glass-pill text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D] ${
              lowPower
                ? 'bg-[#D4A373]/30 text-[#613F4D] border-[#D4A373]'
                : 'text-[#292827]/70 hover:text-[#292827]'
            }`}
            title={lowPower ? 'High Performance Mode (Reduced Shadows)' : 'Normal Graphics Mode'}
            aria-label="Toggle Graphics Performance"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-full glass-pill text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D] ${
              soundEnabled
                ? 'bg-[#C99B9B]/30 text-[#613F4D] border-[#C99B9B]'
                : 'text-[#292827]/70 hover:text-[#292827]'
            }`}
            title={soundEnabled ? 'Ambient Audio Enabled' : 'Ambient Audio Muted'}
            aria-label="Toggle Ambient Audio"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Floating Bottom Bar */}
      <div className="md:hidden fixed bottom-5 left-4 right-4 z-40 pointer-events-auto">
        <div className="glass-panel rounded-full px-2 py-2 flex items-center justify-around shadow-lg">
          <button
            onClick={() => onSelectSection('overview')}
            className={`p-2 rounded-full text-xs transition-colors ${
              activeSection === 'overview'
                ? 'bg-[#613F4D] text-[#F8F5EF]'
                : 'text-[#292827]/75'
            }`}
            title="Overview"
            aria-label="Overview"
          >
            <Compass className="w-4 h-4" />
          </button>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#613F4D] text-[#F8F5EF]'
                    : 'text-[#292827]/80 hover:text-[#613F4D]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
