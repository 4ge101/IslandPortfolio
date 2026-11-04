import { Sparkles, Monitor, BookOpen, Layers, Camera, Mail } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import type { SectionId } from '../../types/portfolio';

interface FallbackViewProps {
  onSelectSection: (id: SectionId) => void;
}

export function FallbackView({ onSelectSection }: FallbackViewProps) {
  const { personal } = portfolioData;

  const sections: { id: SectionId; icon: typeof Monitor; label: string; desc: string }[] = [
    { id: 'projects', icon: Monitor, label: 'Selected Projects', desc: 'Interactive 3D & Design Systems' },
    { id: 'about', icon: BookOpen, label: 'Editorial About', desc: 'Narrative, Tenets & Reading List' },
    { id: 'skills', icon: Layers, label: 'Skills & Craft', desc: 'Disciplines, Experience & Education' },
    { id: 'gallery', icon: Camera, label: 'Visual Gallery', desc: 'Renders, Photography & Shaders' },
    { id: 'contact', icon: Mail, label: 'Get In Touch', desc: 'Direct Message & Availability' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#292827] px-6 py-16 max-w-4xl mx-auto space-y-12">
      <div className="space-y-4 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8CFCB]/40 text-[#613F4D] text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atmospheric Fallback Mode</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#292827]">
          {personal.name}
        </h1>

        <p className="text-base text-[#613F4D] font-medium">
          {personal.title}
        </p>

        <p className="text-sm text-[#292827]/75 leading-relaxed">
          {personal.subheadline}
        </p>
      </div>

      {/* Grid of Sections */}
      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className="p-6 rounded-2xl bg-[#EEE8DE]/50 border border-[#C99B9B]/30 hover:border-[#613F4D] text-left transition-all duration-200 shadow-sm hover:shadow group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F8F5EF] flex items-center justify-center text-[#613F4D] mb-3 group-hover:scale-105 transition-transform shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#292827] group-hover:text-[#613F4D] transition-colors">
                {sec.label}
              </h3>
              <p className="text-xs text-[#292827]/70 mt-1">
                {sec.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
