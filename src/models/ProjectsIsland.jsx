import { useRef, useEffect, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { projects } from "../constants";

// Low-Poly Tree Helper for Projects Island
function ProjectTree({ position, scale = 1, color = "#2e7d32" }) {
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

// 🏦 Authentic 3D Bank Landmark Object (PayTM Clone) with Vault Door, Columns & Gold Coins
function BankBuilding({ isActive }) {
  const vaultWheelRef = useRef();

  useFrame((state, delta) => {
    if (vaultWheelRef.current) {
      vaultWheelRef.current.rotation.z += delta * 0.8;
    }
  });

  return (
    <group>
      <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.5, 8.5, 5.2]} />
        <meshStandardMaterial color={isActive ? "#0284c7" : "#1e293b"} flatShading roughness={0.3} metalness={0.7} />
      </mesh>

      <mesh position={[0, 9.2, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[4.2, 2.2, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>

      {[-2.0, -0.7, 0.7, 2.0].map((xPos, idx) => (
        <mesh key={`bank-col-${idx}`} position={[xPos, 4.0, 2.8]} castShadow>
          <cylinderGeometry args={[0.26, 0.32, 7.8, 12]} />
          <meshStandardMaterial color="#ffd700" metalness={0.85} roughness={0.15} />
        </mesh>
      ))}

      <group position={[0, 3.5, 2.7]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.4, 0.25, 16, 32]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.2, 32]} />
          <meshStandardMaterial color="#475569" metalness={0.95} roughness={0.1} />
        </mesh>
        <group ref={vaultWheelRef} position={[0, 0, 0.15]}>
          <mesh>
            <torusGeometry args={[0.5, 0.08, 12, 24]} />
            <meshStandardMaterial color="#ffd700" metalness={0.9} />
          </mesh>
          {[0, Math.PI / 3, (2 * Math.PI) / 3].map((angle, i) => (
            <mesh key={`spoke-${i}`} rotation={[0, 0, angle]}>
              <boxGeometry args={[1.1, 0.08, 0.08]} />
              <meshStandardMaterial color="#ffd700" metalness={0.9} />
            </mesh>
          ))}
        </group>
      </group>

      <group position={[-2.2, 0.6, 3.6]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 16]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// 🚗 Authentic 3D Car Showroom Landmark Object (ZoomCar Clone) with Display Turntable & Sports Car
function CarShowroomBuilding({ isActive }) {
  const turntableRef = useRef();

  useFrame((state, delta) => {
    if (turntableRef.current) {
      turntableRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group>
      <mesh position={[0, 4.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.5, 7.5, 5.8]} />
        <meshStandardMaterial color={isActive ? "#10b981" : "#334155"} flatShading roughness={0.2} metalness={0.8} />
      </mesh>

      <mesh position={[0, 4.0, 2.95]}>
        <planeGeometry args={[5.8, 6.2]} />
        <meshStandardMaterial color="#a7f3d0" emissive="#10b981" emissiveIntensity={0.5} roughness={0.1} transparent opacity={0.85} />
      </mesh>

      <mesh position={[0, 8.2, 0]}>
        <cylinderGeometry args={[3.5, 3.8, 0.8, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#059669" flatShading metalness={0.6} />
      </mesh>

      <group position={[0, 0.5, 3.8]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[2.5, 2.6, 0.2, 32]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>

        <group ref={turntableRef} position={[0, 0.5, 0]}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[2.8, 0.7, 1.4]} />
            <meshStandardMaterial color="#ef4444" roughness={0.15} metalness={0.85} />
          </mesh>
          <mesh position={[-0.1, 0.9, 0]} castShadow>
            <boxGeometry args={[1.6, 0.65, 1.2]} />
            <meshStandardMaterial color="#38b6ff" roughness={0.1} metalness={0.9} transparent opacity={0.85} />
          </mesh>
          <mesh position={[1.41, 0.4, 0.45]}>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
          </mesh>
          <mesh position={[1.41, 0.4, -0.45]}>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
          </mesh>
          {[-0.8, 0.8].map((x) =>
            [-0.72, 0.72].map((z) => (
              <mesh key={`wheel-${x}-${z}`} position={[x, 0.25, z]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.22, 16]} />
                <meshStandardMaterial color="#09090b" roughness={0.9} />
              </mesh>
            ))
          )}
        </group>
      </group>
    </group>
  );
}

// 💇‍♀️ Highly Detailed & Authentic 3D Beauty Parlour Salon Studio Object (GlamGrove)
function ParlourBuilding({ isActive }) {
  const poleRef = useRef();

  useFrame((state, delta) => {
    if (poleRef.current) {
      poleRef.current.rotation.y += delta * 1.5;
    }
  });

  return (
    <group>
      <mesh position={[0, 4.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.8, 8.2, 5.2]} />
        <meshStandardMaterial color={isActive ? "#ec4899" : "#475569"} flatShading roughness={0.3} />
      </mesh>

      <mesh position={[0, 8.7, 0]}>
        <boxGeometry args={[6.4, 0.9, 5.8]} />
        <meshStandardMaterial color="#f472b6" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0, 9.3, 0]}>
        <boxGeometry args={[4.2, 0.5, 4.2]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} />
      </mesh>

      <mesh position={[0, 4.5, 2.65]}>
        <planeGeometry args={[4.8, 5.5]} />
        <meshStandardMaterial color="#fbcfe8" emissive="#ec4899" emissiveIntensity={0.5} roughness={0.1} />
      </mesh>

      <group position={[2.4, 2.8, 3.2]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 1.8, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh ref={poleRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1.6, 16]} />
          <meshStandardMaterial color="#ec4899" wireframe />
        </mesh>
      </group>

      <group position={[0, 0.6, 3.8]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.6, 0.7, 0.15, 20]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.7, 12]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} />
        </mesh>
        <mesh position={[0, 1.0, 0]}>
          <boxGeometry args={[1.0, 0.2, 1.0]} />
          <meshStandardMaterial color="#ec4899" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.5, -0.4]}>
          <boxGeometry args={[1.0, 0.9, 0.18]} />
          <meshStandardMaterial color="#ec4899" roughness={0.3} />
        </mesh>

        <mesh position={[0, 2.3, -0.9]}>
          <cylinderGeometry args={[1.1, 1.1, 0.1, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#ffffff" emissive="#fbcfe8" emissiveIntensity={0.8} metalness={0.9} />
        </mesh>
      </group>

      <group position={[0, 10.2, 0]} scale={[0.9, 0.9, 0.9]}>
        <mesh rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.1, 1.6, 0.08]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.1, 1.6, 0.08]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// 🏥 Authentic 3D Hospital & Medical Center Landmark Object (Telemedicine App)
function HospitalBuilding({ isActive }) {
  return (
    <group>
      <mesh position={[0, 5.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.5, 10.0, 5.5]} />
        <meshStandardMaterial color={isActive ? "#ef4444" : "#1e293b"} flatShading roughness={0.3} metalness={0.6} />
      </mesh>

      <group position={[0, 10.8, 0]}>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[2.8, 1.0, 0.8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ef4444" emissiveIntensity={1} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.8, 1.0, 2.8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ef4444" emissiveIntensity={1} />
        </mesh>
      </group>

      <mesh position={[0, 1.8, 2.8]}>
        <boxGeometry args={[3.8, 2.6, 1.4]} />
        <meshStandardMaterial color="#fee2e2" emissive="#ef4444" emissiveIntensity={0.4} />
      </mesh>

      <group position={[1.8, 0.7, 4.0]} rotation={[0, -0.4, 0]} scale={[0.7, 0.7, 0.7]}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[2.6, 1.2, 1.3]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.7, 0.66]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0.6, 1.3, 0]}>
          <boxGeometry args={[0.4, 0.2, 0.8]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
        </mesh>
        {[-0.8, 0.8].map((x) =>
          [-0.66, 0.66].map((z) => (
            <mesh key={`amb-wheel-${x}-${z}`} position={[x, 0.2, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.24, 0.24, 0.18, 16]} />
              <meshStandardMaterial color="#18181b" />
            </mesh>
          ))
        )}
      </group>
    </group>
  );
}

export function ProjectsIsland({
  isRotating,
  setIsRotating,
  activeProjectIndex,
  onSelectProject,
  ...props
}) {
  const islandRef = useRef();
  const { gl, viewport } = useThree();

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const [targetRotationY, setTargetRotationY] = useState(null);

  // Calculate 4 project building positions around island ring
  const projectData = useMemo(() => {
    const total = projects.length;
    return projects.map((proj, index) => {
      const radius = 15;
      const angle = (index / total) * Math.PI * 2;
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      return {
        ...proj,
        index,
        position: [x, 0, z],
        angle,
      };
    });
  }, []);

  // Trees array
  const treesData = useMemo(() => {
    const trees = [];
    const colors = ["#2e7d32", "#388e3c", "#1b5e20", "#43a047", "#558b2f"];

    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2 + 0.3;
      const radius = 15;
      trees.push({
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
        scale: 0.75 + (i % 3) * 0.15,
        color: colors[i % colors.length],
      });
    }

    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2 + 0.1;
      const radius = 21;
      trees.push({
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
        scale: 0.65 + (i % 3) * 0.12,
        color: colors[(i + 1) % colors.length],
      });
    }

    return trees;
  }, []);

  // Pointer & Touch handlers for smooth 3D rotation
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    setTargetRotationY(null);

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
      setTargetRotationY(null);
      if (islandRef.current) islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      setTargetRotationY(null);
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

  // Frame animation loop with smooth rotation interpolation when selecting buildings
  useFrame((state, delta) => {
    if (islandRef.current) {
      if (targetRotationY !== null && !isRotating) {
        const currentRot = islandRef.current.rotation.y;
        const diff = targetRotationY - currentRot;
        islandRef.current.rotation.y += diff * 0.08;

        if (Math.abs(diff) < 0.002) {
          islandRef.current.rotation.y = targetRotationY;
          setTargetRotationY(null);
        }
      } else if (!isRotating) {
        rotationSpeed.current *= dampingFactor;
        if (Math.abs(rotationSpeed.current) < 0.0005) {
          rotationSpeed.current = 0;
        }
        islandRef.current.rotation.y += rotationSpeed.current + 0.0008;
      }
    }
  });

  // Calculate target rotation so that selected project building smoothly rotates DIRECTLY TO THE FRONT FACING THE CAMERA
  useEffect(() => {
    if (activeProjectIndex !== null && projectData[activeProjectIndex]) {
      const angle = projectData[activeProjectIndex].angle;
      let targetAngle = -angle - Math.PI / 2;

      if (islandRef.current) {
        let currentAngle = islandRef.current.rotation.y;
        let twoPi = Math.PI * 2;
        targetAngle = currentAngle + (((targetAngle - currentAngle) % twoPi + Math.PI * 3) % twoPi - Math.PI);
        setTargetRotationY(targetAngle);
      }
    }
  }, [activeProjectIndex, projectData]);

  return (
    <group ref={islandRef} {...props}>
      {/* Island Base */}
      <group position={[0, -2, 0]}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[22, 24, 3.2, 36]} />
          <meshStandardMaterial color="#449d44" flatShading roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[11, 19, 36]} />
          <meshStandardMaterial color="#cbd5e1" flatShading roughness={0.6} />
        </mesh>
        <mesh position={[0, -2.5, 0]} receiveShadow>
          <cylinderGeometry args={[24, 18, 2.8, 30]} />
          <meshStandardMaterial color="#5a6b5c" flatShading roughness={0.9} />
        </mesh>
        <mesh position={[0, -4.5, 0]}>
          <cylinderGeometry args={[25, 14, 2.5, 24]} />
          <meshStandardMaterial color="#2d525f" flatShading roughness={1} />
        </mesh>
        <mesh position={[0, -3.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[22.5, 34, 36]} />
          <meshStandardMaterial color="#38b6ff" transparent opacity={0.65} roughness={0.2} />
        </mesh>
      </group>

      {/* Trees */}
      {treesData.map((tree, idx) => (
        <ProjectTree key={`proj-tree-${idx}`} position={tree.position} scale={tree.scale} color={tree.color} />
      ))}

      {/* 4 Distinct Authentic 3D Project Landmark Objects */}
      {projectData.map((data) => {
        const isActive = activeProjectIndex === data.index;

        return (
          <group
            key={data.name}
            position={data.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectProject(data.index);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            {/* 3D Landmark Object Model based on BuildingType */}
            {data.buildingType === "Bank" && <BankBuilding isActive={isActive} />}
            {data.buildingType === "Car Showroom" && <CarShowroomBuilding isActive={isActive} />}
            {data.buildingType === "Parlour" && <ParlourBuilding isActive={isActive} />}
            {data.buildingType === "Hospital" && <HospitalBuilding isActive={isActive} />}

            {/* Glowing Base Ring */}
            {isActive && (
              <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[4.0, 6.2, 32]} />
                <meshBasicMaterial color="#00c6ff" side={THREE.DoubleSide} transparent opacity={0.85} />
              </mesh>
            )}

            {/* Light Beacon Beam */}
            {isActive && (
              <mesh position={[0, 14, 0]}>
                <cylinderGeometry args={[0.15, 0.6, 12, 16]} />
                <meshBasicMaterial color="#00c6ff" transparent opacity={0.5} />
              </mesh>
            )}

            {/* Floating MASSIVE High-Visibility 3D Project Badge */}
            <Html
              position={[0, 14.5, 0]}
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
                  onSelectProject(data.index);
                }}
                className={`cursor-pointer flex flex-col items-center group transition-all transform hover:scale-125 ${
                  isActive ? "z-30 drop-shadow-2xl scale-110" : "z-10"
                }`}
              >
                {/* MASSIVE Spacious Rectangle Badge Card */}
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
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner shrink-0 border border-slate-200"
                    style={{ background: data.iconBg }}
                  >
                    {data.iconEmoji}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-black text-[28px] leading-none tracking-wide">
                      {data.name}
                    </span>
                    <span
                      className={`text-[18px] font-black uppercase tracking-widest mt-1.5 ${
                        isActive ? "text-cyan-200" : "text-blue-600 group-hover:text-cyan-200"
                      }`}
                    >
                      {data.buildingType}
                    </span>
                  </div>
                </div>

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

export default ProjectsIsland;
