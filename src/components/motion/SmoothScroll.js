import { ReactLenis } from 'lenis/react';
import './motion.css';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.15, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
