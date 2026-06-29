import { useState } from 'react';

const PROFILE_JPG = `${process.env.PUBLIC_URL}/images/profile.jpg`;
const PROFILE_WEBP = `${process.env.PUBLIC_URL}/images/profile.webp`;
const PLACEHOLDER = `${process.env.PUBLIC_URL}/images/profile-placeholder.svg`;

/**
 * Affiche profile.jpg ou profile.webp depuis public/images/.
 * Remplace l'un de ces fichiers par ta photo — le placeholder disparaît automatiquement.
 */
export default function ProfileImage({ className, alt, loading = 'lazy', ...props }) {
  const [src, setSrc] = useState(PROFILE_JPG);
  const [attempt, setAttempt] = useState(0);

  const handleError = () => {
    if (attempt === 0) {
      setAttempt(1);
      setSrc(PROFILE_WEBP);
    } else {
      setAttempt(2);
      setSrc(PLACEHOLDER);
    }
  };

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={attempt < 2 ? handleError : undefined}
      {...props}
    />
  );
}
