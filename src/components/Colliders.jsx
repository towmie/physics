import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

export default function Colliders() {
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
