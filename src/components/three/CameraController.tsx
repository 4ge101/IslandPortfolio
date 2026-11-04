import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import gsap from 'gsap';
import { CAMERA_VIEWS } from '../../lib/constants';
import type { SectionId } from '../../types/portfolio';

interface CameraControllerProps {
  activeSection: SectionId;
  isMobile: boolean;
  reducedMotion: boolean;
}

export function CameraController({
  activeSection,
  isMobile,
  reducedMotion,
}: CameraControllerProps) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Current animated target coordinates for OrbitControls
  const currentTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.2, 0));
  // GSAP tween tracking
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Pointer parallax offsets (for overview mode)
  const parallaxOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const view = CAMERA_VIEWS[activeSection] || CAMERA_VIEWS.overview;

    // Mobile adjustments: pull back slightly on small screens
    const mobileScale = isMobile ? (activeSection === 'overview' ? 1.35 : 1.2) : 1.0;
    const targetPos = new THREE.Vector3(
      view.position[0] * mobileScale,
      view.position[1] * mobileScale,
      view.position[2] * mobileScale
    );
    const targetLook = new THREE.Vector3(...view.target);

    if (reducedMotion) {
      camera.position.copy(targetPos);
      currentTarget.current.copy(targetLook);
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetLook);
        controlsRef.current.update();
      }
      return;
    }

    // Kill any running tween
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    const duration = activeSection === 'overview' ? 1.6 : 1.4;

    // Animate camera position and orbit target using GSAP
    const animObj = {
      cx: camera.position.x,
      cy: camera.position.y,
      cz: camera.position.z,
      tx: currentTarget.current.x,
      ty: currentTarget.current.y,
      tz: currentTarget.current.z,
    };

    tweenRef.current = gsap.to(animObj, {
      cx: targetPos.x,
      cy: targetPos.y,
      cz: targetPos.z,
      tx: targetLook.x,
      ty: targetLook.y,
      tz: targetLook.z,
      duration,
      ease: 'power3.inOut',
      onUpdate: () => {
        camera.position.set(animObj.cx, animObj.cy, animObj.cz);
        currentTarget.current.set(animObj.tx, animObj.ty, animObj.tz);
        if (controlsRef.current) {
          controlsRef.current.target.copy(currentTarget.current);
          controlsRef.current.update();
        }
      },
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [activeSection, isMobile, reducedMotion, camera]);

  useFrame((state, delta) => {
    // Subtle pointer parallax only when in overview or workspace view
    if (activeSection === 'overview' && !isMobile && !reducedMotion) {
      const targetParallaxX = (state.pointer.x * 0.8);
      const targetParallaxY = (state.pointer.y * 0.4);

      parallaxOffset.current.x = THREE.MathUtils.damp(
        parallaxOffset.current.x,
        targetParallaxX,
        2.5,
        delta
      );
      parallaxOffset.current.y = THREE.MathUtils.damp(
        parallaxOffset.current.y,
        targetParallaxY,
        2.5,
        delta
      );

      // Nudge target slightly with mouse
      if (controlsRef.current) {
        controlsRef.current.target.x = currentTarget.current.x + parallaxOffset.current.x * 0.4;
        controlsRef.current.target.y = currentTarget.current.y + parallaxOffset.current.y * 0.3;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.65}
      zoomSpeed={0.8}
      minDistance={isMobile ? 2.2 : 1.8}
      maxDistance={24}
      minPolarAngle={Math.PI / 8}
      maxPolarAngle={Math.PI / 2.08} // Never let camera flip below the horizon
      enablePan={false}
    />
  );
}
