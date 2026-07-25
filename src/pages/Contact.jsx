import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";

import { Fox } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader, NightSkyBackground } from "../components";
import { useTheme } from "../context/ThemeContext";

const Contact = () => {
  const formRef = useRef();
  const { isNightMode } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      window.open(
        `mailto:riyaaasingh67@gmail.com?subject=Portfolio%20Message%20from%20${encodeURIComponent(
          form.name
        )}&body=${encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
        )}`
      );
      setLoading(false);
      setCurrentAnimation("idle");
      showAlert({
        show: true,
        text: "Opening your email client for riyaaasingh67@gmail.com! ✉️",
        type: "success",
      });
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          date: new Date().toLocaleString(),
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you! Your message has been sent to Riya Singh 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setCurrentAnimation("idle");
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS Submission Error:", error);
          setCurrentAnimation("idle");

          window.open(
            `mailto:riyaaasingh67@gmail.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(
              form.name
            )}&body=${encodeURIComponent(
              `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
            )}`
          );

          showAlert({
            show: true,
            text: "Opening your mail client for riyaaasingh67@gmail.com ✉️",
            type: "success",
          });
        }
      );
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container pb-20 z-10 gap-10 items-stretch">
      <NightSkyBackground />

      {alert.show && <Alert {...alert} />}

      {/* Contact Form Card Container */}
      <div
        className={`flex-1 min-w-[50%] flex flex-col p-6 sm:p-8 rounded-3xl backdrop-blur-xl border shadow-2xl z-20 ${
          isNightMode
            ? "bg-slate-900/85 border-slate-700/80 text-white shadow-cyan-950/20"
            : "bg-white/90 border-slate-200/90 text-slate-900 shadow-slate-300/50"
        }`}
      >
        <h1 className={`head-text ${isNightMode ? "text-white" : "text-slate-900"}`}>
          Get in Touch
        </h1>

        {/* Direct Email Notification info box */}
        <div
          className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-sm ${
            isNightMode
              ? "bg-slate-800/90 border-slate-700 text-slate-200"
              : "bg-blue-50 border-blue-200 text-slate-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📧</span>
            <div>
              <span className={`font-extrabold block ${isNightMode ? "text-cyan-300" : "text-blue-600"}`}>
                Direct Email:
              </span>
              <span>
                Messages arrive directly in <strong>riyaaasingh67@gmail.com</strong>
              </span>
            </div>
          </div>
          <a
            href="mailto:riyaaasingh67@gmail.com"
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs whitespace-nowrap shadow-md transition-all shrink-0"
          >
            Direct Mail ➔
          </a>
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 mt-6"
        >
          <label className={`font-bold text-sm flex flex-col gap-1.5 ${isNightMode ? "text-slate-200" : "text-slate-700"}`}>
            Name
            <input
              type="text"
              name="name"
              className={`w-full p-3.5 rounded-xl border text-sm font-medium transition-all outline-none ${
                isNightMode
                  ? "bg-slate-800/90 border-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                  : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              placeholder="Your Name"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className={`font-bold text-sm flex flex-col gap-1.5 ${isNightMode ? "text-slate-200" : "text-slate-700"}`}>
            Email
            <input
              type="email"
              name="email"
              className={`w-full p-3.5 rounded-xl border text-sm font-medium transition-all outline-none ${
                isNightMode
                  ? "bg-slate-800/90 border-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                  : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              placeholder="your.email@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className={`font-bold text-sm flex flex-col gap-1.5 ${isNightMode ? "text-slate-200" : "text-slate-700"}`}>
            Your Message
            <textarea
              name="message"
              rows="4"
              className={`w-full p-3.5 rounded-xl border text-sm font-medium transition-all outline-none resize-none ${
                isNightMode
                  ? "bg-slate-800/90 border-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                  : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
              placeholder="Write your thoughts or project ideas here..."
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn font-black text-sm py-3.5 px-6 rounded-xl hover:scale-[1.02] transition-transform shadow-lg cursor-pointer mt-2"
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {loading ? "Sending..." : "Submit Message ✉️"}
          </button>
        </form>
      </div>

      {/* 3D Fox Canvas */}
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] rounded-3xl overflow-hidden z-20">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight
            position={[0, 0, 1]}
            intensity={isNightMode ? 1.5 : 2.5}
            color={isNightMode ? "#9dbdff" : "#ffffff"}
          />
          <ambientLight intensity={isNightMode ? 0.4 : 1} />
          <pointLight
            position={[5, 10, 0]}
            intensity={isNightMode ? 1.5 : 2}
            color={isNightMode ? "#66d9ff" : "#ffffff"}
          />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={isNightMode ? 0.8 : 2}
          />

          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
