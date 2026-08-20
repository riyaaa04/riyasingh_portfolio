import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "../constants";

// Helper color palette by exact category names
const categoryColors = {
  Languages: { primary: "#00c6ff", secondary: "#0072ff", accent: "#38ef7d", light: "#d2e4ff" },
  "Frontend Stack": { primary: "#11998e", secondary: "#38ef7d", accent: "#00c6ff", light: "#c8f7dc" },
  "Backend & Databases": { primary: "#ff9966", secondary: "#ff5e62", accent: "#ffd200", light: "#ffe4d6" },
  "UI/UX Design & Prototyping": { primary: "#a259ff", secondary: "#1abcfe", accent: "#ff7262", light: "#ebd6ff" },
  "DevOps and Cloud": { primary: "#f57c00", secondary: "#ffca28", accent: "#0db7ed", light: "#fff3cc" },
  "Fundamental Skill": { primary: "#6366f1", secondary: "#4f46e5", accent: "#ec4899", light: "#e0e7ff" },
  default: { primary: "#00c6ff", secondary: "#0072ff", accent: "#ffffff", light: "#d2e4ff" }
};

// Low-Poly 3D Tree Component
function LowPolyTree({ position, scale = 1, color = "#2e7d32" }) {
  return (
    <group position={position} scale={scale}>
      {/* Tree Trunk */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.35, 1.6, 6]} />
        <meshStandardMaterial color="#4a3525" flatShading roughness={0.9} />
      </mesh>
      {/* Tier 1 Foliage */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <coneGeometry args={[1.4, 2.0, 7]} />
        <meshStandardMaterial color={color} flatShading roughness={0.6} />
      </mesh>
      {/* Tier 2 Foliage */}
      <mesh position={[0, 3.4, 0]} castShadow>
        <coneGeometry args={[1.0, 1.6, 7]} />
        <meshStandardMaterial color={color} flatShading roughness={0.6} />
      </mesh>
      {/* Tier 3 Top Cap */}
      <mesh position={[0, 4.3, 0]} castShadow>
        <coneGeometry args={[0.6, 1.2, 7]} />
        <meshStandardMaterial color="#81c784" flatShading roughness={0.6} />
      </mesh>
    </group>
  );
}

