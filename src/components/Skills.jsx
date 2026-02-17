import React, { useEffect, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faLayerGroup, faDatabase } from '@fortawesome/free-solid-svg-icons';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeContext } from '../context/ThemeContext';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const skillGroups = document.querySelectorAll('.skill-group');

    skillGroups.forEach((group, index) => {
      gsap.fromTo(
        group,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: group,
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
      const gridColor = theme === 'light' ? 0xdddddd : 0x111111;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Create grid
      const gridHelper = new THREE.GridHelper(20, 20, primaryColor, gridColor);
      gridHelper.position.y = -5;
      scene.add(gridHelper);

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'light' ? 0.4 : 0.2);
      scene.add(ambientLight);

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(primaryColor, 0.5);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      camera.position.z = 10;
      camera.position.y = 2;
      camera.rotation.x = -Math.PI / 16;

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);

        gridHelper.rotation.y += 0.002;

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
          gridHelper.rotation.x = progress * 0.5;
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        renderer.dispose();
      };
    }
  }, [theme]);

  return (
    <section id="skills" ref={sectionRef}>
      <canvas ref={canvasRef} className="skills-canvas"></canvas>
      <div className="container">
        <div className="section-header">
          <span className="section-label">02</span>
          <h2 className="section-title">Stack technique</h2>
        </div>

        <div className="skills-grid">
          <div className="skill-group">
            <div className="skill-group-icon">
              <FontAwesomeIcon icon={faCode} />
            </div>
            <div className="skill-group-title">Langages</div>
            <div className="skill-pills">
              <span className="pill">Java</span>
              <span className="pill">Python</span>
              <span className="pill">PHP</span>
              <span className="pill">JavaScript</span>
              <span className="pill">C</span>
              <span className="pill">C#</span>
              <span className="pill">C++</span>
            </div>
          </div>

          <div className="skill-group">
            <div className="skill-group-icon">
              <FontAwesomeIcon icon={faLayerGroup} />
            </div>
            <div className="skill-group-title">Frameworks</div>
            <div className="skill-pills">
              <span className="pill">Spring Boot</span>
              <span className="pill">Symfony</span>
              <span className="pill">Vue.js</span>
              <span className="pill">AngularJS</span>
              <span className="pill">React Native</span>
              <span className="pill">Node.js</span>
              <span className="pill">Odoo</span>
              <span className="pill">Frappe</span>
              <span className="pill">.NET</span>
              <span className="pill">Bootstrap</span>
            </div>
          </div>

          <div className="skill-group">
            <div className="skill-group-icon">
              <FontAwesomeIcon icon={faDatabase} />
            </div>
            <div className="skill-group-title">Bases de données & Outils</div>
            <div className="skill-pills">
              <span className="pill">PostgreSQL</span>
              <span className="pill">MySQL</span>
              <span className="pill">MongoDB</span>
              <span className="pill">Oracle</span>
              <span className="pill">GitHub</span>
              <span className="pill">Docker</span>
              <span className="pill">Firebase</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
