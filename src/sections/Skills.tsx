import { Briefcase, GraduationCap, Code2, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export function SkillsSection() {
  const { skills, experience, education } = portfolioData;

  return (
    <div className="space-y-10">
      {/* 1. Categorized Disciplines & Skillsets */}
      <div className="space-y-6">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#613F4D] flex items-center gap-2">
          <Code2 className="w-4 h-4" />
          <span>Core Disciplines &amp; Craft</span>
        </div>

        <div className="space-y-6">
          {skills.map((category, cIdx) => (
            <div
              key={cIdx}
              className="p-5 rounded-2xl bg-[#F8F5EF] border border-[#C99B9B]/25 space-y-4 shadow-sm"
            >
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#292827]">
                  {category.name}
                </h3>
                <p className="text-xs text-[#292827]/70 mt-0.5">
                  {category.description}
                </p>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {category.skills.map((sk, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-[#EEE8DE]/50 border border-[#C99B9B]/15 space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#292827]">
                        {sk.name}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#E8CFCB]/50 text-[#613F4D]">
                        {sk.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#292827]/70 leading-normal">
                      {sk.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Professional Journey / Experience */}
      <div className="space-y-6 pt-6 border-t border-[#C99B9B]/20">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#613F4D] flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          <span>Experience &amp; Leadership</span>
        </div>

        <div className="space-y-6 relative pl-4 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#C99B9B]/30">
          {experience.map((exp, eIdx) => (
            <div key={eIdx} className="space-y-2 relative">
              {/* Timeline marker */}
              <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#613F4D] border-2 border-[#F8F5EF]" />

              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <h4 className="font-serif text-lg font-semibold text-[#292827]">
                  {exp.role} <span className="font-sans font-normal text-xs text-[#613F4D]">@ {exp.company}</span>
                </h4>
                <span className="text-xs text-[#292827]/60 font-mono">{exp.period}</span>
              </div>

              <div className="text-xs text-[#292827]/60 italic">{exp.location}</div>
              <p className="text-xs text-[#292827]/80 leading-relaxed">{exp.description}</p>

              <ul className="space-y-1 pt-1">
                {exp.highlights.map((h, hi) => (
                  <li key={hi} className="text-xs text-[#292827]/75 flex items-start gap-2">
                    <Sparkles className="w-3 h-3 text-[#C99B9B] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Formal Education & Studies */}
      <div className="space-y-4 pt-6 border-t border-[#C99B9B]/20">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#613F4D] flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          <span>Education &amp; Studies</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {education.map((edu, edIdx) => (
            <div
              key={edIdx}
              className="p-4 rounded-xl bg-[#F8F5EF] border border-[#C99B9B]/25 space-y-1.5 shadow-sm"
            >
              <div className="text-xs text-[#292827]/50 font-mono">{edu.period}</div>
              <h4 className="font-serif text-base font-semibold text-[#292827]">
                {edu.degree}
              </h4>
              <div className="text-xs text-[#613F4D] font-medium">{edu.institution}</div>
              {edu.notes && (
                <p className="text-[11px] text-[#292827]/70 pt-1 leading-normal">
                  {edu.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
