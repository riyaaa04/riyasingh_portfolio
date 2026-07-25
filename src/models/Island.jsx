/**
 * IMPORTANT: Loading glTF models into a Three.js scene is a lot of work.
 * Before we can configure or animate our model’s meshes, we need to iterate through
 * each part of our model’s meshes and save them separately.
 *
 * But luckily there is an app that turns gltf or glb files into jsx components
 * For this model, visit https://gltf.pmnd.rs/
 * And get the code. And then add the rest of the things.
 * YOU DON'T HAVE TO WRITE EVERYTHING FROM SCRATCH
 */

import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useTheme } from "../context/ThemeContext";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import islandScene from "../assets/3d/island.glb";

export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) {
  const islandRef = useRef();
  const castleGlowRef = useRef();
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);
  const { isNightMode } = useTheme();

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  // Touch events for mobile devices
  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
  
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  }
  
  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  }
  
  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
  
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
  
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  }

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchmove", handleTouchMove);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // This function is called on each frame update
  useFrame((state) => {
    if (castleGlowRef.current && isNightMode) {
      const pulse = Math.sin(state.clock.elapsedTime * 2.2) * 0.08 + 1.0;
      castleGlowRef.current.scale.set(pulse, pulse, 1);
    }

    if (materials.PaletteMaterial001) {
      materials.PaletteMaterial001.color.set(
        isNightMode ? "#8394b5" : "#ffffff"
      );
    
      materials.PaletteMaterial001.emissive.set(
        isNightMode ? "#112244" : "#000000"
      );
    
      materials.PaletteMaterial001.emissiveIntensity =
      isNightMode ? 0.35 : 0;
    
      materials.PaletteMaterial001.needsUpdate = true;
    }
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    // {Island 3D model from: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907}
    <a.group ref={islandRef} {...props}>
      <primitive object={nodes.Sketchfab_Scene} />

      {/* Castle Door & Window Warm Light Emissive Overlays (Night Mode Only) */}
      {isNightMode && (
        <>
          {/* Main Door Glow */}
          <mesh position={[0.02, 2.35, 0.92]}>
            <planeGeometry args={[0.42, 0.75]} />
            <meshBasicMaterial
              color="#ffbf66"
              transparent
              opacity={0.95}
            />
          </mesh>

          {/* Left Window */}
          <mesh position={[-0.92, 2.75, 1.18]}>
            <planeGeometry args={[0.24, 0.28]} />
            <meshBasicMaterial
              color="#ffcc66"
              transparent
              opacity={0.95}
            />
          </mesh>

          {/* Right Window */}
          <mesh position={[0.95, 2.75, 1.18]}>
            <planeGeometry args={[0.24, 0.28]} />
            <meshBasicMaterial
              color="#ffcc66"
              transparent
              opacity={0.95}
            />
          </mesh>
        </>
      )}

      {/* Radiant Glow Light in Between Behind Castle (Night Mode Only) */}
      {isNightMode && (
        <group position={[0, 4.2, -0.4]}>
          {/* High-Intensity Warm Backlights behind castle */}
          <pointLight
            position={[0, 0, -0.5]}
            intensity={35}
            distance={18}
            decay={1.5}
            color="#ff9d24"
          />

          <pointLight
            position={[0, 1.2, 0.2]}
            intensity={25}
            distance={14}
            decay={1.5}
            color="#ffe066"
          />

          <pointLight
            position={[-1.2, 0.5, -0.5]}
            intensity={18}
            distance={12}
            color="#ff8800"
          />

          <pointLight
            position={[1.2, 0.5, -0.5]}
            intensity={18}
            distance={12}
            color="#ff8800"
          />

          {/* Animated 3D Radial Glow Halo Mesh directly behind castle - depthTest={false} ensures unmissable glow aura */}
          <group ref={castleGlowRef}>
            {/* Outer Giant Soft Ambient Warm Glow Halo */}
            <mesh position={[0, 0, 0]} renderOrder={10}>
              <planeGeometry args={[8.5, 8.5]} />
              <meshBasicMaterial
                color="#ff7b00"
                transparent
                opacity={0.7}
                depthTest={false}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Middle Radiant Golden Core */}
            <mesh position={[0, 0, 0.02]} renderOrder={11}>
              <planeGeometry args={[5.5, 5.5]} />
              <meshBasicMaterial
                color="#ffc83b"
                transparent
                opacity={0.85}
                depthTest={false}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Inner Intense White-Gold Core */}
            <mesh position={[0, 0, 0.04]} renderOrder={12}>
              <planeGeometry args={[3.0, 3.0]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.95}
                depthTest={false}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Vertical Light Pillar / Beam behind Castle roof */}
            <mesh position={[0, 1.8, -0.02]} renderOrder={9}>
              <planeGeometry args={[2.5, 7.0]} />
              <meshBasicMaterial
                color="#ffaa22"
                transparent
                opacity={0.65}
                depthTest={false}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </group>
      )}

      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      {isNightMode && (
        <>
          <pointLight
            position={[0, 2.5, 1]}
            intensity={7}
            distance={4}
            color="#ffbb55"
          />

          <pointLight
            position={[-0.9, 2.8, 1.2]}
            intensity={3}
            distance={2}
            color="#ffcc88"
          />

          <pointLight
            position={[0.9, 2.8, 1.2]}
            intensity={3}
            distance={2}
            color="#ffcc88"
          />
        </>
      )}

    </a.group>
  );
}
