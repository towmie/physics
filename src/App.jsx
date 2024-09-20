import { Canvas } from "@react-three/fiber";
import Bg from "./Bg";
import Header from "./components/Header";
import styled from "styled-components";
import Container from "./ui/Container";

const NewContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
`;
export default function App() {
  return (
    <>
      <CanvasContainer>
        <Canvas camera={{ position: [0, 0, 2], fov: 45 }}>
          <ambientLight intensity={10} />
          <Bg />
        </Canvas>
      </CanvasContainer>
      <Container>
        <Header />
        <NewContainer>
          <p>Hello</p>
        </NewContainer>
      </Container>
    </>
  );
}
