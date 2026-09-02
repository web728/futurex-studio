// components/motion/hero-scene-wave.tsx
"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// Memoized Wave Component
const AccentBrandWave = ({
  mouse,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetMouse = useRef({ x: 0, y: 0 });
  const positionAttribute = useRef<THREE.BufferAttribute | null>(null);
  const initialPositions = useRef<Float32Array | null>(null);

  // Initialize geometry data once
  const handleGeometryCreation = useCallback(() => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    
    // Store reference to avoid repeated lookups
    positionAttribute.current = pos;
    // FIX: Directly use the array without type casting
    initialPositions.current = new Float32Array(pos.array);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !positionAttribute.current || !initialPositions.current) {
      if (!positionAttribute.current) handleGeometryCreation();
      return;
    }

    // Smooth lerp for mouse coordinates
    targetMouse.current.x = THREE.MathUtils.lerp(
      targetMouse.current.x,
      mouse.current.x,
      delta * 3
    );
    targetMouse.current.y = THREE.MathUtils.lerp(
      targetMouse.current.y,
      mouse.current.y,
      delta * 3
    );

    const time = state.clock.getElapsedTime();
    const pos = positionAttribute.current;
    const array = pos.array as Float32Array;
    const initialArray = initialPositions.current;

    // Optimized wave calculation - single pass, direct array manipulation
    const count = pos.count;
    const mouseX = targetMouse.current.x * 4;
    const mouseY = targetMouse.current.y * 3;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = initialArray[i3];
      const y = initialArray[i3 + 1];

      // Distance calculation
      const dx = x - mouseX;
      const dy = y - mouseY;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq);

      // Optimized wave formulas
      const expFactor = Math.exp(-dist * 0.4);
      const mouseRipple = Math.sin(dist * 2.5 - time * 4) * expFactor * 0.45;
      const baseWave =
        Math.sin(x * 1.2 + time * 1.4) * 0.22 +
        Math.cos(y * 1.2 + time * 1.4) * 0.22;

      array[i3 + 2] = baseWave + mouseRipple;
    }

    pos.needsUpdate = true;

    // Smooth dynamic tilt
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -0.65 + targetMouse.current.y * 0.25,
      delta * 2
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetMouse.current.x * 0.25,
      delta * 2
    );
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, -0.4, 0]} 
      rotation={[-0.65, 0, 0]}
      onUpdate={handleGeometryCreation}
    >
      <planeGeometry args={[14, 9, 64, 64]} />
      <meshPhysicalMaterial
        color="#08080a"
        emissive="#ff5a2a"
        emissiveIntensity={0.35}
        roughness={0.15}
        metalness={0.85}
        clearcoat={1}
        clearcoatRoughness={0.1}
        wireframe
        toneMapped={false}
      />
    </mesh>
  );
};

// Memoized Lighting Component
const DynamicBrandLighting = ({
  mouse,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
}) => {
  const accentLightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (!accentLightRef.current) return;

    accentLightRef.current.position.x = THREE.MathUtils.lerp(
      accentLightRef.current.position.x,
      mouse.current.x * 6,
      delta * 3
    );
    accentLightRef.current.position.y = THREE.MathUtils.lerp(
      accentLightRef.current.position.y,
      mouse.current.y * 4,
      delta * 3
    );
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[6, 8, 6]} intensity={1.8} color="#ffffff" />
      <pointLight
        ref={accentLightRef}
        position={[0, 1, 3]}
        intensity={3.5}
        color="#ff5a2a"
        distance={12}
        decay={2}
      />
      <pointLight
        position={[-5, -3, 2]}
        intensity={1.5}
        color="#ff7248"
        distance={10}
        decay={2}
      />
    </>
  );
};

// Memoized Sparkles Wrapper
const MemoizedSparkles = () => (
  <Sparkles
    count={100}
    scale={[12, 10, 8]}
    size={2.5}
    speed={0.4}
    opacity={0.6}
    color="#ff5a2a"
  />
);

export function HeroSceneWave() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    mouse.current.x = (clientX / innerWidth) * 2 - 1;
    mouse.current.y = -(clientY / innerHeight) * 2 + 1;
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 h-full w-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 48 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          precision: "mediump",
          logarithmicDepthBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        frameloop="always"
      >
        <AdaptiveDpr pixelated />
        <DynamicBrandLighting mouse={mouse} />
        <AccentBrandWave mouse={mouse} />
        <MemoizedSparkles />

        <EffectComposer multisampling={4}>
          <Bloom
            luminanceThreshold={0.4}
            luminanceSmoothing={0.8}
            intensity={0.8}
          />
          <Vignette eskil={false} offset={0.1} darkness={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}