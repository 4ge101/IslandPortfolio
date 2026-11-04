import { Suspense, Component, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Lighting } from './Lighting';
import { Island } from './Island';
import { Clouds } from './Cloud';
import { AmbientParticles } from './Particles';
import { CameraController } from './CameraController';
import { CAMERA_VIEWS } from '../../lib/constants';
import type { SectionId } from '../../types/portfolio';

// WebGL Error Boundary class component
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL Context / 3D Canvas issue caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface IslandSceneProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onHoverObject?: () => void;
  isMobile: boolean;
  reducedMotion: boolean;
  lowPower: boolean;
}

export function IslandScene({
  activeSection,
  onSelectSection,
  onHoverObject,
  isMobile,
  reducedMotion,
  lowPower,
}: IslandSceneProps) {
  const initialView = CAMERA_VIEWS.overview;

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        shadows={!lowPower}
        camera={{
          position: initialView.position,
          fov: isMobile ? 48 : initialView.fov,
          near: 0.2,
          far: 60,
        }}
        dpr={isMobile || lowPower ? [1, 1.25] : [1, 2]}
        gl={{
          antialias: !lowPower,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Soft atmospheric depth fog matching warm canvas sky backdrop */}
        <fog attach="fog" args={['#EFEAE4', 16, 45]} />

        {/* Cinematic Multi-angle Lighting */}
        <Lighting lowPower={lowPower} />

        {/* 3D Scene Objects with Suspense */}
        <Suspense fallback={null}>
          {/* Main Floating Island Diorama */}
          <Island
            activeSection={activeSection}
            onSelectSection={onSelectSection}
            onHoverObject={onHoverObject}
            lowPower={lowPower}
          />

          {/* Surrounding Fluffy Floating Clouds */}
          <Clouds count={isMobile || lowPower ? 5 : 8} />

          {/* Warm Ambient Floating Motes / Stardust */}
          <AmbientParticles count={isMobile || lowPower ? 30 : 70} lowPower={lowPower} />

          {/* Smooth GSAP & Orbit Controls Camera Controller */}
          <CameraController
            activeSection={activeSection}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
