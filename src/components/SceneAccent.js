import { Suspense } from 'react';
import useScene3d from '../hooks/useScene3d';
import AccentScene from './three/AccentScene';
import './SceneAccent.css';

export default function SceneAccent({ className = '', allowMobile = false }) {
  const enabled = useScene3d({ allowMobile });

  if (!enabled) return null;

  return (
    <div className={`scene-accent ${className}`.trim()} aria-hidden="true">
      <Suspense fallback={null}>
        <AccentScene />
      </Suspense>
    </div>
  );
}
