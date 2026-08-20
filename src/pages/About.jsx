import { Link } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { CTA, NightSkyBackground } from "../components";
import { experiences, skills, projects } from "../constants";
import { arrow } from "../assets/icons";
import { useTheme } from "../context/ThemeContext";

import "react-vertical-timeline-component/style.min.css";

const skillCategories = [
  "Languages",
  "Frontend Stack",
  "Backend & Databases",
  "UI/UX Design & Prototyping",
  "DevOps and Cloud",
  "Fundamental Skill",
];

const About = () => {
  const { isNightMode } = useTheme();

  return (
    <section className="max-container relative z-10">
      <NightSkyBackground />

      {/* High-Contrast Header & Intro Card */}
      <div
        className={`mt-4 p-6 sm:p-8 rounded-3xl backdrop-blur-xl border flex flex-col gap-4 shadow-2xl z-20 transition-all ${
          isNightMode
            ? "bg-slate-900/85 border-slate-700/80 text-white shadow-cyan-950/20"
            : "bg-white/90 border-slate-200/90 text-slate-900 shadow-slate-300/50"
        }`}
      >
        <h1 className={`head-text ${isNightMode ? "text-white" : "text-slate-900"}`}>
          Hello, I'm{" "}
          <span className="blue-gradient_text font-black drop-shadow">
            Riya Singh
          </span>{" "}
          👋
        </h1>

        <p className="text-base sm:text-lg font-semibold leading-relaxed">
          I’m a CSE student and full-stack + UI/UX enthusiast who loves turning ideas into clean, functional digital experiences. From building web apps to exploring AI and ML, I enjoy creating things that actually work. Currently studying at ITM Skills University, always learning, building, and ready for the next tech challenge! 🚀
        </p>
      </div>

      {/* Skills Section Grouped by Categories */}
      <div className="py-10 flex flex-col">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h3 className={`subhead-text ${isNightMode ? "text-white" : "text-slate-900"}`}>
              My Skills & Expertise
            </h3>
            <p className={`mt-1 text-sm ${isNightMode ? "text-slate-400" : "text-slate-500"}`}>
              Languages, Frontend Stack, Backend & Databases, UI/UX Design & Prototyping, DevOps and Cloud & Fundamental Skill (DSA).
            </p>
          </div>
          <Link
            to="/skills"
            className="neo-brutalism-blue text-white px-5 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg flex items-center gap-2"
          >
            🏔️ Explore 3D Skills Island
          </Link>
        </div>

        {/* Grouped Skills by Category */}
        <div className="space-y-12 mt-4">
          {skillCategories.map((category) => {
            const categorySkills = skills.filter((s) => s.type === category);
            if (categorySkills.length === 0) return null;

            return (
              <div
                key={category}
                className={`p-6 rounded-2xl border transition-all ${
                  isNightMode
                    ? "bg-slate-900/80 backdrop-blur-md border-slate-700/80 shadow-2xl text-slate-100"
                    : "bg-white/60 backdrop-blur-md border-slate-200/80 shadow-xs"
                }`}
              >
                <h4
                  className={`text-xl font-bold mb-6 flex items-center gap-2 border-b pb-3 ${
                    isNightMode
                      ? "text-slate-100 border-slate-700"
                      : "text-slate-800 border-slate-200"
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                  {category}
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ml-auto ${
                      isNightMode
                        ? "text-cyan-300 bg-cyan-950/80 border border-cyan-800/60"
                        : "text-blue-600 bg-blue-50"
                    }`}
                  >
                    {categorySkills.length} Skills
                  </span>
                </h4>

                <div className="flex flex-wrap gap-4 sm:gap-8 justify-center sm:justify-start">
                  {categorySkills.map((skill) => (
                    <div
                      className="flex flex-col items-center group cursor-pointer"
                      key={skill.name}
                    >
                      <div className="block-container w-16 h-16 sm:w-20 sm:h-20">
                        <div className="btn-back rounded-2xl" />
                        <div
                          className={`btn-front rounded-2xl flex justify-center items-center p-3 ${
                            isNightMode ? "bg-slate-800/90 border border-slate-700" : "bg-white/90"
                          }`}
                        >
                          <img
                            src={skill.imageUrl}
                            alt={skill.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <span
                        className={`mt-3 text-xs sm:text-sm font-bold transition-colors text-center max-w-[100px] ${
                          isNightMode
                            ? "text-slate-300 group-hover:text-cyan-300"
                            : "text-slate-700 group-hover:text-blue-600"
                        }`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Work Experience */}
      <div className="py-16">
        <h3 className={`subhead-text ${isNightMode ? "text-white" : "text-slate-900"}`}>
          Work Experience.
        </h3>
        <div className={`mt-5 flex flex-col gap-3 ${isNightMode ? "text-slate-300" : "text-slate-500"}`}>
          <p>
            I've worked with tech companies and startups, continuously expanding my skillset and delivering impactful software solutions:
          </p>
        </div>

        <div className="mt-12 flex">
          <VerticalTimeline>
            {experiences.map((experience) => (
              <VerticalTimelineElement
                key={experience.company_name}
                date={experience.date}
                iconStyle={{ background: experience.iconBg }}
                icon={
                  <div className="flex justify-center items-center w-full h-full">
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                }
                contentStyle={{
                  background: isNightMode ? "#0f172a" : "#ffffff",
                  color: isNightMode ? "#f8fafc" : "#000000",
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: experience.iconBg,
                  boxShadow: isNightMode
                    ? "0 10px 30px rgba(0,0,0,0.5)"
                    : "none",
                  border: isNightMode ? "1px solid #1e293b" : "none",
                }}
                contentArrowStyle={{
                  borderRight: isNightMode ? "7px solid #0f172a" : "7px solid #ffffff",
                }}
              >
                <div>
                  <h3 className={`text-xl font-poppins font-semibold ${isNightMode ? "text-white" : "text-black"}`}>
                    {experience.title}
                  </h3>
                  <p
                    className={`font-medium text-base ${isNightMode ? "text-cyan-300" : "text-black-500"}`}
                    style={{ margin: 0 }}
                  >
                    {experience.company_name}
                  </p>
                </div>

                <ul className="my-5 list-disc ml-5 space-y-2">
                  {experience.points.map((point, index) => (
                    <li
                      key={`experience-point-${index}`}
                      className={`font-normal pl-1 text-sm ${isNightMode ? "text-slate-300" : "text-black-500/80"}`}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="py-16 border-t border-slate-200/20">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h3 className={`subhead-text ${isNightMode ? "text-white" : "text-slate-900"}`}>
              Featured Projects.
            </h3>
            <p className={`mt-2 text-sm ${isNightMode ? "text-slate-400" : "text-slate-500"}`}>
              A showcase of my recent full-stack applications, interactive web platforms, and digital solutions:
            </p>
          </div>
          <Link
            to="/projects"
            className="neo-brutalism-blue text-white px-5 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg flex items-center gap-2"
          >
            🏰 Explore 3D Projects Island
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {projects.map((project) => (
            <div
              key={project.name}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between hover:scale-[1.02] shadow-lg ${
                isNightMode
                  ? "bg-slate-900/80 backdrop-blur-md border-slate-700/80 text-slate-100 shadow-cyan-950/20"
                  : "bg-white/80 backdrop-blur-md border-slate-200/90 text-slate-900 shadow-slate-200/60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md shrink-0"
                      style={{ background: project.iconBg }}
                    >
                      {project.iconEmoji}
                    </div>
                    <div>
                      <span className={`text-xs font-black uppercase tracking-wider ${isNightMode ? "text-cyan-300" : "text-blue-600"}`}>
                        {project.buildingType}
                      </span>
                      <h4 className={`text-xl font-bold font-poppins ${isNightMode ? "text-white" : "text-slate-900"}`}>
                        {project.name}
                      </h4>
                    </div>
                  </div>
                </div>

                <p className={`text-sm leading-relaxed mb-4 ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                        isNightMode
                          ? "bg-slate-800 border-slate-700 text-cyan-200"
                          : "bg-blue-50 border-blue-100 text-blue-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/20">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 neo-brutalism-blue text-white py-2.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-transform"
                  >
                    <span>Live Demo</span>
                    <img src={arrow} alt="arrow" className="w-3.5 h-3.5 object-contain" />
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-2.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 border shadow-md hover:scale-105 transition-transform ${
                      isNightMode
                        ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                        : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
                    }`}
                  >
                    <span>Repository</span>
                    <img src={arrow} alt="arrow" className="w-3.5 h-3.5 object-contain" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className={isNightMode ? "border-slate-800" : "border-slate-200"} />

      <CTA />
    </section>
  );
};

export default About;
