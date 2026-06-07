import { portfolioData } from "../data/portfolioData";

/**
 * Clean and normalize the query for easier matching
 */
const normalizeQuery = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[?.,!/]/g, "") // remove punctuation
    .replace(/\s+/g, " "); // collapse spaces
};

export const getChatbotResponse = (queryText) => {
  const query = normalizeQuery(queryText);
  
  // 1. GREETINGS
  if (
    query === "hi" ||
    query === "hello" ||
    query === "hey" ||
    query === "greetings" ||
    query.startsWith("hi ") ||
    query.startsWith("hello ")
  ) {
    return {
      text: "👋 Hello! I'm Nova, Puveesh's portfolio assistant. How can I help you today? You can ask me about his projects, skills, internship experience, or how to get in touch.",
    };
  }

  // 2. WHO IS PUVEESH
  if (
    query.includes("who is puveesh") ||
    query.includes("who are you") ||
    query.includes("about puveesh") ||
    query.includes("tell me about him") ||
    query.includes("tell me about yourself") ||
    query === "who" ||
    query === "about"
  ) {
    return {
      text: `Puveesh Keshav M is a software developer passionate about building modern digital experiences across web, mobile, AI, and cybersecurity. He is currently pursuing his BE in Computer Science Engineering at Sri Krishna College of Engineering & Technology (SKCET), Coimbatore. He loves creating sleek UI interactions and intelligent systems.`,
      navigatePath: "/about",
    };
  }

  // 3. WHAT DOES HE DO
  if (
    query.includes("what does he do") ||
    query.includes("what do you do") ||
    query.includes("role") ||
    query.includes("profession") ||
    query.includes("occupation") ||
    query.includes("job")
  ) {
    return {
      text: `Puveesh focuses on building premium digital interfaces, mobile application development, full-stack architectures, and exploring intelligent systems. He loves turning technical curiosities into interactive creations. I'll open the About page so you can read more.`,
      navigatePath: "/about",
    };
  }

  // 4. PROJECTS LISTING AND COUNT
  if (
    query.includes("projects") ||
    query.includes("portfolio work") ||
    query.includes("builds") ||
    query.includes("what has he built") ||
    query.includes("what projects") ||
    query.includes("showcase") ||
    query.includes("apps")
  ) {
    const projectList = portfolioData.projects;
    const projectCount = projectList.length;
    const projectNames = projectList.map((p) => `• ${p.title}`).join("\n");

    return {
      text: `Puveesh currently has ${projectCount} featured projects:\n\n${projectNames}\n\nI've opened the projects page so you can view all live demos, source repositories, or related details!`,
      navigatePath: "/projects",
    };
  }

  // 5. SKILLS / TECHNOLOGIES
  if (
    query.includes("skills") ||
    query.includes("technologies") ||
    query.includes("tech stack") ||
    query.includes("languages") ||
    query.includes("tools") ||
    query.includes("what does he use") ||
    query.includes("frameworks")
  ) {
    const frontend = portfolioData.skills.frontend.map((s) => s.name).join(", ");
    const backend = portfolioData.skills.backend.map((s) => s.name).join(", ");
    const languages = portfolioData.skills.language.map((s) => s.name).join(", ");
    const tools = portfolioData.skills.tools.map((s) => s.name).join(", ");

    return {
      text: `Puveesh has experience with a wide array of tools and frameworks:\n\n💻 **Frontend**: ${frontend}\n\n⚙️ **Backend**: ${backend}\n\n🔑 **Languages**: ${languages}\n\n🛠️ **Tools**: ${tools}\n\nHe is always looking to learn and master new emerging frameworks!`,
    };
  }

  // 6. CERTIFICATIONS & HACKATHONS
  if (
    query.includes("certifications") ||
    query.includes("certificates") ||
    query.includes("certificate") ||
    query.includes("hackathon") ||
    query.includes("hackathons") ||
    query.includes("competition") ||
    query.includes("wins")
  ) {
    // Find hackathon detail from timeline if it exists
    const hackathon = portfolioData.timeline.find((t) => t.type === "hackathon");
    const hackathonText = hackathon
      ? `He recently won **1st place** in the national-level **${hackathon.role}** hackathon at ${hackathon.company} (${hackathon.duration}), where his team built a Smart Health & Driving Safety System prototype.`
      : "He has participated in several hackathons and student innovation contests.";

    return {
      text: `Puveesh focuses heavily on hands-on software creation and system engineering. ${hackathonText} He holds an active learning path in Computer Science Engineering at SKCET.`,
    };
  }

  // 7. INTERNSHIP / EXPERIENCE
  if (
    query.includes("internship") ||
    query.includes("experience") ||
    query.includes("work experience") ||
    query.includes("where did he work") ||
    query.includes("history") ||
    query.includes("career")
  ) {
    const workItems = portfolioData.timeline.filter((t) => t.type === "work");
    const formattedWork = workItems
      .map((w) => `💼 **${w.role}** at *${w.company}* (${w.duration})`)
      .join("\n\n");

    return {
      text: `Puveesh has completed several internship experiences:\n\n${formattedWork}\n\nI have redirected you to his About page for the full educational and professional timeline.`,
      navigatePath: "/about",
    };
  }

  // 8. CONTACT / GET IN TOUCH
  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("reach") ||
    query.includes("hire") ||
    query.includes("socials") ||
    query.includes("phone") ||
    query.includes("github") ||
    query.includes("linkedin") ||
    query.includes("instagram") ||
    query.includes("get in touch")
  ) {
    const email = portfolioData.personalInfo.socials.email;
    const github = portfolioData.personalInfo.socials.github;
    const linkedin = portfolioData.personalInfo.socials.linkedin;

    return {
      text: `You can reach Puveesh through the following channels:\n\n📧 **Email**: ${email}\n🔗 **LinkedIn**: [Puveesh Keshav](${linkedin})\n💻 **GitHub**: [github.com/Puveesh](${github})\n\nI'll open the Contact page for you now. Feel free to send him a direct message using the form!`,
      navigatePath: "/contact",
    };
  }

  // 9. SPECIFIC PROJECTS
  if (query.includes("yapichat") || query.includes("yapi chat")) {
    const proj = portfolioData.projects.find((p) => p.title.toLowerCase().includes("yapichat"));
    return {
      text: proj
        ? `**${proj.title}** is a private messaging application. Description: ${proj.description}\n\nTech Stack: ${proj.tags.join(", ")}.`
        : "YapiChat is a private Messaging App built by Puveesh with React, Supabase, and Vercel.",
      navigatePath: "/projects",
    };
  }

  if (query.includes("pulsebeat") || query.includes("pulse beat")) {
    const proj = portfolioData.projects.find((p) => p.title.toLowerCase().includes("pulsebeat"));
    return {
      text: proj
        ? `**${proj.title}** is an Android music application. Description: ${proj.description}\n\nTech Stack: ${proj.tags.join(", ")}.`
        : "PulseBeat is an Android Music Player built with Android Studio and ExoPlayer.",
      navigatePath: "/projects",
    };
  }

  if (query.includes("turf") || query.includes("turf management")) {
    const proj = portfolioData.projects.find((p) => p.title.toLowerCase().includes("turf"));
    return {
      text: proj
        ? `**${proj.title}** is a backend reservation system. Description: ${proj.description}\n\nTech Stack: ${proj.tags.join(", ")}.`
        : "The Turf Management System is a backend booking service built with Spring Boot and Java.",
      navigatePath: "/projects",
    };
  }

  if (query.includes("climatesync") || query.includes("climate sync") || query.includes("weather")) {
    const proj = portfolioData.projects.find((p) => p.title.toLowerCase().includes("climatesync"));
    return {
      text: proj
        ? `**${proj.title}** is an IoT weather monitoring system. Description: ${proj.description}\n\nTech Stack: ${proj.tags.join(", ")}.`
        : "ClimateSync is an IoT Weather Monitoring System built with NodeMCU and sensors.",
      navigatePath: "/projects",
    };
  }

  if (query.includes("portfolio")) {
    const proj = portfolioData.projects.find((p) => p.title.toLowerCase() === "portfolio");
    return {
      text: proj
        ? `**${proj.title}** is his personal website. Description: ${proj.description}\n\nTech Stack: ${proj.tags.join(", ")}.`
        : "This portfolio was built with React, Vite, and Tailwind CSS to create a premium SaaS interface.",
    };
  }

  // 10. PAGES NAVIGATION TRIGGERS
  if (query.includes("about page") || query.includes("take me to about") || query.includes("open about")) {
    return {
      text: "Opening the About page now. Here you can find Puveesh's background, education, philosophy, and timeline.",
      navigatePath: "/about",
    };
  }

  if (query.includes("projects page") || query.includes("take me to projects") || query.includes("open projects")) {
    return {
      text: "Opening the Projects page. Feel free to filter through frontend, backend, full stack, mobile, or hardware projects!",
      navigatePath: "/projects",
    };
  }

  if (query.includes("contact page") || query.includes("take me to contact") || query.includes("open contact")) {
    return {
      text: "Opening the Contact page. You can fill out the form or find his direct email and social links there.",
      navigatePath: "/contact",
    };
  }

  // 11. GENERAL HELP / FALLBACK
  return {
    text: "I'm not sure about that yet. Try asking about projects, skills, experience, certifications, or contact information.",
  };
};
