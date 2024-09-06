import { useRef } from "react";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";

const FrontFaceMaterial = shaderMaterial(
  {
    frontColor: new THREE.Color(0x0000ff),
    backColor: new THREE.Color(0xffffff),
  },
  // vertex shader
  `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  // fragment shader
  `
      uniform vec3 frontColor;
      uniform vec3 backColor;
      varying vec3 vNormal;
      void main() {
        float facing = dot(vNormal, vec3(0.0, 0.0, 1.0));
        gl_FragColor = vec4(mix(backColor, frontColor, smoothstep(0.0, 0.5, facing)), 1.0);
      }
    `
);

// Extend THREE with the custom material
extend({ FrontFaceMaterial });

export default function CardText({ text }) {
  const textProps = useControls("Text3D", {
    size: { value: 0.5, min: 0.1, max: 2, step: 0.1 },
    curveSegments: { value: 12, min: 1, max: 20, step: 1 },
    bevelEnabled: true,
    bevelSize: { value: 0.02, min: 0, max: 0.1, step: 0.001 },
    bevelThickness: { value: 0.02, min: 0, max: 0.1, step: 0.001 },
    bevelSegments: { value: 5, min: 1, max: 10, step: 1 },
    height: { value: 0.2, min: 0, max: 1, step: 0.01 },
    frontColor: "#0000ff",
    backColor: "#ffffff",
  });
  const frontFaceMaterialRef = useRef();

  return (
    <Text3D font="./helvetiker_regular.typeface.json" {...textProps}>
      {text}
      <frontFaceMaterial
        ref={frontFaceMaterialRef}
        frontColor={new THREE.Color(textProps.frontColor)}
        backColor={new THREE.Color(textProps.backColor)}
      />
    </Text3D>
  );
}
