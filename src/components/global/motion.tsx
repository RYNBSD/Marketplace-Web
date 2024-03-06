"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useSettings } from "~/context";

const fadeOpacity = () => {
  return {
    in: {},
    out: {},
  };
};

/**
 * in: ➡️ out: ➡️
 */
const fadeX = () => {};

/**
 * in: ⬅️ out: ⬅️
 */
const fadeXReverse = () => {};

/**
 * in: ⬆️ out: ⬆️
 */
const fadeY = () => {};

/**
 * in: ⬇️ out: ⬇️
 */
const fadeYReverse = () => {};

export default function Motion({ children, fade }: Props) {
  const { setting } = useSettings()!;
  return setting.disableAnimations ? (
    children
  ) : (
    <motion.div>{children}</motion.div>
  );
}

type Fade = "opacity" | "x" | "x-reverse" | "y" | "y-reverse";

type Props = {
  children: ReactNode;
  fade: Fade;
  element: HTMLElements;
};

type HTMLElements =
  | "a"
  | "abbr"
  | "address"
  | "area"
  | "article"
  | "aside"
  | "audio"
  | "b"
  | "base"
  | "bdi"
  | "bdo"
  | "big"
  | "blockquote"
  | "body"
  | "br"
  | "button"
  | "canvas"
  | "caption"
  | "cite"
  | "code"
  | "col"
  | "colgroup"
  | "data"
  | "datalist"
  | "dd"
  | "del"
  | "details"
  | "dfn"
  | "dialog"
  | "div"
  | "dl"
  | "dt"
  | "em"
  | "embed"
  | "fieldset"
  | "figcaption"
  | "figure"
  | "footer"
  | "form"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "head"
  | "header"
  | "hgroup"
  | "hr"
  | "html"
  | "i"
  | "iframe"
  | "img"
  | "input"
  | "ins"
  | "kbd"
  | "keygen"
  | "label"
  | "legend"
  | "li"
  | "link"
  | "main"
  | "map"
  | "mark"
  | "menu"
  | "menuitem"
  | "meta"
  | "meter"
  | "nav"
  | "noscript"
  | "object"
  | "ol"
  | "optgroup"
  | "option"
  | "output"
  | "p"
  | "param"
  | "picture"
  | "pre"
  | "progress"
  | "q"
  | "rp"
  | "rt"
  | "ruby"
  | "s"
  | "samp"
  | "script"
  | "section"
  | "select"
  | "small"
  | "source"
  | "span"
  | "strong"
  | "style"
  | "sub"
  | "summary"
  | "sup"
  | "table"
  | "tbody"
  | "td"
  | "textarea"
  | "tfoot"
  | "th"
  | "thead"
  | "time"
  | "title"
  | "tr"
  | "track"
  | "u"
  | "ul"
  | "var"
  | "video"
  | "wbr"
  | "webview";
