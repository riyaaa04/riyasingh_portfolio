import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const CustomCursor = () => {
  const { isNightMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);

  // Target and current interpolated coordinates for smooth ring lag
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse Movement Handler
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      pos.current = { x, y };

      if (!isVisible) setIsVisible(true);

      // Add stardust trail particles
      const count = isHovered ? 3 : 2;
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          radius: Math.random() * 2.8 + 1.2,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
          color: isNightMode
            ? Math.random() > 0.4
              ? "#00f2fe"
              : "#ffd700"
            : Math.random() > 0.4
            ? "#2563eb"
            : "#38bdf8",
        });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Track Hover states on clickable elements
    const handleOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovered(true);
      }
    };

    const handleOut = (e) => {
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    // Animation loop for Cursor Ring Lerp & Stardust Particles
    let animId;
    const animate = () => {
      // Lerp smooth outer ring motion
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.2;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0px) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0px) translate(-50%, -50%)`;
      }

      // Draw Stardust Particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.radius *= 0.96;

        if (p.alpha <= 0 || p.radius <= 0.2) {
          particles.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(animId);
    };
  }, [isNightMode, isHovered, isVisible]);

  return (
    <>
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-50 pointer-events-none"
      />

      {/* Primary Glowing Cursor Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 z-50 pointer-events-none rounded-full transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isClicking
            ? "w-2 h-2"
            : isHovered
            ? "w-4 h-4 bg-cyan-300 shadow-[0_0_15px_#00f2fe]"
            : isNightMode
            ? "w-3 h-3 bg-cyan-400 shadow-[0_0_10px_#00c6ff]"
            : "w-3 h-3 bg-blue-600 shadow-[0_0_10px_#2563eb]"
        }`}
      />

      {/* Smooth Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 z-50 pointer-events-none rounded-full border-2 transition-all duration-150 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isClicking
            ? "w-6 h-6 border-cyan-400 scale-75"
            : isHovered
            ? "w-12 h-12 border-cyan-300 bg-cyan-400/15 scale-125 shadow-[0_0_20px_rgba(0,242,254,0.4)]"
            : isNightMode
            ? "w-9 h-9 border-cyan-400/70 shadow-[0_0_12px_rgba(0,198,255,0.3)]"
            : "w-9 h-9 border-blue-500/70 shadow-[0_0_12px_rgba(37,99,235,0.3)]"
        }`}
      />
    </>
  );
};

export default CustomCursor;
