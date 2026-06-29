import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../../contexts/ThemeContext';

const PALETTE = {
  light: { lime: '#5E9E2E', violet: '#5C4DA8', soft: '#E8E6DF' },
  dark:  { lime: '#72B83A', violet: '#8B7FD4', soft: '#2A2A38' },
};

function FloatShape({ geometry, position, rotationSpeed, color, opacity = 0.85, wireframe = false, scale = 1 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ref.current.rotation.x = t * rotationSpeed[0];
    ref.current.rotation.y = t * rotationSpeed[1];
    ref.current.position.y = position[1] + Math.sin(t * 0.6 + position[0]) * 0.12;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        transparent
        opacity={wireframe ? opacity * 0.55 : opacity}
        metalness={wireframe ? 0 : 0.35}
        roughness={wireframe ? 1 : 0.25}
      />
    </mesh>
  );
}

function SceneContent() {
  const { isDark } = useTheme();
  const c = isDark ? PALETTE.dark : PALETTE.light;

  return (
    <>
      <ambientLight intensity={isDark ? 0.45 : 0.65} />
      <pointLight position={[4, 4, 4]} intensity={isDark ? 1.2 : 1.5} color="#ffffff" />
      <pointLight position={[-4, -2, 2]} intensity={0.5} color={c.violet} />

      <FloatShape
        geometry={<torusGeometry args={[0.9, 0.22, 16, 48]} />}
        position={[2.2, 0.4, -1]}
        rotationSpeed={[0.15, 0.35, 0]}
        color={c.lime}
        scale={0.85}
      />
      <FloatShape
        geometry={<icosahedronGeometry args={[0.75, 0]} />}
        position={[-2.4, -0.2, -0.5]}
        rotationSpeed={[0.2, 0.25, 0]}
        color={c.violet}
        wireframe
        scale={1}
      />
      <FloatShape
        geometry={<octahedronGeometry args={[0.55, 0]} />}
        position={[0.5, 1.1, -1.5]}
        rotationSpeed={[0.3, 0.18, 0]}
        color={c.soft}
        opacity={0.9}
        scale={0.7}
      />
      <FloatShape
        geometry={<torusKnotGeometry args={[0.45, 0.12, 64, 12]} />}
        position={[-1.2, 0.8, -2]}
        rotationSpeed={[0.12, 0.22, 0]}
        color={c.lime}
        wireframe
        scale={0.65}
      />
    </>
  );
}

export default function AccentScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      dpr={[1, 1.25]}
    >
      <SceneContent />
    </Canvas>
  );
}
