// components/motion/LiquidImageCanvas.tsx
"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface LiquidImageCanvasProps {
  images: string[];
  activeIndex: number;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform float uProgress;
  uniform float uWaveIntensity;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Fluid distortion wave
    float distortion = sin(uv.y * 10.0 + uProgress * 6.28318) * 0.05 * uWaveIntensity;
    vec2 distortedUv = vec2(uv.x + distortion * (1.0 - uProgress), uv.y);

    // RGB Shift (Chromatic Aberration) during transition
    float rgbShift = uWaveIntensity * 0.02 * sin(uProgress * 3.14159);
    
    vec4 tex1R = texture2D(uTexture1, distortedUv + vec2(rgbShift, 0.0));
    vec4 tex1G = texture2D(uTexture1, distortedUv);
    vec4 tex1B = texture2D(uTexture1, distortedUv - vec2(rgbShift, 0.0));
    vec4 color1 = vec4(tex1R.r, tex1G.g, tex1B.b, tex1G.a);

    vec4 tex2R = texture2D(uTexture2, distortedUv + vec2(rgbShift, 0.0));
    vec4 tex2G = texture2D(uTexture2, distortedUv);
    vec4 tex2B = texture2D(uTexture2, distortedUv - vec2(rgbShift, 0.0));
    vec4 color2 = vec4(tex2R.r, tex2G.g, tex2B.b, tex2G.a);

    // Smooth Dissolve Transition
    vec4 finalColor = mix(color1, color2, uProgress);
    gl_FragColor = finalColor;
  }
`;

export function LiquidImageCanvas({ images, activeIndex }: LiquidImageCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const prevIndexRef = useRef(activeIndex);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Texture Loader
    const loader = new THREE.TextureLoader();
    const loadedTextures: THREE.Texture[] = images.map((src) => {
      const tex = loader.load(src);
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      return tex;
    });
    texturesRef.current = loadedTextures;

    // Material with custom shaders
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture1: { value: loadedTextures[activeIndex] || loadedTextures[0] },
        uTexture2: { value: loadedTextures[activeIndex] || loadedTextures[0] },
        uProgress: { value: 1 },
        uWaveIntensity: { value: 0 },
      },
      transparent: true,
    });
    materialRef.current = material;

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
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
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [images]);

  // Handle Image Change Transition
  useEffect(() => {
    if (!materialRef.current || prevIndexRef.current === activeIndex) return;

    const prevTexture = texturesRef.current[prevIndexRef.current];
    const newTexture = texturesRef.current[activeIndex];

    materialRef.current.uniforms.uTexture1.value = prevTexture;
    materialRef.current.uniforms.uTexture2.value = newTexture;
    materialRef.current.uniforms.uProgress.value = 0;

    gsap.to(materialRef.current.uniforms.uProgress, {
      value: 1,
      duration: 1.2,
      ease: "power3.inOut",
    });

    // Wave / Distortion Bump
    gsap.fromTo(
      materialRef.current.uniforms.uWaveIntensity,
      { value: 1.5 },
      { value: 0, duration: 1.2, ease: "power2.out" }
    );

    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  return <div ref={containerRef} className="h-full w-full overflow-hidden rounded-2xl" />;
}