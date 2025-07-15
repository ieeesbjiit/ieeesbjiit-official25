import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './Preloader.css';

const Preloader = ({ onFinish }) => {
  const modelContainerRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const mixerRef = useRef();
  const animationIdRef = useRef();

  useEffect(() => {
    // Prevent double initialization
    if (sceneRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Increased FOV
    camera.position.z = 10; // Your desired closer position

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(500, 500); // Increased size to accommodate larger model
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear container before adding new renderer
    if (modelContainerRef.current) {
      modelContainerRef.current.innerHTML = '';
      modelContainerRef.current.appendChild(renderer.domElement);
    }

    const ambient = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    const loader = new GLTFLoader();
    loader.load('/robot_animation_1.glb', (gltf) => {
      const model = gltf.scene;

      // 📦 Center the model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      model.position.y -= 1;

      // 📏 Scale it down if needed
      model.scale.set(1.6, 1.6, 1.6);
      scene.add(model);

      // 🎥 Animation
      const mixer = new THREE.AnimationMixer(model);
      mixerRef.current = mixer;

      const helloClip =
        gltf.animations.find((a) => a.name.includes('Hello')) ||
        gltf.animations[0];

      if (helloClip) {
        const action = mixer.clipAction(helloClip);
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.play();
      }
    });

    const clock = new THREE.Clock();

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      if (mixerRef.current) mixerRef.current.update(clock.getDelta());
      renderer.render(scene, camera);
    };
    animate();

    const timeout = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => {
      // Cleanup
      clearTimeout(timeout);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current = null;
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      
      if (sceneRef.current) {
        // Clean up scene
        sceneRef.current.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
        sceneRef.current = null;
      }
      
      // Clear the container
      if (modelContainerRef.current) {
        modelContainerRef.current.innerHTML = '';
      }
    };
  }, [onFinish]);

  return (
    <div className="preloader">
      <div className="preloader-inner">
        <div className="model" ref={modelContainerRef}></div>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default Preloader;