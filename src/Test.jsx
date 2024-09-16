import { useMask } from "@react-three/drei";
import { Mask } from "@react-three/drei";

function TestMask() {
  return (
    <Mask id={1} colorWrite={true} depthWrite={false} position={[0, 0, 0.1]}>
      <circleGeometry />
      <meshBasicMaterial />
    </Mask>
  );
}

function Test() {
  const stencil = useMask(1, false);
  return (
    <mesh>
      <planeGeometry args={[3, 5]} />
      <meshPhongMaterial color="#33BBFF" {...stencil} />
    </mesh>
  );
}

export const TestMasBG = () => {
  return (
    <>
      <TestMask />
      <Test />
    </>
  );
};
