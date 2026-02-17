import React, { useEffect, useRef, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { ThemeContext } from '../context/ThemeContext';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.2,
        }
      );
    });

    // 3D background effect
    if (canvasRef.current) {
      // Get theme colors
      const primaryColor = theme === 'light' ? 0x0078ff : 0x00c8ff;
      const secondaryColor = theme === 'light' ? 0xe91e63 : 0xff3e6c;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Create floating cubes
      const cubes = [];
      const cubeCount = 20;

      for (let i = 0; i < cubeCount; i++) {
        const geometry = new THREE.BoxGeometry(
          Math.random() * 0.5 + 0.1,
          Math.random() * 0.5 + 0.1,
          Math.random() * 0.5 + 0.1
        );

        // Adjust colors based on theme
        let r, g, b;
        if (theme === 'light') {
          // Lighter, more pastel colors for light theme
          r = Math.random() * 0.3 + 0.2;
          g = Math.random() * 0.3 + 0.2;
          b = Math.random() * 0.5 + 0.5; // More blue tones
        } else {
          // Darker, more saturated colors for dark theme
          r = Math.random() * 0.2;
          g = Math.random() * 0.2 + 0.5;
          b = Math.random();
        }

        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(r, g, b),
          metalness: theme === 'light' ? 0.5 : 0.8,
          roughness: theme === 'light' ? 0.4 : 0.2,
          wireframe: Math.random() > 0.7,
        });

        const cube = new THREE.Mesh(geometry, material);

        cube.position.x = (Math.random() - 0.5) * 10;
        cube.position.y = (Math.random() - 0.5) * 10;
        cube.position.z = (Math.random() - 0.5) * 10 - 5;

        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;

        cube.userData = {
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01,
          },
          floatSpeed: (Math.random() - 0.5) * 0.005,
        };

        scene.add(cube);
        cubes.push(cube);
      }

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
      const animate = () => {
        requestAnimationFrame(animate);

        cubes.forEach(cube => {
          cube.rotation.x += cube.userData.rotationSpeed.x;
          cube.rotation.y += cube.userData.rotationSpeed.y;
          cube.rotation.z += cube.userData.rotationSpeed.z;

          cube.position.y += Math.sin(Date.now() * 0.001) * cube.userData.floatSpeed;
        });

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Parallax effect on scroll
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;

        if (scrollY > sectionTop - window.innerHeight && scrollY < sectionTop + sectionHeight) {
          const progress = (scrollY - (sectionTop - window.innerHeight)) / (sectionHeight + window.innerHeight);
          camera.position.y = (0.5 - progress) * 2;
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);

        cubes.forEach(cube => {
          cube.geometry.dispose();
          cube.material.dispose();
        });

        renderer.dispose();
      };
    }
  }, [theme]);

  return (
    <section id="projects" ref={sectionRef}>
      <canvas ref={canvasRef} className="projects-canvas"></canvas>
      <div className="container">
        <div className="section-header">
          <span className="section-label">04</span>
          <h2 className="section-title">Projets récents</h2>
        </div>

        <div className="projects-container">
          <div className="project-card">
            <div className="project-content">
              <div className="project-num">01</div>
              <h3 className="project-title">Application Centre Commercial</h3>
              <p className="project-desc">
                Plateforme multi-rôles de type Akoor avec gestion globale du centre, 
                des commerces et interface client complète.
              </p>
              <div className="project-tech-stack">
                <span className="tag">Node.js</span>
                <span className="tag">Express</span>
                <span className="tag">AngularJS</span>
                <span className="tag">MongoDB</span>
              </div>
            </div>
            <div className="project-features-container">
              <ul className="project-features">
                <li>Panel Admin : gestion utilisateurs, commerces & événements</li>
                <li>Interface Commerçants : gestion boutique et promotions</li>
                <li>Interface Client : liste boutiques, avis, favoris</li>
                <li>Architecture REST API complète</li>
                <li>Authentification multi-rôles sécurisée</li>
              </ul>
            </div>
          </div>

          <div className="project-card">
            <div className="project-content">
              <div className="project-num">02</div>
              <h3 className="project-title">Module de gestion budgétaire</h3>
              <p className="project-desc">
                Module de gestion budgétaire Pour Odoo permettant de centraliser les données relatives aux charges de l'entreprise
              </p>
              <div className="project-tech-stack">
                <span className="tag">Odoo 8</span>
              </div>
            </div>
            <div className="project-features-container">
              <ul className="project-features">
                <li>Planification des budgets par poste budgétaire</li>
                <li>Suivi detaillé en temps réel des dépenses</li>
                <li>Tableau de bord pour aider à la prise de decision</li>
                <li>Notifications automatiques</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
