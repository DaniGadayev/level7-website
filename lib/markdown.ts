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
      // Layout & embeds (pipeline-generated content — admin-only writes)
      "div",
      "iframe",
      // SVG for pipeline-generated infographics
      "svg", "rect", "text", "line", "path", "polyline", "circle",
      "g", "defs", "linearGradient", "stop",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel", "id", "class", "name"],
      img: ["src", "alt", "title", "width", "height"],
      code: ["class"],
      span: ["class", "style"],
      th: ["align"],
      td: ["align"],
      ol: ["start"],
      li: ["value", "id", "class"],
      sup: ["id", "class"],
      section: ["class", "id"],
      input: ["type", "checked", "disabled"],
      div: ["class", "style"],
      // iframe: src restricted to YouTube via exclusiveFilter below
      iframe: ["src", "width", "height", "title", "frameborder", "allow", "allowfullscreen", "style"],
      // SVG attributes
      svg: ["viewBox", "xmlns", "width", "height", "style", "fill", "stroke"],
      rect: ["x", "y", "width", "height", "fill", "rx", "ry", "stroke", "stroke-width", "opacity"],
      text: ["x", "y", "text-anchor", "fill", "font-size", "font-weight", "letter-spacing", "font-family"],
      line: ["x1", "y1", "x2", "y2", "stroke", "stroke-width"],
      path: ["d", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin"],
      polyline: ["points", "fill", "stroke", "stroke-width"],
      circle: ["cx", "cy", "r", "fill", "stroke", "stroke-width"],
      g: ["transform", "fill", "stroke"],
      defs: [],
      linearGradient: ["id", "x1", "y1", "x2", "y2"],
      stop: ["offset", "stop-color", "stop-opacity"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      // Only allow YouTube and youtube-nocookie iframes
      iframe: ["https"],
    },
    exclusiveFilter(frame) {
      // Strip iframes that aren't YouTube embeds
      if (frame.tag === "iframe") {
        const src = frame.attribs?.src ?? "";
        return !src.startsWith("https://www.youtube.com/embed/") &&
               !src.startsWith("https://www.youtube-nocookie.com/embed/");
      }
      return false;
    },
    transformTags: {
      h1: "h2",
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
    allowVulnerableTags: false,
  });

  // Wrap tables so wide ones scroll horizontally instead of overflowing on mobile.
  // (Done post-sanitize; marked emits bare <table> with no attributes.)
  return clean
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, "</table></div>");
}
