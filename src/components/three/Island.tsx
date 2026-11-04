import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Workspace } from './Workspace';
import { InteractiveObject } from './InteractiveObject';
import { WaterfallMist } from './Particles';
import type { SectionId } from '../../types/portfolio';

interface IslandProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onHoverObject?: () => void;
  lowPower?: boolean;
}

export function Island({
  activeSection,
  onSelectSection,
  onHoverObject,
  lowPower = false,
}: IslandProps) {
  const islandGroupRef = useRef<THREE.Group>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  // Gentle breathing / floating bobbing animation
  useFrame((state) => {
    if (!islandGroupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle vertical bobbing (slow and comfortable)
    islandGroupRef.current.position.y = Math.sin(t * 0.6) * 0.08;
    // Very subtle slow tilt
    islandGroupRef.current.rotation.z = Math.sin(t * 0.4) * 0.008;
    islandGroupRef.current.rotation.x = Math.cos(t * 0.35) * 0.006;

    // Water flow animation
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.MeshStandardMaterial;
      if (mat.roughness !== undefined) {
        mat.roughness = 0.15 + Math.sin(t * 2.0) * 0.05;
      }
    }
  });

  return (
    <group ref={islandGroupRef} position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* 1. FLOATING ROCK UNDERBELLY / STALACTITE CORE */}
      {/* ============================================================ */}
      <group position={[0, 0, 0]}>
        {/* Tier 1 Rock Strata (Upper undercut) */}
        <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[5.4, 4.4, 1.2, 16]} />
          <meshStandardMaterial color="#6B645D" roughness={0.92} flatShading />
        </mesh>

        {/* Tier 2 Middle Cone */}
        <mesh position={[0, -1.9, 0]} castShadow receiveShadow>
          <coneGeometry args={[4.4, 3.4, 14, 3]} />
          <meshStandardMaterial color="#5A544E" roughness={0.95} flatShading />
        </mesh>

        {/* Tier 3 Lower Sharp Tip */}
        <mesh position={[0.2, -3.8, -0.2]} castShadow>
          <coneGeometry args={[2.0, 2.8, 8, 2]} />
          <meshStandardMaterial color="#46413C" roughness={0.95} flatShading />
        </mesh>

        {/* Sculpted Jutting Rock Boulders on the underbody */}
        {[
          { p: [-2.8, -0.9, 2.2], s: 0.9, r: [0.2, 0.5, 0.1] },
          { p: [2.9, -1.1, -2.1], s: 1.1, r: [-0.3, 0.8, 0.4] },
          { p: [-2.1, -1.4, -2.7], s: 0.8, r: [0.4, -0.3, 0.2] },
          { p: [2.4, -1.2, 2.6], s: 0.95, r: [-0.2, 0.2, -0.5] },
          { p: [0.5, -2.6, 1.6], s: 0.7, r: [0.5, 0.4, 0] },
          { p: [-1.4, -2.4, -0.8], s: 0.65, r: [-0.3, 0.6, 0.3] },
        ].map((b, bi) => (
          <mesh
            key={bi}
            position={b.p as [number, number, number]}
            rotation={b.r as [number, number, number]}
            castShadow
            receiveShadow
          >
            <dodecahedronGeometry args={[b.s, 0]} />
            <meshStandardMaterial color="#635C55" roughness={0.9} flatShading />
          </mesh>
        ))}

        {/* Mini Floating Satellite Islets drifting alongside */}
        {[
          { p: [-6.8, -0.4, 3.5], s: 0.7 },
          { p: [6.5, -0.8, -4.5], s: 0.85 },
          { p: [5.8, -1.2, 5.2], s: 0.6 },
        ].map((islet, ii) => (
          <group key={ii} position={islet.p as [number, number, number]}>
            {/* Rock base */}
            <mesh position={[0, -0.3 * islet.s, 0]} castShadow>
              <coneGeometry args={[islet.s, 0.9 * islet.s, 7]} />
              <meshStandardMaterial color="#5A544E" roughness={0.95} flatShading />
            </mesh>
            {/* Grassy patch */}
            <mesh position={[0, 0.15 * islet.s, 0]}>
              <cylinderGeometry args={[islet.s * 1.05, islet.s, 0.2 * islet.s, 8]} />
              <meshStandardMaterial color="#7C8C6E" roughness={0.85} />
            </mesh>
            {/* Tiny blossom or crystal on top */}
            <mesh position={[0, 0.35 * islet.s, 0]}>
              <octahedronGeometry args={[0.18 * islet.s, 0]} />
              <meshStandardMaterial color="#C9C3D8" emissive="#C9C3D8" emissiveIntensity={0.3} />
            </mesh>
          </group>
        ))}

        {/* Hanging Floating Geode Crystals underneath */}
        {[
          { p: [-1.2, -4.2, 0.8], c: '#C9C3D8', s: 0.3 },
          { p: [0.8, -4.5, -0.6], c: '#E8CFCB', s: 0.25 },
          { p: [-0.4, -5.2, -0.2], c: '#FAF7F2', s: 0.2 },
          { p: [1.4, -3.8, 1.2], c: '#C9C3D8', s: 0.28 },
        ].map((c, i) => (
          <mesh key={i} position={c.p as [number, number, number]}>
            <octahedronGeometry args={[c.s, 0]} />
            <meshStandardMaterial
              color={c.c}
              roughness={0.2}
              metalness={0.3}
              emissive={c.c}
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}

        {/* Hanging Ivy Roots dangling off the rock */}
        {[
          [-3.2, -1.8, 2.0],
          [2.8, -2.0, -2.6],
          [-1.8, -2.6, -3.2],
          [3.4, -1.6, 1.8],
        ].map((p, i) => (
          <group key={i} position={p as [number, number, number]}>
            <mesh>
              <cylinderGeometry args={[0.04, 0.015, 1.8, 6]} />
              <meshStandardMaterial color="#556B4E" roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================ */}
      {/* 2. TERRACED GRASS SURFACE & TOPOGRAPHY */}
      {/* ============================================================ */}
      <group position={[0, 0, 0]}>
        {/* Main Base Grassy Island Tier */}
        <mesh position={[0, 0.6, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[5.5, 5.0, 1.2, 32]} />
          <meshStandardMaterial color="#7C8C6E" roughness={0.85} />
        </mesh>

        {/* Upper Grassy Plateau (where the workspace studio sits) */}
        <mesh position={[0.6, 1.22, 0.4]} receiveShadow castShadow>
          <cylinderGeometry args={[3.2, 3.5, 0.25, 24]} />
          <meshStandardMaterial color="#889A7A" roughness={0.8} />
        </mesh>

        {/* West Garden Terraced Mound */}
        <mesh position={[-2.6, 1.05, 0.8]} receiveShadow castShadow>
          <cylinderGeometry args={[1.8, 2.1, 0.35, 16]} />
          <meshStandardMaterial color="#738366" roughness={0.85} />
        </mesh>

        {/* Cobblestone Garden Pathway leading to Workspace and Mailbox */}
        {[
          [2.4, 1.21, 2.4],
          [2.0, 1.21, 2.0],
          [1.6, 1.22, 1.6],
          [1.2, 1.23, 1.3],
          [0.8, 1.24, 1.0],
          [0.4, 1.25, 0.7],
          [-0.2, 1.23, 1.8],
          [-0.7, 1.22, 2.2],
        ].map((pos, idx) => (
          <mesh
            key={idx}
            position={pos as [number, number, number]}
            rotation={[-Math.PI / 2, 0, (idx * 0.4)]}
            receiveShadow
          >
            <circleGeometry args={[0.22 + (idx % 2) * 0.05, 10]} />
            <meshStandardMaterial color={idx % 2 === 0 ? '#BFB8AF' : '#ADA69E'} roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* ============================================================ */}
      {/* 3. WATER FEATURE: SPRING POOL, STREAM & WATERFALL */}
      {/* ============================================================ */}
      <group position={[0, 0, 0]}>
        {/* Stone Spring Pool Basin */}
        <mesh position={[-2.4, 1.2, -1.0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.9, 0.95, 0.25, 16]} />
          <meshStandardMaterial color="#8C8680" roughness={0.9} />
        </mesh>
        {/* Pool Spring Water */}
        <mesh position={[-2.4, 1.28, -1.0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.78, 16]} />
          <meshStandardMaterial
            color="#8AC6D1"
            roughness={0.1}
            metalness={0.1}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Winding River Stream */}
        <mesh
          ref={waterRef}
          position={[-1.2, 1.21, -2.6]}
          rotation={[-Math.PI / 2, 0, -0.3]}
          receiveShadow
        >
          <planeGeometry args={[1.1, 3.8, 12, 12]} />
          <meshStandardMaterial
            color="#7DBCC7"
            roughness={0.15}
            metalness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Small Arched Wooden Footbridge spanning the stream */}
        <group position={[-1.3, 1.35, -2.4]} rotation={[0, 0.9, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.3, 0.06, 0.6]} />
            <meshStandardMaterial color="#8E6B53" roughness={0.7} />
          </mesh>
          {/* Bridge Railings */}
          <mesh position={[0, 0.22, 0.28]} castShadow>
            <boxGeometry args={[1.3, 0.04, 0.04]} />
            <meshStandardMaterial color="#6B503E" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.22, -0.28]} castShadow>
            <boxGeometry args={[1.3, 0.04, 0.04]} />
            <meshStandardMaterial color="#6B503E" roughness={0.7} />
          </mesh>
        </group>

        {/* Waterfall Cascading Over the Edge into Sky */}
        <mesh position={[-0.5, 0.4, -4.5]} rotation={[0.1, 0, 0]}>
          <planeGeometry args={[0.8, 1.8]} />
          <meshStandardMaterial
            color="#D8EEF3"
            roughness={0.1}
            metalness={0.05}
            transparent
            opacity={0.75}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Waterfall Spray Mist */}
        <WaterfallMist count={30} lowPower={lowPower} />
      </group>

      {/* ============================================================ */}
      {/* 4. SCULPTURAL TREES & BOTANICAL GARDEN */}
      {/* ============================================================ */}
      <group position={[0, 0, 0]}>
        {/* Japanese Blossom / Autumn Maple Tree (Dusty Rose & Blush) */}
        <group position={[-3.2, 1.2, 1.2]} rotation={[0, 0.4, 0]}>
          {/* Curved Organic Trunk */}
          <mesh position={[0, 0.9, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.28, 1.8, 10]} />
            <meshStandardMaterial color="#4A3B32" roughness={0.85} />
          </mesh>
          {/* Branch Splits */}
          <mesh position={[0.3, 1.9, 0.1]} rotation={[0, 0, -0.45]} castShadow>
            <cylinderGeometry args={[0.1, 0.14, 0.9, 8]} />
            <meshStandardMaterial color="#4A3B32" roughness={0.85} />
          </mesh>
          <mesh position={[-0.3, 1.8, -0.1]} rotation={[0, 0, 0.5]} castShadow>
            <cylinderGeometry args={[0.09, 0.13, 0.8, 8]} />
            <meshStandardMaterial color="#4A3B32" roughness={0.85} />
          </mesh>

          {/* Lush Cloud-like Clustered Foliage (Dusty Rose / Muted Blush) */}
          <mesh position={[0, 2.5, 0]} castShadow>
            <sphereGeometry args={[1.1, 14, 14]} />
            <meshStandardMaterial color="#C99B9B" roughness={0.8} />
          </mesh>
          <mesh position={[0.65, 2.2, 0.3]} castShadow>
            <sphereGeometry args={[0.85, 12, 12]} />
            <meshStandardMaterial color="#E8CFCB" roughness={0.8} />
          </mesh>
          <mesh position={[-0.6, 2.3, -0.3]} castShadow>
            <sphereGeometry args={[0.8, 12, 12]} />
            <meshStandardMaterial color="#C99B9B" roughness={0.8} />
          </mesh>
          <mesh position={[0.2, 2.9, -0.2]} castShadow>
            <sphereGeometry args={[0.7, 10, 10]} />
            <meshStandardMaterial color="#E8CFCB" roughness={0.8} />
          </mesh>
        </group>

        {/* Slender Birch / Willow Tree (Pale Bark & Sage Green) */}
        <group position={[2.8, 1.2, -1.8]} rotation={[0, -0.6, 0]}>
          <mesh position={[0, 1.1, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.18, 2.2, 10]} />
            <meshStandardMaterial color="#D5D0C8" roughness={0.7} />
          </mesh>
          {/* Sage Foliage */}
          <mesh position={[0, 2.4, 0]} castShadow>
            <sphereGeometry args={[0.95, 14, 14]} />
            <meshStandardMaterial color="#8B9E87" roughness={0.85} />
          </mesh>
          <mesh position={[-0.4, 2.1, 0.3]} castShadow>
            <sphereGeometry args={[0.65, 10, 10]} />
            <meshStandardMaterial color="#7C8C6E" roughness={0.85} />
          </mesh>
          <mesh position={[0.35, 2.2, -0.2]} castShadow>
            <sphereGeometry args={[0.7, 10, 10]} />
            <meshStandardMaterial color="#8B9E87" roughness={0.85} />
          </mesh>
        </group>

        {/* Lavender Flower Patches & Wild Blush Blossoms */}
        {[
          { pos: [-1.8, 1.25, 2.6], col: '#C9C3D8', count: 6 },
          { pos: [1.8, 1.22, 2.8], col: '#E8CFCB', count: 5 },
          { pos: [-3.8, 1.22, -0.2], col: '#C9C3D8', count: 7 },
          { pos: [3.4, 1.22, 0.5], col: '#E8CFCB', count: 5 },
        ].map((patch, pIdx) => (
          <group key={pIdx} position={patch.pos as [number, number, number]}>
            {Array.from({ length: patch.count }).map((_, fi) => (
              <group
                key={fi}
                position={[
                  (fi % 3) * 0.18 - 0.18,
                  0,
                  Math.floor(fi / 3) * 0.18 - 0.1,
                ]}
              >
                {/* Stem */}
                <mesh position={[0, 0.12, 0]}>
                  <cylinderGeometry args={[0.008, 0.008, 0.24, 6]} />
                  <meshStandardMaterial color="#6B8065" roughness={0.9} />
                </mesh>
                {/* Flower blossom head */}
                <mesh position={[0, 0.26, 0]}>
                  <sphereGeometry args={[0.045, 8, 8]} />
                  <meshStandardMaterial color={patch.col} roughness={0.7} />
                </mesh>
              </group>
            ))}
          </group>
        ))}

        {/* Mossy Garden Boulders scattered near water and trees */}
        {[
          [-1.8, 1.25, -0.4],
          [-3.0, 1.22, 2.2],
          [2.2, 1.22, -2.8],
          [0.8, 1.22, -3.8],
        ].map((bp, bi) => (
          <mesh key={bi} position={bp as [number, number, number]} castShadow receiveShadow>
            <dodecahedronGeometry args={[0.35 + (bi % 2) * 0.15, 0]} />
            <meshStandardMaterial color="#858079" roughness={0.9} flatShading />
          </mesh>
        ))}
      </group>

      {/* ============================================================ */}
      {/* 5. INTERACTIVE OBJECT 5: GARDEN MAILBOX (CONTACT) */}
      {/* ============================================================ */}
      <InteractiveObject
        id="contact"
        title="Get in Touch"
        subtitle="Click Mailbox"
        beaconPosition={[2.7, 1.9, 2.7]}
        isActive={activeSection === 'contact'}
        onSelect={onSelectSection}
        onHover={onHoverObject}
      >
        <group position={[2.7, 1.2, 2.7]} rotation={[0, -Math.PI / 4, 0]}>
          {/* Wooden Post */}
          <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.045, 0.05, 1.1, 10]} />
            <meshStandardMaterial color="#7D5C45" roughness={0.75} />
          </mesh>

          {/* Mailbox Body (Curved Roof and Sides) */}
          <group position={[0, 1.1, 0]}>
            {/* Box base */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.26, 0.22, 0.38]} />
              <meshStandardMaterial color="#FAF7F2" roughness={0.5} />
            </mesh>
            {/* Curved Roof */}
            <mesh position={[0, 0.11, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.13, 0.13, 0.38, 16, 1, false, 0, Math.PI]} />
              <meshStandardMaterial color="#613F4D" roughness={0.5} />
            </mesh>
            {/* Front Door */}
            <mesh position={[0, 0, 0.192]}>
              <boxGeometry args={[0.24, 0.2, 0.01]} />
              <meshStandardMaterial color="#EEE8DE" roughness={0.6} />
            </mesh>
            {/* Mail Slot Handle */}
            <mesh position={[0, 0.04, 0.2]}>
              <boxGeometry args={[0.1, 0.015, 0.01]} />
              <meshStandardMaterial color="#D4A373" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Red / Rose Mail Flag */}
            <group position={[0.14, 0.04, 0.05]} rotation={[0.4, 0, 0]}>
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.006, 0.006, 0.2, 6]} />
                <meshStandardMaterial color="#D4A373" metalness={0.8} roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.17, 0.04]}>
                <boxGeometry args={[0.008, 0.06, 0.08]} />
                <meshStandardMaterial color="#C99B9B" roughness={0.5} />
              </mesh>
            </group>
          </group>
        </group>
      </InteractiveObject>

      {/* ============================================================ */}
      {/* 6. COZY MINIATURE WORKSPACE STUDIO ON THE DECK */}
      {/* ============================================================ */}
      <Workspace
        activeSection={activeSection}
        onSelectSection={onSelectSection}
        onHoverObject={onHoverObject}
      />
    </group>
  );
}
