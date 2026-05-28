export const portfolioData = {
  personalInfo: {
    name: "Puveesh Keshav M",
    // role: "Full-Stack & AI Engineer",
    tagline: "Building premium digital interfaces and intelligent web experiences.",
    intro: "I design and develop premium, minimalistic, and highly interactive web applications that blend modern design aesthetics with state-of-the-art AI systems. Beyond tech, I’m also passionate about music production and sound design.",
    resumeUrl: "Resume.pdf",
    socials: {
      github: "https://github.com/Puveesh",
      linkedin: "https://linkedin.com/in/puveesh-keshav-m-24475b309",
      instagram: "https://www.instagram.com/_.puveeshx.pvt._?igsh=ZXh2NWJjeXQ2a3F2",
      email: "puveeshvmm@gmail.com",
    },
  },
  aboutMe: {
  shortBio:
    "Curious and hands-on software developer passionate about building modern digital experiences across web, mobile, AI, and cybersecurity. I enjoy tinkering with new technologies, developing scalable applications, experimenting with hardware systems, and blending creativity with engineering.",

  passionStatement:
    "I believe technology should feel immersive, intuitive, and purposeful. Whether developing full-stack systems, crafting smooth UI interactions, or exploring intelligent technologies, I focus on building experiences that are clean, performant, and meaningful.",

  careerInterests: [
    "Full-stack application development and scalable backend architectures",
    "Cybersecurity, intelligent systems, and AI-powered experiences",
    "Interactive UI engineering, mobile applications, and creative technology experimentation",
  ],

  principles: [
    {
      title: "Build with Purpose",
      description:
        "Every project should solve a real problem, create meaningful experiences, or push technical boundaries through practical innovation.",
    },
    {
      title: "Curiosity-Driven Engineering",
      description:
        "Constantly exploring how systems work internally — from software architectures and AI models to hardware integrations and emerging technologies.",
    },
    {
      title: "Clean & Scalable Systems",
      description:
        "Prioritizing maintainable architectures, smooth user experiences, optimized performance, and scalable development practices across every product.",
    },
  ],
},
  skills: {
    frontend: [
      { name: "React", level: 95 },
      { name: "Vite", level: 95},
      { name: "Tailwind CSS", level: 98 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "HTML & CSS", level: 96 },
    ],
    backend: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 80 },
      { name: "REST APIs", level: 94 },
      { name: "Springboot", level: 90 },
      { name: "FastAPI", level: 85 },
    ],
    language:[
      { name: "Python", level: 90 },
      { name: "Java", level: 85 },
      { name: "C++", level: 75 },
      { name: "SQL", level: 90},
    ],
    tools: [
      { name: "Git", level: 95 },
      { name: "GitHub", level: 92 },
      { name: "Vercel", level: 96 },
      { name: "Figma", level: 80 },
    ],
  },
  projects: [
    {
      id: "frontend",
      title: "Portfolio",
      description: "A premium personal portfolio platform designed to showcase software engineering projects, AI-driven applications, cybersecurity work, and creative development through immersive UI interactions and modern web technologies.",
      image: "/portfolio.png",
      tags: ["Frontend", "React", "Vite", "Tailwind CSS", "Framer Motion", "Formspree"],
      githubUrl: "https://github.com/Puveesh/Portfolio",
      liveUrl: "/",
      linkedin: "https://linkedin.com/in/puveesh-keshav-m-24475b309",
      category: "frontend",
    },
    {
      id: "full-stack",
      title: "YapiChat: Minimal Private Messaging",
      description: "A focused full-stack chat application built with React, Supabase, and Vercel, designed for meaningful 1-on-1 conversations through private messaging, voice notes, and media sharing in a distraction-free environment.",
      image: "/yapichat.png",
      tags: ["Full-Stack", "Vite", "Vercel", "SupaBase"],
      githubUrl: "https://github.com/Puveesh/Chatting-app",
      liveUrl: "https://chatting-app-ashen.vercel.app/",
      linkedin: "https://www.linkedin.com/posts/puveesh-keshav-m-24475b309_fullstackdevelopment-react-supabase-ugcPost-7409835323112787968-Lb0s/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE6ZhJQB1xkBZe8AEj1JLk7lF5rjie02siE",
      category: "full",
    },
    {
      id: "mobile-app",
      title: "PulseBeat: Smart Music Player",
      description: "A modern Android music player built with Android Studio and ExoPlayer, featuring background playback, waveform-based UI interactions, favorites management, and a smooth immersive listening experience.",
      image: "/pulsebeat.png",
      tags: ["Android", "Kotlin", "ExoPlayer", "Java"],
      githubUrl: "https://github.com/puveesh",
      liveUrl: "./public/PulseBeat.apk",
      linkedin: "https://www.linkedin.com/posts/puveesh-keshav-m-24475b309_androiddevelopment-musicplayerapp-internship2025-ugcPost-7350494620822179840-GkcH/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE6ZhJQB1xkBZe8AEj1JLk7lF5rjie02siE",
      category: "mobile",
    },
    {
      id: "hardware",
      title: "ClimateSync: IoT Weather Monitoring System",
      description: "A prototype IoT-based weather monitoring system built using NodeMCU and sensor integration, designed to collect, process, and visualize real-time environmental data through embedded hardware and smart sensing technologies.",
      image: "/weather 2.jpeg",
      tags: ["Hardware", "C++", "NodeMCU", "Sensors", "ESP8266","IoT"],
      githubUrl: "https://github.com/Puveesh/",
      liveUrl: "/projects",
      linkedin: "https://linkedin.com/in/puveesh-keshav-m-24475b309",
      category: "hardware",
    },
    {
      id: "backend",
      title: "Turf Management System",
      description: "A Backend turf booking and management platform built with Spring Boot, designed to streamline slot reservations, user management, scheduling, and real-time booking operations through a scalable backend architecture.",
      image: "/turf.jpg",
      tags: ["Backend", "Java", "Maven", "SpringBoot"],
      githubUrl: "https://github.com/Puveesh/Turf-Management",
      liveUrl: "/projects",
      linkedin: "https://linkedin.com/in/puveesh-keshav-m-24475b309",
      category: "backend",
    },
  ],
  timeline: [
    {
      id: "exp4",
      type: "work",
      role: "Information Secuirity Analyst Intern",
      company: "Titan Corporate Office, Banglore",
      duration: "18 May 2026 - 12 June 2026",
      description: "Worked on cybersecurity operations, vulnerability assessment, and security monitoring practices. Gained hands-on exposure to enterprise security workflows, risk analysis, and incident response strategies within a corporate environment.",
    },
    {
      id: "exp1",
      type: "work",
      role: "Cloud/SAP Intern",
      company: "Titan Company Ltd, Hosur",
      duration: "05 Jan 2026 - 14 Jan 2026",
      description: "Explored enterprise cloud infrastructure and SAP workflows through real-world industry exposure. Contributed to a project focused on migration to Microsoft Azure, gaining insights into cloud scalability, deployment, and organizational digital transformation.",
    },
    {
      id: "exp2",
      type: "work",
      role: "Mobile App Developer",
      company: "Pinnacle Labs",
      duration: "20 Jun 2025 - 20 July 2025",
      description: "Developed and improved mobile application features with a focus on responsive UI/UX and performance optimization. Collaborated on implementing scalable components and enhancing overall application usability across devices.",
    },
    {
      id: "hack1",
      type: "hackathon",
      role: "Tech Savishkaar 3.0",
      company: "Vasavi College of Engineering, Hyderabad",
      duration: "Feb 2025",
      description: "Participated in the national-level Tech Savishkaar 3.0 Hackathon under the “Student Innovation” domain, where our team developed a Smart Health & Driving Safety System prototype focused on real-world problem solving. Secured 1st place among competing teams, showcasing innovation, teamwork, and presentation skills.",
    },
    {
      id: "exp3",
      type: "education",
      role: "BE. Computer Science Engineering",
      company: "Sri Krishna College of Engineering & Technology, Coimbatore (SKCET)",
      duration: "2024 - 2028",
      description: "Pursuing a degree in Computer Science Engineering with interests in software development, machine learning, cloud technologies, and cybersecurity. Actively involved in hands-on projects, hackathons, and technical learning beyond academics.",
    },
    {
      id: "edu1",
      type: "education",
      role: "Grade 12th",
      company: "TVS Academy, Hosur",
      duration: "2023 - 2024",
      description: "Completed higher secondary education with a strong interest in technology, problem-solving, and computer science fundamentals, building the foundation for pursuing engineering and software development.",
    },
  ],
};
