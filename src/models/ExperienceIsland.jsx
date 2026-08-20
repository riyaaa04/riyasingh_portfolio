import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { experiences } from "../constants";

// Low-Poly Corporate Plaza Tree Component
function LowPolyTree({ position, scale = 1, color = "#2e7d32" }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.3, 1.6, 6]} />
        <meshStandardMaterial color="#4a3525" flatShading roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.2, 0]} castShadow>
        <coneGeometry args={[1.3, 1.9, 7]} />
        <meshStandardMaterial color={color} flatShading roughness={0.6} />
      </mesh>
      <mesh position={[0, 3.3, 0]} castShadow>
        <coneGeometry args={[0.9, 1.5, 7]} />
        <meshStandardMaterial color={color} flatShading roughness={0.6} />
      </mesh>
      <mesh position={[0, 4.1, 0]} castShadow>
        <coneGeometry args={[0.5, 1.0, 7]} />
        <meshStandardMaterial color="#81c784" flatShading roughness={0.6} />
      </mesh>
    </group>
  );
}

// Highly Detailed 3D Corporate Office Building / Skyscraper Component with Windows & Facades
function OfficeBuilding({ data, isActive, onSelect }) {
  const { width, height, depth, iconBg, company_name, title, index } = data;

  // Window Grid Generation (Rows & Columns of Illuminated Windows)
  const windowRows = Math.floor(height / 1.6);
  const windowCols = 3;

  const windows = useMemo(() => {
    const wins = [];
    const colSpacing = width / (windowCols + 1);
    const rowSpacing = (height - 2.5) / (windowRows + 1);

    for (let r = 1; r <= windowRows; r++) {
      for (let c = 1; c <= windowCols; c++) {
        wins.push({
          x: -width / 2 + c * colSpacing,
          y: 1.5 + r * rowSpacing,
          isLit: (r + c + index) % 4 !== 0, // dynamic lit windows
        });
      }
    }
    return wins;
  }, [width, height, windowRows, windowCols, index]);

  return (
    <group
      position={data.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      {/* Base Street-Level Plaza Podium */}
      <mesh position={[0, 0.4, 0]} receiveShadow>
        <boxGeometry args={[width * 1.35, 0.8, depth * 1.35]} />
        <meshStandardMaterial color="#334155" flatShading roughness={0.7} />
      </mesh>

      {/* Main Office Skyscraper Tower */}
      <mesh position={[0, height / 2 + 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={isActive ? "#1d4ed8" : "#1e293b"}
          flatShading
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      {/* Vertical Glass Curtain Wall Columns (Sides) */}
      <mesh position={[-width / 2 - 0.05, height / 2 + 0.8, 0]}>
        <boxGeometry args={[0.1, height * 0.95, depth * 0.85]} />
        <meshStandardMaterial
          color={isActive ? "#38b6ff" : "#64748b"}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <mesh position={[width / 2 + 0.05, height / 2 + 0.8, 0]}>
        <boxGeometry args={[0.1, height * 0.95, depth * 0.85]} />
        <meshStandardMaterial
          color={isActive ? "#38b6ff" : "#64748b"}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Front Facade Multi-Window Grid */}
      {windows.map((win, i) => (
        <mesh
          key={`win-front-${i}`}
          position={[win.x, win.y, depth / 2 + 0.06]}
        >
          <planeGeometry args={[width * 0.22, 0.8]} />
          <meshStandardMaterial
            color={isActive ? "#e0f2fe" : win.isLit ? "#bae6fd" : "#334155"}
            emissive={isActive ? "#0284c7" : win.isLit ? "#38b6ff" : "#000000"}
            emissiveIntensity={isActive ? 0.7 : win.isLit ? 0.45 : 0}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Back Facade Window Grid */}
      {windows.map((win, i) => (
        <mesh
          key={`win-back-${i}`}
          position={[win.x, win.y, -depth / 2 - 0.06]}
          rotation={[0, Math.PI, 0]}
        >
          <planeGeometry args={[width * 0.22, 0.8]} />
          <meshStandardMaterial
            color={isActive ? "#e0f2fe" : win.isLit ? "#bae6fd" : "#334155"}
            emissive={isActive ? "#0284c7" : win.isLit ? "#0284c7" : "#000000"}
            emissiveIntensity={isActive ? 0.6 : 0.3}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Roof Helipad & Mechanical HVAC Canopy */}
      <group position={[0, height + 0.8, 0]}>
        {/* Helipad / Roof Top */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[width * 1.1, 0.6, depth * 1.1]} />
          <meshStandardMaterial color={iconBg} flatShading roughness={0.4} />
        </mesh>
        {/* Roof Mechanical Unit */}
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[width * 0.5, 0.6, depth * 0.5]} />
          <meshStandardMaterial color="#475569" flatShading />
        </mesh>
        {/* Rooftop Antenna Mast */}
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.06, 0.1, 2.2, 8]} />
          <meshStandardMaterial color={iconBg} metalness={0.8} />
        </mesh>
      </group>

      {/* Grand Entrance Canopy & Lobby Doors */}
      <group position={[0, 1.2, depth / 2 + 0.7]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[width * 0.65, 2.0, 1.4]} />
          <meshStandardMaterial color={iconBg} flatShading />
        </mesh>
        {/* Glass Entrance Doors */}
        <mesh position={[0, -0.2, 0.72]}>
          <planeGeometry args={[width * 0.45, 1.4]} />
          <meshStandardMaterial
            color="#e0f2fe"
            emissive="#0284c7"
            emissiveIntensity={0.5}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Glowing Base Ring for Active Building */}
      {isActive && (
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[width * 0.9, width * 1.5, 32]} />
          <meshBasicMaterial color="#00c6ff" side={THREE.DoubleSide} transparent opacity={0.85} />
        </mesh>
      )}

      {/* Light Beacon Beam Rising from Roof */}
      {isActive && (
        <mesh position={[0, height + 6, 0]}>
          <cylinderGeometry args={[0.15, 0.6, 12, 16]} />
          <meshBasicMaterial color="#00c6ff" transparent opacity={0.5} />
        </mesh>
      )}

      {/* Floating 3D Building Badge */}
      <Html
        position={[0, height + 5.5, 0]}
        center
        distanceFactor={22}
        style={{
          pointerEvents: "auto",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: `scale(${isActive ? 1.5 : 1.2})`,
          opacity: 1,
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(index);
          }}
          className={`cursor-pointer flex flex-col items-center group transition-all transform hover:scale-125 ${
            isActive ? "z-30 drop-shadow-2xl scale-110" : "z-10"
          }`}
        >
          {/* Building Company Badge */}
          <div
            className={`w-[88vw] max-w-[440px] sm:w-[440px] min-h-[85px] sm:min-h-[100px] px-4 py-3 sm:px-6 sm:py-4 rounded-3xl flex items-center gap-3 sm:gap-4 transition-all duration-300 shadow-2xl border-2 ${
              isActive
                ? "bg-blue-600 text-white border-cyan-300 ring-8 ring-cyan-300/80 scale-105"
                : "bg-white text-slate-950 border-slate-300 hover:bg-blue-600 hover:text-white"
            }`}
            style={{
              boxShadow: isActive
                ? "0 24px 60px -4px rgba(0, 198, 255, 0.95)"
                : "0 14px 35px rgba(0,0,0,0.35)",
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center p-2 shadow-inner shrink-0 border border-slate-200"
              style={{ background: iconBg }}
            >
              <img
                src={data.icon}
                alt={company_name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-black text-[28px] leading-none tracking-wide">
                {company_name}
              </span>
              <span
                className={`text-[18px] font-bold leading-tight mt-1.5 ${
                  isActive ? "text-cyan-200" : "text-blue-600 group-hover:text-cyan-200"
                }`}
              >
                {title}
              </span>
            </div>
          </div>

          {/* Downward Pointer Triangle */}
          <div
            className={`w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] -mt-0.5 ${
              isActive ? "border-t-blue-600" : "border-t-white"
            }`}
          />
        </div>
      </Html>
    </group>
  );
}

export function ExperienceIsland({
  isRotating,
  setIsRotating,
  activeExperienceIndex,
  onSelectExperience,
  ...props
}) {
  const islandRef = useRef();
  const { gl, viewport } = useThree();

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  // Calculate building positions around a corporate plaza ring (6 buildings)
  const buildingData = useMemo(() => {
    const total = experiences.length;
    return experiences.map((exp, index) => {
      const radius = 16;
      const angle = (index / total) * Math.PI * 2;
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      const height = 8.5 + (index % 3) * 2.2;
      const width = 4.4;
      const depth = 4.4;

      return {
        ...exp,
        index,
        position: [x, 0, z],
        height,
        width,
        depth,
        angle,
      };
    });
  }, []);

  // Generate trees lining the corporate plaza walkways and island border
  const treesData = useMemo(() => {
    const trees = [];
    const colors = ["#2e7d32", "#388e3c", "#1b5e20", "#43a047", "#558b2f"];

    // In-between office building plaza trees
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2 + 0.25;
      const radius = 16;
      trees.push({
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
        scale: 0.75 + (i % 3) * 0.15,
        color: colors[i % colors.length],
      });
    }

    // Inner plaza ring trees
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + 0.1;
      const radius = 9.0;
      trees.push({
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
        scale: 0.7 + (i % 2) * 0.15,
        color: colors[(i + 1) % colors.length],
      });
    }

    // Outer coastline border trees
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2 + 0.15;
      const radius = 22.5;
      trees.push({
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
        scale: 0.65 + (i % 3) * 0.12,
        color: colors[(i + 2) % colors.length],
      });
    }

    return trees;
  }, []);

  // Pointer & Touch handlers for smooth 3D rotation
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    lastX.current = clientX;
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating && islandRef.current) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      if (islandRef.current) islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      if (islandRef.current) islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, isRotating]);

  // Frame animation loop
  useFrame((state, delta) => {
    if (!isRotating && islandRef.current) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.0005) {
        rotationSpeed.current = 0;
      }
      islandRef.current.rotation.y += rotationSpeed.current + 0.0008;
    }
  });

  // Rotate island to face selected building when activeExperienceIndex changes
  useEffect(() => {
    if (activeExperienceIndex !== null && buildingData[activeExperienceIndex] && islandRef.current) {
      const targetAngle = -buildingData[activeExperienceIndex].angle + Math.PI / 2;
      islandRef.current.rotation.y = targetAngle;
    }
  }, [activeExperienceIndex, buildingData]);

  return (
    <group ref={islandRef} {...props}>
      {/* Main Corporate Floating Island Base */}
      <group position={[0, -2, 0]}>
        {/* Upper Plaza Grass & Pavement */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[23.5, 25.5, 3.2, 36]} />
          <meshStandardMaterial color="#3b7a57" flatShading roughness={0.7} />
        </mesh>

        {/* Central Cobblestone Plaza Ring */}
        <mesh position={[0, 1.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[11.5, 20.5, 36]} />
          <meshStandardMaterial color="#cbd5e1" flatShading roughness={0.6} />
        </mesh>

        {/* Rock Foundation Base Layer */}
        <mesh position={[0, -2.5, 0]} receiveShadow>
          <cylinderGeometry args={[25.5, 19.5, 2.8, 30]} />
          <meshStandardMaterial color="#475569" flatShading roughness={0.9} />
        </mesh>

        {/* Underwater Sandy Foundation Layer */}
        <mesh position={[0, -4.5, 0]}>
          <cylinderGeometry args={[26.5, 15.5, 2.5, 24]} />
          <meshStandardMaterial color="#1e293b" flatShading roughness={1} />
        </mesh>

        {/* Surrounding Water Ring */}
        <mesh position={[0, -3.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[24, 36, 36]} />
          <meshStandardMaterial color="#38b6ff" transparent opacity={0.65} roughness={0.2} />
        </mesh>
      </group>

      {/* Corporate Plaza Trees */}
      {treesData.map((tree, idx) => (
        <LowPolyTree
          key={`exp-tree-${idx}`}
          position={tree.position}
          scale={tree.scale}
          color={tree.color}
        />
      ))}

      {/* Detailed Corporate Skyscraper Office Buildings */}
      {buildingData.map((data) => (
        <OfficeBuilding
          key={data.company_name}
          data={data}
          isActive={activeExperienceIndex === data.index}
          onSelect={(idx) => onSelectExperience(idx)}
        />
      ))}
    </group>
  );
}

export default ExperienceIsland;
