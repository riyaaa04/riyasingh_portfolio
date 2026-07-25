import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useTheme } from "../context/ThemeContext";

import planeScene from "../assets/3d/plane.glb";

// 3D Model from: https://sketchfab.com/3d-models/stylized-ww1-plane-c4edeb0e410f46e8a4db320879f0a1db
export function Plane({ isRotating, ...props }) {
  const ref = useRef();
  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(planeScene);
  const { isNightMode } = useTheme();
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
  
        if (isNightMode) {
          child.material.color.multiplyScalar(0.45);
          child.material.emissive.set("#00111a");
          child.material.emissiveIntensity = 0.15;
        } else {
          child.material.color.set("#ffffff");
          child.material.emissive.set("#000000");
          child.material.emissiveIntensity = 0;
        }
      }
    });
  }, [scene, isNightMode]);

  // Use an effect to control the plane's animation based on 'isRotating'
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  useEffect(() => {
    if (isRotating) {
      actions["Take 001"].play();
    } else {
      actions["Take 001"].stop();
    }
  }, [actions, isRotating]);

  return (
    <mesh {...props} ref={ref}>
      // use the primitive element when you want to directly embed a complex 3D
      model or scene
      <primitive object={scene} />
    </mesh>
  );
}
