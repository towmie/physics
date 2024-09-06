import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Card from "./components/Card";
import Colliders from "./components/Colliders";
import CardText from "./components/3dText";

// Define the custom shader material

export default function App() {
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

        <Physics gravity={[0, -9.81, 0]}>
          <Card>
            <CardText text="CV" />
          </Card>
          <Colliders />
        </Physics>
      </Canvas>
    </>
  );
}
