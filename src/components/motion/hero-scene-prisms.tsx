// components/motion/hero-scene-prisms.tsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

function GlassGrid({
  mouse,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const items = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Mouse Parallax & Dynamic Tilt
    const targetRotX = -mouse.current.y * 0.35;
    const targetRotY = mouse.current.x * 0.35;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      delta * 2
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      delta * 2
    );

    // Camera inertia
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mouse.current.x * 0.4,
      delta * 1.5
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      mouse.current.y * 0.4,
      delta * 1.5
    );

    // Dynamic rotation for prisms
    items.current.forEach((mesh, index) => {
      if (!mesh) return;
      mesh.rotation.x += delta * (0.1 + index * 0.02);
      mesh.rotation.y += delta * (0.15 + index * 0.03);
    });
  });

  return (
    <group ref={groupRef}>
      {/* Prism 1: Main Tall Pillar */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1}>
        <mesh
          ref={(el) => {
            if (el) items.current[0] = el;
          }}
          position={[1.8, 0, -0.2]}
          scale={[0.8, 2.2, 0.8]}
        >
          <cylinderGeometry args={[1, 1, 2, 6]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.95}
            roughness={0.08}
            ior={1.5}
            chromaticAberration={0.12}
            color="#ffffff"
          />
        </mesh>
      </Float>

      {/* Prism 2: Floating Octahedron Crystal */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh
          ref={(el) => {
            if (el) items.current[1] = el;
          }}
          position={[-1.8, -0.8, 0.5]}
          scale={0.9}
        >
          <octahedronGeometry args={[1.2, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={12}
            resolution={256}
            transmission={0.9}
            roughness={0.1}
            ior={1.3}
            chromaticAberration={0.08}
            color="#d4af37"
          />
        </mesh>
      </Float>

      {/* Prism 3: Wireframe Ring Frame */}
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh
          ref={(el) => {
            if (el) items.current[2] = el;
          }}
          position={[0.2, 1.6, -1]}
          scale={0.75}
        >
          <torusGeometry args={[1.5, 0.08, 16, 100]} />
          <meshStandardMaterial color="#555555" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroScenePrisms() {
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
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 6, 4]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, -4, 2]} intensity={1.5} color="#d4af37" />

        <GlassGrid mouse={mouse} />

        <Sparkles count={80} scale={[10, 10, 10]} size={2.5} speed={0.3} color="#ffffff" />

        <EffectComposer multisampling={4}>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.8} intensity={0.5} />
          <Vignette offset={0.1} darkness={0.65} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}