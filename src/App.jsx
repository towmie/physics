import { Canvas, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

function Cube({ position }) {
  const cubeRef = useRef();
  const handleClick = () => {
    console.log("jump!");
  };
  return useMemo(() => {
    return (
      <RigidBody ref={cubeRef} position={position}>
        <mesh onClick={handleClick}>
          <boxGeometry args={[2, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </RigidBody>
    );
  }, [position]);
}

function Floor() {
  const { viewport } = useThree();
  return (
    <>
      <RigidBody type="fixed" restitution={0.4} friction={0}>
        {/* bottom */}
        <CuboidCollider
          type="fixed"
          args={[viewport.width / 2, 0.01, 0.01]}
          position={[0, -viewport.height / 2, 0]}
        />
        <CuboidCollider
          type="fixed"
          args={[viewport.width / 2, viewport.height / 2, 0.01]}
          position={[0, 0, 1]}
        />
        <CuboidCollider
          type="fixed"
          args={[viewport.width / 2, viewport.height / 2, 0.01]}
          position={[0, 0, -1]}
        />
        <CuboidCollider
          type="fixed"
          args={[0.01, viewport.height / 2, 0.01]}
          position={[-viewport.width / 2, 0, 0]}
        />
        <CuboidCollider
          type="fixed"
          args={[0.01, viewport.height / 2, 0.01]}
          position={[viewport.width / 2, 0, 0]}
        />
      </RigidBody>
    </>
  );
}

function Scene() {
  return (
    <Canvas>
      <OrthographicCamera makeDefault zoom={50} position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />

      <Physics debug gravity={[0, -9.81, 0]}>
        {[...Array(5)].map((_, i) => (
          <Cube key={i} position={[i * 2 - 4, 5, 0]} />
        ))}
        <Floor />
        {/* <Walls /> */}
      </Physics>
    </Canvas>
  );
}

export default function App() {
  return <Scene />;
}
