import { useTheme } from "../context/ThemeContext";

const NightSkyBackground = () => {
  const { isNightMode } = useTheme();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Daytime Sky Gradient */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
          isNightMode ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background: "linear-gradient(180deg, #7ed6ff 0%, #bceaff 60%, #eef9ff 100%)",
        }}
      />

      {/* Nighttime Sky Gradient */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
          isNightMode ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(180deg, #020617 0%, #08132e 18%, #18254d 45%, #3b2f68 72%, #65548a 100%)",
        }}
      />

      {/* Stars Layer */}
      <div
        className={`absolute inset-0 opacity-90 transition-opacity duration-[1200ms] ease-in-out ${
          isNightMode ? "opacity-90" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(white 1px,transparent 1px),radial-gradient(white 1px,transparent 1px),radial-gradient(white 1px,transparent 1px)",
          backgroundSize: "180px 180px, 220px 220px, 260px 260px",
          backgroundPosition: "0 0, 70px 80px, 140px 40px",
        }}
      />

      {/* Deep Dark Atmosphere Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-[#081827]/20 to-[#020617]/70 transition-opacity duration-[1200ms] ease-in-out ${
          isNightMode ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Ambient Cyan Aura (Night Mode) */}
      <div
        className={`absolute right-20 top-16 w-44 h-44 rounded-full bg-cyan-300/20 blur-[90px] transition-opacity duration-[1200ms] ease-in-out ${
          isNightMode ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ---------------------------------------------------- */}
      {/* YELLOW SUN (Sinks down slowly on Night Mode, Rises on Day Mode) */}
      {/* ---------------------------------------------------- */}
      <div
        className={`fixed right-16 sm:right-28 transition-all duration-[1400ms] ease-in-out transform ${
          isNightMode
            ? "top-[115vh] translate-y-32 opacity-0 scale-75"
            : "top-16 translate-y-0 opacity-100 scale-100"
        }`}
      >
        {/* Yellow Sun Core */}
        <div
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-500 relative"
          style={{
            boxShadow: `
              0 0 60px #fbbf24,
              0 0 140px #f59e0b,
              0 0 240px rgba(251,191,36,0.65)
            `,
          }}
        />
        {/* Yellow Sun Outer Radial Aura */}
        <div
          className="absolute -inset-8 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.45) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ---------------------------------------------------- */}
      {/* SILVER-BLUE MOON (Rises up slowly on Night Mode, Sinks on Day Mode) */}
      {/* ---------------------------------------------------- */}
      <div
        className={`fixed right-16 sm:right-28 transition-all duration-[1400ms] ease-in-out transform ${
          isNightMode
            ? "top-16 translate-y-0 opacity-100 scale-100"
            : "top-[115vh] translate-y-32 opacity-0 scale-75"
        }`}
      >
        {/* Moon Core */}
        <div
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-white via-[#edf5ff] to-[#b7d4ff] relative"
          style={{
            boxShadow: `
              0 0 50px #ffffff,
              0 0 120px #b6d8ff,
              0 0 220px rgba(170,210,255,.45)
            `,
          }}
        />
        {/* Moon Outer Radial Glow */}
        <div
          className="absolute -inset-8 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(180,220,255,.35) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
};

export default NightSkyBackground;
