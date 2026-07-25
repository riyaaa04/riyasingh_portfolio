import { Link } from "react-router-dom";
import { socialLinks } from "../constants";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { isNightMode } = useTheme();

  return (
    <footer className="footer font-poppins relative z-10">
      <hr className={isNightMode ? "border-slate-800" : "border-slate-200"} />

      <div className="footer-container flex flex-col sm:flex-row justify-between items-center gap-4 py-4">
        <p className={`text-sm font-semibold ${isNightMode ? "text-slate-400" : "text-slate-500"}`}>
          © {new Date().getFullYear()}{" "}
          <strong className={isNightMode ? "text-slate-200" : "text-slate-800"}>
            Riya Singh
          </strong>
          . All rights reserved.
        </p>

        <div className="flex gap-4 justify-center items-center">
          {socialLinks.map((link) => (
            <Link key={link.name} to={link.link} target="_blank" rel="noopener noreferrer">
              <img
                src={link.iconUrl}
                alt={link.name}
                className="w-6 h-6 object-contain hover:scale-110 transition-transform p-1 rounded-md bg-white/10"
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
