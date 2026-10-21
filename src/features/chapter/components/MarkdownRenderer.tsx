import * as React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { cn } from "@/shared/lib/cn";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split("\n");
  const headings: Heading[] = [];
  let insideCodeFence = false;

  for (const line of lines) {
    if (line.trimStart().startsWith("```")) {
      insideCodeFence = !insideCodeFence;
      continue;
    }
    if (insideCodeFence) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, "").trim();
    headings.push({
      id: slugifyHeading(text),
      text,
      level: match[1].length,
    });
  }
  return headings;
}

/** Remove the leading H1 so the page can render its own header. */
function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+.+\n+/, "");
}

export function MarkdownRenderer({ markdown }: { markdown: string }) {
  const content = React.useMemo(() => stripLeadingH1(markdown), [markdown]);

  return (
    <div className="prose-nolsatu">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h2: ({ children, ...props }) => (
            <h2 id={slugifyHeading(toText(children))} {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 id={slugifyHeading(toText(children))} {...props}>
              {children}
            </h3>
          ),
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          a: ({ href, children, ...props }) => {
            const external = href?.startsWith("http");
            return (
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function toText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node))
    return toText(node.props.children);
  return "";
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLPreElement>(null);
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    const text = ref.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard diblokir browser → diamkan, user masih bisa memilih manual
    }
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => void copy()}
        className={cn(
          "absolute right-2 top-2 z-10 cursor-pointer rounded border px-2 py-1 font-mono text-[10px] font-semibold transition-colors",
          copied
            ? "border-success/40 bg-success-soft text-success-fg"
            : "border-surface-line bg-surface-raised text-on-surface-variant opacity-0 hover:text-on-surface group-hover:opacity-100 focus-visible:opacity-100",
        )}
        aria-label="Salin kode"
      >
        {copied ? "tersalin" : "salin"}
      </button>
      <pre ref={ref}>{children}</pre>
    </div>
  );
}
