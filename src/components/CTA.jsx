import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const CTA = () => {
  const { isNightMode } = useTheme();

  return (
    <section className="cta relative z-10">
      <p
        className={`font-extrabold flex-1 text-3xl max-md:text-center transition-colors ${
          isNightMode ? "!text-white drop-shadow-md" : "text-black-500"
        }`}
      >
        Have a project in mind? <br className="sm:block hidden" />
        Let’s build something together!
      </p>
      <Link to="/contact" className="btn shadow-lg">
        Contact
      </Link>
    </section>
  );
};

export default CTA;
