import { useRef, useMemo, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Inner morphing blob
function MorphBlob() {
  const meshRef = useRef();
  const origPos = useRef(null);

  useLayoutEffect(() => {
    const pos = meshRef.current.geometry.attributes.position.array;
    origPos.current = new Float32Array(pos);
  }, []);

  useFrame(({ clock }) => {
    if (!origPos.current || !meshRef.current) return;
    const t = clock.elapsedTime * 0.45;
    const pos = meshRef.current.geometry.attributes.position.array;
    const o = origPos.current;
    for (let i = 0; i < pos.length; i += 3) {
      const x = o[i], y = o[i + 1], z = o[i + 2];
      const n =
        Math.sin(x * 2.2 + t) * Math.cos(y * 1.7 + t * 1.15) * Math.sin(z * 1.9 + t * 0.85) * 0.28;
      pos[i] = x + x * n;
      pos[i + 1] = y + y * n;
      pos[i + 2] = z + z * n;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y += 0.004;
    meshRef.current.rotation.x += 0.001;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 4]} />
      <meshPhysicalMaterial
        color="#16301e"
        metalness={0.7}
        roughness={0.15}
        emissive="#0b2010"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

// Outer wireframe shell (rotates opposite direction)
function WireShell() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = -clock.elapsedTime * 0.1;
    ref.current.rotation.z = clock.elapsedTime * 0.05;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial color="#7B9B73" wireframe transparent opacity={0.22} />
    </mesh>
  );
}

// Orbiting torus rings
function Ring({ radius, tubeRadius, speed, tiltX, tiltZ, color, opacity }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, tubeRadius, 3, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

// Floating particles
function Particles() {
  const ref = useRef();
  const COUNT = 160;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 9;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#7B9B73" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

// Amber accent points (sparse, brighter)
function AccentParticles() {
  const ref = useRef();
  const COUNT = 40;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = -clock.elapsedTime * 0.018;
    ref.current.rotation.x = clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#C8922A" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[6, 6, 4]} intensity={2.5} color="#fff8ef" />
      <pointLight position={[-6, -4, -4]} intensity={0.8} color="#7B9B73" />
      <pointLight position={[0, 0, 6]} intensity={0.4} color="#C8922A" />
      <MorphBlob />
      <WireShell />
      <Ring radius={3.4} tubeRadius={0.01} speed={0.22} tiltX={Math.PI / 4} tiltZ={0} color="#7B9B73" opacity={0.28} />
      <Ring radius={4.1} tubeRadius={0.008} speed={-0.15} tiltX={Math.PI / 3} tiltZ={0.3} color="#C8922A" opacity={0.2} />
      <Ring radius={2.9} tubeRadius={0.008} speed={0.32} tiltX={Math.PI / 6} tiltZ={-0.4} color="#4A8A8A" opacity={0.18} />
      <Particles />
      <AccentParticles />
    </Canvas>
  );
}
