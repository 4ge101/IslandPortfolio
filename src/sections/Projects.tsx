import { useState } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '../components/ui/SocialIcons';
import { portfolioData } from '../data/portfolio';

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const categories = ['All', 'Interactive 3D / WebGL', 'Design Engineering', 'Editorial Web', 'Creative Technology'];

  const filteredProjects = selectedCategory === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D] ${
              selectedCategory === cat
                ? 'bg-[#613F4D] text-[#F8F5EF] shadow-sm'
                : 'bg-[#EEE8DE]/70 text-[#292827]/80 hover:bg-[#E8CFCB]/40 hover:text-[#292827]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {filteredProjects.map((project) => {
          const isExpanded = expandedProjectId === project.id;

          return (
            <article
              key={project.id}
              className="bg-[#F8F5EF] rounded-2xl p-6 border border-[#C99B9B]/25 hover:border-[#613F4D]/40 transition-all duration-300 shadow-sm relative overflow-hidden group"
            >
              {/* Subtle accent border line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 opacity-60 group-hover:opacity-100"
                style={{ backgroundColor: project.accentColor || '#613F4D' }}
              />

              {/* Meta Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-medium text-[#613F4D] uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-xs text-[#292827]/50 font-mono">
                  {project.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-medium text-[#292827] mb-2 group-hover:text-[#613F4D] transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#292827]/80 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Deep dive expansion */}
              {isExpanded && project.longDescription && (
                <div className="my-4 p-4 rounded-xl bg-[#EEE8DE]/60 border border-[#C99B9B]/20 text-xs text-[#292827]/80 leading-relaxed animate-fade-in">
                  <p>{project.longDescription}</p>
                </div>
              )}

              {/* Metric Tag */}
              {project.metrics && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EEE8DE]/80 text-[#292827]/80 text-[11px] font-medium mb-4">
                  <Sparkles className="w-3 h-3 text-[#D4A373]" />
                  <span>{project.metrics}</span>
                </div>
              )}

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.8 rounded-md bg-[#EEE8DE]/50 text-[#292827]/70 text-[11px] font-medium border border-[#C99B9B]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#C99B9B]/15">
                <button
                  onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
                  className="text-xs font-medium text-[#613F4D] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D] rounded"
                >
                  {isExpanded ? 'Less details' : 'Deep dive overview'}
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-[#292827]/70 hover:text-[#292827] hover:bg-[#EEE8DE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
                      title="View Source Code"
                      aria-label={`View ${project.title} source code`}
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#613F4D] text-[#F8F5EF] text-xs font-medium hover:bg-[#4E313D] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#613F4D]"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
