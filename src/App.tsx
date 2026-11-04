import { useState, useEffect, useCallback } from 'react';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { ModalPanel } from './components/ui/ModalPanel';
import { FallbackView } from './components/ui/FallbackView';
import { IslandScene, WebGLErrorBoundary } from './components/three/IslandScene';
import { Hero } from './sections/Hero';
import { ProjectsSection } from './sections/Projects';
import { AboutSection } from './sections/About';
import { SkillsSection } from './sections/Skills';
import { GallerySection } from './sections/Gallery';
import { ContactSection } from './sections/Contact';
import { useIsMobile } from './hooks/useIsMobile';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useSoundEffects } from './hooks/useSoundEffects';
import { CAMERA_VIEWS } from './lib/constants';
import type { SectionId } from './types/portfolio';
import Lenis from 'lenis';

export function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [lowPower, setLowPower] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const { soundEnabled, toggleSound, playChime, playHover } = useSoundEffects();

  // Smooth scrolling via Lenis for modal panels
  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [reducedMotion]);

  // Section selection handler with auditory chime
  const handleSelectSection = useCallback((id: SectionId) => {
    setActiveSection(id);
    if (id !== 'overview') {
      playChime(640);
    } else {
      playChime(480);
    }
  }, [playChime]);

  // Section metadata for ModalPanel header
  const currentView = CAMERA_VIEWS[activeSection];
  const isDrawerOpen = activeSection !== 'overview' && activeSection !== 'workspace';

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F8F5EF] text-[#292827]">
      {/* 1. Global Navigation Bar */}
      <Navigation
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        lowPower={lowPower}
        onToggleLowPower={() => setLowPower((prev) => !prev)}
      />

      {/* 2. Main 3D Floating Island Canvas */}
      <main className="w-full h-full relative" aria-label="3D Floating Island Environment">
        <WebGLErrorBoundary fallback={<FallbackView onSelectSection={handleSelectSection} />}>
          <IslandScene
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
            onHoverObject={playHover}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
            lowPower={lowPower}
          />
        </WebGLErrorBoundary>
      </main>

      {/* 3. Hero Introduction Card (visible in Overview) */}
      <Hero
        onSelectSection={handleSelectSection}
        isOverview={activeSection === 'overview'}
      />

      {/* 4. Editorial Content Drawer for Active Sections */}
      <ModalPanel
        isOpen={isDrawerOpen}
        onClose={() => handleSelectSection('overview')}
        title={currentView?.label || ''}
        subtitle={currentView?.sublabel || ''}
      >
        {activeSection === 'projects' && <ProjectsSection />}
        {activeSection === 'about' && <AboutSection />}
        {activeSection === 'skills' && <SkillsSection />}
        {activeSection === 'gallery' && <GallerySection />}
        {activeSection === 'contact' && <ContactSection />}
      </ModalPanel>

      {/* 5. Ambient Footer */}
      <Footer isOverview={activeSection === 'overview'} />
    </div>
  );
}

export default App;
