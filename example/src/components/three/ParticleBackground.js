import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 600 }) {
  const pointsRef = useRef();

  const { positions, colors, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    const palette = [
      [0.42, 0.6, 0.42],
      [0.78, 0.57, 0.16],
      [0.29, 0.54, 0.54],
      [0.6, 0.78, 0.56],
      [0.9, 0.78, 0.5],
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];

      speeds[i] = Math.random() * 0.004 + 0.001;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, colors, speeds, phases };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const arr = pointsRef.current.geometry.attributes.position.array;
    const t = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      arr[i * 3]     += Math.sin(t * 0.3 + phases[i]) * 0.003;
      arr[i * 3 + 1] += speeds[i];
      arr[i * 3 + 2] += Math.cos(t * 0.2 + phases[i]) * 0.002;

      if (arr[i * 3 + 1] > 12.5) {
        arr[i * 3 + 1] = -12.5;
        arr[i * 3]     = (Math.random() - 0.5) * 40;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles count={600} />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}


function Particles({ count = 600 }) {
  const pointsRef = useRef();

  const { positions, colors, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    const palette = [
      [0.42, 0.6, 0.42],  // sage green
      [0.78, 0.57, 0.16], // amber
      [0.29, 0.54, 0.54], // teal
      [0.6, 0.78, 0.56],  // light green
      [0.9, 0.78, 0.5],   // warm gold
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];

      speeds[i] = Math.random() * 0.004 + 0.001;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, colors, speeds, phases };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const arr = pointsRef.current.geometry.attributes.position.array;
    const t = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      arr[i * 3]     += Math.sin(t * 0.3 + phases[i]) * 0.003;
      arr[i * 3 + 1] += speeds[i];
      arr[i * 3 + 2] += Math.cos(t * 0.2 + phases[i]) * 0.002;

      if (arr[i * 3 + 1] > 12.5) {
        arr[i * 3 + 1] = -12.5;
        arr[i * 3]     = (Math.random() - 0.5) * 40;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Lazy import canvas to avoid SSR issues */}
      <CanvasWrapper>
        <Particles count={600} />
        <ambientLight intensity={0.5} />
      </CanvasWrapper>
    </div>
  );
}

function CanvasWrapper({ children }) {
  const { Canvas } = require('@react-three/fiber');
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent' }}
    >
      {children}
    </Canvas>
  );
}
