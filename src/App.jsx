import { Canvas, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import {
  MeshTransmissionMaterial,
  OrbitControls,
  OrthographicCamera,
  RoundedBox,
  Text3D,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useControls } from "leva";

// const boxesInfo = [
//   {
//     // link:'https://www.google.com',
//     text: "ya",
//     scale: [4, 3, 0.8],
//     position: [-4, 4, 0],
//   },
//   {
//     // link:'https://www.google.com',
//     text: "fb",
//     scale: [8, 5, 0.8],
//     position: [4, -4, 0],
//   },
//   {
//     // link:'https://www.google.com',
//     text: "Google",
//     scale: [3, 3, 0.8],
//     position: [0, 1, 0],
//   },
// ];
function Card({ children, ...props }) {
  const transmissionProps = useControls("Transmission Material", {
    backside: true,
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

  return (
    <>
      <RigidBody restitution={0.4}>
        <RoundedBox args={[2, 1, 0.1]} radius={0.1} scale={2} {...props}>
          <MeshTransmissionMaterial {...transmissionProps} />
        </RoundedBox>
        {children}
      </RigidBody>
    </>
  );
}

function Floor() {
  const { viewport } = useThree();

  const colliderProps = useControls("Colliders", {
    bottomY: { value: -viewport.height / 2, min: -20, max: 20, step: 0.1 },
    frontBackZ: { value: 0.3, min: 0, max: 5, step: 0.1 },
    leftRightX: { value: viewport.width / 2, min: 0, max: 20, step: 0.1 },
  });

  return (
    <>
      <RigidBody type="fixed" restitution={0.4}>
        {/* Bottom collider */}
        <CuboidCollider
          type="fixed"
          args={[viewport.width / 2, 0.01, 1]}
          position={[0, colliderProps.bottomY, 0]}
        />
        {/* Front collider */}
        <CuboidCollider
          type="fixed"
          args={[viewport.width / 2, viewport.height / 2, 0.01]}
          position={[0, 0, colliderProps.frontBackZ]}
        />
        {/* Back collider */}
        <CuboidCollider
          type="fixed"
          args={[viewport.width / 2, viewport.height / 2, 0.01]}
          position={[0, 0, -colliderProps.frontBackZ]}
        />
        {/* Left collider */}
        <CuboidCollider
          type="fixed"
          args={[0.01, viewport.height / 2, 1]}
          position={[-colliderProps.leftRightX, 0, 0]}
        />
        {/* Right collider */}
        <CuboidCollider
          type="fixed"
          args={[0.01, viewport.height / 2, 1]}
          position={[colliderProps.leftRightX, 0, 0]}
        />
      </RigidBody>
    </>
  );
}

export default function App() {
  const textProps = useControls("Text3D", {
    size: { value: 0.5, min: 0.1, max: 2, step: 0.1 },
    curveSegments: { value: 12, min: 1, max: 20, step: 1 },
    bevelEnabled: true,
    bevelSize: { value: 0.02, min: 0, max: 0.1, step: 0.001 },
    bevelThickness: { value: 0.02, min: 0, max: 0.1, step: 0.001 },
    bevelSegments: { value: 5, min: 1, max: 10, step: 1 },
    height: { value: 0.2, min: 0, max: 1, step: 0.01 },
  });

  return (
    <>
      <Canvas>
        <OrthographicCamera zoom={45} position={[0, -2, 5]} />
        <OrbitControls />
        <ambientLight intensity={Math.PI / 4} />
        <spotLight
          position={[0, 40, 26]}
          angle={0.5}
          decay={0.7}
          distance={48}
          penumbra={1}
          intensity={1750}
        />
        <spotLight
          color="white"
          position={[20, -40, 26]}
          angle={0.5}
          decay={1}
          distance={53}
          penumbra={1}
          intensity={2000}
        />
        <spotLight
          color="red"
          position={[15, 0, 20]}
          angle={0.1}
          decay={1}
          distance={35}
          penumbra={-1}
          intensity={100}
        />
        {/* <SpotLightHelper /> */}

        <Physics debug gravity={[0, -9.81, 0]}>
          <Card>
            <Text3D font="./helvetiker_regular.typeface.json" {...textProps}>
              cv
              <meshBasicMaterial color="white" />
            </Text3D>
          </Card>
          <Floor />
        </Physics>
        {/* <Environment 
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr"
          background={true}
          blur={1}
        /> */}
      </Canvas>
    </>
  );
}
