"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as api from "@/lib/api";

type Section =
  | "overview"
  | "personal"
  | "skills"
  | "projects"
  | "experience"
  | "achievements"
  | "feedback"
  | "messages"
  | "visibility"
  | "sections"
  | "security";

const NAV: { id: Section; label: string; icon: any }[] = [
  {
    id: "overview",
    label: "Overview",
    icon: (
      <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
        <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z' />
        <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z' />
      </svg>
    ),
  },
  {
    id: "personal",
    label: "Personal Info",
    icon: (
      <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
        <path
          fillRule='evenodd'
          d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
        <path
          fillRule='evenodd'
          d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
        <path d='M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z' />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: (
      <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
        <path
          fillRule='evenodd'
          d='M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: (
      <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
      </svg>
    ),
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: (
      <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
        <path d='M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z' />
        <path d='M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z' />
      </svg>
    ),
  },
  {
    id: "messages",
    label: "Messages",
    icon: (
      <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
        <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
        <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
      </svg>
    ),
  },
  {
    id: "visibility",
    label: "Show/Hide Sections",
    icon: (
      <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
        <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
        <path
          fillRule='evenodd'
          d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
  {
    id: "sections",
    label: "Custom Sections",
    icon: (
      <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
        <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z' />
      </svg>
    ),
  },
  {
    id: "security",
    label: "Security",
    icon: (
      <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
        <path
          fillRule='evenodd'
          d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function imgSrc(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${className}`}
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {children}
    </div>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      className='block text-[10px] font-black uppercase tracking-widest mb-1.5'
      style={{ color: "var(--ink-3)" }}
    >
      {children}
    </label>
  );
}
function Input({
  label,
  ...p
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label>{label}</Label>
      <input {...p} className='input-field' />
    </div>
  );
}
function Textarea({
  label,
  ...p
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <Label>{label}</Label>
      <textarea {...p} className='input-field resize-none' />
    </div>
  );
}
function Btn({
  children,
  variant = "primary",
  className = "",
  ...p
}: {
  variant?: "primary" | "danger" | "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border";
  const v = {
    primary: `${base} btn-primary border-transparent`,
    danger: `${base} border-red-200 text-red-600 hover:bg-red-50`,
    ghost: `${base} border-[var(--border)] text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]`,
  };
  return (
    <button {...p} className={`${v[variant]} ${className}`}>
      {children}
    </button>
  );
}

function ImageUpload({
  value,
  onChange,
  uploadFn,
  label = "Image",
  aspect = "16/9",
}: {
  value: string;
  onChange: (url: string) => void;
  uploadFn: (f: File) => Promise<any>;
  label?: string;
  aspect?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const src = imgSrc(value);

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const r = await uploadFn(file);
      onChange(r.data.url);
      toast.success("Uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };
  const remove = async () => {
    if (value) {
      try {
        await api.deleteUpload(value);
      } catch {}
    }
    onChange("");
  };
  return (
    <div>
      <Label>{label}</Label>
      <div
        className='relative rounded-xl overflow-hidden border cursor-pointer group'
        style={{
          aspectRatio: aspect,
          background: "var(--bg)",
          borderColor: "var(--border)",
        }}
        onClick={() => inputRef.current?.click()}
      >
        {src ? (
          <img src={src} alt='' className='w-full h-full object-cover' />
        ) : (
          <div className='flex flex-col items-center justify-center h-full gap-2'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              className='w-8 h-8'
              style={{ color: "var(--ink-3)" }}
            >
              <path
                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <p
              className='text-[10px] font-bold uppercase tracking-wider'
              style={{ color: "var(--ink-3)" }}
            >
              {uploading ? "Uploading..." : "Click to upload"}
            </p>
          </div>
        )}
        {src && (
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              remove();
            }}
            className='absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black'
            style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
          >
            ✕
          </button>
        )}
        {uploading && (
          <div
            className='absolute inset-0 flex items-center justify-center'
            style={{ background: "rgba(255,255,255,0.7)" }}
          >
            <div
              className='w-6 h-6 border-2 rounded-full animate-spin'
              style={{
                borderColor: "var(--accent)",
                borderTopColor: "transparent",
              }}
            />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handle}
      />
    </div>
  );
}

// ─── Section: Overview ────────────────────────────────────────────────────────
function Overview({ data }: { data: any }) {
  const stats = [
    { n: data?.projects?.length || 0, label: "Projects", c: "var(--accent)" },
    { n: data?.skills?.length || 0, label: "Skills", c: "var(--green)" },
    { n: data?.achievements?.length || 0, label: "Achievements", c: "#e11d48" },
    { n: data?.feedback?.length || 0, label: "Feedback", c: "#0891b2" },
  ];
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-black' style={{ color: "var(--ink)" }}>
        Dashboard Overview
      </h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {stats.map((s, i) => (
          <Card key={i} className='text-center'>
            <div className='text-3xl font-black mb-1' style={{ color: s.c }}>
              {s.n}
            </div>
            <div
              className='text-[10px] font-black uppercase tracking-widest'
              style={{ color: "var(--ink-3)" }}
            >
              {s.label}
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <h3 className='font-black text-sm mb-3' style={{ color: "var(--ink)" }}>
          Quick Info
        </h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium'>
          {[
            ["Name", data?.personal?.name],
            ["Email", data?.personal?.email],
            ["Title", data?.personal?.title],
            ["Location", data?.personal?.location],
          ].map(([k, v]) => (
            <div key={k} className='flex gap-2'>
              <span style={{ color: "var(--ink-3)" }}>{k}:</span>
              <span style={{ color: "var(--ink)" }}>{v}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Section: Personal ────────────────────────────────────────────────────────
function PersonalSection({ data, reload }: { data: any; reload: () => void }) {
  const [form, setForm] = useState(data?.personal || {});
  const [saving, setSaving] = useState(false);
  useEffect(() => setForm(data?.personal || {}), [data]);
  const save = async () => {
    setSaving(true);
    try {
      await api.updatePersonal(form);
      toast.success("Saved!");
      reload();
    } catch {
      toast.error("Failed");
    } finally {
      setSaving(false);
    }
  };
  const fields = [
    ["name", "Full Name"],
    ["title", "Job Title"],
    ["subtitle", "Subtitle"],
    ["email", "Email", "email"],
    ["location", "Location"],
    ["github", "GitHub URL"],
    ["linkedin", "LinkedIn URL"],
    ["instagram", "Instagram URL"],
    ["resumeUrl", "Resume URL"],
  ];
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-black' style={{ color: "var(--ink)" }}>
        Personal Information
      </h2>
      <Card>
        <div className='mb-6 w-48'>
          <ImageUpload
            label='Profile Photo'
            value={form.avatar || ""}
            aspect='1/2'
            onChange={(url) => setForm({ ...form, avatar: url })}
            uploadFn={api.uploadAvatar}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          {fields.map(([k, l, t]) => (
            <Input
              key={k}
              label={l}
              type={t || "text"}
              value={form[k] || ""}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            />
          ))}
          <div className='md:col-span-2'>
            <Textarea
              label='Bio'
              rows={4}
              value={form.bio || ""}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <Btn onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Btn>
        </div>
      </Card>
    </div>
  );
}

// ─── Section: Skills ──────────────────────────────────────────────────────────
function SkillsSection({ data, reload }: { data: any; reload: () => void }) {
  const empty = { name: "", icon: "", level: 80, color: "#6366f1" };
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setForm(empty);
    setEditing(null);
    setShow(false);
  };
  const save = async () => {
    if (!form.name) {
      toast.error("Name required");
      return;
    }
    setSaving(true);
    try {
      if (editing) await api.updateSkill(editing._id, form);
      else await api.addSkill(form);
      toast.success(editing ? "Updated!" : "Added!");
      reload();
      reset();
    } catch {
      toast.error("Failed");
    } finally {
      setSaving(false);
    }
  };
  const del = async (id: string) => {
    if (!confirm("Delete?")) return;
    try {
      await api.deleteSkill(id);
      toast.success("Deleted");
      reload();
    } catch {
      toast.error("Failed");
    }
  };
  const startEdit = (s: any) => {
    setForm(s);
    setEditing(s);
    setShow(true);
  };

  // Devicon class helper
  const iconCls = (slug: string) => {
    const m: Record<string, string> = {
      nextjs: "devicon-nextjs-plain",
      express: "devicon-express-original",
      mongodb: "devicon-mongodb-plain",
      tailwindcss: "devicon-tailwindcss-plain",
    };
    return m[slug] || `devicon-${slug}-plain`;
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-black' style={{ color: "var(--ink)" }}>
          Skills
        </h2>
        <Btn
          onClick={() => {
            reset();
            setShow(true);
          }}
        >
          + Add Skill
        </Btn>
      </div>
      {show && (
        <Card>
          <h3
            className='font-black text-sm mb-4'
            style={{ color: "var(--ink)" }}
          >
            {editing ? "Edit Skill" : "New Skill"}
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
            <Input
              label='Skill Name'
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder='React'
            />
            <Input
              label='Devicon Slug'
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder='react (from devicon.dev)'
            />
            <Input
              label='Brand Color'
              type='color'
              value={form.color || "#6366f1"}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
            />
            <div>
              <Label>Proficiency: {form.level}%</Label>
              <input
                type='range'
                min={0}
                max={100}
                value={form.level}
                onChange={(e) => setForm({ ...form, level: +e.target.value })}
                className='w-full mt-2 accent-[var(--accent)]'
              />
            </div>
          </div>
          {form.icon && (
            <div
              className='flex items-center gap-3 p-3 rounded-xl mb-4'
              style={{ background: "var(--bg)" }}
            >
              <i
                className={`${iconCls(form.icon)} text-3xl`}
                style={{ color: form.color }}
              />
              <span
                className='text-sm font-bold'
                style={{ color: "var(--ink)" }}
              >
                {form.name}
              </span>
              <span
                className='text-xs font-mono ml-auto'
                style={{ color: "var(--ink-3)" }}
              >
                {form.level}%
              </span>
            </div>
          )}
          <div className='flex gap-3 justify-end'>
            <Btn variant='ghost' onClick={reset}>
              Cancel
            </Btn>
            <Btn onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Btn>
          </div>
          <p className='text-[10px] mt-3' style={{ color: "var(--ink-3)" }}>
            Find slugs at{" "}
            <a
              href='https://devicon.dev'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
              style={{ color: "var(--accent)" }}
            >
              devicon.dev
            </a>
          </p>
        </Card>
      )}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
        {data?.skills?.map((s: any) => (
          <Card key={s._id} className='text-center relative group'>
            <i
              className={`${iconCls(s.icon)} text-4xl mb-2 block`}
              style={{ color: s.color }}
            />
            <div
              className='font-black text-xs mb-1'
              style={{ color: "var(--ink)" }}
            >
              {s.name}
            </div>
            <div
              className='w-full h-1 rounded-full mb-1'
              style={{ background: "var(--border)" }}
            >
              <div
                className='h-full rounded-full'
                style={{ width: `${s.level}%`, background: s.color }}
              />
            </div>
            <div
              className='text-[10px] font-mono'
              style={{ color: "var(--ink-3)" }}
            >
              {s.level}%
            </div>
            <div className='absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
              <button
                className='w-6 h-6 rounded-md text-xs flex items-center justify-center'
                style={{ background: "var(--bg-alt)" }}
                onClick={() => startEdit(s)}
              >
                ✏
              </button>
              <button
                className='w-6 h-6 rounded-md text-xs flex items-center justify-center text-red-500'
                style={{ background: "#fee2e2" }}
                onClick={() => del(s._id)}
              >
                ✕
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Projects ────────────────────────────────────────────────────────
function ProjectsSection({ data, reload }: { data: any; reload: () => void }) {
  const empty = {
    title: "",
    subtitle: "",
    description: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    image: "",
    featured: false,
  };
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setForm(empty);
    setEditing(null);
    setShow(false);
  };
  const save = async () => {
    if (!form.title) {
      toast.error("Title required");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      technologies:
        typeof form.technologies === "string"
          ? form.technologies
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : form.technologies,
    };
    try {
      if (editing) await api.updateProject(editing._id, payload);
      else await api.addProject(payload);
      toast.success(editing ? "Updated!" : "Added!");
      reload();
      reset();
    } catch {
      toast.error("Failed");
    } finally {
      setSaving(false);
    }
  };
  const del = async (id: string, img: string) => {
    if (!confirm("Delete project?")) return;
    if (img)
      try {
        await api.deleteUpload(img);
      } catch {}
    try {
      await api.deleteProject(id);
      toast.success("Deleted");
      reload();
    } catch {
      toast.error("Failed");
    }
  };
  const startEdit = (p: any) => {
    setForm({
      ...p,
      technologies: Array.isArray(p.technologies)
        ? p.technologies.join(", ")
        : p.technologies,
    });
    setEditing(p);
    setShow(true);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-black' style={{ color: "var(--ink)" }}>
          Projects
        </h2>
        <Btn
          onClick={() => {
            reset();
            setShow(true);
          }}
        >
          + Add Project
        </Btn>
      </div>
      {show && (
        <Card>
          <h3
            className='font-black text-sm mb-4'
            style={{ color: "var(--ink)" }}
          >
            {editing ? "Edit Project" : "New Project"}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <ImageUpload
              label='Project Image'
              value={form.image || ""}
              uploadFn={api.uploadProjectImage}
              onChange={(url) => setForm({ ...form, image: url })}
            />
            <div className='space-y-4'>
              <Input
                label='Title'
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder='My Project'
              />
              <Input
                label='Subtitle / Category'
                value={form.subtitle || ""}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder='SaaS / Mobile App'
              />
              <Input
                label='Live URL'
                value={form.liveUrl || ""}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                placeholder='https://...'
              />
              <Input
                label='GitHub URL'
                value={form.githubUrl || ""}
                onChange={(e) =>
                  setForm({ ...form, githubUrl: e.target.value })
                }
                placeholder='https://github.com/...'
              />
            </div>
            <div className='md:col-span-2'>
              <Input
                label='Technologies (comma-separated)'
                value={form.technologies || ""}
                onChange={(e) =>
                  setForm({ ...form, technologies: e.target.value })
                }
                placeholder='React, Node.js, MongoDB'
              />
            </div>
            <div className='md:col-span-2'>
              <Textarea
                label='Description'
                rows={3}
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='featured'
                checked={!!form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
                className='w-4 h-4 accent-[var(--accent)]'
              />
              <label
                htmlFor='featured'
                className='text-xs font-bold'
                style={{ color: "var(--ink-2)" }}
              >
                Mark as Featured
              </label>
            </div>
          </div>
          <div className='flex gap-3 justify-end'>
            <Btn variant='ghost' onClick={reset}>
              Cancel
            </Btn>
            <Btn onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Btn>
          </div>
        </Card>
      )}
      <div className='space-y-3'>
        {data?.projects?.map((p: any) => {
          const src = imgSrc(p.image || "");
          return (
            <Card key={p._id} className='flex items-start gap-4'>
              <div
                className='w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-xl font-black'
                style={{ background: "var(--bg-alt)", color: "var(--ink-3)" }}
              >
                {src ? (
                  <img
                    src={src}
                    alt={p.title}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  p.title.substring(0, 2).toUpperCase()
                )}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2 mb-0.5'>
                  <h3
                    className='font-black text-sm'
                    style={{ color: "var(--ink)" }}
                  >
                    {p.title}
                  </h3>
                  {p.featured && (
                    <span
                      className='text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider'
                      style={{
                        background: "var(--gold-lt)",
                        color: "var(--gold)",
                      }}
                    >
                      Featured
                    </span>
                  )}
                </div>
                <p
                  className='text-xs line-clamp-1 mb-1.5'
                  style={{ color: "var(--ink-3)" }}
                >
                  {p.description}
                </p>
                <div className='flex flex-wrap gap-1'>
                  {p.technologies?.map((t: string, i: number) => (
                    <span key={i} className='tag-pill'>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className='flex gap-2'>
                <Btn
                  variant='ghost'
                  className='!px-2 !py-1.5'
                  onClick={() => startEdit(p)}
                >
                  ✏ Edit
                </Btn>
                <Btn
                  variant='danger'
                  className='!px-2 !py-1.5'
                  onClick={() => del(p._id, p.image)}
                >
                  🗑
                </Btn>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section: Experience ──────────────────────────────────────────────────────
function ExperienceSection({
  data,
  reload,
}: {
  data: any;
  reload: () => void;
}) {
  const empty = {
    title: "",
    organization: "",
    location: "",
    startDate: "",
    endDate: "",
    type: "education",
    description: "",
    logo: "",
    current: false,
  };
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setForm(empty);
    setEditing(null);
    setShow(false);
  };
  const save = async () => {
    if (!form.title) {
      toast.error("Title required");
      return;
    }
    setSaving(true);
    try {
      if (editing) await api.updateExperience(editing._id, form);
      else await api.addExperience(form);
      toast.success(editing ? "Updated!" : "Added!");
      reload();
      reset();
    } catch {
      toast.error("Failed");
    } finally {
      setSaving(false);
    }
  };
  const del = async (id: string, logo: string) => {
    if (!confirm("Delete?")) return;
    if (logo)
      try {
        await api.deleteUpload(logo);
      } catch {}
    try {
      await api.deleteExperience(id);
      toast.success("Deleted");
      reload();
    } catch {
      toast.error("Failed");
    }
  };

  const typeColors: Record<string, string> = {
    education: "var(--accent)",
    work: "var(--green)",
    certification: "var(--gold)",
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-black' style={{ color: "var(--ink)" }}>
          Experience & Education
        </h2>
        <Btn
          onClick={() => {
            reset();
            setShow(true);
          }}
        >
          + Add Entry
        </Btn>
      </div>
      {show && (
        <Card>
          <h3
            className='font-black text-sm mb-4'
            style={{ color: "var(--ink)" }}
          >
            {editing ? "Edit Entry" : "New Entry"}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
            <div className='md:col-span-1'>
              <ImageUpload
                label='Organisation Logo'
                value={form.logo || ""}
                aspect='1/1'
                uploadFn={api.uploadExperienceLogo}
                onChange={(url) => setForm({ ...form, logo: url })}
              />
            </div>
            <div className='md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <Input
                label='Title / Role'
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <Input
                label='Organisation'
                value={form.organization}
                onChange={(e) =>
                  setForm({ ...form, organization: e.target.value })
                }
              />
              <Input
                label='Location'
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <div>
                <Label>Type</Label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className='input-field'
                >
                  <option value='education'>Education</option>
                  <option value='work'>Work</option>
                  <option value='certification'>Certification</option>
                </select>
              </div>
              <Input
                label='Start Year'
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                placeholder='2020'
              />
              <Input
                label='End Year'
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                placeholder='2023'
              />
              <div className='flex items-center gap-2 sm:col-span-2'>
                <input
                  type='checkbox'
                  id='cur'
                  checked={!!form.current}
                  onChange={(e) =>
                    setForm({ ...form, current: e.target.checked })
                  }
                  className='w-4 h-4 accent-[var(--accent)]'
                />
                <label
                  htmlFor='cur'
                  className='text-xs font-bold'
                  style={{ color: "var(--ink-2)" }}
                >
                  Currently here
                </label>
              </div>
            </div>
            <div className='md:col-span-3'>
              <Textarea
                label='Description'
                rows={3}
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className='flex gap-3 justify-end'>
            <Btn variant='ghost' onClick={reset}>
              Cancel
            </Btn>
            <Btn onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Btn>
          </div>
        </Card>
      )}
      <div className='space-y-3'>
        {data?.experience?.map((item: any) => {
          const logoSrc = imgSrc(item.logo || "");
          return (
            <Card key={item._id} className='flex items-start gap-4'>
              <div
                className='w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center font-black text-sm'
                style={{
                  background: "var(--bg-alt)",
                  color: typeColors[item.type] || "var(--accent)",
                }}
              >
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt=''
                    className='w-full h-full object-contain p-1'
                  />
                ) : (
                  item.organization?.substring(0, 2).toUpperCase()
                )}
              </div>
              <div className='flex-1 min-w-0'>
                <h3
                  className='font-black text-sm'
                  style={{ color: "var(--ink)" }}
                >
                  {item.title}
                </h3>
                <p
                  className='text-xs font-medium'
                  style={{ color: "var(--ink-2)" }}
                >
                  {item.organization}
                </p>
                <p
                  className='text-[10px] font-mono mt-0.5'
                  style={{ color: "var(--ink-3)" }}
                >
                  {item.startDate}–{item.current ? "Present" : item.endDate} ·{" "}
                  <span style={{ color: typeColors[item.type] }}>
                    {item.type}
                  </span>
                </p>
              </div>
              <div className='flex gap-2'>
                <Btn
                  variant='ghost'
                  className='!px-2 !py-1.5'
                  onClick={() => {
                    setForm(item);
                    setEditing(item);
                    setShow(true);
                  }}
                >
                  ✏
                </Btn>
                <Btn
                  variant='danger'
                  className='!px-2 !py-1.5'
                  onClick={() => del(item._id, item.logo)}
                >
                  🗑
                </Btn>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section: Achievements ────────────────────────────────────────────────────
function AchievementsSection({
  data,
  reload,
}: {
  data: any;
  reload: () => void;
}) {
  const empty = { title: "", description: "", image: "", date: "" };
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setForm(empty);
    setEditing(null);
    setShow(false);
  };
  const save = async () => {
    if (!form.title) {
      toast.error("Title required");
      return;
    }
    setSaving(true);
    try {
      if (editing) await api.updateAchievement(editing._id, form);
      else await api.addAchievement(form);
      toast.success(editing ? "Updated!" : "Added!");
      reload();
      reset();
    } catch {
      toast.error("Failed");
    } finally {
      setSaving(false);
    }
  };
  const del = async (id: string, img: string) => {
    if (!confirm("Delete?")) return;
    if (img)
      try {
        await api.deleteUpload(img);
      } catch {}
    try {
      await api.deleteAchievement(id);
      toast.success("Deleted");
      reload();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-black' style={{ color: "var(--ink)" }}>
          Achievements
        </h2>
        <Btn
          onClick={() => {
            reset();
            setShow(true);
          }}
        >
          + Add Achievement
        </Btn>
      </div>
      {show && (
        <Card>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <ImageUpload
              label='Achievement Image'
              value={form.image || ""}
              uploadFn={api.uploadAchievementImage}
              onChange={(url) => setForm({ ...form, image: url })}
            />
            <div className='space-y-4'>
              <Input
                label='Title'
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <Input
                label='Date'
                value={form.date || ""}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                placeholder='2023'
              />
              <Textarea
                label='Description'
                rows={3}
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className='flex gap-3 justify-end'>
            <Btn variant='ghost' onClick={reset}>
              Cancel
            </Btn>
            <Btn onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Btn>
          </div>
        </Card>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {data?.achievements?.map((a: any) => {
          const src = imgSrc(a.image || "");
          return (
            <Card key={a._id} className='overflow-hidden p-0'>
              {src ? (
                <img
                  src={src}
                  alt={a.title}
                  className='w-full h-32 object-cover'
                />
              ) : (
                <div
                  className='w-full h-32 flex items-center justify-center text-3xl'
                  style={{ background: "var(--bg-alt)" }}
                >
                  🏆
                </div>
              )}
              <div className='p-4'>
                <h3
                  className='font-black text-sm mb-1'
                  style={{ color: "var(--ink)" }}
                >
                  {a.title}
                </h3>
                <p
                  className='text-xs line-clamp-2 mb-2'
                  style={{ color: "var(--ink-3)" }}
                >
                  {a.description}
                </p>
                <div className='flex items-center justify-between'>
                  <span
                    className='text-[10px] font-mono'
                    style={{ color: "var(--ink-3)" }}
                  >
                    {a.date}
                  </span>
                  <div className='flex gap-2'>
                    <Btn
                      variant='ghost'
                      className='!px-2 !py-1'
                      onClick={() => {
                        setForm(a);
                        setEditing(a);
                        setShow(true);
                      }}
                    >
                      ✏
                    </Btn>
                    <Btn
                      variant='danger'
                      className='!px-2 !py-1'
                      onClick={() => del(a._id, a.image)}
                    >
                      🗑
                    </Btn>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
        {!data?.achievements?.length && (
          <div
            className='sm:col-span-2 text-center py-10 text-sm'
            style={{ color: "var(--ink-3)" }}
          >
            No achievements yet.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Section: Feedback ────────────────────────────────────────────────────────
function FeedbackSection({ data, reload }: { data: any; reload: () => void }) {
  const empty = {
    name: "",
    role: "",
    company: "",
    text: "",
    rating: 5,
    avatar: "",
  };
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setForm(empty);
    setEditing(null);
    setShow(false);
  };
  const save = async () => {
    if (!form.name || !form.text) {
      toast.error("Name and text required");
      return;
    }
    setSaving(true);
    try {
      if (editing) await api.updateFeedback(editing._id, form);
      else await api.addFeedback(form);
      toast.success(editing ? "Updated!" : "Added!");
      reload();
      reset();
    } catch {
      toast.error("Failed");
    } finally {
      setSaving(false);
    }
  };
  const del = async (id: string, avatar: string) => {
    if (!confirm("Delete?")) return;
    if (avatar)
      try {
        await api.deleteUpload(avatar);
      } catch {}
    try {
      await api.deleteFeedback(id);
      toast.success("Deleted");
      reload();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-black' style={{ color: "var(--ink)" }}>
          Feedback & Testimonials
        </h2>
        <Btn
          onClick={() => {
            reset();
            setShow(true);
          }}
        >
          + Add Feedback
        </Btn>
      </div>
      {show && (
        <Card>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
            <div>
              <ImageUpload
                label='Person Photo'
                value={form.avatar || ""}
                aspect='1/1'
                uploadFn={api.uploadFeedbackAvatar}
                onChange={(url) => setForm({ ...form, avatar: url })}
              />
            </div>
            <div className='md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <Input
                label='Name'
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                label='Role / Position'
                value={form.role || ""}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder='Senior Developer'
              />
              <Input
                label='Company'
                value={form.company || ""}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
              <div>
                <Label>Rating: {form.rating}/5</Label>
                <input
                  type='range'
                  min={1}
                  max={5}
                  value={form.rating}
                  onChange={(e) =>
                    setForm({ ...form, rating: +e.target.value })
                  }
                  className='w-full mt-2 accent-[var(--gold)]'
                />
              </div>
              <div className='sm:col-span-2'>
                <Textarea
                  label='Testimonial Text'
                  rows={3}
                  value={form.text || ""}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className='flex gap-3 justify-end'>
            <Btn variant='ghost' onClick={reset}>
              Cancel
            </Btn>
            <Btn onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Btn>
          </div>
        </Card>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {data?.feedback?.map((f: any) => {
          const src = imgSrc(f.avatar || "");
          return (
            <Card key={f._id} className='flex gap-4'>
              <div
                className='w-12 h-12 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-black'
                style={{
                  background: "var(--accent-lt)",
                  color: "var(--accent)",
                }}
              >
                {src ? (
                  <img
                    src={src}
                    alt=''
                    className='w-full h-full object-cover'
                  />
                ) : (
                  (f.name || "A").charAt(0)
                )}
              </div>
              <div className='flex-1 min-w-0'>
                <div
                  className='font-black text-sm'
                  style={{ color: "var(--ink)" }}
                >
                  {f.name}
                </div>
                <div className='text-xs' style={{ color: "var(--ink-3)" }}>
                  {f.role}
                  {f.company && ` @ ${f.company}`}
                </div>
                <div className='flex gap-0.5 my-1'>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={
                        i <= (f.rating || 5) ? "star-filled" : "star-empty"
                      }
                      style={{ fontSize: "10px" }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p
                  className='text-xs line-clamp-2'
                  style={{ color: "var(--ink-2)" }}
                >
                  {f.text}
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <Btn
                  variant='ghost'
                  className='!px-2 !py-1'
                  onClick={() => {
                    setForm(f);
                    setEditing(f);
                    setShow(true);
                  }}
                >
                  ✏
                </Btn>
                <Btn
                  variant='danger'
                  className='!px-2 !py-1'
                  onClick={() => del(f._id, f.avatar)}
                >
                  🗑
                </Btn>
              </div>
            </Card>
          );
        })}
        {!data?.feedback?.length && (
          <div
            className='sm:col-span-2 text-center py-10 text-sm'
            style={{ color: "var(--ink-3)" }}
          >
            No feedback yet.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Section: Messages ────────────────────────────────────────────────────────
function MessagesSection() {
  const [msgs, setMsgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    try {
      const r = await api.getMessages();
      setMsgs(r.data);
    } catch {
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const markRead = async (id: string) => {
    await api.markRead(id);
    setMsgs((p) => p.map((m) => (m._id === id ? { ...m, read: true } : m)));
  };
  const del = async (id: string) => {
    if (!confirm("Delete?")) return;
    await api.deleteMessage(id);
    setMsgs((p) => p.filter((m) => m._id !== id));
    toast.success("Deleted");
  };
  const unread = msgs.filter((m) => !m.read).length;
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <h2 className='text-2xl font-black' style={{ color: "var(--ink)" }}>
          Messages
        </h2>
        {unread > 0 && (
          <span
            className='px-2.5 py-0.5 rounded-full text-xs font-black text-white'
            style={{ background: "var(--accent)" }}
          >
            {unread} new
          </span>
        )}
      </div>
      {loading ? (
        <div
          className='text-center py-12 text-sm'
          style={{ color: "var(--ink-3)" }}
        >
          Loading...
        </div>
      ) : msgs.length === 0 ? (
        <Card
          className='text-center py-12 text-sm'
        >
          No messages yet
        </Card>
      ) : (
        <div className='space-y-3'>
          {msgs.map((m) => (
            <Card
              key={m._id}
              className={!m.read ? "!border-[var(--accent)]" : ""}
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-1'>
                    <span
                      className='font-black text-sm'
                      style={{ color: "var(--ink)" }}
                    >
                      {m.name}
                    </span>
                    {!m.read && (
                      <span
                        className='w-2 h-2 rounded-full flex-shrink-0'
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                    <span
                      className='text-[10px] font-mono ml-auto'
                      style={{ color: "var(--ink-3)" }}
                    >
                      {new Date(m.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p
                    className='text-xs font-bold mb-2'
                    style={{ color: "var(--accent)" }}
                  >
                    {m.email}
                  </p>
                  <p
                    className='text-sm leading-relaxed'
                    style={{ color: "var(--ink-2)" }}
                  >
                    {m.message}
                  </p>
                </div>
                <div className='flex flex-col gap-2'>
                  {!m.read && (
                    <Btn
                      variant='ghost'
                      className='!px-2 !py-1'
                      onClick={() => markRead(m._id)}
                    >
                      ✓
                    </Btn>
                  )}
                  <Btn
                    variant='danger'
                    className='!px-2 !py-1'
                    onClick={() => del(m._id)}
                  >
                    🗑
                  </Btn>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section: Visibility ──────────────────────────────────────────────────────
function VisibilitySection({
  data,
  reload,
}: {
  data: any;
  reload: () => void;
}) {
  const [vis, setVis] = useState(data?.sectionVisibility || {});
  const [saving, setSaving] = useState(false);
  useEffect(() => setVis(data?.sectionVisibility || {}), [data]);

  const SECTIONS = [
    {
      key: "skills",
      label: "Skills & Expertise",
      desc: "Devicon-powered skill grid",
    },
    {
      key: "projects",
      label: "Projects / Case Studies",
      desc: "Portfolio project cards",
    },
    {
      key: "experience",
      label: "Experience & Education",
      desc: "Forward flowchart timeline",
    },
    {
      key: "achievements",
      label: "Achievements",
      desc: "Awards & recognitions with images",
    },
    {
      key: "feedback",
      label: "Feedback / Testimonials",
      desc: "Star-rated testimonials",
    },
    {
      key: "contact",
      label: "Contact Form",
      desc: "Inquiry form & social links",
    },
  ];

  const toggle = (k: string) => setVis((p: any) => ({ ...p, [k]: !p[k] }));
  const save = async () => {
    setSaving(true);
    try {
      await api.updateVisibility(vis);
      toast.success("Visibility updated!");
      reload();
    } catch {
      toast.error("Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-black' style={{ color: "var(--ink)" }}>
        Show / Hide Sections
      </h2>
      <Card>
        <p
          className='text-xs font-medium mb-6'
          style={{ color: "var(--ink-3)" }}
        >
          Toggle any section on or off. Hidden sections won't appear on your
          public portfolio until re-enabled.
        </p>
        <div className='space-y-3 mb-6'>
          {SECTIONS.map((s) => (
            <div
              key={s.key}
              className='flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer'
              style={{
                background:
                  vis[s.key] !== false ? "var(--accent-lt)" : "var(--bg)",
                borderColor:
                  vis[s.key] !== false ? "var(--accent)" : "var(--border)",
              }}
              onClick={() => toggle(s.key)}
            >
              <div>
                <p
                  className='font-black text-sm'
                  style={{ color: "var(--ink)" }}
                >
                  {s.label}
                </p>
                <p className='text-xs' style={{ color: "var(--ink-3)" }}>
                  {s.desc}
                </p>
              </div>
              {/* Toggle switch */}
              <div
                className='relative w-11 h-6 rounded-full transition-colors flex-shrink-0'
                style={{
                  background:
                    vis[s.key] !== false ? "var(--accent)" : "var(--border-2)",
                }}
              >
                <div
                  className='absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200'
                  style={{
                    left: vis[s.key] !== false ? "calc(100% - 22px)" : "2px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-end'>
          <Btn onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Apply Changes"}
          </Btn>
        </div>
      </Card>
    </div>
  );
}

// ─── Section: Custom Sections ─────────────────────────────────────────────────
function CustomSectionsPanel({
  data,
  reload,
}: {
  data: any;
  reload: () => void;
}) {
  const empty = { title: "", icon: "✨", type: "text", content: "" };
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<any>(empty);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!form.title) {
      toast.error("Title required");
      return;
    }
    setSaving(true);
    try {
      await api.addSection(form);
      toast.success("Section added!");
      reload();
      setForm(empty);
      setShow(false);
    } catch {
      toast.error("Failed");
    } finally {
      setSaving(false);
    }
  };
  const del = async (id: string) => {
    if (!confirm("Delete section?")) return;
    try {
      await api.deleteSection(id);
      toast.success("Deleted");
      reload();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-black' style={{ color: "var(--ink)" }}>
          Custom Sections
        </h2>
        <Btn onClick={() => setShow(true)}>+ Add Section</Btn>
      </div>
      <Card>
        <p className='text-xs font-medium' style={{ color: "var(--ink-3)" }}>
          Add custom sections (certifications, publications, volunteering, etc.)
          that will appear on your portfolio.
        </p>
      </Card>
      {show && (
        <Card>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
            <Input
              label='Section Title'
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder='Certifications'
            />
            <Input
              label='Icon (emoji)'
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder='📜'
            />
            <div>
              <Label>Display Type</Label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className='input-field'
              >
                <option value='text'>Text Block</option>
                <option value='list'>List</option>
                <option value='cards'>Cards</option>
              </select>
            </div>
            <div className='sm:col-span-2'>
              <Textarea
                label='Content (text, or JSON array for list/cards)'
                rows={4}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder={'Text: Just write here\nList: ["Item 1","Item 2"]'}
              />
            </div>
          </div>
          <div className='flex gap-3 justify-end'>
            <Btn
              variant='ghost'
              onClick={() => {
                setForm(empty);
                setShow(false);
              }}
            >
              Cancel
            </Btn>
            <Btn onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Btn>
          </div>
        </Card>
      )}
      <div className='space-y-3'>
        {data?.customSections?.map((sec: any) => (
          <Card key={sec.id} className='flex items-center gap-4'>
            <span className='text-2xl'>{sec.icon}</span>
            <div className='flex-1'>
              <p className='font-black text-sm' style={{ color: "var(--ink)" }}>
                {sec.title}
              </p>
              <p
                className='text-[10px] font-mono uppercase'
                style={{ color: "var(--ink-3)" }}
              >
                {sec.type}
              </p>
            </div>
            <Btn
              variant='danger'
              className='!px-2 !py-1'
              onClick={() => del(sec.id)}
            >
              🗑 Delete
            </Btn>
          </Card>
        ))}
        {!data?.customSections?.length && (
          <div
            className='text-center py-8 text-sm'
            style={{ color: "var(--ink-3)" }}
          >
            No custom sections yet.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Section: Security ────────────────────────────────────────────────────────
function SecuritySection() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirm: "",
  });
  const [saving, setSaving] = useState(false);
  const save = async () => {
    if (!form.currentPassword || !form.newPassword) {
      toast.error("Fill all fields");
      return;
    }
    if (form.newPassword !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.newPassword.length < 6) {
      toast.error("Min 6 characters");
      return;
    }
    setSaving(true);
    try {
      await api.changePassword(form.currentPassword, form.newPassword);
      toast.success("Password changed!");
      setForm({ currentPassword: "", newPassword: "", confirm: "" });
    } catch {
      toast.error("Current password wrong");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-black' style={{ color: "var(--ink)" }}>
        Security
      </h2>
      <Card className='max-w-sm'>
        <h3 className='font-black text-sm mb-4' style={{ color: "var(--ink)" }}>
          Change Password
        </h3>
        <div className='space-y-4'>
          <Input
            label='Current Password'
            type='password'
            value={form.currentPassword}
            onChange={(e) =>
              setForm({ ...form, currentPassword: e.target.value })
            }
          />
          <Input
            label='New Password'
            type='password'
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
          <Input
            label='Confirm New Password'
            type='password'
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          />
        </div>
        <div className='mt-5'>
          <Btn onClick={save} disabled={saving}>
            {saving ? "Updating..." : "Update Password"}
          </Btn>
        </div>
      </Card>
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [active, setActive] = useState<Section>("overview");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("admin_token")
        : null;
    if (!token) {
      router.push("/login");
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const r = await api.default.get("/admin/portfolio");
      setData(r.data);
    } catch (e: any) {
      if (e?.response?.status === 401) router.push("/login");
      else toast.error("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    router.push("/");
    toast.success("Logged out");
  };

  const renderSection = () => {
    const props = { data, reload: loadData };
    switch (active) {
      case "overview":
        return <Overview {...props} />;
      case "personal":
        return <PersonalSection {...props} />;
      case "skills":
        return <SkillsSection {...props} />;
      case "projects":
        return <ProjectsSection {...props} />;
      case "experience":
        return <ExperienceSection {...props} />;
      case "achievements":
        return <AchievementsSection {...props} />;
      case "feedback":
        return <FeedbackSection {...props} />;
      case "messages":
        return <MessagesSection />;
      case "visibility":
        return <VisibilitySection {...props} />;
      case "sections":
        return <CustomSectionsPanel {...props} />;
      case "security":
        return <SecuritySection />;
    }
  };

  if (loading)
    return (
      <div
        className='min-h-screen flex items-center justify-center'
        style={{ background: "var(--bg)" }}
      >
        <div className='text-center'>
          <div
            className='w-10 h-10 border-2 rounded-full animate-spin mx-auto mb-4'
            style={{
              borderColor: "var(--accent)",
              borderTopColor: "transparent",
            }}
          />
          <p
            className='text-xs font-black uppercase tracking-widest'
            style={{ color: "var(--ink-3)" }}
          >
            Loading dashboard...
          </p>
        </div>
      </div>
    );

  return (
    <div className='min-h-screen flex' style={{ background: "var(--bg)" }}>
      {/* ── Sidebar ── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col border-r transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        {/* Logo */}
        <div className='p-5 border-b' style={{ borderColor: "var(--border)" }}>
          <div className='flex items-center gap-3'>
            <div
              className='w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center text-white'
              style={{ background: "var(--ink)" }}
            >
              NP
            </div>
            <div>
              <p className='font-black text-sm' style={{ color: "var(--ink)" }}>
                Portfolio Admin
              </p>
              <p
                className='text-[10px] font-mono uppercase tracking-wider'
                style={{ color: "var(--ink-3)" }}
              >
                Control Panel
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className='flex-1 p-3 overflow-y-auto space-y-0.5'>
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setSidebarOpen(false);
              }}
              className={`admin-item ${active === item.id ? "active" : ""}`}
            >
              {item.icon}
              <span className='text-xs font-bold'>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div
          className='p-3 border-t space-y-1'
          style={{ borderColor: "var(--border)" }}
        >
          <a href='/' target='_blank' className='admin-item text-xs font-bold'>
            <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
              <path
                fillRule='evenodd'
                d='M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16A8 8 0 0010 2zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z'
                clipRule='evenodd'
              />
            </svg>
            View Portfolio
          </a>
          <button
            onClick={logout}
            className='admin-item w-full text-xs font-bold'
            style={{ color: "#dc2626" }}
          >
            <svg viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
              <path
                fillRule='evenodd'
                d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
                clipRule='evenodd'
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/30 z-30 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main ── */}
      <main className='flex-1 min-w-0 flex flex-col'>
        <header
          className='sticky top-0 z-20 px-6 py-4 flex items-center justify-between border-b'
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <div className='flex items-center gap-3'>
            <button
              className='lg:hidden p-1.5 rounded-lg border text-xs'
              style={{ borderColor: "var(--border)" }}
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <h1
              className='font-black text-sm flex items-center gap-2'
              style={{ color: "var(--ink)" }}
            >
              {NAV.find((n) => n.id === active)?.icon}
              <span className='ml-1'>
                {NAV.find((n) => n.id === active)?.label}
              </span>
            </h1>
          </div>
          <div className='flex items-center gap-3'>
            <span
              className='hidden sm:block text-[10px] font-black uppercase tracking-widest'
              style={{ color: "var(--ink-3)" }}
            >
              Admin
            </span>
            <div
              className='w-8 h-8 rounded-full font-black text-xs flex items-center justify-center text-white'
              style={{ background: "var(--ink)" }}
            >
              A
            </div>
          </div>
        </header>
        <div className='flex-1 p-6 overflow-y-auto'>{renderSection()}</div>
      </main>
    </div>
  );
}
