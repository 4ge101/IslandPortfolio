import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: "Mehzabin Islam Doua",
    title: "Python Developer & Mathematician",
    tagline: "Where mathematics meets code, curiosity creates",
    subheadline: "Passionate about exploring the intersection of programming, mathematics, and intelligent systems while solving problems through code, logic, and curiosity.",
    status: "Available for select freelance commissions & forward-thinking teams",
    location: "Bangladesh / Dhaka",
    timezone: "GMT (UTC+6)",
    bio: [
    "I'm a Python developer and applied mathematics enthusiast with a curiosity for understanding how things work and solving problems through technology. My interests lie in machine learning, artificial intelligence, mathematical thinking, and research. I enjoy exploring new ideas, experimenting with code, and turning complex concepts into practical solutions. Beyond programming, I also have a creative side in UI/UX design and digital art, where I enjoy bringing ideas to life through design."  
    ],
    philosophy: "Good design is quiet confidence. The most memorable interactive experiences don't shout; they invite the visitor into a carefully considered atmosphere where every detail has earned its place.",
    interests: [
      "Add your intrest here genius",
      "Add your intrest here genius",
      "Add your intrest here genius",
      "Add your intrest here genius",
      "Add your intrest here genius"
    ],
    readingList: [
      { title: "add your books you read or going to read genius", author: "add author name" },
      { title: "", author: "" },
      { title: "", author: "" },
      { title: "", author: "" }
    ]
  },

  contact: {
    email: "douagenius@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    availability: "Currently accepting project inquiries for Q2/Q3",
    note: "Feel free to reach out about creative direction, spatial web projects, or simply to exchange thoughts on typography and shaders."
  },

  projects: [
    {
      id: "lumina-sanctuary",
      title: "Lumina Sanctuary",
      category: "Interactive 3D / WebGL",
      description: "An interactive meditative virtual conservatory that responds to circadian lighting and ambient soundscapes.",
      longDescription: "A real-time WebGL exploration featuring procedural glass refractions, custom foliage wind shaders, and spatial audio that adapts to the user's local solar time. Built with React Three Fiber, GLSL shaders, and Web Audio API.",
      technologies: ["React Three Fiber", "Three.js", "GLSL Shaders", "Web Audio API", "TypeScript"],
      liveUrl: "https://example.com/lumina",
      githubUrl: "https://github.com/example/lumina",
      featured: true,
      metrics: "60 FPS on mobile • 1.2MB total assets",
      year: "2025",
      accentColor: "#613F4D"
    },
    {
      id: "aether-tokens",
      title: "Aether Design System",
      category: "Design Engineering",
      description: "A comprehensive multi-platform design token architecture and accessible component foundation for creative tools.",
      longDescription: "Architected a unified token system spanning web, iOS, and canvas-based editing software. Emphasizes sub-pixel optical alignments, WCAG AAA contrast scales, and zero-runtime CSS token compilation.",
      technologies: ["TypeScript", "Tailwind CSS", "Storybook", "Radix Primitives", "Vite"],
      liveUrl: "https://example.com/aether",
      githubUrl: "https://github.com/example/aether",
      featured: true,
      metrics: "Adopted by 4 product teams • 99.8% test coverage",
      year: "2025",
      accentColor: "#C99B9B"
    },
    {
      id: "chronicles-of-light",
      title: "Chronicles of Light",
      category: "Editorial Web Experience",
      description: "An archival digital monograph documenting century-old botanical glass plate photography.",
      longDescription: "An editorial reading experience featuring high-resolution deep-zoom image tiling, custom smooth kinetic inertia, and typographic styling inspired by early 20th-century Swiss printing.",
      technologies: ["Next.js", "GSAP ScrollTrigger", "Lenis", "Framer Motion", "Tailwind CSS"],
      liveUrl: "https://example.com/chronicles",
      githubUrl: "https://github.com/example/chronicles",
      featured: true,
      metrics: "Awwwards Site of the Day nominee • 99 Performance score",
      year: "2024",
      accentColor: "#8B9E87"
    },
    {
      id: "solstice-sound",
      title: "Solstice Generative Synth",
      category: "Creative Technology",
      description: "A browser-based polyphonic synthesizer translating celestial trajectories into generative microtonal harmonies.",
      longDescription: "Explores harmonic frequency modulation driven by real-time orbital calculations of planets and lunar phases. Features tactile skeuomorphic brass dials rendered with WebGL normals.",
      technologies: ["Web Audio API", "Canvas2D", "Tone.js", "TypeScript", "Vite"],
      liveUrl: "https://example.com/solstice",
      githubUrl: "https://github.com/example/solstice",
      featured: false,
      metrics: "Zero latency audio engine • 12 microtonal scales",
      year: "2024",
      accentColor: "#C9C3D8"
    }
  ],

  skills: [
    {
      name: "Spatial & Creative Development",
      description: "Building immersive, tactile environments that run smoothly on every screen.",
      skills: [
        { name: "Three.js & React Three Fiber", level: "Core Discipline", context: "Scene architecture, custom GLTF pipelines, render loops" },
        { name: "GLSL / Custom Shaders", level: "Advanced", context: "Volumetric effects, water dispersion, vertex grass displacements" },
        { name: "GSAP & Motion Choreography", level: "Core Discipline", context: "Kinetic typography, camera path orchestration, timeline sequencing" },
        { name: "Performance Profiling", level: "Core Discipline", context: "Draw call minimization, instancing, geometry compression" }
      ]
    },
    {
      name: "Frontend Architecture & Systems",
      description: "Scalable, resilient codebases built with modern web foundations.",
      skills: [
        { name: "React 19 & TypeScript", level: "Core Discipline", context: "Type safety, custom hooks, state machines, suspense patterns" },
        { name: "Tailwind CSS & Styling", level: "Core Discipline", context: "Design token architecture, container queries, fluid typography" },
        { name: "Accessibility (WCAG 2.2)", level: "Advanced", context: "Keyboard navigation, ARIA semantics, light/dark contrast parity" },
        { name: "Vite, Next.js & Bundling", level: "Proficient", context: "Tree-shaking, code splitting, edge rendering" }
      ]
    },
    {
      name: "Visual & Editorial Craft",
      description: "Design sensibility grounded in typographic rigor and material warmth.",
      skills: [
        { name: "Design Systems & Tokens", level: "Core Discipline", context: "Figma to code pipelines, component libraries, documentation" },
        { name: "Editorial Typography", level: "Advanced", context: "Optical spacing, vertical rhythm, classical grid systems" },
        { name: "3D Asset Modeling (Blender)", level: "Proficient", context: "Low-poly diorama assets, UV mapping, PBR material bakes" },
        { name: "Art Direction & Curation", level: "Advanced", context: "Color balance, narrative pacing, atmospheric tone" }
      ]
    }
  ],

  experience: [
    {
      period: "2023 — Present",
      role: "Lead Creative Technologist",
      company: "Atelier Studio",
      location: "Stockholm & Remote",
      description: "Guiding the creative technology direction for luxury brands, cultural institutions, and architectural studios.",
      highlights: [
        "Architected real-time 3D web showcases achieving 60 FPS performance across modern mobile and desktop browsers.",
        "Created an internal GLSL shader and interaction library reducing prototype-to-production time by 45%.",
        "Mentored junior engineers and designers in bridging visual aesthetics with web graphics standards."
      ]
    },
    {
      period: "2021 — 2023",
      role: "Senior Interaction Engineer",
      company: "Nordic Digital Works",
      location: "Stockholm",
      description: "Designed and engineered high-craft interfaces, generative design tools, and bespoke digital artifacts.",
      highlights: [
        "Built responsive design systems used by over 50,000 monthly active users.",
        "Collaborated with industrial designers to translate physical tactile products into digital 3D configurators.",
        "Authored accessible component standards recognized with regional design accolades."
      ]
    },
    {
      period: "2019 — 2021",
      role: "Frontend & Creative Developer",
      company: "Form & Function Lab",
      location: "Gothenburg",
      description: "Crafted interactive web experiences, micro-sites, and experimental web audio tools.",
      highlights: [
        "Pioneered early interactive WebGL prototypes for museum exhibits.",
        "Designed bespoke typographic systems for European cultural publications."
      ]
    }
  ],

  education: [
    {
      period: "2015 — 2019",
      degree: "B.Sc. in Interaction Design & Media Technology",
      institution: "Royal Institute of Technology (KTH)",
      notes: "Focus on Computer Graphics, Human-Computer Interaction, and Spatial Interfaces."
    },
    {
      period: "2018",
      degree: "Exchange Program in Visual Communications",
      institution: "ECAL (École cantonale d'art de Lausanne)",
      notes: "Advanced typography, editorial composition, and generative printing systems."
    }
  ],

  gallery: [
    {
      id: "serenade-in-stone",
      title: "Serenade in Stone",
      category: "3D Architectural Study",
      aspectRatio: "portrait",
      description: "Minimalist brutalist courtyard under soft overcast dawn light.",
      color: "#613F4D",
      tags: ["Blender", "Octane", "Architecture"]
    },
    {
      id: "botanical-whispers",
      title: "Botanical Whispers",
      category: "Generative Shaders",
      aspectRatio: "landscape",
      description: "Procedural simulation of translucent monstera leaf veins using reaction-diffusion mathematics.",
      color: "#8B9E87",
      tags: ["GLSL", "Three.js", "Generative"]
    },
    {
      id: "ceramic-echoes",
      title: "Ceramic Echoes",
      category: "Product & Material Design",
      aspectRatio: "square",
      description: "Hand-thrown stoneware vessel series finished with matte wood-ash glaze.",
      color: "#D4A373",
      tags: ["Craft", "Tactile", "Sculpture"]
    },
    {
      id: "kinetic-grid",
      title: "Kinetic Grid Type",
      category: "Typography Experiment",
      aspectRatio: "landscape",
      description: "Variable font specimen responding to cursor proximity and sound frequencies.",
      color: "#C99B9B",
      tags: ["Typography", "Canvas2D", "Experimental"]
    },
    {
      id: "morning-solitude",
      title: "Morning Solitude",
      category: "Medium Format Photography",
      aspectRatio: "portrait",
      description: "Shadows dancing across a pine desk during the early Stockholm autumn.",
      color: "#EEE8DE",
      tags: ["Photography", "35mm", "Light"]
    },
    {
      id: "celestial-harmonics",
      title: "Celestial Harmonics",
      category: "Generative Art",
      aspectRatio: "square",
      description: "Visual projection of harmonic frequency ratios mapped into chromatic contour ribbons.",
      color: "#C9C3D8",
      tags: ["WebGL", "Audio Reactive", "Mathematics"]
    }
  ]
};
