"use client";
import { useEffect, useState } from "react";
import { getImageUrl } from "@/lib/api";

const CODE_LINES = [
  { indent: 0, token: "const", name: " developer", op: " = {" },
  { indent: 1, key: "name", val: '"Nishanthan Perumal U"' },
  // { indent: 1, key: "passion", val: '"Building things that matter"' },
  { indent: 1, key: "profession", val: '"Full Stack Developer"' },
  { indent: 1, key: "status", val: '"open_to_work: true"', highlight: true },
  { indent: 1, key: "stack", val: '["NextJS", "Node", "MongoDB"]' },
  { indent: 0, token: "}", name: "", op: "" },
];

export default function HeroSection({
  personal,
  skills,
  projects,
}: {
  personal?: any;
  skills?: any[];
  projects?: any[];
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  const name = personal?.name || "Nishanthan Perumal U";
  const avatarUrl = getImageUrl(personal?.avatar || "");

  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center pt-24 overflow-hidden'
      style={{ background: "var(--bg)" }}
    >
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage:
            "radial-gradient(var(--border) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          opacity: 0.6,
        }}
      />

      <div
        className='absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none'
        style={{
          background:
            "radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)",
        }}
      />

      <div className='section-wrap w-full relative z-10'>
        <div
          className={`grid lg:grid-cols-12 gap-14 items-center transition-all duration-900 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className='lg:col-span-7'>
            <div
              className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-7'
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              <span
                className='w-2 h-2 rounded-full bg-green-500'
                style={{ animation: "pulse-dot 2s infinite" }}
              />
              <span
                className='text-[11px] font-bold uppercase tracking-[0.25em]'
                style={{ color: "var(--ink-3)" }}
              >
                Available for Opportunities
              </span>
            </div>

            <h1
              className='font-black tracking-tight leading-[0.92] mb-5'
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                color: "var(--ink)",
              }}
            >
              <em
                className='not-italic font-light font-serif text-xl block mb-1'
                style={{ color: "var(--accent)", fontStyle: "italic" }}
              >
                I'm
              </em>
              {name}
            </h1>

            <p
              className='text-base leading-relaxed mb-10 max-w-lg font-medium'
              style={{ color: "var(--ink-3)" }}
            >
              {personal?.bio ||
                "Building high-performance digital products with a focus on clean architecture and exceptional user experience."}
            </p>

            <div className='flex flex-wrap gap-4 mb-12'>
              <a href='#contact' className='btn-primary'>
                Connect with Me →
              </a>
              <a href='#projects' className='btn-outline'>
                View Projects
              </a>
              {personal?.resumeUrl && (
                <a
                  href={personal.resumeUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-outline'
                  style={{ borderStyle: "dashed" }}
                >
                  ↓ Resume
                </a>
              )}
            </div>

            <div className='flex items-center gap-5'>
              {[
                {
                  href: personal?.github || "#",
                  label: "GitHub",
                  svg: (
                    <svg
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-5 h-5'
                    >
                      <path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
                    </svg>
                  ),
                },
                {
                  href: personal?.linkedin || "#",
                  label: "LinkedIn",
                  svg: (
                    <svg
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-5 h-5'
                    >
                      <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                    </svg>
                  ),
                },
                {
                  href: personal?.instagram || "#",
                  label: "Instagram",
                  svg: (
                    <svg
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-5 h-5'
                    >
                      <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
                    </svg>
                  ),
                },
                {
                  href: `mailto:${personal?.email || ""}`,
                  label: "Email",
                  svg: (
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='w-5 h-5'
                    >
                      <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                      <polyline points='22,6 12,13 2,6' />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : "_self"}
                  rel='noopener noreferrer'
                  aria-label={s.label}
                  className='w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200'
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    color: "var(--ink-2)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--accent)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--bg-card)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--ink-2)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--border)";
                  }}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          <div className='lg:col-span-5 hidden lg:flex flex-col gap-5'>
            <div className='card p-6 flex items-center gap-5'>
              <div
                className='w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center font-black text-2xl'
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-lt), #e0e7ff)",
                  color: "var(--accent)",
                }}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={name}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                )}
              </div>
              <div>
                <p
                  className='font-black text-lg leading-tight'
                  style={{ color: "var(--ink)" }}
                >
                  {name}
                </p>
                <p
                  className='text-sm font-medium mt-0.5'
                  style={{ color: "var(--ink-3)" }}
                >
                  {personal?.title || "Full Stack Developer"}
                </p>
                <p
                  className='text-xs font-mono mt-1.5 flex items-center gap-1.5'
                  style={{ color: "var(--green)" }}
                >
                  <span className='w-1.5 h-1.5 rounded-full bg-green-500 inline-block' />{" "}
                  Open to work
                </p>
              </div>
            </div>

            <div
              className='card p-5 overflow-hidden'
              style={{ background: "#1e1b2e" }}
            >
              <div className='flex items-center gap-1.5 mb-4'>
                <div className='w-2.5 h-2.5 rounded-full bg-red-400' />
                <div className='w-2.5 h-2.5 rounded-full bg-amber-400' />
                <div className='w-2.5 h-2.5 rounded-full bg-green-400' />
                <span
                  className='text-[10px] font-mono ml-2'
                  style={{ color: "#6b7280" }}
                >
                  developer.ts
                </span>
              </div>
              <pre
                className='text-[11px] leading-relaxed font-mono'
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {CODE_LINES.map((line, i) => (
                  <div
                    key={i}
                    style={{ paddingLeft: `${line.indent * 1.2}rem` }}
                  >
                    {line.token && (
                      <span style={{ color: "#c084fc" }}>{line.token}</span>
                    )}
                    {line.name && (
                      <span style={{ color: "#60a5fa" }}>{line.name}</span>
                    )}
                    {line.op && (
                      <span style={{ color: "#e2e8f0" }}>{line.op}</span>
                    )}
                    {line.key && (
                      <>
                        <span style={{ color: "#7dd3fc" }}>{line.key}</span>
                        <span style={{ color: "#e2e8f0" }}>: </span>
                        <span
                          style={{
                            color: line.highlight ? "#34d399" : "#fbbf24",
                          }}
                        >
                          {line.val}
                        </span>
                        <span style={{ color: "#6b7280" }}>,</span>
                      </>
                    )}
                  </div>
                ))}
              </pre>
            </div>

            <div className='grid grid-cols-3 gap-3'>
              {[
                { n: projects?.length + "+" || 0, label: "Projects" },
                { n: skills?.length + "+" || 0, label: "Technologies" },
                { n: "∞", label: "Curiosity" },
              ].map((s, i) => (
                <div key={i} className='card p-4 text-center'>
                  <div className='font-black text-2xl gradient-text'>{s.n}</div>
                  <div
                    className='text-xs font-medium mt-1'
                    style={{ color: "var(--ink-3)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
