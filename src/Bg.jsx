import { useControls } from "leva";
import vertexShader from "./shaders/circle/vertex.glsl";
import fragmentShader from "./shaders/circle/fragment.glsl";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Bg() {
  const shaderRef = useRef();

  useFrame((state) => {
    if (shaderRef.current) {
      const uniforms = shaderRef.current.uniforms;
      uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <>
      <group>
        <mesh>
          <planeGeometry args={[20, 10, 512, 512]} />
          <shaderMaterial
            ref={shaderRef}
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            uniforms={{
              uBigElevation: { value: 0.3 },
              uBigFrequency: {
                value: new THREE.Vector2(8, 8),
              },
              uTime: { value: 0 },
              uSpeed: { value: 0.2 },
              uDepthColor: {
                value: new THREE.Color("#c8c8c8"),
              },
              uSurfaceColor: {
                value: new THREE.Color("#ff0404"),
              },
            }}
          />
        </mesh>
      </group>
    </>
  );
}

export default Bg;
