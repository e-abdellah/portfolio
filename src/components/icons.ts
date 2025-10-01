// Centralized SVG icons for reuse across the app
// Each function returns an inline SVG string that can be injected with set:html

function svg(attrs: string, content: string) {
  return `<svg ${attrs}>${content}</svg>`;
}

export function IconGithub(cls = "w-4 h-4"): string {
  return svg(
    `class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"`,
    '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>'
  );
}

export function IconExternal(cls = "w-4 h-4"): string {
  return svg(
    `class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"`,
    '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>'
  );
}

export function IconPDF(cls = "w-4 h-4"): string {
  return svg(
    `class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"`,
    '<path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/><path d="M12,11.5V13.5H13.5V12H14.5V11.5H12M8.5,11.5H7.5V14.5H8.5V13.25H9V12.75H8.5V11.5M10.5,11.5V14.5H12V14H11V11.5H10.5M15.5,12.25V12.75H16.5V13.25H15.5V14.5H17V11.5H15.5V12.25Z"/>'
  );
}

export function IconStar(cls = "w-4 h-4 text-yellow-500"): string {
  return svg(
    `class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"`,
    '<path d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.73L5.82 21z"/>'
  );
}

// Simple brand-styled LinkedIn badge icon
export function IconLinkedIn(cls = "w-4 h-4"): string {
  // Tighter padding and larger text so the "in" reads bigger at small sizes
  return svg(
    `class="${cls}" viewBox="0 0 24 24" fill="none" aria-hidden="true"`,
    // Slightly larger rounded square and bigger font-size
    `<rect x="0.5" y="0.5" width="23" height="23" rx="6" fill="#0A66C2" stroke="rgba(0,0,0,0.08)"/>` +
      `<text x="12" y="15" text-anchor="middle" font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="12" font-weight="800" fill="#FFFFFF">in</text>`
  );
}

type LangIconOpts = { cls?: string; rounded?: boolean };

export function iconForLanguage(
  language?: string | null,
  opts: LangIconOpts = {}
): string {
  const cls = opts.cls ?? "w-5 h-5";
  if (!language)
    return placeholderBadge("-", "#E5E7EB", "#374151", cls, opts.rounded);

  const lang = String(language).toLowerCase();
  // Map common languages to colored badge with short label
  const map: Record<string, { bg: string; fg: string; label: string }[]> = {
    typescript: [{ bg: "#3178C6", fg: "#ffffff", label: "TS" }],
    javascript: [{ bg: "#F7DF1E", fg: "#111827", label: "JS" }],
    java: [{ bg: "#EA2D2E", fg: "#ffffff", label: "Java" }],
    "c#": [{ bg: "#68217A", fg: "#ffffff", label: "C#" }],
    "c++": [{ bg: "#00599C", fg: "#ffffff", label: "C++" }],
    c: [{ bg: "#283593", fg: "#ffffff", label: "C" }],
    python: [{ bg: "#3776AB", fg: "#ffffff", label: "Py" }],
    go: [{ bg: "#00ADD8", fg: "#0B3C49", label: "Go" }],
    php: [{ bg: "#777BB4", fg: "#ffffff", label: "PHP" }],
    ruby: [{ bg: "#CC342D", fg: "#ffffff", label: "Rb" }],
    kotlin: [{ bg: "#7F52FF", fg: "#ffffff", label: "Kt" }],
    swift: [{ bg: "#F05138", fg: "#ffffff", label: "Sw" }],
    html: [{ bg: "#E34F26", fg: "#ffffff", label: "HTML" }],
    html5: [{ bg: "#E34F26", fg: "#ffffff", label: "HTML" }],
    css: [{ bg: "#1572B6", fg: "#ffffff", label: "CSS" }],
    css3: [{ bg: "#1572B6", fg: "#ffffff", label: "CSS" }],
    shell: [{ bg: "#111827", fg: "#F9FAFB", label: "sh" }],
    dart: [{ bg: "#0175C2", fg: "#ffffff", label: "Dart" }],
    rust: [{ bg: "#DEA584", fg: "#1F2937", label: "Rs" }],
    scala: [{ bg: "#DC322F", fg: "#ffffff", label: "Sc" }],
  };

  const entry = map[lang] || map[lang.replace(/\s+/g, "")];
  if (!entry)
    return placeholderBadge(language, "#E5E7EB", "#374151", cls, opts.rounded);
  const { bg, fg, label } = entry[0];
  return badge(label, bg, fg, cls, opts.rounded);
}

function badge(
  text: string,
  bg: string,
  fg: string,
  cls: string,
  rounded = true
): string {
  const radius = rounded ? 6 : 2;
  return svg(
    `class="${cls}" viewBox="0 0 24 24" fill="none" aria-hidden="true"`,
    `<rect x="1" y="1" width="22" height="22" rx="${radius}" fill="${bg}" stroke="rgba(0,0,0,0.08)"/><text x="12" y="14" text-anchor="middle" font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="9" font-weight="700" fill="${fg}">${escapeHtml(text)}</text>`
  );
}

function placeholderBadge(
  text: string,
  bg: string,
  fg: string,
  cls: string,
  rounded = true
): string {
  return badge(text, bg, fg, cls, rounded);
}

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] as string
  );
}
