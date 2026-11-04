# Clara Vance — Premium Interactive 3D Miniature World Portfolio

An interactive 3D portfolio website revolving around a floating island diorama suspended in the sky, featuring a personal workspace studio. Designed with an editorial aesthetic (70% professional & elegant, 30% dreamy & artistic), high-performance Three.js lighting, and smooth cinematic camera choreography.

---

## Visual & Interaction Overview

- **Interactive 3D Floating Island**:
  - Sculpted tiered rock underside with geode crystals and dangling foliage roots.
  - Terraced grassy plateau with stone pathways and stepping stones.
  - Crystal spring water feature flowing across the island, under a miniature wooden bridge, cascading into a sky waterfall with animated mist particles.
  - Sculptural Japanese blossom tree in dusty rose and Nordic birch in soft sage green.
  - Lavender patches and blush wildflower clusters.
- **Personal Workspace Studio**:
  - Warm oak desk with brass hardware and pullout drawer.
  - Mid-century curved armchair with dusty rose upholstery.
  - Modern aluminum workstation with live interactive coding IDE texture.
  - Bound linen journals with satin bookmark ribbon and gold fountain pen.
  - Artisanal open bookshelf with curated monographs and botanical vase.
  - Vintage rangefinder 35mm camera with glass optical reflections.
  - Brass gooseneck desk lamp casting real warm illumination.
  - Scandinavian garden mailbox nestled near the island path.
- **Cinematic Camera Choreography**:
  - Smooth GSAP-powered perspective glide between the full island and individual workspace objects.
  - Subtle mouse pointer parallax in overview mode.
  - Clamped OrbitControls enabling free rotation without camera flipping.
- **Tactile Procedural Soundscapes**:
  - Web Audio API procedural synthesis: gentle harmonic chimes on interaction and soft ambient breeze (zero external audio file dependencies, muted by default).
- **Responsive & Accessible**:
  - Mobile bottom navigation bar and touch controls.
  - Performance mode toggle (soft shadows / low power mode).
  - WebGL error boundary with graceful non-3D fallback view.

---

## Technology Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **3D Graphics Engine**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
- **Camera & Path Choreography**: GSAP
- **Interface Transitions**: Framer Motion
- **Styling**: Tailwind CSS v4
- **Smooth Scroll**: Lenis
- **Interface Icons**: Lucide React + Bespoke SVG Social Icons
- **Audio**: Procedural Web Audio API Synth Engine
- **Package Manager**: Bun

---

## Installation & Setup

Ensure you have [Bun](https://bun.sh) installed (`>= 1.2`).

```bash
# 1. Clone or extract the project directory
cd Portfolio

# 2. Install dependencies with Bun
bun install

# 3. Start local development server
bun run dev
```

Visit `http://localhost:5173` (or the port indicated in your console) to view the application.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `bun run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `bun run build` | Compiles TypeScript and builds production assets to the `dist/` directory. |
| `bun run preview` | Locally serves the production build from `dist/` for testing. |

---

## Portfolio Content Management

All personal portfolio information, projects, skills, biography, and contact details are centralized in a single configuration file:

```
src/data/portfolio.ts
```

### 1. Updating Personal Information & Bio
Open `src/data/portfolio.ts` and modify the `personal` object:
```typescript
export const portfolioData: PortfolioData = {
  personal: {
    name: "Clara Vance",
    title: "Creative Technologist & Spatial Interface Designer",
    tagline: "Bridging the gap between tactile aesthetics and computational systems.",
    subheadline: "Specializing in interactive 3D web experiences...",
    status: "Available for select freelance commissions & forward-thinking teams",
    location: "Stockholm / Remote",
    timezone: "CET (UTC+1)",
    bio: [
      "I am an interaction designer and creative developer...",
      // Add or customize paragraphs here
    ],
    philosophy: "Good design is quiet confidence...",
    interests: ["Spatial Computing", "Editorial Typography", ...],
    readingList: [
      { title: "The Design of Everyday Things", author: "Don Norman" },
    ]
  },
  // ...
};
```

### 2. Updating Projects (Computer)
In `src/data/portfolio.ts`, add or edit items in the `projects` array:
```typescript
{
  id: "lumina-sanctuary",
  title: "Lumina Sanctuary",
  category: "Interactive 3D / WebGL",
  description: "Short project summary displayed on cards.",
  longDescription: "Detailed breakdown shown when clicking 'Deep dive overview'.",
  technologies: ["React Three Fiber", "Three.js", "GLSL Shaders", "TypeScript"],
  liveUrl: "https://your-demo-url.com",
  githubUrl: "https://github.com/your-username/repo",
  metrics: "60 FPS on mobile • 1.2MB total assets",
  year: "2025",
  accentColor: "#613F4D"
}
```

### 3. Updating Skills & Career Timeline (Bookshelf)
In `src/data/portfolio.ts`, modify `skills`, `experience`, and `education`:
- **Skills**: Grouped by discipline (e.g., "Spatial & Creative Development") with meaningful context and proficiency level (no fake percentage bars).
- **Experience**: Roles, companies, dates, locations, and achievements.
- **Education**: Degrees, institutions, and notes.

### 4. Updating Gallery (Vintage Camera)
In `src/data/portfolio.ts`, customize the `gallery` array with titles, categories, tags, and palette colors.

### 5. Updating Contact Information (Mailbox)
In `src/data/portfolio.ts`, update `contact.email`, social links (`github`, `linkedin`, `twitter`, `instagram`), and availability notes.

---

## 3D Environment Customization

- **Camera Angles & Coordinates**:
  Modify `src/lib/constants.ts` to adjust camera positions and targets for any section (`overview`, `workspace`, `projects`, `about`, `skills`, `gallery`, `contact`).
- **Island Geometry & Topography**:
  Located in `src/components/three/Island.tsx`. Adjust tree foliage colors, cobblestone paths, or rock tier formations.
- **Workspace Architecture**:
  Located in `src/components/three/Workspace.tsx`. Configure desk materials, laptop screen IDE text canvas, books, and lamp warm lighting.
- **Adding Custom GLTF Models**:
  To add external 3D models (e.g. from Blender), place `.glb` files in `public/models/` and import them via `@react-three/drei`'s `useGLTF('/models/your-model.glb')`.

---

## Architectural Quality & Accessibility

- **Non-3D Fallback**: If WebGL is unavailable or disabled, the application renders a clean 2.5D editorial view via `WebGLErrorBoundary`.
- **Reduced Motion**: Respects the user's OS `prefers-reduced-motion` setting by bypassing continuous camera tweens and floating particle swaying.
- **Keyboard Navigation**: Pressing `Escape` returns to the island overview from any opened section drawer. Full focus rings and accessible ARIA attributes.
- **Performance Profiling**: Dual pixel-ratio capping, instanced particle buffers, and a togglable high-performance mode that scales shadow maps and particle counts.
