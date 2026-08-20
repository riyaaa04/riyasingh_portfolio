import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF, Html } from "@react-three/drei";
import { useTheme } from "../context/ThemeContext";

import birdScene from "../assets/3d/bird.glb";

const RESUME_URL = "https://drive.google.com/file/d/1sYch_SceAMHWDgbJYUr1hQLrvm9wkI03/view?usp=sharing";

// 3D Model from: https://sketchfab.com/3d-models/phoenix-bird-844ba0cf144a413ea92c779f18912042
export function Bird() {
  const { isNightMode } = useTheme();
  const birdRef = useRef();
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  // Load the 3D model and animations from the provided GLTF file
  const { scene, animations } = useGLTF(birdScene);

  // Get access to the animations for the bird
  const { actions } = useAnimations(animations, birdRef);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.emissive = isNightMode
          ? child.material.color.clone()
          : child.material.color.clone().multiplyScalar(0);
  
        child.material.emissiveIntensity = isNightMode ? 0.18 : 0;
      }
    });
  }, [scene, isNightMode]);

  useEffect(() => {
    if (actions["Take 001"]) {
      actions["Take 001"].play();
    }
  }, [actions]);

  useFrame(({ clock, camera }) => {
    if (!birdRef.current) return;

    // Restore original vertical height motion over the castle/island
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.25 + 2.4;

    // Check if the bird reached a certain endpoint relative to the camera
    if (birdRef.current.position.x > camera.position.x + 10) {
      // Change direction to backward and rotate the bird 180 degrees on the y-axis
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      // Change direction to forward and reset the bird's rotation
      birdRef.current.rotation.y = 0;
    }

    // Update X position while keeping Z in front of the castle (z = 1.0) so it never gets blocked
    if (birdRef.current.rotation.y === 0) {
      // Moving forward (left to right)
      birdRef.current.position.x += 0.012;
    } else {
      // Moving backward (right to left)
      birdRef.current.position.x -= 0.012;
    }

    // Fixed Z position in front of the castle so it flies in front of the island instead of going behind it
    birdRef.current.position.z = 1.0;
  });

  // Step 1: Clicking the 3D flying bird toggles the "Download Resume?" prompt
  const handleBirdClick = (e) => {
    e.stopPropagation();
    setShowResumePrompt((prev) => !prev);
  };

  // Step 2: Clicking the "Download Resume?" prompt opens the Google Drive resume link
  const handleConfirmDownload = (e) => {
    e.stopPropagation();
    window.open(RESUME_URL, "_blank", "noopener,noreferrer");
    setShowResumePrompt(false);
  };

  return (
    <group
      ref={birdRef}
      position={[-5, 2.4, 1]}
      onClick={handleBirdClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      <primitive object={scene} scale={[0.003, 0.003, 0.003]} />

      {/* Appears when bird is clicked asking "Download Resume?" */}
      {showResumePrompt && (
        <Html
          position={[0, 450, 0]}
          center
          distanceFactor={20}
          style={{ pointerEvents: "auto" }}
        >
          <div
  className={`flex items-center gap-1.5 backdrop-blur-md p-2 rounded-2xl shadow-2xl animate-fade-in whitespace-nowrap z-50 ${
    isNightMode
      ? "bg-[#07131f]/95 border-2 border-cyan-400 text-white"
      : "bg-slate-900/95 border-2 border-red-500 text-white"
  }`}
>
            <span className="text-xs font-black px-1">Download Resume? 📄</span>
            <button
              onClick={handleConfirmDownload}
              className={`px-2.5 py-1 rounded-xl font-extrabold text-xs shadow-md transition-transform hover:scale-105 ${
                isNightMode
                  ? "bg-cyan-500 hover:bg-cyan-400 text-slate-900"
                  : "bg-red-600 hover:bg-red-500 text-white"
              }`}
            >
              Yes ➔
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowResumePrompt(false);
              }}
              className={`px-1.5 py-0.5 rounded-lg font-bold text-xs ${
                isNightMode
                  ? "bg-slate-800 hover:bg-slate-700 text-cyan-300"
                  : "bg-slate-700 hover:bg-slate-600 text-slate-300"
              }`}
            >
              ✕
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}
