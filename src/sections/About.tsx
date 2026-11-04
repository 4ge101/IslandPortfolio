import { BookOpen, Sparkles, Feather, Compass } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export function AboutSection() {
  const { personal } = portfolioData;

  const tenets = [
    {
      title: 'Tactile Simplicity',
      desc: 'Interfaces should offer visceral, physical clarity. Digital matter should feel weighted, responsive, and crafted with intention.',
    },
    {
      title: 'Poetic Engineering',
      desc: 'High performance is not the enemy of beauty; clean shaders, tight math, and smooth frames form the invisible poetry of the web.',
    },
    {
      title: 'Quiet Attention',
      desc: 'Software should respect human cognitive space. No aggressive popups, no frantic flashing—just calm, dignified interactions.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Editorial Philosophy Quote */}
      <div className="p-6 rounded-2xl bg-[#EEE8DE]/70 border-l-4 border-[#613F4D] relative">
        <Feather className="w-5 h-5 text-[#613F4D] mb-3 opacity-80" />
        <blockquote className="font-serif text-lg md:text-xl italic text-[#292827] leading-relaxed">
          &ldquo;{personal.philosophy}&rdquo;
        </blockquote>
      </div>

      {/* Narrative Biography */}
      <div className="space-y-4 text-sm md:text-base text-[#292827]/85 leading-relaxed">
        {personal.bio.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Core Tenets */}
      <div className="space-y-4 pt-4 border-t border-[#C99B9B]/20">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#613F4D] flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Guiding Creative Principles</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {tenets.map((tenet, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-[#F8F5EF] border border-[#C99B9B]/25 space-y-2 shadow-sm"
            >
              <h4 className="font-serif text-base font-semibold text-[#613F4D]">
                {tenet.title}
              </h4>
              <p className="text-xs text-[#292827]/75 leading-relaxed">
                {tenet.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Passions & In-Studio Reading List */}
      <div className="grid gap-6 sm:grid-cols-2 pt-4 border-t border-[#C99B9B]/20">
        {/* Creative Passions */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#613F4D] flex items-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Studio Explorations</span>
          </div>
          <ul className="space-y-1.5 text-xs text-[#292827]/80">
            {personal.interests.map((interest, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C99B9B]" />
                <span>{interest}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Curated Reading List */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#613F4D] flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>On The Bookshelf</span>
          </div>
          <ul className="space-y-2 text-xs">
            {personal.readingList.map((book, i) => (
              <li key={i} className="text-[#292827]/80">
                <span className="font-medium text-[#292827] italic">&ldquo;{book.title}&rdquo;</span>
                <span className="text-[#292827]/60 ml-1.5">by {book.author}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
