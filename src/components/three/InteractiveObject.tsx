import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { SectionId } from '../../types/portfolio';

interface InteractiveObjectProps {
  id: SectionId;
  title: string;
  subtitle: string;
  beaconPosition?: [number, number, number];
  isActive?: boolean;
  onSelect: (id: SectionId) => void;
  onHover?: () => void;
  children: React.ReactNode;
}

export function InteractiveObject({
  id,
  title,
  subtitle,
  beaconPosition = [0, 0.5, 0],
  isActive = false,
  onSelect,
  onHover,
  children,
}: InteractiveObjectProps) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    ringRef.current.rotation.z = t * 1.2;
    const pulse = 1 + Math.sin(t * 3.5) * 0.12;
    ringRef.current.scale.set(pulse, pulse, pulse);
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onSelect(id);
  };

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    onHover?.();
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {children}

      {/* Interactive Beacon / Indicator */}
      <group position={beaconPosition}>
        {/* Subtle pulsing ring on hover (only when not zoomed into this object) */}
        <mesh
          ref={ringRef}
          rotation={[-Math.PI / 2, 0, 0]}
          visible={hovered && !isActive}
        >
          <ringGeometry args={[0.22, 0.28, 32]} />
          <meshBasicMaterial
            color="#C99B9B"
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Small center dot */}
        <mesh visible={hovered && !isActive}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#C99B9B" />
        </mesh>

        {/* Floating HTML Pill on hover (only when not zoomed into this object) */}
        {hovered && !isActive && (
          <Html
            position={[0, 0.25, 0]}
            center
            distanceFactor={10}
            zIndexRange={[100, 0]}
          >
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide shadow-md transition-all duration-200 pointer-events-none select-none whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#613F4D] text-[#F8F5EF]'
                  : 'bg-[#F8F5EF]/95 text-[#292827] border border-[#C99B9B]/40'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C99B9B] animate-pulse" />
              <span className="font-semibold">{title}</span>
              <span className="text-[10px] opacity-70">({subtitle})</span>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}
