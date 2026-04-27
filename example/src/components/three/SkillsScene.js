import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SkillNode({ position, label, color, index }) {
  const meshRef = useRef();
  const phase = useMemo(() => index * 1.1 + Math.random() * 0.5, [index]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.6 + phase) * 0.3;
    meshRef.current.rotation.x += 0.006;
    meshRef.current.rotation.y += 0.008;
    const s = 1 + Math.sin(t * 1.2 + phase) * 0.08;
    meshRef.current.scale.setScalar(s);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.28, 0]} />
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.4}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function ConnectionLine({ start, end }) {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#7B9B73" transparent opacity={0.2} />
    </line>
  );
}

const SKILL_DATA = [
  { label: 'React', color: '#61DAFB', pos: [0, 0, 0] },
  { label: 'Node', color: '#68A063', pos: [2.0, 0.5, 0] },
  { label: 'Python', color: '#F7C948', pos: [-2.0, 0.5, 0] },
  { label: 'Angular', color: '#DD0031', pos: [0, 2.0, 0] },
  { label: 'MongoDB', color: '#4DB33D', pos: [1.4, -1.4, 0.5] },
  { label: 'LangChain', color: '#E8B84B', pos: [-1.4, -1.4, 0.5] },
  { label: 'Gemini', color: '#4285F4', pos: [0, -2.2, -0.5] },
  { label: 'Next.js', color: '#C8922A', pos: [2.4, -0.7, -1] },
];

function SkillOrbit() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.12;
  });

  return (
    <group ref={groupRef}>
      {SKILL_DATA.map((s, i) => (
        <SkillNode key={s.label} position={s.pos} label={s.label} color={s.color} index={i} />
      ))}
      {SKILL_DATA.map((s, i) =>
        SKILL_DATA.slice(i + 1).map((t, j) => {
          const dx = Math.abs(s.pos[0] - t.pos[0]);
          const dy = Math.abs(s.pos[1] - t.pos[1]);
          if (dx + dy < 2.8) {
            return (
              <ConnectionLine key={`${i}-${j}`} start={s.pos} end={t.pos} />
            );
          }
          return null;
        })
      )}
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#FFF5E0" />
    </group>
  );
}

export default function SkillsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <SkillOrbit />
    </Canvas>
  );
}
