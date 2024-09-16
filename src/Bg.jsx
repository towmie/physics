import { useControls } from "leva";
import vertexShader from "./shaders/circle/vertex.glsl";
import fragmentShader from "./shaders/circle/fragment.glsl";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Bg() {
  const shaderRef = useRef();
  const colorObject = {
    depthColor: "#171717",
    surfaceColor: "#ff0000",
  };

  const { bigElevation, bigFrequencyX, bigFrequencyY } = useControls({
    bigElevation: { value: 0.2, min: 0, max: 1, step: 0.01 },
    bigFrequencyX: { value: 3, min: 0, max: 10, step: 0.1 },
    bigFrequencyY: { value: 2, min: 0, max: 10, step: 0.1 },
  });

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <>
      <mesh>
        <planeGeometry args={[2, 2, 256, 256]} />
        <shaderMaterial
          ref={shaderRef}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={{
            uBigElevation: { value: bigElevation },
            uBigFrequency: {
              value: new THREE.Vector2(bigFrequencyX, bigFrequencyY),
            },
            uTime: { value: 0 },
            uSpeed: { value: 0.7 },

            uDepthColor: { value: new THREE.Color(colorObject.depthColor) },
            uSurfaceColor: { value: new THREE.Color(colorObject.surfaceColor) },
          }}
        />
      </mesh>
    </>
  );
}

export default Bg;
