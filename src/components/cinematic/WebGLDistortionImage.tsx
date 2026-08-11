"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import "./DistortionMaterial"; // Import shader registration

function ImageMesh({ src }: { src: string }) {
  const texture = useTexture(src);
  const materialRef = useRef<THREE.ShaderMaterial & {
    uHover: number;
    uMouse: THREE.Vector2;
    uTime: number;
  }>(null!);

  const [hovered, setHovered] = useState(false);

  // Animate uniforms on frame
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
    }
  });

  const handlePointerMove = (e: any) => {
    if (e.uv && materialRef.current) {
      materialRef.current.uMouse.set(e.uv.x, e.uv.y);
    }
  };

  const handlePointerOver = () => {
    setHovered(true);
    gsap.to(materialRef.current, {
      uHover: 1,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handlePointerOut = () => {
    setHovered(false);
    gsap.to(materialRef.current, {
      uHover: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <mesh
      onPointerMove={handlePointerMove}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry args={[4, 5, 32, 32]} />
      {/* @ts-ignore */}
      <distortionMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
}

export function WebGLDistortionImage({ src }: { src: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ImageMesh src={src} />
      </Canvas>
    </div>
  );
}