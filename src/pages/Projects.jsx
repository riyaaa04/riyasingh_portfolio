import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Loader, NightSkyBackground } from "../components";
import { soundoff, soundon, arrow } from "../assets/icons";
import { Bird, Plane, Sky, ProjectsIsland } from "../models";
import { projects } from "../constants";
import { useTheme } from "../context/ThemeContext";

const Projects = () => {
  const { isNightMode, isPlayingMusic, toggleMusic } = useTheme();

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const activeProj = projects[activeProjectIndex] || projects[0];

  const handlePrevProject = () => {
    setActiveProjectIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  const handleNextProject = () => {
    setActiveProjectIndex((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;
    if (window.innerWidth < 768) {
      screenScale = [1.2, 1.2, 1.2];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [2.2, 2.2, 2.2];
      screenPosition = [0, -3.5, -4];
    }
    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;
    if (window.innerWidth < 768) {
      screenScale = [0.95, 0.95, 0.95];
      screenPosition = [0, -9.5, -23];
    } else {
      screenScale = [1.05, 1.05, 1.05];
      screenPosition = [0, -12.5, -20.5];
    }
    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className="w-full h-screen relative overflow-hidden">
      <NightSkyBackground />

      {/* Top Floating Controls */}
      <div className="absolute top-20 left-0 right-0 z-20 flex flex-col items-center px-4">
        {/* Quick Project Building Selector Pills */}
        <div
          className={`flex flex-wrap justify-center gap-1 mb-2 backdrop-blur-md p-1 rounded-2xl shadow-lg border max-w-2xl ${
            isNightMode
              ? "bg-slate-900/80 border-slate-700/80 text-slate-200"
              : "bg-white/90 border-slate-200/80 text-slate-700"
          }`}
        >
          {projects.map((proj, idx) => (
            <button
              key={proj.name}
              onClick={() => setActiveProjectIndex(idx)}
              className={`px-2.5 py-1 text-[11px] font-black rounded-xl transition-all duration-200 flex items-center gap-1 ${
                activeProjectIndex === idx
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : isNightMode
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>{proj.iconEmoji}</span>
              <span>{proj.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Project Compact Blue Card */}
        <div className="info-box max-w-sm w-full neo-brutalism-blue p-3 shadow-xl rounded-2xl relative">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-md shrink-0"
                style={{ background: activeProj.iconBg }}
              >
                {activeProj.iconEmoji}
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider font-black text-cyan-200">
                  {activeProj.buildingType} • Project #{activeProjectIndex + 1}
                </span>
                <h2 className="text-sm font-black text-white leading-tight">
                  {activeProj.name}
                </h2>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handlePrevProject}
                className="w-6 h-6 rounded-md bg-white/20 hover:bg-white/40 text-white flex items-center justify-center font-extrabold text-sm transition-all shadow-xs"
                title="Previous Project Building"
              >
                ‹
              </button>
              <button
                onClick={handleNextProject}
                className="w-6 h-6 rounded-md bg-white/20 hover:bg-white/40 text-white flex items-center justify-center font-extrabold text-base transition-all shadow-xs"
                title="Next Project Building"
              >
                ›
              </button>
            </div>
          </div>

          <p className="font-medium text-[11px] text-cyan-50 leading-snug mb-1.5">
            {activeProj.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1 mb-1.5 pt-1 border-t border-white/20">
            {activeProj.tech.map((t) => (
              <span
                key={t}
                className="text-[8.5px] font-extrabold bg-cyan-400 text-slate-900 px-1.5 py-0.2 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Live Link + Repository Buttons */}
          <div className={`w-full grid gap-2 ${activeProj.repo ? "grid-cols-2" : "grid-cols-1"}`}>
            {activeProj.link && (
              <a
                href={activeProj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-cyan-100 text-slate-900 font-extrabold text-[11px] py-1 px-2 rounded-lg flex items-center justify-center gap-1 shadow-md transition-all group"
              >
                <span>Live Demo</span>
                <img
                  src={arrow}
                  alt="arrow"
                  className="w-3 h-3 object-contain group-hover:translate-x-1 transition-transform"
                />
              </a>
            )}

            {activeProj.repo && (
              <a
                href={activeProj.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-cyan-100 text-slate-900 font-extrabold text-[11px] py-1 px-2 rounded-lg flex items-center justify-center gap-1 shadow-md transition-all group"
              >
                <span>Repository</span>
                <img
                  src={arrow}
                  alt="arrow"
                  className="w-3 h-3 object-contain group-hover:translate-x-1 transition-transform"
                />
              </a>
            )}
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
          <ProjectsIsland
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            activeProjectIndex={activeProjectIndex}
            onSelectProject={(index) => setActiveProjectIndex(index)}
            position={islandPosition}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
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

export default Projects;
