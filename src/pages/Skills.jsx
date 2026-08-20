import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import { Loader, NightSkyBackground } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Bird, Plane, Sky, SkillsIsland } from "../models";
import { skills } from "../constants";
import { useTheme } from "../context/ThemeContext";

const categoryFilters = [
  "All",
  "Languages",
  "Frontend Stack",
  "Backend & Databases",
  "UI/UX Design & Prototyping",
  "DevOps and Cloud",
  "Fundamental Skill",
];

const skillDescriptions = {
  // Languages
  JavaScript: "Core ES6+ engine features, async/await, DOM manipulation, functional programming, and modern JS runtime execution.",
  Python: "Backend services, data structures, automation scripting, machine learning integration, and clean Pythonic architecture.",
  HTML: "Semantic HTML5 web architecture, accessibility (a11y) standards, and SEO document optimization.",
  CSS: "Modern responsive web layouts, Flexbox, Grid, CSS animations, and custom design systems.",
  Java: "Object-oriented software development, robust enterprise application architecture, and multithreaded systems.",
  "C++": "High-performance systems programming, memory management, data structures, and low-level algorithmic design.",

  // Frontend Stack
  "React.js": "Declarative UI component architecture, state management, custom hooks, and virtual DOM rendering.",
  Vite: "Lightning-fast modern frontend build tool, HMR dev server, and optimized production bundling.",
  "Next.js": "Full-stack React framework with SSR, SSG, App Router, server actions, and performance optimization.",
  Framer: "Physics-based micro-interactions, smooth UI animations, and rich interactive web experiences.",
  "UI/UX": "User interface craftsmanship, responsive layout design, visual hierarchy, and intuitive user experiences.",
  "API Integration": "Connecting frontend web apps with REST & GraphQL backends, handling async data fetching, and state sync.",

  // Backend & Databases
  "Node.js": "Event-driven asynchronous JavaScript runtime for high-throughput network applications.",
  "Express.js": "Scalable backend REST APIs, middleware pipelines, authentication, and server-side routing.",
  GraphQL: "Flexible query language for APIs, typed schema definitions, resolvers, and single-endpoint data fetching.",
  "RESTful APIs": "Architecting clean, stateless HTTP REST endpoints with standard JSON request/response conventions.",
  "MERN Stack": "Full-stack web application development combining MongoDB, Express, React, and Node.js.",
  MongoDB: "NoSQL document database design, schema modeling, aggregation pipelines, and flexible indexing.",
  SQL: "Relational database querying, schema normalized design, joins, indexing, and data integrity.",
  PostgreSQL: "Advanced open-source relational database management with ACID compliance and complex queries.",
  Firebase: "Real-time NoSQL database, authentication, cloud storage, and serverless backend services.",

  // UI/UX Design & Prototyping
  Figma: "Professional UI/UX vector design, design system components, auto-layout, and interactive prototypes.",
  Wireframing: "Low-fidelity structural design, user journey mapping, and application blueprint layout planning.",
  Prototyping: "High-fidelity interactive UI flows, transition animations, and user experience testing.",

  // DevOps and Cloud
  "AWS EC2": "Deploying, configuring, and scaling virtual compute instances in the Amazon Web Services cloud.",
  "AWS S3": "Scalable cloud object storage for application assets, user uploads, and static site hosting.",
  Docker: "Containerizing applications, writing Dockerfiles, multi-container orchestration, and deployment environments.",
  Git: "Version control mastery with branching strategies, rebase workflows, and collaborative codebase management.",
  Postman: "API endpoint testing, request automated collections, mock servers, and environment debugging.",

  // Fundamental Skill
  DSA: "Core Data Structures & Algorithms (Trees, Graphs, Sorting, Dynamic Programming) for high-efficiency problem solving.",
};

const Skills = () => {
  const { isNightMode, isPlayingMusic, toggleMusic } = useTheme();

  const [activeSkillIndex, setActiveSkillIndex] = useState(6); // Default to React.js
  const [isRotating, setIsRotating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const activeSkill = skills[activeSkillIndex] || skills[0];

  const handlePrevSkill = () => {
    setActiveSkillIndex((prev) => (prev === 0 ? skills.length - 1 : prev - 1));
  };

  const handleNextSkill = () => {
    setActiveSkillIndex((prev) => (prev === skills.length - 1 ? 0 : prev + 1));
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
      screenScale = [0.8, 0.8, 0.8];
      screenPosition = [0, -8.5, -23];
    } else {
      screenScale = [1.1, 1.1, 1.1];
      screenPosition = [0, -10.5, -22.5];
    }
    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className="w-full h-screen relative overflow-hidden">
      <NightSkyBackground />

      {/* Top Floating Header Controls */}
      <div className="absolute top-20 left-0 right-0 z-20 flex flex-col items-center px-4">
        {/* Category Pill Filters */}
        <div
          className={`flex flex-wrap justify-center gap-1 mb-2 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border max-w-3xl ${
            isNightMode
              ? "bg-slate-900/80 border-slate-700/80 text-slate-200"
              : "bg-white/90 border-slate-200/80 text-slate-700"
          }`}
        >
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-0.5 text-[11px] font-bold rounded-xl transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : isNightMode
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Selected Skill Small Compact Blue Card */}
        <div className="info-box max-w-[90vw] sm:max-w-md w-full neo-brutalism-blue p-3 shadow-xl rounded-2xl relative">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg p-1 flex items-center justify-center shadow-sm shrink-0">
                <img
                  src={activeSkill.imageUrl}
                  alt={activeSkill.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider font-black text-cyan-200">
                  Peak #{activeSkillIndex + 1} • {activeSkill.type}
                </span>
                <h2 className="text-sm font-black text-white leading-tight">
                  {activeSkill.name}
                </h2>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handlePrevSkill}
                className="w-7 h-7 rounded-md bg-white/20 hover:bg-white/40 text-white flex items-center justify-center font-extrabold text-base transition-all shadow-xs"
                title="Previous Mountain Peak"
              >
                ‹
              </button>
              <button
                onClick={handleNextSkill}
                className="w-7 h-7 rounded-md bg-white/20 hover:bg-white/40 text-white flex items-center justify-center font-extrabold text-lg transition-all shadow-xs"
                title="Next Mountain Peak"
              >
                ›
              </button>
            </div>
          </div>

          <p className="font-medium text-xs text-cyan-50 leading-tight mb-1">
            {skillDescriptions[activeSkill.name] ||
              "Core technology skill used across modern applications and high-performance digital experiences."}
          </p>

          <div className="text-[9px] text-cyan-200 flex items-center gap-1 font-semibold">
            <span>💡 Drag canvas or click mountain peaks to rotate Skills Island!</span>
          </div>
        </div>
      </div>

      {/* 3D Canvas Scene */}
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000, position: [0, 7, 24] }}
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
          <SkillsIsland
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            activeSkillIndex={activeSkillIndex}
            onSelectSkill={(index) => setActiveSkillIndex(index)}
            categoryFilter={selectedCategory}
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

export default Skills;
