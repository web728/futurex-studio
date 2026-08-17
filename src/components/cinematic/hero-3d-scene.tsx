"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

const ORB_COUNT = 36; // Reduced count slightly for optimized frame-rate
const REPEL_RADIUS = 2.4;
const REPEL_STRENGTH = 4.2;
const RETURN_SPEED = 0.045;

function InteractiveFloatingOrbs() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const mousePosition = useRef<THREE.Vector3>(new THREE.Vector3(1000, 1000, 0));

  const [initialPositions, currentPositions, velocities, scales] = useMemo(() => {
    const initPos: THREE.Vector3[] = [];
    const currPos: THREE.Vector3[] = [];
    const vels: THREE.Vector3[] = [];
    const scs: number[] = [];

    for (let i = 0; i < ORB_COUNT; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 4;

      initPos.push(new THREE.Vector3(x, y, z));
      currPos.push(new THREE.Vector3(x, y, z));
      vels.push(new THREE.Vector3(0, 0, 0));
      scs.push(Math.random() * 0.2 + 0.08);
    }

    return [initPos, currPos, vels, scs];
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const _target = useMemo(() => new THREE.Vector3(), []);
  const _pushDir = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    mousePosition.current.set(
      (state.pointer.x * viewport.width) / 2,
      (state.pointer.y * viewport.height) / 2,
      0
    );

    const time = state.clock.getElapsedTime();

    for (let i = 0; i < ORB_COUNT; i++) {
      const orig = initialPositions[i];
      const curr = currentPositions[i];
      const vel = velocities[i];

      const idleX = orig.x + Math.sin(time * 1.1 + i) * 0.18;
      const idleY = orig.y + Math.cos(time * 1.4 + i * 2) * 0.18;
      const idleZ = orig.z + Math.sin(time * 0.7 + i * 0.5) * 0.22;

      _target.set(idleX, idleY, idleZ);
      const distToMouse = curr.distanceTo(mousePosition.current);

      if (distToMouse < REPEL_RADIUS) {
        _pushDir.subVectors(curr, mousePosition.current).normalize();
        const force = (1 - distToMouse / REPEL_RADIUS) * REPEL_STRENGTH;
        vel.addScaledVector(_pushDir, force * 0.07);
      }

      curr.add(vel);
      vel.multiplyScalar(0.88);
      curr.lerp(_target, RETURN_SPEED);

      dummy.position.copy(curr);
      dummy.scale.setScalar(scales[i]);
      dummy.rotation.set(time * 0.2 + i, time * 0.3, 0);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, ORB_COUNT]}>
      {/* Reduced poly segments (12x12) for smoother performance */}
      <sphereGeometry args={[1, 12, 12]} />
      <meshPhysicalMaterial
        color="#e84c1c"
        emissive="#e84c1c"
        emissiveIntensity={0.35}
        roughness={0.12}
        metalness={0.88}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </instancedMesh>
  );
}

export function Hero3DScene() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          powerPreference: "high-performance",
          alpha: true 
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#4fc3ff" />

        <InteractiveFloatingOrbs />

        <Environment background={false} resolution={128}>
          <Lightformer form="rect" intensity={5} color="#e84c1c" position={[4, 3, 2]} scale={[5, 5, 1]} />
          <Lightformer form="rect" intensity={3} color="#4fc3ff" position={[-4, -2, -2]} scale={[6, 6, 1]} />
        </Environment>

        {/* Disabled extra AA inside EffectComposer for 60FPS lock */}
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.8} luminanceThreshold={0.4} luminanceSmoothing={0.9} />
          <Vignette eskil={false} offset={0.1} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}