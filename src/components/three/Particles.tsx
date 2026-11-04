import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  lowPower?: boolean;
}

export function AmbientParticles({ count = 80, lowPower = false }: ParticlesProps) {
  const actualCount = lowPower ? 30 : count;
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions and random offsets
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(actualCount * 3);
    const spd = new Float32Array(actualCount);

    for (let i = 0; i < actualCount; i++) {
      // Disperse across island cylinder
      const radius = 1.0 + Math.random() * 5.2;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3 + 0] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = 0.5 + Math.random() * 4.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      spd[i] = 0.2 + Math.random() * 0.4;
    }
    return [pos, spd];
  }, [actualCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < actualCount; i++) {
      const idx = i * 3;
      // Gentle vertical drifting upward
      array[idx + 1] += speeds[i] * 0.008;
      // Subtle swaying
      array[idx + 0] += Math.sin(time * 0.5 + i) * 0.003;
      array[idx + 2] += Math.cos(time * 0.5 + i) * 0.003;

      // Loop back down when reaching top
      if (array[idx + 1] > 5.5) {
        array[idx + 1] = 0.8;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#F8EAD6"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function WaterfallMist({ count = 40, lowPower = false }: ParticlesProps) {
  const actualCount = lowPower ? 15 : count;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(actualCount * 3);
    const spd = new Float32Array(actualCount);

    for (let i = 0; i < actualCount; i++) {
      pos[i * 3 + 0] = -0.5 + (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 1] = 0.5 - Math.random() * 3.5;
      pos[i * 3 + 2] = -4.5 + (Math.random() - 0.5) * 0.8;
      spd[i] = 0.5 + Math.random() * 0.8;
    }
    return [pos, spd];
  }, [actualCount]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < actualCount; i++) {
      const idx = i * 3;
      // Fall downward
      array[idx + 1] -= speeds[i] * 0.02;
      // Spread outwards slightly
      array[idx + 0] += (Math.random() - 0.5) * 0.008;

      if (array[idx + 1] < -3.5) {
        array[idx + 1] = 0.5;
        array[idx + 0] = -0.5 + (Math.random() - 0.5) * 0.6;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#E8F4F8"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