export function SkillsIsland({
  isRotating,
  setIsRotating,
  activeSkillIndex,
  onSelectSkill,
  categoryFilter,
  ...props
}) {
  const islandRef = useRef();
  const { gl, viewport } = useThree();

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  // Calculate spacious mountain positions across 3 concentric island rings
  const mountainData = useMemo(() => {
    const total = skills.length;
    return skills.map((skill, index) => {
      const ringTier = index % 3;
      const radius = ringTier === 0 ? 11 : ringTier === 1 ? 19 : 27;
      const angle = (index / total) * Math.PI * 2;
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      const height = 5.2 + (index % 5) * 0.9;
      const width = 2.8 + (index % 3) * 0.4;
      const catColor = categoryColors[skill.type] || categoryColors.default;

      return {
        ...skill,
        index,
        position: [x, 0, z],
        height,
        width,
        angle,
        colors: catColor,
      };
    });
  }, []);

  // Generate organic tree clusters around and in-between mountains
  const treesData = useMemo(() => {
    const trees = [];
    const foliageColors = ["#2e7d32", "#388e3c", "#1b5e20", "#43a047", "#558b2f"];
    
    // Ring 1: In-between inner and middle mountains
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2 + 0.15;
      const radius = 15 + (i % 3) * 2;
      trees.push({
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
        scale: 0.7 + (i % 4) * 0.15,
        color: foliageColors[i % foliageColors.length],
      });
    }

    // Ring 2: Outer coastline tree forest ring
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2 + 0.08;
      const radius = 28.5 + (i % 2) * 1.2;
      trees.push({
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
        scale: 0.65 + (i % 3) * 0.18,
        color: foliageColors[(i + 2) % foliageColors.length],
      });
    }

    // Center island tree grove
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 4.5 + (i % 2) * 1.5;
      trees.push({
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
        scale: 0.8 + (i % 3) * 0.2,
        color: foliageColors[(i + 1) % foliageColors.length],
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

  // Rotate island to face selected mountain when activeSkillIndex changes
  useEffect(() => {
    if (activeSkillIndex !== null && mountainData[activeSkillIndex] && islandRef.current) {
      const targetAngle = -mountainData[activeSkillIndex].angle + Math.PI / 2;
      islandRef.current.rotation.y = targetAngle;
    }
  }, [activeSkillIndex, mountainData]);

  return (
    <group ref={islandRef} {...props}>
      {/* Low-Poly Island Base */}
      <group position={[0, -2, 0]}>
        {/* Upper Grass Terrain */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[30, 32, 3.5, 36]} />
          <meshStandardMaterial color="#449d44" flatShading roughness={0.8} />
        </mesh>

        {/* Rock Coastline Base Layer */}
        <mesh position={[0, -2.5, 0]} receiveShadow>
          <cylinderGeometry args={[32, 26, 3.0, 30]} />
          <meshStandardMaterial color="#5a6b5c" flatShading roughness={0.9} />
        </mesh>

        {/* Underwater Sandy Foundation Layer */}
        <mesh position={[0, -4.8, 0]}>
          <cylinderGeometry args={[33, 19, 2.5, 24]} />
          <meshStandardMaterial color="#2d525f" flatShading roughness={1} />
        </mesh>

        {/* Surrounding Low-Poly Water Ring */}
        <mesh position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[30.5, 42, 36]} />
          <meshStandardMaterial color="#38b6ff" transparent opacity={0.65} roughness={0.2} />
        </mesh>
      </group>

      {/* Lush 3D Low-Poly Trees in between and around mountains */}
      {treesData.map((tree, idx) => (
        <LowPolyTree
          key={`skills-tree-${idx}`}
          position={tree.position}
          scale={tree.scale}
          color={tree.color}
        />
      ))}

      {/* Skills Mountains */}
      {mountainData.map((data) => {
        const isActive = activeSkillIndex === data.index;
        const matchesFilter =
          !categoryFilter || categoryFilter === "All" || data.type === categoryFilter;

        return (
          <group
            key={data.name}
            position={data.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectSkill(data.index);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            {/* Mountain Body (Cone) */}
            <mesh position={[0, data.height / 2 - 0.8, 0]} castShadow receiveShadow>
              <coneGeometry args={[data.width, data.height, 8]} />
              <meshStandardMaterial
                color={
                  isActive
                    ? "#2b77e7"
                    : matchesFilter
                    ? data.colors.primary
                    : "#64748b"
                }
                flatShading
                roughness={0.5}
                metalness={isActive ? 0.4 : 0.1}
              />
            </mesh>

            {/* Mountain Snow Peak Cap */}
            <mesh position={[0, data.height - 0.8, 0]}>
              <coneGeometry args={[data.width * 0.46, data.height * 0.35, 8]} />
              <meshStandardMaterial
                color={isActive ? "#ffffff" : "#f8fafc"}
                flatShading
                emissive={isActive ? "#38ef7d" : "#000000"}
                emissiveIntensity={isActive ? 0.5 : 0}
              />
            </mesh>

            {/* Glowing Ring Base for Active Mountain */}
            {isActive && (
              <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[data.width * 1.1, data.width * 1.6, 32]} />
                <meshBasicMaterial color="#00c6ff" side={THREE.DoubleSide} transparent opacity={0.85} />
              </mesh>
            )}

            {/* Light Beacon Beam Rising from Peak */}
            {isActive && (
              <mesh position={[0, data.height + 5, 0]}>
                <cylinderGeometry args={[0.12, 0.5, 11, 16]} />
                <meshBasicMaterial color="#00c6ff" transparent opacity={0.5} />
              </mesh>
            )}

            {/* Skill Name Badge Box */}
            <Html
              position={[0, data.height + 3.0, 0]}
              center
              distanceFactor={20}
              style={{
                pointerEvents: "auto",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: `scale(${isActive ? 1.5 : matchesFilter ? 1.3 : 1.1})`,
                opacity: matchesFilter ? 1 : 0.45,
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectSkill(data.index);
                }}
                className={`cursor-pointer flex flex-col items-center group transition-all transform hover:scale-125 ${
                  isActive ? "z-30 drop-shadow-2xl scale-110" : "z-10"
                }`}
              >
                {/* Skill Name Box */}
                <div
                  className={`px-6 py-4 rounded-3xl flex items-center gap-4 transition-all duration-300 shadow-2xl border-2 min-w-[210px] ${
                    isActive
                      ? "bg-blue-600 text-white border-cyan-300 ring-8 ring-cyan-300/80 scale-105"
                      : "bg-white text-slate-950 border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-400"
                  }`}
                  style={{
                    boxShadow: isActive
                      ? "0 24px 60px -4px rgba(0, 198, 255, 0.95)"
                      : "0 14px 35px rgba(0,0,0,0.35)",
                  }}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100 flex items-center justify-center p-2.5 shadow-inner shrink-0 border border-slate-200">
                    <img
                      src={data.imageUrl}
                      alt={data.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-xl sm:text-2xl whitespace-nowrap leading-none tracking-tight">
                      {data.name}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-black uppercase tracking-widest mt-1 ${
                        isActive ? "text-cyan-200" : "text-blue-600 group-hover:text-cyan-200"
                      }`}
                    >
                      {data.type}
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
      })}
    </group>
  );
}

export default SkillsIsland;
