import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// Morphing icosphere — like a speaker membrane
function SoundBlob() {
  const meshRef = useRef();
  const origPos = useRef(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    if (!origPos.current) {
      origPos.current = new Float32Array(geo.attributes.position.array);
    }
    const t = clock.elapsedTime * 0.5;
    const pos = geo.attributes.position.array;
    const o = origPos.current;
    for (let i = 0; i < pos.length; i += 3) {
      const x = o[i], y = o[i + 1], z = o[i + 2];
      const wave =
        Math.sin(x * 2.5 + t) * Math.cos(y * 2 + t * 1.2) * Math.sin(z * 1.8 + t * 0.9) * 0.22;
      pos[i] = x + x * wave;
      pos[i + 1] = y + y * wave;
      pos[i + 2] = z + z * wave;
    }
    geo.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x += 0.0015;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 5]} />
      <meshPhysicalMaterial
        color="#1a0f3c"
        metalness={0.8}
        roughness={0.12}
        emissive="#2d0f6b"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// Wireframe outer shell — like a hologram
function HoloShell() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = -clock.elapsedTime * 0.09;
    ref.current.rotation.z = clock.elapsedTime * 0.04;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.1, 1]} />
      <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.18} />
    </mesh>
  );
}

// Cyan ring — like a loading/scanning ring from a game HUD
function HUDRing({ radius, speed, tiltX, tiltZ, color, opacity }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, 0.008, 3, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

// Music EQ bars floating around — equalizer vibe
function EQBars() {
  const groupRef = useRef();
  const bars = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.8 + Math.random() * 1.2,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((bar, i) => {
      const b = bars[i];
      const h = 0.2 + Math.abs(Math.sin(t * b.speed + b.phase)) * 0.6;
      bar.scale.y = h;
      bar.position.y = h * 0.5 - 0.15;
    });
    groupRef.current.rotation.y = clock.elapsedTime * 0.15;
  });

  return (
    <group ref={groupRef}>
      {bars.map((b, i) => {
        const x = Math.cos(b.angle) * 3.2;
        const z = Math.sin(b.angle) * 3.2;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <boxGeometry args={[0.08, 1, 0.08]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? '#8B5CF6' : i % 3 === 1 ? '#22D3EE' : '#F59E0B'}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Floating tech particles
function TechParticles() {
  const ref = useRef();
  const COUNT = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 3 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.02;
    ref.current.rotation.x = clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#8B5CF6" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

// Gold accent particles — like coins in a game
function GoldParticles() {
  const ref = useRef();
  const COUNT = 50;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = -clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={COUNT} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#F59E0B" transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 46 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 4]} intensity={3} color="#ffffff" />
      <pointLight position={[-5, -3, -4]} intensity={1} color="#8B5CF6" />
      <pointLight position={[0, 0, 5]} intensity={0.6} color="#22D3EE" />
      <SoundBlob />
      <HoloShell />
      <HUDRing radius={3.2} speed={0.2} tiltX={Math.PI / 4} tiltZ={0} color="#8B5CF6" opacity={0.3} />
      <HUDRing radius={3.9} speed={-0.13} tiltX={Math.PI / 3} tiltZ={0.4} color="#22D3EE" opacity={0.22} />
      <HUDRing radius={2.7} speed={0.28} tiltX={Math.PI / 6} tiltZ={-0.3} color="#F59E0B" opacity={0.2} />
      <EQBars />
      <TechParticles />
      <GoldParticles />
    </Canvas>
  );
}
