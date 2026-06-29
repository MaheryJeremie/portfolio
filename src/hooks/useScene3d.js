import { useState, useEffect } from 'react';

export default function useScene3d({ allowMobile = false } = {}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqMobile = window.matchMedia('(max-width: 768px)');

    const update = () => {
      const motionOk = !mqMotion.matches;
      const deviceOk = allowMobile || !mqMobile.matches;
      setEnabled(motionOk && deviceOk);
    };

    update();
    mqMotion.addEventListener('change', update);
    mqMobile.addEventListener('change', update);
    return () => {
      mqMotion.removeEventListener('change', update);
      mqMobile.removeEventListener('change', update);
    };
  }, [allowMobile]);

  return enabled;
}
