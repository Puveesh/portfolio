import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import PageTransition from "../components/PageTransition";

export default function Contact() {
  const { socials } = portfolioData.personalInfo;
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mnjrljyw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <PageTransition>
      <section className="pointer-events-auto">
        {/* Page Header */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-neutral-400 dark:text-neutral-500 mb-2">
            Get in touch
          </h2>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
            Let's Collaborate!
          </h1>
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
            I am always open to exploring novel engineering challenges, premium interface designs, or strategic technical roles. Fill in the form or reach out directly.
          </p>
        </div>

        {/* Form and Contact Detail Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Connections and Details */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Context Card */}
            <div className="p-6 rounded-xl border border-neutral-200/50 dark:border-neutral-800/80 bg-neutral-50/10 dark:bg-neutral-950/10 glassmorphism shadow-sm">
              <h3 className="text-sm font-bold text-neutral-950 dark:text-white mb-3">
                Current Location
              </h3>
              <div className="flex items-center space-x-3 text-xs text-neutral-500 dark:text-neutral-400">
                <MapPin size={14} className="text-blue-500 flex-shrink-0" />
                <span>Coimbatore, Tamil Nadu &bull; Remote Worldwide</span>
              </div>
            </div>

            {/* Direct Connect Elements */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-900 dark:text-white">
                Direct Inquiry
              </h3>
              <a
                href={`mailto:${socials.email}`}
                className="flex items-center space-x-4 p-4 rounded-xl border border-neutral-200/50 dark:border-neutral-800/80 bg-neutral-50/20 dark:bg-neutral-950/20 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 hover:border-blue-500/30 dark:hover:border-blue-500/20 transition-all duration-300 shadow-sm group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 group-hover:scale-105 transition-transform duration-300">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">
                    Email Address
                  </div>
                  <div className="text-xs font-bold text-neutral-950 dark:text-white">
                    {socials.email}
                  </div>
                </div>
              </a>
            </div>

            {/* Social Grid Connections */}
            <div className="space-y-4">
              <h3 className="text-x uppercase tracking-wider font-bold text-neutral-900 dark:text-white">
                Social Networks
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-neutral-200/50 dark:border-neutral-800/80 hover:bg-neutral-100/40 dark:hover:bg-neutral-900/40 transition-colors text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                >
                  <span>GitHub</span>
                  <ArrowRight size={12} className="text-neutral-400" />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-neutral-200/50 dark:border-neutral-800/80 hover:bg-neutral-100/40 dark:hover:bg-neutral-900/40 transition-colors text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                >
                  <span>LinkedIn</span>
                  <ArrowRight size={12} className="text-neutral-400" />
                </a>
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-neutral-200/50 dark:border-neutral-800/80 hover:bg-neutral-100/40 dark:hover:bg-neutral-900/40 transition-colors text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                >
                  <span>Instagram</span>
                  <ArrowRight size={12} className="text-neutral-400" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative p-6 md:p-8 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/80 bg-neutral-50/20 dark:bg-neutral-950/20 shadow-sm glassmorphism overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          className="peer w-full bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-xs text-neutral-900 dark:text-white placeholder-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                        />
                        <label
                          htmlFor="name"
                          className="absolute left-4 -top-2 px-1 text-[10px] font-bold text-neutral-400 uppercase bg-neutral-50 dark:bg-darkBg peer-placeholder-shown:text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-normal peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-blue-500 peer-focus:bg-neutral-50 dark:peer-focus:bg-[#0c0c0c] transition-all duration-300 pointer-events-none"
                        >
                          Name
                        </label>
                      </div>

                      {/* Email input */}
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Your Email"
                          className="peer w-full bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-xs text-neutral-900 dark:text-white placeholder-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-4 -top-2 px-1 text-[10px] font-bold text-neutral-400 uppercase bg-neutral-50 dark:bg-darkBg peer-placeholder-shown:text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-normal peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-blue-500 peer-focus:bg-neutral-50 dark:peer-focus:bg-[#0c0c0c] transition-all duration-300 pointer-events-none"
                        >
                          Email
                        </label>
                      </div>
                    </div>

                    {/* Subject input */}
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Subject"
                        className="peer w-full bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-xs text-neutral-900 dark:text-white placeholder-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                      />
                      <label
                        htmlFor="subject"
                        className="absolute left-4 -top-2 px-1 text-[10px] font-bold text-neutral-400 uppercase bg-neutral-50 dark:bg-darkBg peer-placeholder-shown:text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-normal peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-blue-500 peer-focus:bg-neutral-50 dark:peer-focus:bg-[#0c0c0c] transition-all duration-300 pointer-events-none"
                      >
                        Subject
                      </label>
                    </div>

                    {/* Message textarea */}
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows="5"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Message"
                        className="peer w-full bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-xs text-neutral-900 dark:text-white placeholder-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 resize-none"
                      />
                      <label
                        htmlFor="message"
                        className="absolute left-4 -top-2 px-1 text-[10px] font-bold text-neutral-400 uppercase bg-neutral-50 dark:bg-darkBg peer-placeholder-shown:text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-normal peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-blue-500 peer-focus:bg-neutral-50 dark:peer-focus:bg-[#0c0c0c] transition-all duration-300 pointer-events-none"
                      >
                        Message
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex items-center justify-center space-x-2 w-full rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-black py-3 text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-300 shadow disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 dark:border-neutral-600 border-t-white dark:border-t-black" />
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  // Submitted Success State
                  <motion.div
                    key="success-banner"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-10"
                  >
                    <CheckCircle2 size={42} className="text-emerald-500 mb-4 animate-bounce" />
                    <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-2">
                      Transmission Confirmed
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mb-6 font-light">
                      Thank you. Your inquiry has been securely processed and sent to the inbox of Puveesh Keshav M. Expect a prompt response within 24-48 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      <span>Send another inquiry</span>
                      <ArrowRight size={12} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
