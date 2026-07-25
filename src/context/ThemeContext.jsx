import { createContext, useContext, useEffect, useRef, useState } from "react";
import sakura from "../assets/sakura.mp3";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isNightMode, setIsNightMode] = useState(() => {
    return localStorage.getItem("portfolio_theme") === "night";
  });

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Maintain 2 separate song timings: one for Day Mode, one for Night Mode
  const dayAudioTime = useRef(0);
  const nightAudioTime = useRef(0);
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const filterNodeRef = useRef(null);

  // Initialize global audio instance & Web Audio Lofi filter node
  useEffect(() => {
    const audio = new Audio(sakura);
    audio.volume = 0.45;
    audio.loop = true;
    // Disable pitch preservation so speed reduction lowers pitch naturally
    audio.preservesPitch = false;
    audio.webkitPreservesPitch = false;
    audio.mozPreservesPitch = false;
    audioRef.current = audio;

    // Web Audio API for true Lofi Lowpass Filter
    const initWebAudio = () => {
      if (!audioCtxRef.current && audioRef.current) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          const ctx = new AudioContext();
          const source = ctx.createMediaElementSource(audioRef.current);
          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.value = isNightMode ? 1000 : 20000;

          source.connect(filter);
          filter.connect(ctx.destination);

          audioCtxRef.current = ctx;
          filterNodeRef.current = filter;
        } catch (e) {
          console.warn("Web Audio API filter fallback:", e);
        }
      }
    };

    const handleFirstUserInteraction = () => {
      initWebAudio();
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
    };
    window.addEventListener("click", handleFirstUserInteraction);
    window.addEventListener("keydown", handleFirstUserInteraction);

    return () => {
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Update theme storage & switch between 2 distinct song timings + lofi audio for night mode
  useEffect(() => {
    localStorage.setItem("portfolio_theme", isNightMode ? "night" : "day");

    if (audioRef.current) {
      if (isNightMode) {
        // Switching to Night Mode: Save day timing & restore night timing
        dayAudioTime.current = audioRef.current.currentTime;
        audioRef.current.currentTime = nightAudioTime.current;

        // Apply Lofi settings: lowered speed (0.75x) without pitch preservation + lowpass filter
        audioRef.current.preservesPitch = false;
        audioRef.current.webkitPreservesPitch = false;
        audioRef.current.mozPreservesPitch = false;
        audioRef.current.playbackRate = 0.75;

        if (filterNodeRef.current && audioCtxRef.current) {
          filterNodeRef.current.frequency.setTargetAtTime(1000, audioCtxRef.current.currentTime, 0.1);
        }
      } else {
        // Switching to Day Mode: Save night timing & restore day timing
        nightAudioTime.current = audioRef.current.currentTime;
        audioRef.current.currentTime = dayAudioTime.current;

        // Apply Day settings: standard speed (1.0x) + clear audio
        audioRef.current.preservesPitch = true;
        audioRef.current.webkitPreservesPitch = true;
        audioRef.current.mozPreservesPitch = true;
        audioRef.current.playbackRate = 1.0;

        if (filterNodeRef.current && audioCtxRef.current) {
          filterNodeRef.current.frequency.setTargetAtTime(20000, audioCtxRef.current.currentTime, 0.1);
        }
      }
    }
  }, [isNightMode]);

  // Handle Play / Pause audio playback
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlayingMusic) {
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      if (isNightMode) {
        audioRef.current.preservesPitch = false;
        audioRef.current.webkitPreservesPitch = false;
        audioRef.current.mozPreservesPitch = false;
        audioRef.current.playbackRate = 0.75;
        if (filterNodeRef.current && audioCtxRef.current) {
          filterNodeRef.current.frequency.value = 1000;
        }
      } else {
        audioRef.current.preservesPitch = true;
        audioRef.current.webkitPreservesPitch = true;
        audioRef.current.mozPreservesPitch = true;
        audioRef.current.playbackRate = 1.0;
        if (filterNodeRef.current && audioCtxRef.current) {
          filterNodeRef.current.frequency.value = 20000;
        }
      }

      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingMusic, isNightMode]);

  const toggleTheme = () => {
    setIsNightMode((prev) => !prev);
  };

  const toggleMusic = () => {
    setIsPlayingMusic((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        isNightMode,
        toggleTheme,
        isPlayingMusic,
        setIsPlayingMusic,
        toggleMusic,
        audioRef,
        dayAudioTime,
        nightAudioTime,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
export const useTheme = () => useContext(ThemeContext);