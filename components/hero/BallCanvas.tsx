"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { palette } from "@/lib/tokens";
import { Ball } from "./Ball";

/**
 * Canvas du ballon 3D (SPEC §5/§6).
 * - dpr limité [1,2], powerPreference haute perf
 * - rendu à la demande : le ballon ne bougeant qu'au scroll, `Ball` déclenche
 *   `invalidate()` sur changement de progression ; au repos, zéro image rendue
 * - rendu totalement coupé quand le hero n'est plus visible (frameloop never)
 * - géométrie réduite sur mobile
 * - environnement sombre LOCAL via Lightformers (pas de preset réseau — le
 *   proxy bloquerait les HDRI distants). Éclairage cohérent Direction A :
 *   ambiance sombre, clé chaude, accent orange. Couleurs issues des tokens.
 */
export function BallCanvas({ progress }: { progress: MotionValue<number> }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // Géométrie réduite sur mobile (lu une fois — composant client-only ssr:false).
  const [segments] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? 32 : 64,
  );

  // Pause du rendu hors viewport (perf §6)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        frameloop={visible ? "demand" : "never"}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 40 }}
      >
        {/* Éclairage Direction A */}
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[3, 4, 5]}
          intensity={2.4}
          color={palette.paper}
        />
        {/* Rim light accent orange (signature) */}
        <directionalLight
          position={[-5, -1, -2]}
          intensity={1.6}
          color={palette.accent}
        />

        <Suspense fallback={null}>
          <Ball progress={progress} segments={segments} />

          {/* Environnement sombre pour des reflets crédibles (local) */}
          <Environment resolution={128}>
            <Lightformer
              form="rect"
              intensity={1.2}
              color={palette.paper}
              position={[3, 3, 4]}
              scale={[6, 6, 1]}
            />
            <Lightformer
              form="rect"
              intensity={0.6}
              color={palette.accent}
              position={[-4, -2, -3]}
              scale={[5, 5, 1]}
            />
            <Lightformer
              form="rect"
              intensity={0.25}
              color={palette.support}
              position={[0, -4, 2]}
              scale={[8, 4, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default BallCanvas;