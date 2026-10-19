import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Background photo, scaled to cover the canvas, with a glass lens that follows the pointer.
function GlassScene({ src, reduce }) {
  const tex = useTexture(src);
  const { viewport, pointer } = useThree();
  const lens = useRef();
  const lensW = viewport.width < 4 ? viewport.width * 0.62 : Math.min(viewport.width * 0.42, 3.4);
  const lensH = lensW * 0.62;

  const planeSize = useMemo(() => {
    const imgAspect = tex.image.width / tex.image.height;
    const vAspect = viewport.width / viewport.height;
    if (vAspect > imgAspect) return [viewport.width, viewport.width / imgAspect];
    return [viewport.height * imgAspect, viewport.height];
  }, [tex, viewport.width, viewport.height]);

  useFrame((_, dt) => {
    if (!lens.current) return;
    const tx = reduce ? 0 : (pointer.x * viewport.width) / 2.6;
    const ty = reduce ? 0 : (pointer.y * viewport.height) / 2.6;
    const k = Math.min(1, dt * 5);
    lens.current.position.x += (tx - lens.current.position.x) * k;
    lens.current.position.y += (ty - lens.current.position.y) * k;
    lens.current.rotation.z = (lens.current.position.x / viewport.width) * -0.12;
  });

  return (
    <>
      <mesh>
        <planeGeometry args={planeSize} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <RoundedBox ref={lens} args={[lensW, lensH, 0.5]} radius={0.5} smoothness={8} position={[0, 0, 1]}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={1.4}
          roughness={0.04}
          ior={1.35}
          chromaticAberration={0.06}
          anisotropy={0.15}
          distortion={0.25}
          distortionScale={0.45}
          temporalDistortion={0.08}
          samples={6}
          resolution={256}
          backside={false}
        />
      </RoundedBox>
    </>
  );
}

export default function FluidGlass({ src, alt, reduce = false, className, style }) {
  return (
    <div className={className} style={{ position: "relative", overflow: "hidden", ...style }} role="img" aria-label={alt}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: false, outputColorSpace: THREE.SRGBColorSpace }}
        style={{ position: "absolute", inset: 0 }}
      >
        <color attach="background" args={["#14213D"]} />
        <Suspense fallback={null}>
          <GlassScene src={src} reduce={reduce} />
        </Suspense>
      </Canvas>
    </div>
  );
}
