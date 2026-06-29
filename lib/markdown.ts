import { marked } from "marked";
import markedFootnote from "marked-footnote";
import sanitizeHtml from "sanitize-html";

marked.setOptions({ gfm: true, breaks: false });
marked.use(markedFootnote());

// Render Markdown → HTML, then sanitize. AI-generated content is untrusted:
// strip <script>, event handlers, javascript: URLs, etc.
export function renderMarkdown(md: string): string {
  const rawHtml = marked.parse(md ?? "", { async: false }) as string;
  const clean = sanitizeHtml(rawHtml, {
    allowedTags: [
      "h2", "h3", "h4", "h5", "h6", // h1 is downgraded to h2 below (page title is the only h1)
      "p", "a", "ul", "ol", "li", "blockquote", "code", "pre",
      "strong", "em", "del", "hr", "br",
      "table", "thead", "tbody", "tr", "th", "td",
      "img", "figure", "figcaption", "span",
      "sup", "sub", "section", "input", // sup/section: footnotes; input: task-list checkboxes
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel", "id", "class", "name"],
      img: ["src", "alt", "title", "width", "height"],
      code: ["class"],
      span: ["class"],
      th: ["align"],
      td: ["align"],
      ol: ["start"],            // preserve numbered-list start (e.g. 3. 4. 5.)
      li: ["value", "id", "class"],
      sup: ["id", "class"],
      section: ["class", "id"],
      input: ["type", "checked", "disabled"], // GFM task lists (rendered read-only)
    },
    allowedSchemes: ["http", "https", "mailto"],
    // "#fn1" footnote anchors are relative (no scheme) and pass by default.
    transformTags: {
      // A body "# Heading" would create a second <h1> (the page title is the h1).
      h1: "h2",
      // Force external links to open safely.
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          ...(attribs.href && /^https?:\/\//.test(attribs.href)
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {}),
        },
      }),
    },
    // Allow read-only checkbox inputs to survive (they have no name/value to submit).
    allowVulnerableTags: false,
  });

  // Wrap tables so wide ones scroll horizontally instead of overflowing on mobile.
  // (Done post-sanitize; marked emits bare <table> with no attributes.)
  return clean
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, "</table></div>");
}
