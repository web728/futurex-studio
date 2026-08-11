// components/motion/hero-scene-wave.tsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

function AccentBrandWave({
  mouse,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetMouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

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
    const pos = meshRef.current.geometry.attributes.position;

    // Interactive Wave Mathematics
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Distance from mouse position for localized ripple
      const dx = x - targetMouse.current.x * 4;
      const dy = y - targetMouse.current.y * 3;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Localized ripple pulse on mouse proximity
      const mouseRipple = Math.sin(dist * 2.5 - time * 4) * Math.exp(-dist * 0.4) * 0.45;

      // Continuous base fluid ambient motion
      const baseWave =
        Math.sin(x * 1.2 + time * 1.4) * 0.22 +
        Math.cos(y * 1.2 + time * 1.4) * 0.22;

      pos.setZ(i, baseWave + mouseRipple);
    }

    pos.needsUpdate = true;

    // Smooth dynamic tilt on cursor move
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
    <mesh ref={meshRef} position={[0, -0.4, 0]} rotation={[-0.65, 0, 0]}>
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
      />
    </mesh>
  );
}

function DynamicBrandLighting({
  mouse,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  const accentLightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (!accentLightRef.current) return;

    // PointLight follows mouse position to create dynamic highlights on wave vertices
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
      {/* Soft White Rim Light */}
      <directionalLight position={[6, 8, 6]} intensity={1.8} color="#ffffff" />
      {/* Brand Accent Spot Lighting (#ff5a2a) */}
      <pointLight
        ref={accentLightRef}
        position={[0, 1, 3]}
        intensity={3.5}
        color="#ff5a2a"
        distance={12}
      />
      {/* Secondary Hover Highlight Glow (#ff7248) */}
      <pointLight
        position={[-5, -3, 2]}
        intensity={1.5}
        color="#ff7248"
        distance={10}
      />
    </>
  );
}

export function HeroSceneWave() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    mouse.current.x = (clientX / innerWidth) * 2 - 1;
    mouse.current.y = -(clientY / innerHeight) * 2 + 1;
  };

  return (
    <div
      className="absolute inset-0 z-0 h-full w-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <DynamicBrandLighting mouse={mouse} />
        <AccentBrandWave mouse={mouse} />

        {/* Ambient Floating Dust using Accent Brand Colors */}
        <Sparkles
          count={100}
          scale={[12, 10, 8]}
          size={2.5}
          speed={0.4}
          opacity={0.6}
          color="#ff5a2a"
        />

        {/* Post-processing Bloom Glow */}
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