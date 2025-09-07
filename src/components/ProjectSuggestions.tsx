import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
import { useRef, useState } from "react";
// Configure worker for pdfjs
(pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfjsWorker;

type GuidedProject = {
  title: string;
  description: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  guideUrl?: string;
};

const ALL_PROJECTS: GuidedProject[] = [
  {
    title: "AI-Powered Resume Analyzer",
    description:
      "Build a web app that extracts skills from resumes and suggests roles using embeddings.",
    tags: ["react", "typescript", "nlp", "embeddings", "node", "api"],
    difficulty: "Intermediate",
    guideUrl: "https://example.com/ai-resume-analyzer",
  },
  {
    title: "Full-Stack Task Manager",
    description: "CRUD app with authentication, filters, and responsive UI.",
    tags: [
      "react",
      "typescript",
      "tailwind",
      "auth",
      "crud",
      "node",
      "express",
      "mongo",
    ],
    difficulty: "Beginner",
    guideUrl: "https://example.com/fullstack-task-manager",
  },
  {
    title: "Realtime Chat with WebSockets",
    description:
      "Channel-based chat with presence, typing indicators, and message persistence.",
    tags: ["react", "typescript", "websockets", "redis", "node"],
    difficulty: "Intermediate",
    guideUrl: "https://example.com/realtime-chat",
  },
  {
    title: "E-commerce Storefront",
    description:
      "Product catalog, cart, checkout, and order tracking with modern UI.",
    tags: ["react", "typescript", "tailwind", "stripe", "rest", "next"],
    difficulty: "Intermediate",
    guideUrl: "https://example.com/ecommerce-store",
  },
  {
    title: "Data Dashboard",
    description: "Interactive dashboards with charts, filters, and exports.",
    tags: ["react", "typescript", "d3", "charts", "etl"],
    difficulty: "Advanced",
    guideUrl: "https://example.com/data-dashboard",
  },
  {
    title: "Personal Knowledge Base",
    description: "Markdown notes with tagging, search, and sync.",
    tags: ["react", "typescript", "pwa", "search", "indexing"],
    difficulty: "Beginner",
    guideUrl: "https://example.com/knowledge-base",
  },
];

const KNOWN_SKILLS = [
  "react",
  "typescript",
  "javascript",
  "tailwind",
  "css",
  "html",
  "redux",
  "next",
  "node",
  "express",
  "mongo",
  "postgres",
  "sql",
  "redis",
  "nlp",
  "embeddings",
  "ml",
  "python",
  "websockets",
  "graphql",
  "stripe",
  "testing",
  "jest",
  "vitest",
  "d3",
  "charts",
  "etl",
  "pwa",
  "search",
  "indexing",
  "auth",
  "rest",
];

function normalize(text: string): string {
  return text.toLowerCase();
}

function extractSkillsFromText(text: string): string[] {
  const lower = normalize(text);
  const found = new Set<string>();
  for (const skill of KNOWN_SKILLS) {
    const pattern = new RegExp(`(^|[^a-z])${skill}([^a-z]|$)`);
    if (pattern.test(lower)) found.add(skill);
  }
  // Heuristics for frameworks/libraries often mentioned implicitly
  if (/react\s*\+\s*ts|tsx/.test(lower)) {
    found.add("react");
    found.add("typescript");
  }
  return Array.from(found);
}

function scoreProjectForSkills(
  project: GuidedProject,
  skills: string[]
): number {
  const base = project.tags.reduce(
    (acc, tag) => acc + (skills.includes(tag) ? 2 : 0),
    0
  );

  if (
    skills.includes("react") &&
    skills.includes("typescript") &&
    project.tags.includes("react")
  ) {
    return base + 1;
  }
  return base;
}

function rankProjects(skills: string[]): GuidedProject[] {
  const withScores = ALL_PROJECTS.map((p) => ({
    project: p,
    score: scoreProjectForSkills(p, skills),
  }));
  withScores.sort((a, b) => b.score - a.score);
  return withScores
    .filter((x) => x.score > 0)
    .slice(0, 5)
    .map((x) => x.project);
}

const ProjectSuggestions = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<GuidedProject[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [downloadingProject, setDownloadingProject] = useState<string | null>(
    null
  );

  async function extractTextFromPdf(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await (pdfjsLib as any).getDocument({ data: arrayBuffer })
      .promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = (content.items || []).map((it: any) => it.str ?? "");
      fullText += strings.join(" ") + "\n";
    }
    return fullText;
  }

  async function handleFileUpload(file: File) {
    setError(null);
    if (!file) return;
    const isPdf = file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setError("Please upload a .pdf resume.");
      return;
    }
    const text = await extractTextFromPdf(file);
    setInputText(text);
  }

  async function analyze(textOverride?: string) {
    setError(null);
    setIsLoading(true);
    try {
      const sourceText =
        typeof textOverride === "string" && textOverride.length > 0
          ? textOverride
          : inputText;
      const extracted = extractSkillsFromText(sourceText);
      setSkills(extracted);
      try {
        const apiBase =
          (import.meta as any).env?.VITE_API_BASE || "http://localhost:5175";
        const resp = await fetch(`${apiBase}/api/suggest`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText: sourceText }),
        });
        if (resp.ok) {
          const data = await resp.json();
          if (Array.isArray(data) && data.length > 0) {
            const normalized = data.slice(0, 5).map((p: any) => ({
              title: String(p.title ?? "Untitled"),
              description: String(p.description ?? ""),
              tags: Array.isArray(p.tags)
                ? p.tags.map((t: any) => String(t).toLowerCase())
                : [],
              difficulty:
                p.difficulty === "Beginner" ||
                p.difficulty === "Intermediate" ||
                p.difficulty === "Advanced"
                  ? p.difficulty
                  : "Intermediate",
              guideUrl: p.guideUrl ? String(p.guideUrl) : undefined,
            }));
            setSuggestions(normalized);
          } else {
            const ranked = rankProjects(extracted);
            setSuggestions(ranked);
          }
        } else {
          const ranked = rankProjects(extracted);
          setSuggestions(ranked);
        }
      } catch {
        const ranked = rankProjects(extracted);
        setSuggestions(ranked);
      }
    } catch (e) {
      setError("Resume analysis error. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function reset() {
    setInputText("");
    setError(null);
    setSkills([]);
    setSuggestions([]);
  }

  async function downloadProjectPdf(project: GuidedProject) {
    setDownloadingProject(project.title);
    setError(null);

    const apiBase =
      (import.meta as any).env?.VITE_API_BASE || "http://localhost:5175";

    try {
      const response = await fetch(`${apiBase}/api/generate-project-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: project.title }),
      });

      if (!response.ok) {
        setError("Failed to generate project guide PDF.");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${project.title.replace(/\s+/g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      setError("An error occurred while downloading the PDF.");
    } finally {
      setDownloadingProject(null);
    }
  }

  return (
    <section
      id="suggestions"
      className="border-t border-slate-200 dark:border-slate-700"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="section-title">Get Tailored Project Suggestions</h2>
          <p className="section-subtitle">
            Upload your PDF resume (or paste text). We'll suggest 5 trending
            guided projects matched to your skills.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="card">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Upload resume (.pdf)
              </label>
              <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void handleFileUpload(f);
                }}
                className="mt-2 w-full rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 p-2 text-sm"
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Or paste your resume
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={10}
                  placeholder="Paste your resume or skills here..."
                  className="mt-2 w-full rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 p-3 text-sm"
                />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => analyze()}
                  disabled={!inputText || isLoading}
                  className="btn-gradient disabled:opacity-50"
                >
                  {isLoading ? "Analyzing..." : "Analyze"}
                </button>
                <button
                  onClick={reset}
                  className="rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                >
                  Clear
                </button>
              </div>

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Suggested Projects
              </h3>
              {skills.length > 0 && (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Matched skills: {skills.join(", ")}
                </p>
              )}
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {suggestions.length === 0 && !isLoading ? (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    No suggestions yet. Paste your resume and click Analyze.
                  </p>
                ) : (
                  <>
                    {suggestions.map((p) => (
                      <div
                        key={p.title}
                        className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                              {p.title}
                            </h4>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                              {p.description}
                            </p>
                          </div>
                          <span className="rounded-full border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-2 py-1 text-xs text-slate-700 dark:text-slate-300">
                            {p.difficulty}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-1 text-xs text-slate-700 dark:text-slate-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          {p.guideUrl && (
                            <div className="mt-3">
                              <a
                                href={p.guideUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-gradient inline-flex items-center gap-2 text-sm flex-1"
                              >
                                <span>Open Guide</span>
                              </a>
                            </div>
                          )}

                          <button
                            onClick={() => downloadProjectPdf(p)}
                            disabled={
                              downloadingProject === p.title || isLoading
                            }
                            className="btn-gradient inline-flex items-center gap-2 text-sm mt-2 flex-1"
                          >
                            {downloadingProject === p.title
                              ? "Downloading..."
                              : "Download Project PDF"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSuggestions;
