import type { SectionId } from '../types/portfolio';

export interface CameraView {
  id: SectionId;
  label: string;
  sublabel: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export const CAMERA_VIEWS: Record<SectionId, CameraView> = {
  overview: {
    id: 'overview',
    label: 'Full World',
    sublabel: 'The Floating Island',
    position: [11.5, 9.0, 11.5],
    target: [0, 1.1, 0],
    fov: 38,
  },
  workspace: {
    id: 'workspace',
    label: 'Studio',
    sublabel: 'Personal Workspace',
    position: [3.8, 3.4, 4.4],
    target: [0.4, 2.0, 0.5],
    fov: 36,
  },
  projects: {
    id: 'projects',
    label: 'Projects',
    sublabel: 'Interactive Computer',
    position: [0.35, 2.35, 1.55],
    target: [0.1, 2.05, 0.4],
    fov: 34,
  },
  about: {
    id: 'about',
    label: 'About',
    sublabel: 'Personal Journal',
    position: [1.15, 2.7, 1.25],
    target: [0.75, 2.05, 0.6],
    fov: 30,
  },
  skills: {
    id: 'skills',
    label: 'Skills',
    sublabel: 'Curated Bookshelf',
    position: [-1.2, 2.6, 2.2],
    target: [-1.2, 1.9, 0.6],
    fov: 32,
  },
  gallery: {
    id: 'gallery',
    label: 'Gallery',
    sublabel: 'Vintage Camera',
    position: [1.8, 2.2, 2.1],
    target: [1.3, 1.65, 1.1],
    fov: 32,
  },
  contact: {
    id: 'contact',
    label: 'Contact',
    sublabel: 'Garden Mailbox',
    position: [3.8, 2.2, 3.8],
    target: [2.6, 1.5, 2.6],
    fov: 34,
  },
};

export const COLOR_PALETTE = {
  ivory: '#F8F5EF',
  cream: '#EEE8DE',
  rose: '#C99B9B',
  blush: '#E8CFCB',
  lavender: '#C9C3D8',
  burgundy: '#613F4D',
  charcoal: '#292827',
  sage: '#8B9E87',
  amber: '#D4A373',
  grass: '#7C8C6E',
  darkGrass: '#5B6B4E',
  rock: '#7A7571',
  darkRock: '#4B4643',
  wood: '#8E6B53',
  lightWood: '#BFA082',
  metal: '#E2DCD5',
};
