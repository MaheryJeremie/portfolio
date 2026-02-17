import React, { useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import { ThemeContext } from '../context/ThemeContext';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Get theme colors
    const primaryColor = theme === 'light' ? 0x0078ff : 0x00c8ff;
    const secondaryColor = theme === 'light' ? 0xe91e63 : 0xff3e6c;
    const particleColor = theme === 'light' ? 0x333333 : 0xffffff;
    const particleOpacity = theme === 'light' ? 0.5 : 0.8;

    // Scene setup
    const scene = new THREE.Scene();

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'light' ? 0.7 : 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(primaryColor, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(secondaryColor, 1);
    pointLight2.position.set(-2, -3, 4);
    scene.add(pointLight2);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: particleColor,
      transparent: true,
      opacity: particleOpacity,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create a torus knot
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({
      color: primaryColor,
      metalness: 0.7,
      roughness: 0.2,
      wireframe: true,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Animate torus knot
      torusKnot.rotation.x = elapsedTime * 0.3;
      torusKnot.rotation.y = elapsedTime * 0.2;

      // Animate particles
      particlesMesh.rotation.x = elapsedTime * 0.05;
      particlesMesh.rotation.y = elapsedTime * 0.03;

      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;

      gsap.to(torusKnot.rotation, {
        x: y * 0.5,
        y: x * 0.5,
        duration: 2,
        ease: 'power2.out',
      });

      gsap.to(particlesMesh.rotation, {
        x: y * 0.2,
        y: x * 0.2,
        duration: 2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [theme]);

  return (
    <section id="hero" ref={containerRef}>
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-inner">
        <div className="hero-tag">Développeur Fullstack Junior</div>
        <h1 className="hero-name">
          Mahery<br /><em>Ramahay</em>
        </h1>
        <p className="hero-sub">
          Passionné par le numérique et les nouvelles technologies, je suis toujours en quête de nouveaux défis. 
          Mon objectif est simple : apprendre chaque jour, me perfectionner et construire une carrière qui me ressemble 
          dans cet univers qui me passionne.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="hero-cta">
            Me contacter <FontAwesomeIcon icon={faArrowRight} />
          </a>
          <a
            href="/cv-ramahay-mandimby-mahery-jeremie.pdf"
            className="hero-cta hero-cta--secondary"
            download
          >
            Telecharger mon CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
