import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

import skyScene from "../assets/3d/sky.glb";

// 3D Model from: https://sketchfab.com/3d-models/phoenix-bird-844ba0cf144a413ea92c779f18912042
export function Sky({ isRotating }) {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();
  const { isNightMode } = useTheme();

  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  // It ensures smooth animations by making the rotation frame rate-independent.
  // 'delta' represents the time in seconds since the last frame.
  useFrame((_, delta) => {
    if (isRotating && skyRef.current) {
      skyRef.current.rotation.y += 0.25 * delta;
    }
  
    sky.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (!child.material.userData.originalColor) {
          child.material.userData.originalColor =
            child.material.color.clone();
        }
  
        const targetColor = isNightMode
          ? new THREE.Color("#07101d")
          : child.material.userData.originalColor;
  
        child.material.color.lerp(targetColor, 0.03);
      }
    });
  });

  return (
    <mesh ref={skyRef}>
      // use the primitive element when you want to directly embed a complex 3D
      model or scene
      <primitive object={sky.scene} />
    </mesh>
  );
}
