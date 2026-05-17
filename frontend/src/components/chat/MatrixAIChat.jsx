"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles, HiCpuChip, HiBolt, HiXMark, HiPaperAirplane } from "react-icons/hi2";
import { FiMessageSquare, FiGift, FiShield, FiSend } from "react-icons/fi";

const PRESETS = [
  {
    label: "💻 Recommend Laptops",
    query: "Recommend a high-performance 3D laptop",
    response: "🔍 **System Scan Complete:** I highly recommend the **Predator Helios Neo** ($1890.00). It features an **RTX 4080**, **32GB RAM**, and a **2TB SSD**, optimized specifically for real-time 3D rendering and VR development. Alternatively, for mobile business elite, the **ThinkPad Z13** ($1550.00) offers an stunning **OLED screen** and AMD Ryzen 9 computing power!"
  },
  {
    label: "🎧 Best Audio Gear",
    query: "What is the best audiophile gear available?",
    response: "🎵 **Acoustics Engine Active:** The **Sony XM5 Premium** ($750.00) is the pinnacle of active noise cancellation with a **30-hour battery life** and LDAC support. For high comfort spatial audio, check out the **Bose Ultra Comfort** ($650.00) featuring CustomTune sound matching."
  },
  {
    label: "🎁 VIP Discount Code",
    query: "Do you have a 3D Tech member discount code?",
    response: "🎟️ **Decryption Successful:** Apply code **`3DTECH20`** at checkout to unlock an instant **20% discount** on any high-tier hardware. VIP members also receive 10% cashback on all orders!"
  },
  {
    label: "🔒 Secured Payments",
    query: "Is checkout secure?",
    response: "🛡️ **Encryption Shield Active:** Yes, all payments are processed through **Stripe SSL Encrypted gateways** and authentication is secured by **Clerk Security**. Your financial token payloads remain 100% sandboxed and secure."
  }
];

export default function MatrixAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "aria",
      text: "Welcome to 3D Tech Core v1.2. I am A.R.I.A., your custom neural tech assistant. How can I augment your hardware layout today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Check if query matches a preset
    const matchedPreset = PRESETS.find(p => p.query === text || p.label === text);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responseText = matchedPreset 
        ? matchedPreset.response 
        : `🤖 **Neural Process Response:** I have logged your request: "${text}". The system database is analyzing your request. For immediate assistance, feel free to use code **3DTECH20** to save 20% on all orders!`;

      setMessages((prev) => [
        ...prev,
        {
          sender: "aria",
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[190] pointer-events-auto">
      {/* Pulse Orb Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.6)] border border-blue-400/30 cursor-pointer group"
          >
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping pointer-events-none" />
            <FiMessageSquare size={26} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
            
            {/* Indicator badge */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black flex items-center justify-center text-[8px] font-black animate-pulse">
              1
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-[360px] md:w-[400px] h-[550px] bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl relative"
          >
            {/* Ambient glows inside chat */}
            <div className="absolute -top-20 -left-20 w-44 h-44 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <header className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center border border-white/20">
                  <HiCpuChip size={20} className="text-white animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white italic tracking-tighter">A.R.I.A.</h3>
                  <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mt-0.5">3D Tech Neural Assist</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer relative z-30 pointer-events-auto"
              >
                <HiXMark size={16} />
              </button>
            </header>

            {/* Message Thread */}
            <section className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 no-scrollbar">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed border ${
                      msg.sender === "user"
                        ? "bg-blue-600 border-blue-500 text-white rounded-tr-none shadow-[0_5px_15px_rgba(37,99,235,0.3)]"
                        : "bg-white/5 border-white/10 text-gray-300 rounded-tl-none"
                    }`}
                  >
                    {/* Parse simple markdown styles (bolding) */}
                    {msg.text.split("**").map((part, i) => (i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part))}
                  </div>
                  <span className="text-[8px] text-gray-500 font-bold mt-1 uppercase tracking-widest px-2">
                    {msg.time}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </section>

            {/* Suggestions Layer */}
            {messages.length === 1 && (
              <div className="px-6 py-2 flex flex-wrap gap-2 relative z-10">
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p.query)}
                    className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl text-gray-300 hover:text-white transition-all cursor-pointer font-bold uppercase tracking-wider"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <footer className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md relative z-10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputText);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask A.R.I.A. anything..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-[0_5px_15px_rgba(37,99,235,0.3)] transition-all cursor-pointer flex items-center justify-center"
                >
                  <HiPaperAirplane size={14} className="rotate-90" />
                </button>
              </form>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
