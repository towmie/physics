import { Canvas } from "@react-three/fiber";
import Bg from "./Bg";
import { OrbitControls } from "@react-three/drei";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }} color="red">
        <ambientLight intensity={1} />
        <OrbitControls />
        <Bg />
      </Canvas>
    </div>
  );
}
