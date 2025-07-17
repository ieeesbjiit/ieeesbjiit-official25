  import React, { useEffect, useRef } from "react";
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import { gsap } from "gsap";

  const ThreeDModel = () => {
    const containerRef = useRef(null);

    useEffect(() => {
      let mixer;
      let activeAction = null;
      let animationId;
      let currentAnimationName = "";
      const mouse = { x: 0, y: 0 };
      const actions = {};
      let headBone = null;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 40;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      containerRef.current?.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 1.3));
      const topLight = new THREE.DirectionalLight(0xffffff, 1);
      topLight.position.set(500, 500, 500);
      scene.add(topLight);

      let model;

      const loader = new GLTFLoader();
      loader.load("/robot_animation_1.glb", (gltf) => {
        model = gltf.scene;
        model.scale.set(2, 2, 2);
        model.position.set(18, -6, -6);
        scene.add(model);

        model.traverse((obj) => {
          if (obj.name === "mixamorigHead" || obj.name === "mixamorig:Head") {
            headBone = obj;
          }
        });

        mixer = new THREE.AnimationMixer(model);

        const idleClip = gltf.animations.find((clip) => clip.name === "Idle");
        if (idleClip) {
          idleClip.tracks = idleClip.tracks.filter(
            (track) => !track.name.includes("Head")
          );
        }

        gltf.animations.forEach((clip) => {
          console.log(clip.name)
          actions[clip.name] = mixer.clipAction(clip);
        });

        playAnimationStack("Idle");
      });

      const playAnimation = (name) => {
        if (!actions[name]) return;
        if (activeAction) activeAction.stop();
        activeAction = actions[name];
        activeAction.reset().play();
        currentAnimationName = name;
        if (headBone) headBone.rotation.set(0, 0, 0);
      };

      const animationSequences = {
        spin: ["Entry", "spin start", "spining", "spin end"],
        greet: ["wave", "smile"],
        Idle: ["Idle"],
      };

      const playAnimationStack = (stackName) => {
        const sequence = animationSequences[stackName];
        if (!sequence || sequence.length === 0) return;
        let index = 0;

        const playNext = () => {
          const clipName = sequence[index];
          const action = actions[clipName];
          if (!action) return;

          if (activeAction) activeAction.stop();
          activeAction = action;
          currentAnimationName = clipName;
          if (headBone) headBone.rotation.set(0, 0, 0);

          action.reset();
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;
          action.play();

          mixer.addEventListener("finished", () => {
            index++;
            if (index < sequence.length) playNext();
          });
        };

        playNext();
      };
  const arrPositionModel = [
    {
      id: "HOME",
      position: { x: 18, y: -6, z: -6 },
      rotation: { x: 0, y: 0, z: 0 },
      animation: "Idle",
    },
    {
      id: "About",
      position: { x: 29, y: -6, z: -6 },
      rotation: { x: 0, y: -0.1, z: 0 },
      animation: "Dance1",
    },
    {
      id: "stats",
      position: { x: 29, y: -6, z: -6 },
      rotation: { x: 0, y: -0.1, z: 0 },
      animation: "Idle",
    },
    {
      id: "GALLERY",
      position: { x: 29, y: -6, z: -6 },
      rotation: { x: 0, y: -0.5, z: 0 },
      animation: "Excited",
    },
    {
      id: "WIE",
      position: { x: 29, y: -6, z: -6 },
      rotation: { x: 0.2, y: 0.1, z: 0 },
      animation: "Dance2",
    },
    {
      id: "team",
      position: { x: 0, y: -5, z: 0 },
      rotation: { x: 0.1, y: 0.3, z: 0 },
      animation: "Dance1",
    },
    {
      id: "EVENTS",
      position: { x: 29, y: -6, z: -6 },
      rotation: { x: 0, y: 0.0, z: 0 },
      animation: "Dance2",
    },
  ];

      const modelMove = (sectionId) => {
        const target = arrPositionModel.find((item) => item.id === sectionId);
        if (model && target) {
          gsap.to(model.position, {
            ...target.position,
            duration: 2,
            ease: "power2.out",
          });
          gsap.to(model.rotation, {
            ...target.rotation,
            duration: 2,
            ease: "power2.out",
          });

          if (target.animation) {
            if (animationSequences[target.animation]) {
              playAnimationStack(target.animation);
            } else {
              playAnimation(target.animation);
            }
          }
        }
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              modelMove(entry.target.id);
            }
          });
        },
        { threshold: 0.8 }
      );

      document.querySelectorAll(".section").forEach((section) => {
        observer.observe(section);
      });

      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      window.addEventListener("mousemove", (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      });

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        if (mixer) mixer.update(0.02);

        if (headBone && currentAnimationName === "Idle") {
          const targetY = mouse.x * 1.8;
          const targetX = mouse.y * -0.6;

          headBone.rotation.y += (targetY - headBone.rotation.y) * 0.5;
          headBone.rotation.x += (targetX - headBone.rotation.x) * 0.6;
        }

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationId);
        observer.disconnect();
        renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      };
    }, []);

  return (
    <div
      ref={containerRef}
      className="three-model-container"
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );

  };

  export default ThreeDModel;
