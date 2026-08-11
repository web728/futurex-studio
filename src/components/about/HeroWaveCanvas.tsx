"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const EASE_CINEMATIC = "power3.out";

export function HeroWaveCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 7.5;
    camera.position.y = 1.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(26, 16, 64, 64);

    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        vUv = uv;
        vec3 pos = position;

        float dist = distance(uv, uMouse);
        float wave = sin(pos.x * 1.4 + uTime * 1.1) * cos(pos.y * 1.4 + uTime * 0.7);
        float mouseImpulse = smoothstep(0.45, 0.0, dist) * 0.75;

        pos.z += wave * 0.55 + mouseImpulse;
        vElevation = pos.z;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        vec3 baseColor = vec3(0.04, 0.05, 0.07);
        vec3 accentColor = vec3(0.23, 0.51, 0.96);

        float alpha = smoothstep(-0.6, 1.1, vElevation) * 0.32;
        vec3 finalColor = mix(baseColor, accentColor, vElevation * 0.45 + 0.3);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: true,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.38;
    scene.add(mesh);

    let animationFrameId: number;
    const clock = new THREE.Clock();
    let isVisible = true;
    let isPaused = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const mouseTarget = { x: 0.5, y: 0.5 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseTarget.x = (e.clientX - rect.left) / rect.width;
      mouseTarget.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener("pointermove", handlePointerMove);

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible || isPaused) return;

      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.x += (mouseTarget.x - uniforms.uMouse.value.x) * 0.05;
      uniforms.uMouse.value.y += (mouseTarget.y - uniforms.uMouse.value.y) * 0.05;
      renderer.render(scene, camera);
    };

    render();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    gsap.fromTo(
      container,
      { opacity: 0, scale: 1.03 },
      { opacity: 0.65, scale: 1, duration: 1.6, ease: EASE_CINEMATIC }
    );

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-0"
    />
  );
}