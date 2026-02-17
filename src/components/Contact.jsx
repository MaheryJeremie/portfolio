import React, { useEffect, useRef, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { ThemeContext } from '../context/ThemeContext';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Animation for contact elements
    const contactElements = document.querySelectorAll('.contact-link, .contact-heading, .contact-pre');

    contactElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.1,
        }
      );
    });

    // 3D background effect
    if (canvasRef.current) {
      // Get theme colors
      const primaryColor = theme === 'light' ? 0x0078ff : 0x00c8ff;
      const secondaryColor = theme === 'light' ? 0xe91e63 : 0xff3e6c;
      const particleColor = theme === 'light' ? 0x333333 : 0xffffff;
      const particleOpacity = theme === 'light' ? 0.5 : 0.8;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1000;

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

      // Create a sphere
      const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: secondaryColor, // Use secondary color for the sphere to differentiate from other sections
        metalness: theme === 'light' ? 0.5 : 0.7,
        roughness: theme === 'light' ? 0.4 : 0.2,
        wireframe: true,
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(sphere);

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'light' ? 0.4 : 0.2);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(primaryColor, 1);
      pointLight.position.set(2, 3, 4);
      scene.add(pointLight);

      const pointLight2 = new THREE.PointLight(secondaryColor, 1);
      pointLight2.position.set(-2, -3, 4);
      scene.add(pointLight2);

      camera.position.z = 5;

      // Animation
      const clock = new THREE.Clock();

      const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Animate sphere
        sphere.rotation.x = elapsedTime * 0.2;
        sphere.rotation.y = elapsedTime * 0.3;

        // Animate particles
        particlesMesh.rotation.x = elapsedTime * 0.05;
        particlesMesh.rotation.y = elapsedTime * 0.03;

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

      // Parallax effect on mouse move
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) - 0.5;
        const y = (clientY / window.innerHeight) - 0.5;

        gsap.to(sphere.rotation, {
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
        sphereGeometry.dispose();
        sphereMaterial.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
      };
    }
  }, [theme]);

  return (
    <section id="contact" ref={sectionRef}>
      <canvas ref={canvasRef} className="contact-canvas"></canvas>
      <div className="container">
        <div className="contact-content">
          <div className="contact-pre">Prêt à collaborer</div>
          <h2 className="contact-heading">
            Travaillons<br /><em>ensemble</em>
          </h2>
          <div className="contact-links">
            <a href="mailto:maheryramahay@gmail.com" className="contact-link">
              <span className="contact-link-label">Email</span>
              <span className="contact-link-value">maheryramahay@gmail.com</span>
            </a>
            <a href="tel:+261387272178" className="contact-link">
              <span className="contact-link-label">Téléphone</span>
              <span className="contact-link-value">+261 38 72 721 78</span>
            </a>
            <a href="https://github.com/MaheryJeremie" target="_blank" rel="noopener" className="contact-link">
              <span className="contact-link-label">GitHub</span>
              <span className="contact-link-value">MaheryJeremie</span>
            </a>
            <a href="https://www.linkedin.com/in/mahery-ramahay-mandimby-823b6b315/" target="_blank" rel="noopener" className="contact-link">
              <span className="contact-link-label">LinkedIn</span>
              <span className="contact-link-value">mahery-ramahay-mandimby</span>
            </a>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
