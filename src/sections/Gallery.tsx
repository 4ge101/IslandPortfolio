import { useState } from 'react';
import { Sparkles, X, Eye } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import type { GalleryItem } from '../types/portfolio';

export function GallerySection() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', '3D Architectural Study', 'Generative Shaders', 'Product & Material Design', 'Typography Experiment', 'Medium Format Photography'];

  const filteredGallery = filter === 'All'
    ? portfolioData.gallery
    : portfolioData.gallery.filter(item => item.category === filter);

  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D] ${
              filter === cat
                ? 'bg-[#613F4D] text-[#F8F5EF] shadow-sm'
                : 'bg-[#EEE8DE]/70 text-[#292827]/80 hover:bg-[#E8CFCB]/40 hover:text-[#292827]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Visual Masonry Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group cursor-pointer rounded-2xl p-5 border border-[#C99B9B]/25 hover:border-[#613F4D]/50 bg-[#F8F5EF] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            {/* Visual Abstract Plate */}
            <div
              className="w-full h-40 rounded-xl mb-4 relative overflow-hidden flex flex-col items-center justify-center p-4 transition-transform duration-300 group-hover:scale-[1.01]"
              style={{
                backgroundColor: item.color,
                opacity: 0.88,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />
              <div className="relative z-10 text-center">
                <span className="font-serif italic text-2xl text-[#F8F5EF] drop-shadow-sm font-medium">
                  {item.title}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Information */}
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#613F4D] mb-1">
                {item.category}
              </div>
              <h3 className="font-serif text-lg font-medium text-[#292827] mb-1 group-hover:text-[#613F4D] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#292827]/75 leading-relaxed mb-3">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#EEE8DE]/70 text-[#292827]/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#292827]/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-[#F8F5EF] rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-[#C99B9B]/40 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#292827]/60 hover:text-[#292827] hover:bg-[#EEE8DE] transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="w-full h-56 rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden shadow-inner"
              style={{ backgroundColor: activeItem.color }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />
              <h3 className="relative z-10 font-serif italic text-3xl text-[#F8F5EF] drop-shadow">
                {activeItem.title}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="text-xs uppercase tracking-widest font-semibold text-[#613F4D]">
                {activeItem.category}
              </div>
              <h4 className="font-serif text-2xl font-medium text-[#292827]">
                {activeItem.title}
              </h4>
              <p className="text-sm text-[#292827]/80 leading-relaxed">
                {activeItem.description}
              </p>

              <div className="flex items-center gap-1.5 pt-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                <span className="text-xs font-mono text-[#292827]/60">
                  {activeItem.tags.join(' • ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
