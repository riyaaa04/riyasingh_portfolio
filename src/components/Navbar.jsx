import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isNightMode, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }) =>
    `relative px-3.5 py-1.5 rounded-full transition-all duration-300 font-bold text-xs sm:text-sm ${
      isActive
        ? isNightMode
          ? "text-cyan-200 bg-slate-800/90 shadow-md border border-cyan-400/40"
          : "text-violet-700 bg-white/60 shadow-md"
        : isNightMode
        ? "text-slate-200 hover:text-cyan-300 hover:bg-slate-800/50"
        : "text-slate-700 hover:text-violet-700 hover:bg-white/40"
    }`;

  return (
    <header className="fixed top-5 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8">
      {/* Left Header Group: RS Logo + Day/Night Toggle Button */}
      <div className="flex items-center gap-3">
        {/* RS Logo */}
        <NavLink
          to="/"
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-xl border transition-all duration-300 hover:scale-110 ${
            isNightMode
              ? "bg-slate-900/80 border-slate-700 shadow-cyan-500/10"
              : "bg-white/90 border-white/40"
          }`}
        >
          <span className="text-lg sm:text-xl font-black blue-gradient_text">
            RS
          </span>
        </NavLink>

        {/* Day / Night Mode Toggle Button (Positioned next to RS Logo) */}
        <button
          onClick={toggleTheme}
          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-extrabold rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-1.5 ${
            isNightMode
              ? "bg-slate-900/90 text-yellow-300 border-slate-700 hover:bg-slate-800 shadow-cyan-950/30"
              : "bg-white/90 text-slate-800 border-white/50 hover:bg-white shadow-slate-300/40"
          }`}
          title="Toggle Day/Night Mode"
        >
          {isNightMode ? "☀️ Day Mode" : "🌙 Night Mode"}
        </button>
      </div>

      {/* Cloud Navigation */}
      <div className="ml-auto flex items-center gap-3 relative animate-cloudFloat">
        {/* Cloud Puffs */}
        <div
          className={`absolute -left-5 top-3 w-10 h-10 rounded-full blur-md ${
            isNightMode ? "bg-slate-800/40" : "bg-white/45"
          }`}
        />
        <div
          className={`absolute left-8 -top-4 w-14 h-14 rounded-full blur-lg ${
            isNightMode ? "bg-slate-800/30" : "bg-white/35"
          }`}
        />
        <div
          className={`absolute right-12 -top-5 w-12 h-12 rounded-full blur-lg ${
            isNightMode ? "bg-slate-800/35" : "bg-white/40"
          }`}
        />
        <div
          className={`absolute -right-5 bottom-2 w-10 h-10 rounded-full blur-md ${
            isNightMode ? "bg-slate-800/40" : "bg-white/45"
          }`}
        />

        {/* Main Cloud Nav */}
        <nav
          className={`
            relative
            flex
            items-center
            gap-1.5 sm:gap-2
            px-4 sm:px-6
            py-2 sm:py-2.5
            rounded-full
            backdrop-blur-3xl
            border
            transition-all duration-300
            ${
              isNightMode
                ? "bg-slate-900/80 border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-white"
                : "bg-gradient-to-r from-white/70 via-white/45 to-white/70 border-white/40 shadow-[0_20px_50px_rgba(255,255,255,0.35)]"
            }
          `}
        >
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          <NavLink to="/skills" className={navLinkClass}>
            Skills
          </NavLink>

          <NavLink to="/experience" className={navLinkClass}>
            Experience
          </NavLink>

          <NavLink to="/projects" className={navLinkClass}>
            Projects
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;