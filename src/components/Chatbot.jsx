import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const INITIAL_BOT_MESSAGE = {
  id: 1,
  sender: "bot",
  text: `Hi! 🤖🧑‍🚀 I'm AstroBot, Riya's AI Portfolio Assistant! How can I help you explore today?

Select a quick topic below or type your question:`,
  showButtons: true,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const ABOUT_RIYA_TEXT = `Riya Singh is a Computer Science Engineering student focused on building scalable software systems.

Her expertise includes:

• Full Stack Development
• Backend Engineering
• Cloud & DevOps
• AI/ML Applications
• Data Analytics

She enjoys creating production-ready applications, automation tools, and intelligent systems.`;

const SKILLS_TEXT = `Here is a quick breakdown of Riya's technical stack:

⚡ Languages: JavaScript, Python, C++, Java, HTML, CSS
💻 Frontend: React.js, Next.js, Vite, Framer Motion, UI/UX Design, REST APIs
⚙️ Backend & DBs: Node.js, Express.js, MongoDB, SQL, PostgreSQL, Firebase, GraphQL
☁️ Cloud & DevOps: AWS (EC2/S3), Docker, Git, GitHub, Postman
🎯 Core Fundamentals: Data Structures & Algorithms (DSA)`;

const PROJECTS_TEXT = `Here are some featured projects built by Riya:

🏦 PayTM Clone: Digital wallet app with P2P transfers & balance management.
🚗 ZoomCar Clone: Self-drive car booking platform with dynamic pricing & reservations.
💇‍♀️ GlamGrove: Luxury salon & beauty booking app with service catalogs.
🏥 Telemedicine App: Online doctor consultations & appointment scheduling.`;

const EXPERIENCE_TEXT = `Riya's key software engineering & design experience:

💼 Full Stack Development Intern @ NRK INFOTECH (Jun 2026 - Present)
📊 Big Data Automation Intern @ Jio Platforms Limited (Oct 2025 - Dec 2025)
💳 Full-stack Developer Intern @ Winvesta (Jul 2025 - Sep 2025)
🎨 UI/UX Designer @ Auroville Investment Management (Jul 2025 - Dec 2025)
📐 UI/UX Designer @ ELDII & Marketing Intern @ Lets Upgrade`;

const CONTACT_TEXT = `Feel free to connect with Riya Singh directly:

📧 Email: riyaaasingh67@gmail.com
🐙 GitHub: github.com/riyaaa04
💼 LinkedIn: linkedin.com/in/riya-singh-061788291
📄 Resume: Available on Google Drive`;

const Chatbot = () => {
  const { isNightMode } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_BOT_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleActionClick = (actionType) => {
    let userPromptText = "";
    let botReplyText = "";
    let navRoute = null;

    switch (actionType) {
      case "About Riya":
        userPromptText = "Tell me about Riya";
        botReplyText = ABOUT_RIYA_TEXT;
        break;
      case "Skills":
        userPromptText = "What are Riya's technical skills?";
        botReplyText = SKILLS_TEXT;
        navRoute = "/skills";
        break;
      case "Projects":
        userPromptText = "Show me Riya's projects";
        botReplyText = PROJECTS_TEXT;
        navRoute = "/projects";
        break;
      case "Experience":
        userPromptText = "Tell me about Riya's experience";
        botReplyText = EXPERIENCE_TEXT;
        navRoute = "/experience";
        break;
      case "Contact":
        userPromptText = "How can I contact Riya?";
        botReplyText = CONTACT_TEXT;
        navRoute = "/contact";
        break;
      default:
        return;
    }

    processMessage(userPromptText, botReplyText, navRoute);
  };

  const processMessage = (userText, predefinedReply = null, navRoute = null) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: Date.now(), sender: "user", text: userText, timestamp };
    
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let replyText = predefinedReply;
      let route = navRoute;

      if (!replyText) {
        const lower = userText.toLowerCase();
        if (lower.includes("about") || lower.includes("who is") || lower.includes("riya")) {
          replyText = ABOUT_RIYA_TEXT;
        } else if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech") || lower.includes("language")) {
          replyText = SKILLS_TEXT;
          route = "/skills";
        } else if (lower.includes("project") || lower.includes("app") || lower.includes("work") || lower.includes("paytm") || lower.includes("zoomcar")) {
          replyText = PROJECTS_TEXT;
          route = "/projects";
        } else if (lower.includes("exp") || lower.includes("intern") || lower.includes("jio") || lower.includes("company") || lower.includes("job")) {
          replyText = EXPERIENCE_TEXT;
          route = "/experience";
        } else if (lower.includes("contact") || lower.includes("email") || lower.includes("reach") || lower.includes("hire") || lower.includes("linkedin") || lower.includes("github") || lower.includes("resume")) {
          replyText = CONTACT_TEXT;
          route = "/contact";
        } else {
          replyText = `Thanks for asking! Riya Singh is a Computer Science Engineer specializing in Full Stack, Cloud & AI/ML systems.

Would you like to explore:
• Her skills & tech stack
• Featured projects
• Work experience & internships
• Contact & resume details`;
        }
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: replyText,
        navRoute: route,
        showButtons: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const text = inputValue.trim();
    setInputValue("");
    processMessage(text);
  };

  return (
    <>
      {/* Floating Trigger Button (Positioned directly above the sound button in bottom left) */}
      <div className="fixed bottom-16 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group p-2.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 ${
            isOpen
              ? "bg-blue-600 border-white text-white rotate-90"
              : isNightMode
              ? "bg-slate-900/90 border-cyan-400/60 text-cyan-300 hover:border-cyan-300 shadow-cyan-950/50"
              : "bg-white/95 border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white shadow-blue-500/20"
          }`}
          title={isOpen ? "Close Assistant" : "Chat with Riya AI"}
          aria-label="Toggle Riya AI Chatbot"
        >
          {isOpen ? (
            <span className="text-lg font-black leading-none">✕</span>
          ) : (
            <div className="relative flex items-center justify-center">
              <span className="text-xl leading-none animate-bounce">🤖</span>
              {/* Online Indicator Pulse */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
              </span>
            </div>
          )}
        </button>

        {/* Floating Tooltip Pill when closed */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className={`cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-lg transition-all hover:scale-105 border ${
              isNightMode
                ? "bg-slate-900/85 border-slate-700 text-cyan-200 shadow-cyan-950/40"
                : "bg-white/90 border-blue-200 text-slate-800 shadow-slate-300/50"
            }`}
          >
            <span>Ask Riya AI</span>
            <span className="text-blue-500 animate-pulse">✨</span>
          </div>
        )}
      </div>

      {/* Chat Pop-up Window */}
      {isOpen && (
        <div
          className={`fixed bottom-28 left-4 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[530px] h-[530px] rounded-3xl shadow-2xl border-2 flex flex-col overflow-hidden animate-fade-in transition-all duration-300 ${
            isNightMode
              ? "bg-slate-950/95 border-cyan-500/40 text-slate-100 shadow-cyan-950/50 backdrop-blur-xl"
              : "bg-white/95 border-blue-400/50 text-slate-900 shadow-2xl backdrop-blur-xl"
          }`}
        >
          {/* Header */}
          <div
            className={`p-4 flex items-center justify-between border-b ${
              isNightMode
                ? "bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-slate-800"
                : "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white border-blue-400"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-xl shrink-0">
                🤖
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm tracking-wide">Riya AI Assistant</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-400/30 text-cyan-200 border border-cyan-300/40">
                    BOT
                  </span>
                </div>
                <span className="text-[11px] opacity-80 font-medium">CS Engineering Profile • Online</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([INITIAL_BOT_MESSAGE])}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors opacity-80 hover:opacity-100 text-xs font-semibold"
                title="Clear Chat"
              >
                🔄
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors font-bold text-sm"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 shadow-md leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : isNightMode
                      ? "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none"
                      : "bg-slate-100 border border-slate-200 text-slate-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}

                  {/* Deep Link Buttons inside Bot Replies */}
                  {msg.navRoute && (
                    <div className="mt-3 pt-2 border-t border-white/20 flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate(msg.navRoute);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-extrabold shadow transition-all hover:scale-105"
                      >
                        <span>Explore Page</span>
                        <span>➔</span>
                      </button>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Preset Option Buttons attached to Bot Message */}
                {msg.sender === "bot" && msg.showButtons && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                    {["About Riya", "Skills", "Projects", "Experience", "Contact"].map(
                      (btnText) => (
                        <button
                          key={btnText}
                          onClick={() => handleActionClick(btnText)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1 ${
                            isNightMode
                              ? "bg-slate-900/90 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400"
                              : "bg-white border-blue-400/60 text-blue-600 hover:bg-blue-50 hover:border-blue-600 shadow-sm"
                          }`}
                        >
                          <span>{btnText}</span>
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2 bg-slate-800/20 rounded-xl w-fit">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>
                </span>
                <span>Riya AI is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Buttons Toolbar Above Input */}
          <div
            className={`px-3 py-2 border-t flex gap-1.5 overflow-x-auto no-scrollbar scrollbar-none ${
              isNightMode ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}
          >
            {["About Riya", "Skills", "Projects", "Experience", "Contact"].map((btnText) => (
              <button
                key={`footer-${btnText}`}
                onClick={() => handleActionClick(btnText)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-colors ${
                  isNightMode
                    ? "bg-slate-800 text-cyan-200 hover:bg-slate-700"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                {btnText}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className={`p-3 border-t flex items-center gap-2 ${
              isNightMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
            }`}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Riya AI a question..."
              className={`flex-1 px-3 py-2 rounded-xl text-xs sm:text-sm outline-none border transition-all ${
                isNightMode
                  ? "bg-slate-900 border-slate-700 text-slate-100 focus:border-cyan-400 placeholder:text-slate-500"
                  : "bg-slate-100 border-slate-300 text-slate-900 focus:border-blue-500 placeholder:text-slate-400"
              }`}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:scale-105 shrink-0"
              title="Send Message"
            >
              <span className="text-sm">➔</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
