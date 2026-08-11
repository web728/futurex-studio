"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

// Configuration for Orbs
const ORB_COUNT = 85;
const REPEL_RADIUS = 2.2; // Radius of mouse influence field
const REPEL_STRENGTH = 4.5; // Force pushing balls away
const RETURN_SPEED = 0.05; // Lerp speed back to original grid/sphere position

function FloatingRepelOrbs() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  // Pointer position in 3D world space
  const mousePosition = useRef<THREE.Vector3>(new THREE.Vector3(1000, 1000, 0));

  // Generate initial positions & randomized offsets for floating feel
  const [initialPositions, currentPositions, velocities, scales] = useMemo(() => {
    const initPos: THREE.Vector3[] = [];
    const currPos: THREE.Vector3[] = [];
    const vels: THREE.Vector3[] = [];
    const scs: number[] = [];

    for (let i = 0; i < ORB_COUNT; i++) {
      // Spread across a 3D field inside viewport boundaries
      const x = (Math.random() - 0.5) * 7;
      const y = (Math.random() - 0.5) * 4.5;
      const z = (Math.random() - 0.5) * 4;

      initPos.push(new THREE.Vector3(x, y, z));
      currPos.push(new THREE.Vector3(x, y, z));
      vels.push(new THREE.Vector3(0, 0, 0));
      scs.push(Math.random() * 0.18 + 0.08); // Random orb sizes
    }

    return [initPos, currPos, vels, scs];
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Map 2D pointer (-1 to +1) directly into 3D camera space coords
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

      // 1. Natural idle floating motion (Perlin-like wave)
      const idleX = orig.x + Math.sin(time * 1.2 + i) * 0.15;
      const idleY = orig.y + Math.cos(time * 1.5 + i * 2) * 0.15;
      const idleZ = orig.z + Math.sin(time * 0.8 + i * 0.5) * 0.2;

      const target = new THREE.Vector3(idleX, idleY, idleZ);

      // 2. Calculate Distance from Mouse Pointer
      const distToMouse = curr.distanceTo(mousePosition.current);

      if (distToMouse < REPEL_RADIUS) {
        // Calculate Repel Push Direction
        const pushDir = new THREE.Vector3()
          .subVectors(curr, mousePosition.current)
          .normalize();

        const force = (1 - distToMouse / REPEL_RADIUS) * REPEL_STRENGTH;
        vel.addScaledVector(pushDir, force * 0.08);
      }

      // Apply Velocity & Friction (Damping)
      curr.add(vel);
      vel.multiplyScalar(0.88); // Smooth deceleration

      // Smoothly pull back to idle target position (Spring Return)
      curr.lerp(target, RETURN_SPEED);

      // Apply Transformation to Instanced Mesh
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
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        color="#e84c1c"
        emissive="#e84c1c"
        emissiveIntensity={0.25}
        roughness={0.1}
        metalness={0.85}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </instancedMesh>
  );
}

export function Hero3DBooth({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#4fc3ff" />

        {/* Interactive Mouse-Scatter Orbs */}
        <FloatingRepelOrbs />

        {/* Studio Lighting & Glow Reflections */}
        <Environment background={false} resolution={256}>
          <Lightformer
            form="rect"
            intensity={5}
            color="#e84c1c"
            position={[4, 3, 2]}
            scale={[5, 5, 1]}
          />
          <Lightformer
            form="rect"
            intensity={3}
            color="#4fc3ff"
            position={[-4, -2, -2]}
            scale={[6, 6, 1]}
          />
          <Lightformer
            form="ring"
            intensity={3}
            color="#ffffff"
            position={[0, 5, 0]}
            scale={8}
          />
        </Environment>
      </Canvas>
    </div>
  );
}