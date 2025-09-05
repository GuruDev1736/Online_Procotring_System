import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); // Transparent background
      mount.appendChild(renderer.domElement);

      // Create floating geometric shapes
      const geometries = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.SphereGeometry(0.7, 32, 32),
        new THREE.ConeGeometry(0.7, 1.5, 8),
        new THREE.OctahedronGeometry(0.8),
        new THREE.TetrahedronGeometry(0.9)
      ];

      const materials = [
        new THREE.MeshBasicMaterial({ 
          color: 0x87CEEB, // Sky blue
          transparent: true, 
          opacity: 0.6,
          wireframe: true 
        }),
        new THREE.MeshBasicMaterial({ 
          color: 0x4FC3F7, // Light blue
          transparent: true, 
          opacity: 0.4,
          wireframe: true 
        }),
        new THREE.MeshBasicMaterial({ 
          color: 0x29B6F6, // Medium blue
          transparent: true, 
          opacity: 0.5,
          wireframe: true 
        })
      ];

      const meshes = [];

      // Create multiple floating objects
      for (let i = 0; i < 15; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);

        // Random positions
        mesh.position.x = (Math.random() - 0.5) * 20;
        mesh.position.y = (Math.random() - 0.5) * 20;
        mesh.position.z = (Math.random() - 0.5) * 20;

        // Random rotations
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;

        // Store rotation speeds
        mesh.userData = {
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
          },
          floatSpeed: (Math.random() - 0.5) * 0.01,
          floatAmount: Math.random() * 2 + 1
        };

        scene.add(mesh);
        meshes.push(mesh);
      }

      // Add particle system
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 100;
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 50;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleMaterial = new THREE.PointsMaterial({
        color: 0x87CEEB,
        size: 0.1,
        transparent: true,
        opacity: 0.6
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Position camera
      camera.position.z = 10;

      // Store references
      sceneRef.current = scene;
      rendererRef.current = renderer;

      // Animation loop
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);

        // Animate meshes
        meshes.forEach((mesh, index) => {
          // Rotation animation
          mesh.rotation.x += mesh.userData.rotationSpeed.x;
          mesh.rotation.y += mesh.userData.rotationSpeed.y;
          mesh.rotation.z += mesh.userData.rotationSpeed.z;

          // Floating animation
          mesh.position.y += Math.sin(Date.now() * 0.001 + index) * mesh.userData.floatSpeed;
        });

        // Animate particles
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        // Rotate the entire particle system
        particles.rotation.y += 0.001;

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        if (camera && renderer) {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        
        if (mount && renderer.domElement) {
          mount.removeChild(renderer.domElement);
        }
        
        // Dispose of Three.js objects
        if (scene) {
          scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          });
        }
        
        if (renderer) {
          renderer.dispose();
        }
      };
    } catch (error) {
      console.error('Three.js background error:', error);
      // Fallback to simple CSS animation if Three.js fails
      const container = mountRef.current;
      if (!container) return;

      // Create animated elements as fallback
      const createFloatingElement = () => {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
          position: absolute;
          width: ${Math.random() * 100 + 50}px;
          height: ${Math.random() * 100 + 50}px;
          background: linear-gradient(45deg, rgba(14, 165, 233, 0.1), rgba(59, 130, 246, 0.1));
          border-radius: 50%;
          animation: float ${Math.random() * 10 + 10}s infinite linear;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          transform: translate(-50%, -50%);
        `;
        return element;
      };

      // Add floating elements
      for (let i = 0; i < 5; i++) {
        const element = createFloatingElement();
        container.appendChild(element);
      }

      // Add CSS animation
      if (!document.getElementById('three-background-styles')) {
        const style = document.createElement('style');
        style.id = 'three-background-styles';
        style.textContent = `
          @keyframes float {
            0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0.3; }
            50% { opacity: 0.6; }
            100% { transform: translate(-50%, -50%) rotate(360deg); opacity: 0.3; }
          }
        `;
        document.head.appendChild(style);
      }

      // Cleanup function for fallback
      return () => {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      };
    }
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ThreeBackground;
