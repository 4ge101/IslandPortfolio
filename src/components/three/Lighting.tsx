import { useRef } from 'react';
import * as THREE from 'three';

interface LightingProps {
  lowPower?: boolean;
}

export function Lighting({ lowPower = false }: LightingProps) {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  return (
    <>
      {/* Soft warm ambient fill */}
      <ambientLight intensity={0.65} color="#FAF6F0" />

      {/* Sky and ground hemisphere light */}
      <hemisphereLight
        args={['#FFF5EB', '#7E766D', 0.85]}
      />

      {/* Main directional golden sunlight */}
      <directionalLight
        ref={dirLightRef}
        position={[14, 18, 10]}
        intensity={1.8}
        color="#FFF3E0"
        castShadow={!lowPower}
        shadow-mapSize-width={lowPower ? 512 : 2048}
        shadow-mapSize-height={lowPower ? 512 : 2048}
        shadow-camera-near={0.5}
        shadow-camera-far={45}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-bias={-0.0005}
      />

      {/* Soft cool fill light from opposite angle */}
      <directionalLight
        position={[-12, 10, -10]}
        intensity={0.5}
        color="#DCE4EC"
      />

      {/* Warm accent rim light for depth */}
      <directionalLight
        position={[0, -6, 12]}
        intensity={0.25}
        color="#E8CFCB"
      />
    </>
  );
}
