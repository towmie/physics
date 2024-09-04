import { Canvas, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";

function Cube({ position }) {
  const cubeRef = useRef();
  const handleClick = () => {
    console.log("jump!");
  };
  return useMemo(() => {
    return (
      <RigidBody
        ref={cubeRef}
        position={position}
        rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
      >
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
    <RigidBody type="fixed" position={[0, -viewport.height / 2, 0]}>
      <mesh>
        <boxGeometry args={[viewport.width, 0.01, 10]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </RigidBody>
  );
}

function Walls() {
  const { viewport } = useThree();
  return (
    <>
      <CuboidCollider
        args={[0.5, viewport.height / 2, 0.5]}
        position={[-viewport.width / 2, 0, 0]}
      />
      <CuboidCollider
        args={[0.5, viewport.height / 2, 0.5]}
        position={[viewport.width / 2, 0, 0]}
      />
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

      <Physics gravity={[0, -9.81, 0]}>
        {[...Array(5)].map((_, i) => (
          <Cube key={i} position={[i * 2 - 4, 5, 0]} />
        ))}
        <Floor />
        <Walls />
      </Physics>
    </Canvas>
  );
}

export default function App() {
  return <Scene />;
}
