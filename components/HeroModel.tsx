"use client";

import React, { useEffect, useState } from "react";

export default function HeroModel() {
  const [Fiber, setFiber]: any = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const name = "@" + "react-three/fiber";
        // @ts-ignore - optional dependency, avoid build-time resolution
        const mod = await import(name as any);
        if (mounted) setFiber(mod);
      } catch (e) {
        // Module not installed — silently fallback to placeholder
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (!Fiber) {
    return (
      <div className="h-64 w-full rounded-xl bg-gradient-to-br from-slate-100 to-white/80 flex items-center justify-center text-sm text-slate-600">
        3D preview (install `three` and `@react-three/fiber` to enable)
      </div>
    );
  }

  const Canvas = Fiber.Canvas as any;

  return (
    <div className="h-64 w-full rounded-xl overflow-hidden bg-transparent">
      {React.createElement(
        Canvas,
        { camera: { position: [0, 0, 6], fov: 45 } },
        React.createElement("ambientLight", { intensity: 0.6 }),
        React.createElement("directionalLight", { position: [5, 5, 5], intensity: 0.8 }),
        React.createElement(
          "mesh",
          { rotation: [0.6, 0.8, 0.2] },
          React.createElement("boxGeometry", { args: [2.4, 2.4, 2.4] }),
          React.createElement("meshStandardMaterial", { color: "#60A5FA", metalness: 0.6, roughness: 0.2 })
        )
      )}
    </div>
  );
}
