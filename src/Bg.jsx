import { useControls } from "leva";
import vertexShader from "./shaders/circle/vertex.glsl";
import fragmentShader from "./shaders/circle/fragment.glsl";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { MeshPortalMaterial } from "@react-three/drei";

function Bg() {
  const shaderRef = useRef();
  const colorObject = {
    depthColor: "#ff765a",
    surfaceColor: "#ff0000",
  };

  const { bigElevation, bigFrequencyX, bigFrequencyY, size } = useControls({
    size: { value: 0.9, min: 0, max: 10, step: 0.1 },
    scaleX: { value: 5, min: 0, max: 10, step: 0.1 },
    scaleY: { value: 5, min: 0, max: 10, step: 0.1 },
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
      <group>
        <EffectComposer>
          <Noise premultiply blendFunction={BlendFunction.ADD} />
        </EffectComposer>
        <mesh position={[0, 0, 0.8]}>
          <circleGeometry args={[size, 256]} />
          <MeshPortalMaterial>
            <ambientLight intensity={1} />
            <mesh>
              <planeGeometry args={[20, 10, 256, 256]} />
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
                  uSpeed: { value: 0.2 },

                  uDepthColor: {
                    value: new THREE.Color(colorObject.depthColor),
                  },
                  uSurfaceColor: {
                    value: new THREE.Color(colorObject.surfaceColor),
                  },
                }}
              />
            </mesh>
          </MeshPortalMaterial>
        </mesh>
      </group>
    </>
  );
}

export default Bg;
