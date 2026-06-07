import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot, User, CornerDownLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { getChatbotResponse } from "../utils/chatbotHelper";

export default function PortfolioAssistant() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Default initial message from Nova
  const [messages, setMessages] = useState([
    {
      id: "init",
      text: "👋 Hi! I'm Nova, Puveesh's portfolio assistant. Ask me about projects, skills, experience, or how to get in touch!",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef(null);
  const welcomeTimerRef = useRef(null);
  const autoHideTimerRef = useRef(null);

  // Scroll to bottom on new messages or typing state changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Initial Welcome Bubble load
  useEffect(() => {
    // Show welcome bubble after a short delay on page load
    welcomeTimerRef.current = setTimeout(() => {
      if (!isOpen && !hasInteracted) {
        setShowWelcomeBubble(true);
        // Auto-dismiss the bubble after 6 seconds
        autoHideTimerRef.current = setTimeout(() => {
          setShowWelcomeBubble(false);
        }, 6000);
      }
    }, 3000);

    return () => {
      clearTimeout(welcomeTimerRef.current);
      clearTimeout(autoHideTimerRef.current);
    };
  }, []);

  // Handle welcome bubble re-appearance after chat is closed
  useEffect(() => {
    let closedReappearTimer;

    if (!isOpen && hasInteracted) {
      // Re-trigger welcome bubble after 60 seconds if chat remains closed
      closedReappearTimer = setTimeout(() => {
        if (!isOpen) {
          setShowWelcomeBubble(true);
          // Auto-dismiss after 6 seconds
          autoHideTimerRef.current = setTimeout(() => {
            setShowWelcomeBubble(false);
          }, 6000);
        }
      }, 60000);
    }

    return () => {
      clearTimeout(closedReappearTimer);
      clearTimeout(autoHideTimerRef.current);
    };
  }, [isOpen, hasInteracted]);

  // Quick reply questions
  const quickReplies = [
    { label: "Projects 🚀", text: "What projects has he worked on?" },
    { label: "Skills 💻", text: "What technologies does he use?" },
    { label: "Experience 💼", text: "What internship experience does he have?" },
    { label: "Contact ✉️", text: "How can I contact him?" },
    { label: "Who is Puveesh? 🙋‍♂️", text: "Who is Puveesh?" },
  ];

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    setHasInteracted(true);
    setShowWelcomeBubble(false);

    // 1. Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      text: textToSend,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // 2. Simulate typing duration (800ms) for premium feel
    setTimeout(() => {
      const response = getChatbotResponse(textToSend);

      const botMsg = {
        id: `bot-${Date.now()}`,
        text: response.text,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // 3. Handle navigation path if matching route action exists
      if (response.navigatePath) {
        // Only navigate if we aren't already on that path
        if (location.pathname !== response.navigatePath) {
          navigate(response.navigatePath);
        }
      }
    }, 800);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowWelcomeBubble(false);
      setHasInteracted(true);
    }
  };

  return (
    <div className="fixed bottom-20 right-7 z-50 pointer-events-auto flex flex-col items-end">
      
      {/* 1. Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[360px] max-w-[calc(100vw-2rem)] h-[500px] rounded-2xl glassmorphism glass-light dark:glass-dark shadow-2xl flex flex-col overflow-hidden mb-4 border border-neutral-200/50 dark:border-neutral-800/80 accent-glow"
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30">
              <div className="flex items-center space-x-2.5">
                <div className="relative h-8 w-8 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center border border-blue-500/20 text-blue-500">
                  <Bot size={18} className="stroke-[2]" />
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-white dark:border-darkBg animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                    Nova
                    <Sparkles size={11} className="text-blue-500 fill-blue-500/20" />
                  </h3>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
                    Portfolio Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="h-8 w-8 rounded-lg flex items-center justify-center border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800/80 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-all duration-200"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-start gap-2.5`}
                >
                  {/* Bot Avatar on Left */}
                  {msg.sender === "bot" && (
                    <div className="h-6 w-6 rounded-full bg-blue-500/10 dark:bg-blue-500/25 border border-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0 mt-0.5">
                      <Bot size={13} />
                    </div>
                  )}

                  <div className="flex flex-col max-w-[80%]">
                    <div
                      className={`px-3 py-2.5 rounded-2xl text-xs md:text-sm whitespace-pre-line leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-blue-500 text-white rounded-tr-none self-end"
                          : "bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-tl-none border border-neutral-200/40 dark:border-neutral-800/40"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span
                      className={`text-[9px] text-neutral-400 dark:text-neutral-500 mt-1 ${
                        msg.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* User Avatar on Right */}
                  {msg.sender === "user" && (
                    <div className="h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 flex-shrink-0 mt-0.5 border border-neutral-300/30 dark:border-neutral-700/30">
                      <User size={13} />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start items-center gap-2.5">
                  <div className="h-6 w-6 rounded-full bg-blue-500/10 dark:bg-blue-500/25 border border-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                    <Bot size={13} />
                  </div>
                  <div className="px-3.5 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 rounded-tl-none border border-neutral-200/40 dark:border-neutral-800/40 flex items-center space-x-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies Panel */}
            <div className="px-4 py-2 border-t border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-50/20 dark:bg-neutral-950/20">
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.label}
                    onClick={() => handleSendMessage(reply.text)}
                    className="flex-shrink-0 px-2.5 py-1.5 rounded-full text-[10px] md:text-xs font-semibold bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/55 dark:border-neutral-800/80 text-neutral-600 hover:text-blue-500 dark:text-neutral-400 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 hover:border-blue-200 dark:hover:border-blue-900/60 transition-all duration-200"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Input Area */}
            <form
              onSubmit={handleFormSubmit}
              className="p-3 bg-neutral-50/50 dark:bg-neutral-900/40 border-t border-neutral-200/60 dark:border-neutral-800/80 flex items-center space-x-2"
            >
              <div className="relative flex-grow flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Nova a question..."
                  className="w-full text-xs md:text-sm px-3.5 py-2.5 pr-8 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/90 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:border-blue-500/80 dark:focus:border-blue-500/80 transition-all duration-200"
                />
                <span className="absolute right-3 text-[10px] text-neutral-400 hidden md:flex items-center gap-0.5 pointer-events-none">
                  <CornerDownLeft size={8} /> Enter
                </span>
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  inputValue.trim()
                    ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer shadow-sm hover:shadow"
                    : "bg-neutral-100 dark:bg-neutral-900 text-neutral-400 border border-neutral-200/30 dark:border-neutral-800/30 cursor-not-allowed"
                }`}
                aria-label="Send message"
              >
                <Send size={14} className="stroke-[2.5]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Welcome Bubble */}
      <AnimatePresence>
        {showWelcomeBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-1 w-[280px] p-3 rounded-2xl glassmorphism glass-light dark:glass-dark shadow-xl border border-neutral-200/60 dark:border-neutral-800/80 flex flex-col"
          >
            {/* Tiny bubble pointer */}
            <div className="absolute bottom-[-6px] right-5 w-3 h-3 rotate-45 border-r border-b border-neutral-200/60 dark:border-neutral-800/80 bg-[#FAFAFA] dark:bg-[#0E0E0E]" />
            
            <div className="flex items-start justify-between gap-1">
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-light">
                👋 Hi! I'm <strong>Nova</strong>. Ask me about projects, skills, experience, or how to get in touch.
              </p>
              <button
                onClick={() => setShowWelcomeBubble(false)}
                className="p-0.5 rounded-md hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-neutral-400 hover:text-neutral-600 dark:hover:text-white flex-shrink-0 transition-colors"
                aria-label="Dismiss bubble"
              >
                <X size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleChat}
        className={`h-12 w-12 rounded-full shadow-lg flex items-center justify-center relative cursor-pointer border theme-transition ${
          isOpen
            ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-800 dark:border-neutral-100"
            : "bg-blue-500 hover:bg-blue-600 text-white border-blue-400/30"
        }`}
        aria-label="Toggle assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} className="stroke-[2.5]" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare size={20} className="stroke-[2.5]" />
              {/* Pulsing indicator badge to draw soft attention if not interacted */}
              {!hasInteracted && (
                <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-400/90 border border-white dark:border-darkBg flex items-center justify-center">
                    <Sparkles size={8} className="text-white fill-white/20" />
                  </span>
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
