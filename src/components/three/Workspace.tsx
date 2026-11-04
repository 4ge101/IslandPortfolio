import { useMemo } from 'react';
import * as THREE from 'three';
import { InteractiveObject } from './InteractiveObject';
import type { SectionId } from '../../types/portfolio';

interface WorkspaceProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onHoverObject?: () => void;
}

export function Workspace({ activeSection, onSelectSection, onHoverObject }: WorkspaceProps) {
  // Screen canvas texture generated procedurally with crisp IDE code styling
  const screenTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Dark IDE slate background
      ctx.fillStyle = '#1E1E24';
      ctx.fillRect(0, 0, 512, 320);

      // Top title bar with window controls
      ctx.fillStyle = '#2B2B36';
      ctx.fillRect(0, 0, 512, 36);

      ctx.fillStyle = '#C99B9B';
      ctx.beginPath();
      ctx.arc(24, 18, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#D4A373';
      ctx.beginPath();
      ctx.arc(42, 18, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#8B9E87';
      ctx.beginPath();
      ctx.arc(60, 18, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#A39E98';
      ctx.font = '12px "Plus Jakarta Sans", monospace';
      ctx.fillText('App.tsx — Clara Vance Studio', 90, 22);

      // Code editor lines
      const codeLines = [
        { text: 'import { createWorld } from "@clara/universe";', color: '#C99B9B' },
        { text: 'import { Light, Shadow, Poetry } from "./atmosphere";', color: '#C9C3D8' },
        { text: '', color: '' },
        { text: 'export async function renderSanctuary() {', color: '#D4A373' },
        { text: '  const sanctuary = await createWorld({', color: '#FAF7F2' },
        { text: '    aesthetic: "sculpted-minimalism",', color: '#8B9E87' },
        { text: '    fps: 60,', color: '#D4A373' },
        { text: '    harmony: true,', color: '#C99B9B' },
        { text: '  });', color: '#FAF7F2' },
        { text: '  return sanctuary.illuminate();', color: '#C9C3D8' },
        { text: '}', color: '#FAF7F2' },
      ];

      ctx.font = '13px monospace';
      codeLines.forEach((line, index) => {
        if (line.text) {
          ctx.fillStyle = line.color;
          ctx.fillText(line.text, 30, 68 + index * 22);
        }
      });

      // Side mini interactive preview
      ctx.fillStyle = '#2A2730';
      ctx.roundRect(330, 60, 160, 230, 8);
      ctx.fill();

      ctx.strokeStyle = '#613F4D';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#613F4D';
      ctx.beginPath();
      ctx.arc(410, 140, 35, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#E8CFCB';
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('INTERACTIVE', 410, 200);
      ctx.font = '11px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#C99B9B';
      ctx.fillText('PORTFOLIO 3D', 410, 220);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    return texture;
  }, []);

  return (
    <group position={[0.6, 1.25, 0.4]}>
      {/* 1. Wooden Deck Platform with individual beveled planks */}
      <group position={[0, 0, 0]}>
        {[-1.5, -1.2, -0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9, 1.2, 1.5].map((x, i) => (
          <mesh key={i} position={[x, 0.05, 0]} receiveShadow castShadow>
            <boxGeometry args={[0.27, 0.08, 3.2]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#997356' : '#8E6B53'}
              roughness={0.75}
              metalness={0.05}
            />
          </mesh>
        ))}
        {/* Deck border frame */}
        <mesh position={[0, 0.04, 1.62]} receiveShadow>
          <boxGeometry args={[3.3, 0.09, 0.06]} />
          <meshStandardMaterial color="#6B503E" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.04, -1.62]} receiveShadow>
          <boxGeometry args={[3.3, 0.09, 0.06]} />
          <meshStandardMaterial color="#6B503E" roughness={0.8} />
        </mesh>
      </group>

      {/* 2. Wooden Pergola Canopy Structure */}
      <group position={[0, 0, 0]}>
        {/* Four corner pillars */}
        {[
          [-1.55, 1.35, -1.5],
          [1.55, 1.35, -1.5],
          [-1.55, 1.35, 1.5],
          [1.55, 1.35, 1.5],
        ].map((pos, idx) => (
          <mesh key={idx} position={pos as [number, number, number]} castShadow receiveShadow>
            <boxGeometry args={[0.1, 2.6, 0.1]} />
            <meshStandardMaterial color="#7D5C45" roughness={0.7} />
          </mesh>
        ))}

        {/* Top cross beams */}
        <mesh position={[0, 2.65, -1.5]} castShadow>
          <boxGeometry args={[3.4, 0.1, 0.1]} />
          <meshStandardMaterial color="#7D5C45" roughness={0.7} />
        </mesh>
        <mesh position={[0, 2.65, 1.5]} castShadow>
          <boxGeometry args={[3.4, 0.1, 0.1]} />
          <meshStandardMaterial color="#7D5C45" roughness={0.7} />
        </mesh>

        {/* Overhead sun rafters */}
        {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 2.75, 0]} castShadow>
            <boxGeometry args={[0.07, 0.08, 3.2]} />
            <meshStandardMaterial color="#8E6B53" roughness={0.8} />
          </mesh>
        ))}

        {/* Trailing wisteria / greenery hanging from pergola */}
        {[
          [-1.2, 2.45, -1.45],
          [-0.3, 2.5, 1.45],
          [0.8, 2.4, -1.4],
          [1.4, 2.35, 0.8],
        ].map((p, i) => (
          <group key={i} position={p as [number, number, number]}>
            <mesh>
              <cylinderGeometry args={[0.08, 0.18, 0.5, 6]} />
              <meshStandardMaterial color="#8B9E87" roughness={0.9} />
            </mesh>
            <mesh position={[0, -0.28, 0]}>
              <sphereGeometry args={[0.12, 6, 6]} />
              <meshStandardMaterial color="#C9C3D8" roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 3. The Main Desk */}
      <group position={[-0.2, 0.1, 0.1]}>
        {/* Oak Table Top */}
        <mesh position={[0, 0.82, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.08, 1.05]} />
          <meshStandardMaterial color="#B58F72" roughness={0.55} />
        </mesh>

        {/* Desk Front Apron & Drawer */}
        <mesh position={[0, 0.74, 0.45]} castShadow receiveShadow>
          <boxGeometry args={[1.85, 0.08, 0.05]} />
          <meshStandardMaterial color="#A37E61" roughness={0.6} />
        </mesh>
        {/* Brass Drawer Knob */}
        <mesh position={[0, 0.74, 0.49]} castShadow>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial color="#D4A373" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Four Desk Legs with Brass Caps */}
        {[
          [-0.9, 0.4, -0.45],
          [0.9, 0.4, -0.45],
          [-0.9, 0.4, 0.45],
          [0.9, 0.4, 0.45],
        ].map((pos, idx) => (
          <group key={idx} position={pos as [number, number, number]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.035, 0.025, 0.8, 12]} />
              <meshStandardMaterial color="#8E6B53" roughness={0.6} />
            </mesh>
            {/* Brass Cap */}
            <mesh position={[0, -0.36, 0]}>
              <cylinderGeometry args={[0.028, 0.026, 0.08, 12]} />
              <meshStandardMaterial color="#D4A373" metalness={0.85} roughness={0.25} />
            </mesh>
          </group>
        ))}

        {/* Felt / Leather Desk Mat */}
        <mesh position={[-0.1, 0.865, 0.05]} receiveShadow>
          <boxGeometry args={[1.2, 0.008, 0.65]} />
          <meshStandardMaterial color="#613F4D" roughness={0.85} />
        </mesh>

        {/* Ergonomic Designer Armchair */}
        <group position={[-0.1, 0.1, 0.85]} rotation={[0, Math.PI, 0]}>
          {/* Chair Seat Base */}
          <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.28, 0.08, 20]} />
            <meshStandardMaterial color="#C99B9B" roughness={0.7} />
          </mesh>
          {/* Curved Backrest */}
          <mesh position={[0, 0.68, -0.22]} rotation={[0.1, 0, 0]} castShadow>
            <boxGeometry args={[0.52, 0.45, 0.06]} />
            <meshStandardMaterial color="#C99B9B" roughness={0.7} />
          </mesh>
          {/* Soft Linen Cushion */}
          <mesh position={[0, 0.47, 0]} receiveShadow>
            <cylinderGeometry args={[0.26, 0.26, 0.04, 16]} />
            <meshStandardMaterial color="#F8F5EF" roughness={0.8} />
          </mesh>
          {/* Chair Legs */}
          {[
            [-0.18, 0.2, -0.18],
            [0.18, 0.2, -0.18],
            [-0.18, 0.2, 0.18],
            [0.18, 0.2, 0.18],
          ].map((lp, lidx) => (
            <mesh key={lidx} position={lp as [number, number, number]} castShadow>
              <cylinderGeometry args={[0.02, 0.015, 0.4, 8]} />
              <meshStandardMaterial color="#8E6B53" roughness={0.6} />
            </mesh>
          ))}
        </group>

        {/* ============================================================ */}
        {/* INTERACTIVE OBJECT 1: LAPTOP / WORKSTATION (PROJECTS) */}
        {/* ============================================================ */}
        <InteractiveObject
          id="projects"
          title="Projects"
          subtitle="Click Laptop"
          beaconPosition={[-0.2, 1.25, 0.05]}
          isActive={activeSection === 'projects'}
          onSelect={onSelectSection}
          onHover={onHoverObject}
        >
          <group position={[-0.2, 0.87, 0.05]}>
            {/* Laptop Base */}
            <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.42, 0.015, 0.3]} />
              <meshStandardMaterial color="#D8DDE0" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Keyboard Well & Key Grid */}
            <mesh position={[0, 0.02, -0.03]} receiveShadow>
              <boxGeometry args={[0.36, 0.005, 0.16]} />
              <meshStandardMaterial color="#2A2A2E" roughness={0.7} />
            </mesh>
            {/* Trackpad */}
            <mesh position={[0, 0.019, 0.08]} receiveShadow>
              <boxGeometry args={[0.13, 0.004, 0.08]} />
              <meshStandardMaterial color="#C8CDD0" metalness={0.6} roughness={0.4} />
            </mesh>

            {/* Laptop Screen Opened at 105 degrees */}
            <group position={[0, 0.018, -0.145]} rotation={[-Math.PI / 1.7, 0, 0]}>
              {/* Aluminum Back Lid */}
              <mesh position={[0, 0.15, 0]} castShadow>
                <boxGeometry args={[0.42, 0.28, 0.01]} />
                <meshStandardMaterial color="#D8DDE0" metalness={0.7} roughness={0.3} />
              </mesh>
              {/* Screen Bezel */}
              <mesh position={[0, 0.15, 0.006]}>
                <boxGeometry args={[0.41, 0.27, 0.002]} />
                <meshStandardMaterial color="#111113" roughness={0.8} />
              </mesh>
              {/* Glowing Interactive Display Surface */}
              <mesh position={[0, 0.15, 0.008]}>
                <planeGeometry args={[0.39, 0.25]} />
                <meshBasicMaterial map={screenTexture} toneMapped={false} />
              </mesh>
              {/* Subtle Screen Glow onto desk */}
              <pointLight
                position={[0, 0.15, 0.05]}
                intensity={activeSection === 'projects' ? 1.4 : 0.6}
                distance={0.8}
                color="#C9C3D8"
              />
            </group>

            {/* Wireless Mouse */}
            <mesh position={[0.32, 0.02, 0.06]} castShadow receiveShadow>
              <boxGeometry args={[0.07, 0.022, 0.11]} />
              <meshStandardMaterial color="#FAF7F2" roughness={0.4} />
            </mesh>
          </group>
        </InteractiveObject>

        {/* ============================================================ */}
        {/* INTERACTIVE OBJECT 2: STACKED NOTEBOOKS & PEN (ABOUT) */}
        {/* ============================================================ */}
        <InteractiveObject
          id="about"
          title="About Me"
          subtitle="Click Journal"
          beaconPosition={[0.45, 1.15, 0.1]}
          isActive={activeSection === 'about'}
          onSelect={onSelectSection}
          onHover={onHoverObject}
        >
          <group position={[0.45, 0.87, 0.1]} rotation={[0, -0.15, 0]}>
            {/* Bottom Large Journal (Dusty Rose Hardcover) */}
            <mesh position={[0, 0.015, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.26, 0.03, 0.35]} />
              <meshStandardMaterial color="#C99B9B" roughness={0.6} />
            </mesh>
            {/* Page Edges */}
            <mesh position={[0.01, 0.015, 0]}>
              <boxGeometry args={[0.24, 0.026, 0.33]} />
              <meshStandardMaterial color="#F5EFE6" roughness={0.8} />
            </mesh>

            {/* Top Smaller Notebook (Cream Linen) */}
            <mesh position={[-0.02, 0.045, -0.02]} rotation={[0, 0.18, 0]} castShadow>
              <boxGeometry args={[0.2, 0.025, 0.28]} />
              <meshStandardMaterial color="#EEE8DE" roughness={0.65} />
            </mesh>

            {/* Bookmark Satin Ribbon */}
            <mesh position={[0.06, 0.055, 0.12]} rotation={[0, 0, 0.1]}>
              <boxGeometry args={[0.02, 0.005, 0.14]} />
              <meshStandardMaterial color="#613F4D" roughness={0.4} />
            </mesh>

            {/* Brass Fountain Pen */}
            <group position={[0.15, 0.015, 0]} rotation={[0, 0.2, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.007, 0.007, 0.24, 8]} />
                <meshStandardMaterial color="#D4A373" metalness={0.85} roughness={0.2} />
              </mesh>
              {/* Pen Nib */}
              <mesh position={[0, 0.125, 0]}>
                <coneGeometry args={[0.007, 0.025, 8]} />
                <meshStandardMaterial color="#FDF5E6" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          </group>
        </InteractiveObject>

        {/* Brass Gooseneck Desk Lamp with Active Warm Light */}
        <group position={[-0.72, 0.87, -0.3]}>
          {/* Base */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.075, 0.08, 0.025, 16]} />
            <meshStandardMaterial color="#D4A373" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Vertical Stem */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
            <meshStandardMaterial color="#D4A373" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Curved Arm */}
          <mesh position={[0.1, 0.42, 0.1]} rotation={[0.4, 0, -0.5]} castShadow>
            <cylinderGeometry args={[0.014, 0.014, 0.26, 8]} />
            <meshStandardMaterial color="#D4A373" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Lamp Shade (Conical Bell) */}
          <mesh position={[0.2, 0.47, 0.2]} rotation={[0.6, 0, -0.4]} castShadow>
            <coneGeometry args={[0.09, 0.13, 16, 1, true]} />
            <meshStandardMaterial color="#D4A373" metalness={0.85} roughness={0.3} side={THREE.DoubleSide} />
          </mesh>
          {/* Warm Light Source shining on the desk */}
          <pointLight
            position={[0.2, 0.44, 0.2]}
            color="#FFE5B4"
            intensity={2.4}
            distance={4.2}
            decay={2}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
          />
        </group>

        {/* Ceramic Coffee Mug */}
        <group position={[-0.55, 0.87, 0.2]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.09, 14]} />
            <meshStandardMaterial color="#EEE8DE" roughness={0.5} />
          </mesh>
          {/* Coffee liquid surface */}
          <mesh position={[0, 0.038, 0]}>
            <circleGeometry args={[0.04, 14]} />
            <meshStandardMaterial color="#3E2723" roughness={0.2} />
          </mesh>
        </group>

        {/* Potted Mini Succulent */}
        <group position={[0.7, 0.87, -0.3]}>
          {/* Faceted Ceramic Pot */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.06, 0.045, 0.08, 6]} />
            <meshStandardMaterial color="#FAF7F2" roughness={0.3} />
          </mesh>
          {/* Fleshy Succulent Leaves */}
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i * Math.PI * 2) / 5) * 0.03,
                0.06,
                Math.sin((i * Math.PI * 2) / 5) * 0.03,
              ]}
              rotation={[0.3, (i * Math.PI * 2) / 5, 0.2]}
            >
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshStandardMaterial color="#8B9E87" roughness={0.8} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ============================================================ */}
      {/* INTERACTIVE OBJECT 3: MINI BOOKSHELF & CURATED STACK (SKILLS) */}
      {/* ============================================================ */}
      <InteractiveObject
        id="skills"
        title="Skills & Craft"
        subtitle="Click Bookshelf"
        beaconPosition={[-1.3, 1.4, 0.4]}
        isActive={activeSection === 'skills'}
        onSelect={onSelectSection}
        onHover={onHoverObject}
      >
        <group position={[-1.3, 0.1, 0.4]}>
          {/* Low Natural Wood Bookshelf / Credenza */}
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.48, 0.9, 0.9]} />
            <meshStandardMaterial color="#8E6B53" roughness={0.65} />
          </mesh>
          {/* Bookshelf Inner Hollow */}
          <mesh position={[0.05, 0.45, 0]}>
            <boxGeometry args={[0.4, 0.8, 0.8]} />
            <meshStandardMaterial color="#6B503E" roughness={0.7} />
          </mesh>

          {/* Row of Colorful Hardcover Books on Bottom Shelf */}
          {[
            { c: '#613F4D', w: 0.07, h: 0.32, z: -0.28 },
            { c: '#EEE8DE', w: 0.06, h: 0.29, z: -0.21 },
            { c: '#C99B9B', w: 0.08, h: 0.35, z: -0.13 },
            { c: '#8B9E87', w: 0.07, h: 0.3, z: -0.05 },
            { c: '#C9C3D8', w: 0.08, h: 0.34, z: 0.04 },
            { c: '#D4A373', w: 0.06, h: 0.28, z: 0.12 },
            { c: '#613F4D', w: 0.09, h: 0.33, z: 0.21 },
          ].map((b, bi) => (
            <mesh key={bi} position={[0.06, 0.25 + b.h / 2, b.z]} castShadow receiveShadow>
              <boxGeometry args={[0.26, b.h, b.w]} />
              <meshStandardMaterial color={b.c} roughness={0.6} />
            </mesh>
          ))}

          {/* Top Shelf: Stack of horizontal design monographs */}
          <group position={[0.06, 0.65, 0]}>
            <mesh position={[0, 0.02, 0]} castShadow>
              <boxGeometry args={[0.26, 0.04, 0.3]} />
              <meshStandardMaterial color="#613F4D" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.06, 0]} castShadow>
              <boxGeometry args={[0.24, 0.035, 0.27]} />
              <meshStandardMaterial color="#E8CFCB" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.095, 0]} castShadow>
              <boxGeometry args={[0.22, 0.03, 0.25]} />
              <meshStandardMaterial color="#8B9E87" roughness={0.6} />
            </mesh>
          </group>

          {/* Ceramic Vase with Dried Botanical Sprig on Top */}
          <group position={[0, 0.98, -0.2]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.05, 0.07, 0.16, 12]} />
              <meshStandardMaterial color="#FAF7F2" roughness={0.4} />
            </mesh>
            {/* Dried lavender/wheat sprig */}
            <mesh position={[0, 0.16, 0]}>
              <cylinderGeometry args={[0.005, 0.005, 0.22, 6]} />
              <meshStandardMaterial color="#D4A373" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.25, 0]}>
              <sphereGeometry args={[0.03, 6, 6]} />
              <meshStandardMaterial color="#C9C3D8" roughness={0.8} />
            </mesh>
          </group>
        </group>
      </InteractiveObject>

      {/* ============================================================ */}
      {/* INTERACTIVE OBJECT 4: VINTAGE CAMERA ON SIDE TABLE (GALLERY) */}
      {/* ============================================================ */}
      <InteractiveObject
        id="gallery"
        title="Visual Gallery"
        subtitle="Click Camera"
        beaconPosition={[1.15, 1.05, 0.7]}
        isActive={activeSection === 'gallery'}
        onSelect={onSelectSection}
        onHover={onHoverObject}
      >
        <group position={[1.15, 0.1, 0.7]}>
          {/* Small Round Oak Accent Table */}
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 20]} />
            <meshStandardMaterial color="#B58F72" roughness={0.6} />
          </mesh>
          {/* Tripod Legs */}
          {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.18, 0.25, Math.sin(angle) * 0.18]}
              rotation={[Math.sin(angle) * 0.15, 0, -Math.cos(angle) * 0.15]}
              castShadow
            >
              <cylinderGeometry args={[0.02, 0.015, 0.5, 8]} />
              <meshStandardMaterial color="#8E6B53" roughness={0.7} />
            </mesh>
          ))}

          {/* Vintage Rangefinder 35mm Camera */}
          <group position={[0, 0.56, 0]} rotation={[0, -0.4, 0]}>
            {/* Camera Body (Black textured leatherette) */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.16, 0.09, 0.07]} />
              <meshStandardMaterial color="#222225" roughness={0.8} />
            </mesh>
            {/* Chrome Top Plate */}
            <mesh position={[0, 0.1, 0]} castShadow>
              <boxGeometry args={[0.165, 0.02, 0.072]} />
              <meshStandardMaterial color="#DDE2E5" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Viewfinder Window */}
            <mesh position={[0.04, 0.1, 0.037]}>
              <boxGeometry args={[0.03, 0.012, 0.005]} />
              <meshStandardMaterial color="#334455" roughness={0.1} />
            </mesh>
            {/* Shutter Button */}
            <mesh position={[-0.05, 0.115, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.015, 8]} />
              <meshStandardMaterial color="#DDE2E5" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Lens Barrel */}
            <mesh position={[0, 0.05, 0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.045, 0.05, 16]} />
              <meshStandardMaterial color="#333338" metalness={0.5} roughness={0.4} />
            </mesh>
            {/* Front Lens Glass with Blue Reflection */}
            <mesh position={[0, 0.05, 0.076]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.035, 16]} />
              <meshStandardMaterial color="#4A6572" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        </group>
      </InteractiveObject>

      {/* Potted Large Monstera Deliciosa by the deck edge */}
      <group position={[1.2, 0.05, -1.1]}>
        {/* Terracotta Plant Pot */}
        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.19, 0.48, 16]} />
          <meshStandardMaterial color="#C87A5B" roughness={0.8} />
        </mesh>
        {/* Pot Rim */}
        <mesh position={[0, 0.51, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.06, 16]} />
          <meshStandardMaterial color="#C87A5B" roughness={0.8} />
        </mesh>
        {/* Dark Potting Soil */}
        <mesh position={[0, 0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.24, 16]} />
          <meshStandardMaterial color="#3A281E" roughness={0.9} />
        </mesh>

        {/* Large Sculpted Monstera Leaves */}
        {[
          { rot: [0.4, 0.2, 0.3], pos: [0.1, 0.75, 0.1], s: 0.28 },
          { rot: [-0.3, 1.8, -0.4], pos: [-0.12, 0.7, -0.1], s: 0.32 },
          { rot: [0.5, -1.2, 0.2], pos: [0.15, 0.65, -0.12], s: 0.26 },
          { rot: [-0.4, -2.5, 0.4], pos: [-0.15, 0.82, 0.15], s: 0.35 },
          { rot: [0.2, 3.1, -0.3], pos: [0, 0.92, 0], s: 0.3 },
        ].map((leaf, li) => (
          <group
            key={li}
            position={leaf.pos as [number, number, number]}
            rotation={leaf.rot as [number, number, number]}
          >
            {/* Stem */}
            <mesh position={[0, -0.15, 0]}>
              <cylinderGeometry args={[0.012, 0.015, 0.35, 6]} />
              <meshStandardMaterial color="#6B8065" roughness={0.8} />
            </mesh>
            {/* Broad Leaf Blade */}
            <mesh castShadow>
              <sphereGeometry args={[leaf.s, 10, 8]} />
              <meshStandardMaterial
                color="#758E6F"
                roughness={0.7}
                metalness={0.1}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
