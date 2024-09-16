import { Canvas } from "@react-three/fiber";
import Bg from "./Bg";
import { OrbitControls } from "@react-three/drei";

export default function App() {
  return (
    <div>
      <div className="mask-container">
        <Canvas>
          <OrbitControls />
          <Bg />
        </Canvas>
        <div className="text">Inverted Text</div>
      </div>
    </div>
  );
}
