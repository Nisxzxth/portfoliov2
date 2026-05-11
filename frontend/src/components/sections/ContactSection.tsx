"use client";
import { useEffect, useRef, useState } from "react";
import { sendMessage } from "@/lib/api";
import toast from "react-hot-toast";

const SOCIALS = [
  {
    key: "github",
    label: "GitHub",
    prefix: "",
    svg: (
      <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
        <path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    prefix: "",
    svg: (
      <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    prefix: "",
    svg: (
      <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
      </svg>
    ),
  },
];

export default function ContactSection({ personal }: { personal?: any }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("All fields required");
      return;
    }
    setSending(true);
    try {
      await sendMessage(form);
      toast.success("Message sent! I'll reply soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed. Email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id='contact' ref={ref} className='section-block'>
      <div
        className='absolute bottom-8 left-[8%] text-[13vw] font-black select-none leading-none pointer-events-none'
        style={{ color: "var(--border)", zIndex: 0 }}
      >
        CONTACT
      </div>

      <div className='section-wrap relative' style={{ zIndex: 1 }}>
        <div className='grid lg:grid-cols-12 gap-16 items-start'>
          <div
            className={`lg:col-span-5 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <div className='edit-label'>
              <span>Inquiry</span>
            </div>
            <h2 className='edit-title mb-6'>
              Let's build <br />
              <em>together.</em>
            </h2>
            <p
              className='text-sm font-medium leading-relaxed mb-10 max-w-xs'
              style={{ color: "var(--ink-3)" }}
            >
              Currently accepting new projects and opportunities. Drop a line to
              start the conversation.
            </p>

            <div className='space-y-5 mb-10'>
              {[
                {
                  label: "Email",
                  value: personal?.email || "nishanthu08@gmail.com",
                  href: `mailto:${personal?.email || "nishanthu08@gmail.com"}`,
                  icon: (
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='w-4 h-4'
                    >
                      <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                      <polyline points='22,6 12,13 2,6' />
                    </svg>
                  ),
                },
                {
                  label: "Location",
                  value: personal?.location || "Tamil Nadu, India",
                  href: "#",
                  icon: (
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      className='w-4 h-4'
                    >
                      <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z' />
                      <circle cx='12' cy='10' r='3' />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className='flex items-center gap-3 group'
                >
                  <div
                    className='w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200'
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      color: "var(--ink-2)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      className='text-[9px] font-black uppercase tracking-widest mb-0.5'
                      style={{ color: "var(--ink-3)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className='text-sm font-bold transition-colors group-hover:text-[var(--accent)]'
                      style={{ color: "var(--ink)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div>
              <p
                className='text-[9px] font-black uppercase tracking-widest mb-3'
                style={{ color: "var(--ink-3)" }}
              >
                Find me on
              </p>
              <div className='flex gap-3'>
                {SOCIALS.map((s) => {
                  const href = personal?.[s.key] || "#";
                  return (
                    <a
                      key={s.key}
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={s.label}
                      className='w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200'
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        color: "var(--ink-2)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "var(--ink)";
                        el.style.color = "#fff";
                        el.style.borderColor = "var(--ink)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "var(--bg-card)";
                        el.style.color = "var(--ink-2)";
                        el.style.borderColor = "var(--border)";
                      }}
                    >
                      {s.svg}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className={`lg:col-span-7 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <form onSubmit={handleSubmit} className='card p-8 md:p-12'>
              <div className='grid md:grid-cols-2 gap-6 mb-6'>
                <div
                  className='border-b py-2 transition-colors'
                  style={{ borderColor: "var(--border)" }}
                >
                  <label
                    className='text-[9px] font-black uppercase tracking-widest block mb-1'
                    style={{ color: "var(--ink-3)" }}
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    className='w-full bg-transparent border-none outline-none font-bold text-sm placeholder:font-normal'
                    style={{ color: "var(--ink)" }}
                    placeholder='Your Name'
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div
                  className='border-b py-2 transition-colors'
                  style={{ borderColor: "var(--border)" }}
                >
                  <label
                    className='text-[9px] font-black uppercase tracking-widest block mb-1'
                    style={{ color: "var(--ink-3)" }}
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    className='w-full bg-transparent border-none outline-none font-bold text-sm placeholder:font-normal'
                    style={{ color: "var(--ink)" }}
                    placeholder='Your Email'
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div
                className='border-b pb-2 mb-10 transition-colors'
                style={{ borderColor: "var(--border)" }}
              >
                <label
                  className='text-[9px] font-black uppercase tracking-widest block mb-1'
                  style={{ color: "var(--ink-3)" }}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  className='w-full bg-transparent border-none outline-none font-bold text-sm placeholder:font-normal resize-none'
                  style={{ color: "var(--ink)" }}
                  placeholder='Say hello...'
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </div>
              <button
                type='submit'
                disabled={sending}
                className='group w-full flex items-center justify-between rounded-2xl font-bold text-sm py-5 px-8 transition-all'
                style={{ background: "var(--ink)", color: "#fff" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "var(--accent)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "var(--ink)")
                }
              >
                <span>{sending ? "Sending..." : "Send Message"}</span>
                <span className='text-xl transition-transform group-hover:translate-x-2'>
                  →
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
