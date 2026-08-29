"use client";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, PerspectiveCamera } from "three";

function RotatingBox() {
  const ref = useRef<Mesh | null>(null);
  return (
    <mesh
      ref={ref}
      rotation={[0.6, 0.8, 0.2]}
      onPointerOver={() => {}}
      onPointerOut={() => {}}
    >
      <boxGeometry args={[2.4, 2.4, 2.4]} />
      <meshStandardMaterial color="#60A5FA" metalness={0.6} roughness={0.2} />
    </mesh>
  );
}

export default function HeroModel() {
  return (
    <div className="h-64 w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <RotatingBox />
      </Canvas>
    </div>
  );
}
