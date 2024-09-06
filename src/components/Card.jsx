import { useState, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { RigidBody } from "@react-three/rapier";
import { RoundedBox, MeshTransmissionMaterial } from "@react-three/drei";

export default function Card({ children, ...props }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  const { camera, raycaster, pointer } = useThree();

  const transmissionProps = useControls("Transmission Material", {
    backside: false,
    backsideThickness: { value: -0.25, min: -1, max: 1, step: 0.01 },
    backsideRoughness: { value: 0.3, min: 0, max: 1, step: 0.01 },
    envMapIntensity: { value: 0.25, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.75, min: 0, max: 2, step: 0.01 },
    roughness: { value: 0.01, min: 0, max: 1, step: 0.01 },
    ior: { value: 2.2, min: 1, max: 3, step: 0.01 },
    chromaticAberration: { value: 0.1, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 0.2, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
  });

  useFrame(() => {
    if (meshRef.current) {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(meshRef.current);
      setHovered(intersects.length > 0);
    }
  });

  return (
    <>
      <RigidBody restitution={0.4}>
        <RoundedBox
          args={[2, 1, 0.1]}
          radius={0.1}
          scale={2}
          {...props}
          ref={meshRef}
        >
          {!hovered ? (
            <MeshTransmissionMaterial {...transmissionProps} />
          ) : (
            <meshStandardMaterial color="red" />
          )}
        </RoundedBox>
        {children}
      </RigidBody>
    </>
  );
}
