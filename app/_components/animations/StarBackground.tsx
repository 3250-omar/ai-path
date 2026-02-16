"use client";

import { useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { useFrame, Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.cjs";

// Ensure maath is installed: npm install maath @react-three/fiber @react-three/drei three

function Stars(props: Record<string, unknown>) {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(
    () =>
      random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array,
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function StarBackground() {
  // Check if libraries are installed, if not, return a fallback or simplified version
  // For this demo, we'll assume they will be installed. If not, user should install them.
  // Fallback CSS animation can be used if 3D libraries are too heavy.

  return (
    <div className="w-full h-auto fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  );
}
