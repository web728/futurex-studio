// components/cinematic/PovLiquidImage.tsx
"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface PovLiquidImageProps {
  src: string;
  alt?: string;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Distance-based liquid ripple from mouse
    float dist = distance(uv, uMouse);
    
    // Liquid displacement wave
    float wave = sin(dist * 20.0 - uHover * 6.28) * 0.02 * uHover;
    vec2 distortedUv = uv + vec2(wave);

    vec4 tex = texture2D(uTexture, distortedUv);

    // Convert texture to Grayscale / Black & White
    float gray = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    vec3 bwColor = vec3(gray) * 0.6; // Slightly darkened B&W base

    // Dynamic spotlight radius based on hover state
    float maskRadius = mix(0.0, 0.35, uHover);
    float mask = smoothstep(maskRadius, maskRadius - 0.15, dist);

    // Mix Black & White base with Full Original Color reveal
    vec3 finalColor = mix(bwColor, tex.rgb, mask);

    gl_FragColor = vec4(finalColor, tex.a);
  }
`;

export function PovLiquidImage({ src }: PovLiquidImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight || 1,
      0.1,
      1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear previous DOM canvas if hot-reloaded
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Texture Loader with Color Space fix for Next.js
    const loader = new THREE.TextureLoader();
const texture = loader.load(src, (tex) => {
  tex.colorSpace = THREE.SRGBColorSpace; // Ye line image ki visibility fix karti hai
  renderer.render(scene, camera);
});

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uHover: { value: 0 },
        uMouse: { value: new THREE.Vector2(-1.0, -1.0) }, // Default offscreen
      },
      transparent: true,
    });
    materialRef.current = material;

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 1.8),
      material
    );
    scene.add(plane);

    // Render loop
    let animationFrameId: number;
    const animate = () => {
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [src]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !materialRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;

    materialRef.current.uniforms.uMouse.value.set(x, y);
    gsap.to(materialRef.current.uniforms.uHover, {
      value: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!materialRef.current) return;
    gsap.to(materialRef.current.uniforms.uHover, {
      value: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[16/9] w-full overflow-hidden cursor-pointer"
    />
  );
}