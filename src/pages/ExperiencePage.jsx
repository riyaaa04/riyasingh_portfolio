import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Loader, NightSkyBackground } from "../components";
import { soundoff, soundon, arrow } from "../assets/icons";
import { Bird, Plane, Sky, ExperienceIsland } from "../models";
import { experiences } from "../constants";
import { useTheme } from "../context/ThemeContext";

// Chronological timeline journey mapping
const timelineJourney = [
  { year: "2024", company: "ELDII", expIndex: 5, color: "🟢", current: false, triggerProgress: 0.15 },
  { year: "2025", company: "Marketing", expIndex: 4, color: "🟢", current: false, triggerProgress: 0.35 },
  { year: "2025", company: "Winvesta", expIndex: 3, color: "🟢", current: false, triggerProgress: 0.55 },
  { year: "2025", company: "Jio Platforms", expIndex: 1, color: "🟢", current: false, triggerProgress: 0.75 },
  { year: "2026", company: "NRK INFOTECH", expIndex: 0, color: "🔵", current: true, triggerProgress: 0.92 },
];

const ExperiencePage = () => {
  const { isNightMode, isPlayingMusic, toggleMusic } = useTheme();

  const [activeExperienceIndex, setActiveExperienceIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  // Animated airplane flythrough state (0 to 1)
  const [flightProgress, setFlightProgress] = useState(0);
  const [isFlightFinished, setIsFlightFinished] = useState(false);

  // Page Load Flythrough Animation Loop
  useEffect(() => {
    let animationFrameId;
    let startTime = null;
    const flightDuration = 3600;

    const animateFlight = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / flightDuration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 2.5);
      setFlightProgress(easedProgress);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateFlight);
      } else {
        setIsFlightFinished(true);
      }
    };

    animationFrameId = requestAnimationFrame(animateFlight);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const activeExp = experiences[activeExperienceIndex] || experiences[0];

  const handlePrevExp = () => {
    setActiveExperienceIndex((prev) =>
      prev === 0 ? experiences.length - 1 : prev - 1
    );
  };

  const handleNextExp = () => {
    setActiveExperienceIndex((prev) =>
      prev === experiences.length - 1 ? 0 : prev + 1
    );
  };

  const getAnimatedPlanePosition = () => {
    const startX = -18;
    const endX = 0.5;
    const currentX = startX + (endX - startX) * flightProgress;

    const startY = 9.8;
    const endY = 10.2;
    const currentY = startY + (endY - startY) * flightProgress;

    const currentZ = -1.5;
    let scale = [1.6, 1.6, 1.6];
    if (window.innerWidth < 768) {
      scale = [1.1, 1.1, 1.1];
    }

    return {
      position: [currentX, currentY, currentZ],
      scale: scale,
      rotation: [0, Math.PI / 2, 0],
    };
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;
    if (window.innerWidth < 768) {
      screenScale = [0.85, 0.85, 0.85];
      screenPosition = [0, -8.5, -23];
    } else {
      screenScale = [1.06, 1.06, 1.06];
      screenPosition = [-2.5, -10.6, -20.5];
    }
    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition] = adjustIslandForScreenSize();
  const planeTransform = getAnimatedPlanePosition();

  return (
    <section className="w-full h-screen relative overflow-hidden">
      <NightSkyBackground />

      {/* Top Header Timeline Journey Popups */}
      <div className="absolute top-28 left-24 z-40 hidden lg:flex items-center gap-2">
        {timelineJourney.map((item, idx) => {
          const isRevealed =
            flightProgress >= item.triggerProgress || isFlightFinished;

          const isSelected = activeExperienceIndex === item.expIndex;

          if (!isRevealed) return null;

          return (
            <div
              key={`${item.year}-${item.company}`}
              className="flex items-center gap-2 animate-fade-in"
            >
              <button
                onClick={() => setActiveExperienceIndex(item.expIndex)}
                className={`px-2.5 py-1 rounded-full transition-all duration-300 flex items-center gap-1 shadow-md ${
                  isSelected
                    ? "bg-blue-600 text-white scale-105"
                    : isNightMode
                    ? "bg-slate-900/90 text-slate-200 hover:bg-blue-600 hover:text-white border border-slate-700"
                    : "bg-white/90 text-slate-800 hover:bg-blue-600 hover:text-white"
                }`}
              >
                <span className="text-[9px]">{item.color}</span>
                <span className="font-bold text-[10px]">{item.year}</span>
                <span className="font-black text-[11px] whitespace-nowrap">
                  {item.company}
                </span>

                {item.current && (
                  <span className="bg-cyan-400 text-slate-900 text-[7px] px-1 py-[1px] rounded-full font-black">
                    NOW
                  </span>
                )}
              </button>

              {idx !== timelineJourney.length - 1 && (
                <span className="text-cyan-200 text-xl font-bold">→</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Experience Compact Info Card */}
      <div className="absolute top-20 sm:top-28 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 z-20 w-full max-w-[92vw] sm:w-[470px]">
        <div className="info-box neo-brutalism-blue p-3.5 shadow-2xl rounded-2xl relative">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl p-1.5 flex items-center justify-center shadow-md shrink-0"
                style={{ background: activeExp.iconBg }}
              >
                <img
                  src={activeExp.icon}
                  alt={activeExp.company_name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider font-black text-cyan-200">
                  {activeExp.type} • Office Building #{activeExperienceIndex + 1}
                </span>
                <h2 className="text-sm font-black text-white leading-tight">
                  {activeExp.title}
                </h2>
                <h3 className="text-xs font-extrabold text-cyan-100">
                  {activeExp.company_name}
                </h3>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handlePrevExp}
                className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/40 text-white flex items-center justify-center font-extrabold text-base transition-all shadow-xs"
                title="Previous Building"
              >
                ‹
              </button>
              <button
                onClick={handleNextExp}
                className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/40 text-white flex items-center justify-center font-extrabold text-lg transition-all shadow-xs"
                title="Next Building"
              >
                ›
              </button>
            </div>
          </div>

          {/* Date & Location Pill */}
          <div className="flex flex-wrap items-center gap-1 my-1 text-[10px] font-semibold text-cyan-100">
            <span className="bg-white/20 px-2 py-0.5 rounded-full">
              📅 {activeExp.date}
            </span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full">
              📍 {activeExp.location}
            </span>
          </div>

          {/* Experience Responsibilities */}
          <ul className="my-1 space-y-1 text-[11px] text-cyan-50 list-disc pl-3.5 leading-snug max-h-20 overflow-y-auto custom-scrollbar">
            {activeExp.points.map((pt, index) => (
              <li key={`exp-point-${index}`}>{pt}</li>
            ))}
          </ul>

          {/* Skills Applied Pills */}
          {activeExp.skillsApplied && (
            <div className="flex flex-wrap gap-1 mt-1 pt-1 border-t border-white/20">
              {activeExp.skillsApplied.map((sk) => (
                <span
                  key={sk}
                  className="text-[8.5px] font-extrabold bg-cyan-400 text-slate-900 px-1.5 py-0.2 rounded-md"
                >
                  {sk}
                </span>
              ))}
            </div>
          )}

          <div className="text-[9.5px] text-cyan-200 mt-1 flex items-center gap-1 font-semibold">
            <span>💡 Click top journey pills or 3D buildings to walk between offices!</span>
          </div>
        </div>
      </div>

      {/* 3D Canvas Scene */}
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000, position: [0, 6, 24] }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight
            position={[1, 1, 1]}
            intensity={isNightMode ? 1.1 : 2.2}
            color={isNightMode ? "#9dbdff" : "#ffffff"}
          />
          <ambientLight intensity={isNightMode ? 0.35 : 0.65} />
          <pointLight
            position={[10, 8, 10]}
            intensity={isNightMode ? 1.2 : 2}
            color={isNightMode ? "#66d9ff" : "#00c6ff"}
          />
          <spotLight
            position={[0, 50, 10]}
            angle={0.2}
            penumbra={1}
            intensity={isNightMode ? 0.6 : 2}
            color={isNightMode ? "#9ecfff" : "#ffffff"}
          />
          <hemisphereLight
            skyColor={isNightMode ? "#4f6fff" : "#b1e1ff"}
            groundColor={isNightMode ? "#040404" : "#000000"}
            intensity={isNightMode ? 0.7 : 1}
          />

          <Bird />
          <Sky isRotating={isRotating} />
          <ExperienceIsland
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            activeExperienceIndex={activeExperienceIndex}
            onSelectExperience={(index) => setActiveExperienceIndex(index)}
            position={islandPosition}
            scale={islandScale}
          />

          <Plane
            isRotating={true}
            position={planeTransform.position}
            rotation={planeTransform.rotation}
            scale={planeTransform.scale}
          />
        </Suspense>
      </Canvas>

      {/* Jukebox Audio Toggle */}
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

export default ExperiencePage;
