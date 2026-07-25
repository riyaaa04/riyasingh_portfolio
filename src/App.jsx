import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CustomCursor, Footer, Navbar, Chatbot } from "./components";
import { About, Contact, Home, Projects, Skills, ExperiencePage } from "./pages";
import { useTheme } from "./context/ThemeContext";

const App = () => {
  const { isNightMode } = useTheme();

  return (
    <main className={`min-h-screen transition-colors duration-500 ${isNightMode ? "bg-[#020617] text-slate-100" : "bg-slate-300/20 text-slate-900"}`}>
      <CustomCursor />
      <Router>
        <Navbar />
        <Chatbot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/*"
            element={
              <>
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
