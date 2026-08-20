import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

import { HomeInfo, Loader, NightSkyBackground } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Bird, Island, Plane, Sky } from "../models";

// 3D Low-Poly Sailboat Component floating on the water
function LowPolyBoat({ onSelectBoat }) {
  const boatRef = useRef();

  const isMobile = window.innerWidth < 768;
  const isSmallMobile = window.innerWidth < 480;

  const boatPosition = isSmallMobile
    ? [2.5, -9.2, -22]
    : isMobile
    ? [6.0, -9.5, -20]
    : [25, -10, -18];

  const boatScale = isSmallMobile
    ? [0.7, 0.7, 0.7]
    : isMobile
    ? [0.95, 0.95, 0.95]
    : [1.5, 1.5, 1.5];

  const baseY = boatPosition[1];

  // Gentle floating wave animation
  useFrame((state) => {
    if (boatRef.current) {
      const t = state.clock.getElapsedTime();
      boatRef.current.position.y = baseY + Math.sin(t * 1.8) * 0.2;
      boatRef.current.rotation.z = Math.sin(t * 1.2) * 0.04;
      boatRef.current.rotation.x = Math.cos(t * 1.5) * 0.03;
    }
  });

  return (
    <group
      ref={boatRef}
      position={boatPosition}
      rotation={[0, -0.8, 0]}
      scale={boatScale}
      onClick={(e) => {
        e.stopPropagation();
        onSelectBoat();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      {/* Boat Wooden Hull Base */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 0.7, 1.1, 6]} />
        <meshStandardMaterial color="#8b4513" flatShading roughness={0.7} />
      </mesh>

      {/* Wooden Deck Cap */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[2.05, 1.9, 0.18, 6]} />
        <meshStandardMaterial color="#a0522d" flatShading roughness={0.6} />
      </mesh>

      {/* Main Wooden Mast Column */}
      <mesh position={[0, 3.0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.13, 4.2, 8]} />
        <meshStandardMaterial color="#5c4033" flatShading roughness={0.9} />
      </mesh>

      {/* Front Main White Sail */}
      <mesh position={[0.8, 3.2, 0]} rotation={[0, 0, -0.15]} castShadow>
        <coneGeometry args={[1.5, 3.2, 3]} />
        <meshStandardMaterial color="#ffffff" side={THREE.DoubleSide} flatShading roughness={0.3} />
      </mesh>

      {/* Rear Accent Cyan Sail */}
      <mesh position={[-0.7, 2.9, 0]} rotation={[0, 0, 0.15]} castShadow>
        <coneGeometry args={[1.1, 2.6, 3]} />
        <meshStandardMaterial color="#00c6ff" side={THREE.DoubleSide} flatShading roughness={0.3} />
      </mesh>

      {/* Top Flag Pole */}
      <mesh position={[0, 5.2, 0]}>
        <coneGeometry args={[0.28, 0.55, 3]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ff4757" flatShading />
      </mesh>

      {/* Floating Sign Badge above 3D Boat */}
      <Html
        position={[0, 6.3, 0]}
        center
        distanceFactor={isSmallMobile ? 14 : isMobile ? 18 : 24}
        style={{ pointerEvents: "auto" }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelectBoat();
          }}
          className="cursor-pointer px-4 py-2.5 sm:px-8 sm:py-5 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md text-slate-900 border-2 border-blue-500 shadow-2xl hover:scale-110 transition-all flex items-center gap-2 sm:gap-5 font-black text-sm sm:text-3xl whitespace-nowrap group hover:bg-blue-600 hover:text-white"
        >
          <span className="text-xl sm:text-6xl group-hover:animate-bounce">⛵</span>
          <span>Let's Build Something Together</span>
          <span className="text-blue-500 group-hover:text-white font-extrabold">➔</span>
        </div>
      </Html>
    </group>
  );
}

const Home = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);

  // State for 3D Boat Modal
  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 480) {
      // Small Mobile Phones
      screenScale = [0.55, 0.55, 0.55];
      screenPosition = [0, -4.8, -43.4];
    } else if (window.innerWidth < 768) {
      // Tablets & Large Phones
      screenScale = [0.7, 0.7, 0.7];
      screenPosition = [0, -5.4, -43.4];
    } else {
      // Desktop
      screenScale = [0.82, 0.82, 0.82];
      screenPosition = [0, -5.8, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();
  const { isNightMode, isPlayingMusic, toggleMusic } = useTheme();

  return (
    <section className="w-full h-screen relative overflow-hidden">
      <NightSkyBackground />

      {/* Backdrop Glow Behind Castle (Night Mode Only) */}
      {isNightMode && (
        <div
          className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2
          w-[700px] h-[500px] rounded-full
          bg-gradient-to-t from-amber-500/40 via-orange-500/25 to-transparent
          blur-[120px]
          pointer-events-none
          z-0"
        />
      )}
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">
          {currentStage && <HomeInfo currentStage={currentStage} />}
        </div>
      </div>

      {/* Cloud Scroll Instruction Badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 max-w-xl w-full text-center">
        <div
          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md border shadow-xl text-xs sm:text-sm font-extrabold animate-bounce ${
            isNightMode
              ? "bg-slate-900/85 border-slate-700 text-cyan-200 shadow-cyan-950/40"
              : "bg-white/85 border-white/60 text-slate-800 shadow-slate-300/60"
          }`}
        >
          <span className="text-base sm:text-lg">☁️</span>
          <span>Scroll / Drag left to right in clouds to view the island stage!</span>
          <span className="text-base sm:text-lg">↔️</span>
        </div>
      </div>

      {isNightMode && (
  <div
    className="absolute inset-0
    bg-gradient-to-b
    from-[#020617]/50
    via-[#081827]/20
    to-[#020617]/70
    pointer-events-none
    z-0"
  />
)}

<Canvas
  className={`w-full h-screen ${
    isRotating ? "cursor-grabbing" : "cursor-grab"
  }`}
  camera={{ near: 0.1, far: 1000 }}
>
      
        <Suspense fallback={<Loader />}>
        <directionalLight
  position={[-5,8,5]}
  intensity={isNightMode ? 1.1 : 2}
  color="#9dbdff"
/>

<ambientLight
   intensity={isNightMode ? 0.35 : 0.5}
/>

<pointLight
  position={[10, 5, 10]}
  intensity={isNightMode ? 1.2 : 2}
  color={isNightMode ? "#66d9ff" : "#ffffff"}
/>

<spotLight
  position={[0, 50, 10]}
  angle={0.15}
  penumbra={1}
  intensity={isNightMode ? 0.6 : 2}
  color={isNightMode ? "#9ecfff" : "#ffffff"}
/>

<hemisphereLight
  skyColor={isNightMode ? "#4f6fff" : "#b1e1ff"}
  groundColor={isNightMode ? "#040404" : "#000000"}
  intensity={isNightMode ? 0.7 : 1}
/>
{/* Castle Window & Backlight Glow */}
{isNightMode && (
  <>
    {/* World-Space Light directly behind Castle */}
    <pointLight
      position={[0, -1.0, -45.0]}
      intensity={25}
      distance={25}
      decay={1.5}
      color="#ffaa33"
    />

    <pointLight
      position={[0, -1.2, -42.8]}
      intensity={5.0}
      distance={8}
      decay={2}
      color="#ffbf66"
    />

    <pointLight
      position={[1.25, -0.8, -42.2]}
      intensity={3.5}
      distance={6}
      decay={2}
      color="#ffb347"
    />

    <pointLight
      position={[-1.25, -0.8, -42.2]}
      intensity={3.5}
      distance={6}
      decay={2}
      color="#ffb347"
    />
  </>
)}
{isNightMode && (
  <directionalLight
    position={[8, 10, 6]}
    intensity={0.7}
    color="#bcd8ff"
  />
)}

          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />

          {/* 3D Sailboat floating on the right side of the water */}
          <LowPolyBoat onSelectBoat={() => setIsBoatModalOpen(true)} />
        </Suspense>
      </Canvas>

      {/* Boat Contact & Links Modal */}
      {isBoatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="neo-brutalism-blue max-w-lg w-full p-6 rounded-3xl shadow-2xl border-4 border-white/80 relative text-white">
            {/* Close Button */}
            <button
              onClick={() => setIsBoatModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center font-black text-lg transition-transform hover:scale-110"
              title="Close"
            >
              ✕
            </button>

            {/* Modal Title Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-slate-900 flex items-center justify-center text-2xl shadow-md shrink-0">
                ⛵
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-cyan-200">
                  Riya Singh • Portfolio Connect
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  Let's Build Something Together!
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cyan-50 font-medium mb-5 leading-relaxed">
              I'm always excited to collaborate on new projects, full-stack web applications, and innovative digital experiences. Connect with me below:
            </p>

            {/* Contact & Social Links List */}
            <div className="space-y-3">
              {/* Email */}
              <a
                href="mailto:riyaaasingh67@gmail.com"
                className="flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/25 border border-white/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📧</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-cyan-200 uppercase">Email</span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                      riyaaasingh67@gmail.com
                    </span>
                  </div>
                </div>
                <span className="text-xs font-black text-cyan-200 group-hover:translate-x-1 transition-transform">➔</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/riyaaa04"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/25 border border-white/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🐙</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-cyan-200 uppercase">GitHub Profile</span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                      github.com/riyaaa04
                    </span>
                  </div>
                </div>
                <span className="text-xs font-black text-cyan-200 group-hover:translate-x-1 transition-transform">➔</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/riya-singh-061788291/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/25 border border-white/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">💼</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-cyan-200 uppercase">LinkedIn Profile</span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                      linkedin.com/in/riya-singh-061788291
                    </span>
                  </div>
                </div>
                <span className="text-xs font-black text-cyan-200 group-hover:translate-x-1 transition-transform">➔</span>
              </a>

              {/* Resume */}
              <a
                href="https://drive.google.com/file/d/1sYch_SceAMHWDgbJYUr1hQLrvm9wkI03/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 transition-all group shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📄</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-slate-800">Official Resume</span>
                    <span className="text-xs sm:text-sm font-black text-slate-950">
                      View Google Drive Resume
                    </span>
                  </div>
                </div>
                <span className="text-sm font-black text-slate-950 group-hover:translate-x-1 transition-transform">➔</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Audio Jukebox Toggle */}
      <div className="absolute bottom-4 left-4 z-20">
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt="jukebox"
          onClick={toggleMusic}
          className="w-10 h-10 cursor-pointer object-contain shadow-lg rounded-full bg-white/80 p-1 hover:scale-110 transition-transform"
        />
      </div>
    </section>
  );
};

export default Home;
