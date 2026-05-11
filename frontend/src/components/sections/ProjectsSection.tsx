"use client";
import { useEffect, useRef, useState } from "react";
import { getImageUrl } from "@/lib/api";
import { ExternalLink, Code } from "lucide-react";

const PLACEHOLDERS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
];

export default function ProjectsSection({ projects }: { projects?: any[] }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const data = projects?.length ? projects : [];

  const allTechs = [
    "All",
    ...Array.from(new Set(data.flatMap((p: any) => p.technologies || []))),
  ];

  const filtered =
    filter === "All"
      ? data
      : data.filter((p: any) => p.technologies?.includes(filter));

  // ✅ Sort in descending order (latest first)
  const sortedProjects = [...filtered].sort(
    (a: any, b: any) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime(),
  );

  // ✅ Show only 2 initially
  const visibleProjects = showAll ? sortedProjects : sortedProjects.slice(0, 2);

  return (
    <section id='projects' ref={ref} className='section-block'>
      <div className='section-wrap'>
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div>
            <div className='edit-label'>
              <span>Projects</span>
            </div>
            <h2 className='edit-title'>
              Case <em>Studies</em>
            </h2>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {visibleProjects.map((proj: any, i: number) => {
            const imgUrl = getImageUrl(proj.image || "");
            const placeholder = PLACEHOLDERS[i % PLACEHOLDERS.length];

            return (
              <div
                key={i}
                className={`card card-hover group overflow-hidden transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className='relative p-4 overflow-hidden'>
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={proj.title}
                      className='w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105'
                    />
                  ) : (
                    <div
                      className='w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105'
                      style={{ background: placeholder }}
                    >
                      <span className='text-6xl font-black text-white/20 select-none tracking-tighter'>
                        {proj.title.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {proj.featured && (
                    <div
                      className='absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-sm'
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        color: "var(--accent)",
                        border: "1px solid rgba(255,255,255,0.5)",
                      }}
                    >
                      Featured
                    </div>
                  )}
                </div>

                <div className='p-7'>
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <p
                        className='text-[10px] font-black uppercase tracking-[0.2em] mb-1'
                        style={{ color: "var(--accent)" }}
                      >
                        {proj.subtitle || "Project"}
                      </p>
                      <h3
                        className='text-2xl font-black tracking-tight'
                        style={{ color: "var(--ink)" }}
                      >
                        {proj.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    className='text-sm leading-relaxed mb-6 font-medium'
                    style={{ color: "var(--ink-3)" }}
                  >
                    {proj.description}
                  </p>
                  <div className='flex gap-4 mb-3 w-full flex-wrap'>
                    {proj.liveUrl && proj.liveUrl !== "#" && (
                      <a
                        href={proj.liveUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 px-3 h-10 rounded-lg border text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--ink-3)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--ink)";
                          e.currentTarget.style.color = "#fff";
                          e.currentTarget.style.borderColor = "var(--ink)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "var(--ink-3)";
                          e.currentTarget.style.borderColor = "var(--border)";
                        }}
                      >
                        <span><ExternalLink size={16} /></span>
                        Live Demo
                      </a>
                    )}

                    {proj.githubUrl && proj.githubUrl !== "#" && (
                      <a
                        href={proj.githubUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 px-3 h-10 rounded-lg border text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--ink-3)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--ink)";
                          e.currentTarget.style.color = "#fff";
                          e.currentTarget.style.borderColor = "var(--ink)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "var(--ink-3)";
                          e.currentTarget.style.borderColor = "var(--border)";
                        }}
                      >
                        <span><Code size={16} /></span>
                        View Code
                      </a>
                    )}
                  </div>

                  <div
                    className='flex flex-wrap gap-2 pt-5 border-t'
                    style={{ borderColor: "var(--border)" }}
                  >
                    {proj.technologies?.map((t: string, j: number) => (
                      <span key={j} className='tag-pill'>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ✅ Show More / Less */}
        {sortedProjects.length > 2 && (
          <div className='flex justify-center mt-10'>
            <button
              onClick={() => setShowAll(!showAll)}
              className='flex flex-col items-center gap-1 text-sm font-bold tracking-wide transition-all'
              style={{ color: "var(--ink-3)" }}
            >
              {showAll ? "Show Less" : "Show More"}
              <span
                className={`text-xl transition-transform ${showAll ? "rotate-180" : ""}`}
              >
                ↓
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
