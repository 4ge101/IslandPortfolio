import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CloudProps {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  opacity?: number;
}

export function Cloud({ position, scale = 1, speed = 0.2, opacity = 0.92 }: CloudProps) {
  const groupRef = useRef<THREE.Group>(null);
  const initialX = position[0];
  const initialZ = position[2];
  const phase = useRef(Math.random() * Math.PI * 2);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle slow orbit / drift
    groupRef.current.position.y = position[1] + Math.sin(time * speed + phase.current) * 0.25;
    groupRef.current.position.x = initialX + Math.cos(time * (speed * 0.5) + phase.current) * 0.4;
    groupRef.current.position.z = initialZ + Math.sin(time * (speed * 0.4) + phase.current) * 0.4;

    // Slow self-rotation
    groupRef.current.rotation.y += delta * 0.05 * speed;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Cluster of soft rounded spheres forming a natural fluffy cloud */}
      <mesh position={[0, 0, 0]} castShadow={false} receiveShadow>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial
          color="#FAF7F2"
          roughness={0.95}
          metalness={0.05}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh position={[0.9, -0.15, 0.2]} castShadow={false} receiveShadow>
        <sphereGeometry args={[0.9, 14, 14]} />
        <meshStandardMaterial
          color="#FAF7F2"
          roughness={0.95}
          metalness={0.05}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh position={[-0.85, -0.2, -0.1]} castShadow={false} receiveShadow>
        <sphereGeometry args={[0.85, 14, 14]} />
        <meshStandardMaterial
          color="#FAF7F2"
          roughness={0.95}
          metalness={0.05}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh position={[0.3, 0.45, -0.2]} castShadow={false} receiveShadow>
        <sphereGeometry args={[0.8, 14, 14]} />
        <meshStandardMaterial
          color="#FAF7F2"
          roughness={0.95}
          metalness={0.05}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh position={[-0.4, 0.35, 0.3]} castShadow={false} receiveShadow>
        <sphereGeometry args={[0.75, 14, 14]} />
        <meshStandardMaterial
          color="#FAF7F2"
          roughness={0.95}
          metalness={0.05}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh position={[0.2, -0.35, 0.4]} castShadow={false} receiveShadow>
        <sphereGeometry args={[0.65, 12, 12]} />
        <meshStandardMaterial
          color="#FAF7F2"
          roughness={0.95}
          metalness={0.05}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

export function Clouds({ count = 8 }: { count?: number }) {
  // Pre-configured cloud positions encircling the island at various elevations
  const cloudConfigs = [
    { pos: [-8.5, -1.8, 4.0] as [number, number, number], scale: 1.4, speed: 0.18 },
    { pos: [8.0, -1.2, -5.0] as [number, number, number], scale: 1.6, speed: 0.22 },
    { pos: [-6.0, -2.5, -7.0] as [number, number, number], scale: 1.3, speed: 0.15 },
    { pos: [7.5, -2.2, 6.5] as [number, number, number], scale: 1.5, speed: 0.2 },
    { pos: [0.0, -3.8, -9.5] as [number, number, number], scale: 1.8, speed: 0.16 },
    { pos: [-9.0, -3.2, -2.0] as [number, number, number], scale: 1.2, speed: 0.25 },
    { pos: [10.0, -2.8, 1.0] as [number, number, number], scale: 1.5, speed: 0.19 },
    { pos: [-2.0, -4.2, 9.0] as [number, number, number], scale: 1.9, speed: 0.14 },
  ].slice(0, count);

  return (
    <group name="clouds-layer">
      {cloudConfigs.map((c, i) => (
        <Cloud key={i} position={c.pos} scale={c.scale} speed={c.speed} />
      ))}
    </group>
  );
}
