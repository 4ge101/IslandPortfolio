export type SectionId = 'overview' | 'workspace' | 'projects' | 'about' | 'skills' | 'gallery' | 'contact';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metrics?: string;
  year: string;
  accentColor?: string;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Core Expertise", "Advanced", "Proficient" - NOT arbitrary percentages
    context: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  notes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
  description: string;
  color: string;
  tags: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    tagline: string;
    subheadline: string;
    status: string;
    location: string;
    timezone: string;
    bio: string[];
    philosophy: string;
    interests: string[];
    readingList: { title: string; author: string }[];
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
    instagram?: string;
    availability: string;
    note: string;
  };
  projects: ProjectItem[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  gallery: GalleryItem[];
}
