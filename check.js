#!/usr/bin/env node
/* check.js - the guard rails for the concept pages.
   Run it with:  node check.js
   Every check here exists because something once broke in exactly that way.

   The structural checks need nothing but node. The DOM checks need jsdom, and
   are skipped with a note if it is not installed (npm i --no-save jsdom). */

const fs = require("fs"), vm = require("vm"), path = require("path");
const P = __dirname + path.sep;
let fails = 0;
const ok   = (name, detail) => console.log("  ok    " + name.padEnd(16) + detail);
const bad  = (name, detail) => { fails++; console.log("  FAIL  " + name.padEnd(16) + detail); };
const test = (name, pass, detail) => (pass ? ok : bad)(name, detail);

/* ---------- load the data the same way a browser would ---------- */
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(P + "viz.js", "utf8") + "\n;globalThis.V=VIZ;globalThis.D=DRAW;", ctx);
vm.runInContext(fs.readFileSync(P + "concept-data.js", "utf8") + "\n;globalThis.C=CONCEPTS;", ctx);
const CONCEPTS = ctx.C, VIZ = ctx.V, DRAW = ctx.D;

/* ---------- 1. every concept has every field, and points at real visuals ---------- */
{
  // `see` is optional: not every concept has an outside link worth keeping
  const FIELDS = ["id","n","group","one","plain","why","hing","viz","costs",
                  "traps","impl","code","codecap","q","p"];
  const problems = [];
  const ids = new Set();
  for (const c of CONCEPTS) {
    const missing = FIELDS.filter(f => !(f in c) || (Array.isArray(c[f]) && !c[f].length));
    if (missing.length) problems.push(c.id + " missing " + missing.join("/"));
    if (ids.has(c.id)) problems.push("duplicate id " + c.id);
    ids.add(c.id);
    const langs = Object.keys(c.code || {});
    if (langs.length !== 5) problems.push(c.id + " has " + langs.length + " code tabs");
    (c.viz || []).forEach(v => { if (!VIZ[v]) problems.push(c.id + " points at missing visual " + v); });
    if (c.why.length < 5) problems.push(c.id + " has only " + c.why.length + " reasoning steps");
    if (c.q.length < 5)   problems.push(c.id + " has only " + c.q.length + " questions");
  }
  test("structure", problems.length === 0,
    CONCEPTS.length + " concepts, " + CONCEPTS.reduce((a,c)=>a+c.q.length,0) + " questions" +
    (problems.length ? "   <-- " + problems.slice(0,4).join("; ") : ""));
}

/* ---------- 2. every visual renders, and no label escapes its box ---------- */
{
  let frames = 0, labels = 0;
  const spills = [], broken = [];
  const RX = /<rect [^>]*width="([0-9.]+)"[^>]*\/><text [^>]*?(?:font-size:([0-9.]+)px)?[^>]*>([^<]*)<\/text>/g;
  for (const [id, spec] of Object.entries(VIZ)) for (const f of spec.frames) {
    const svg = DRAW[spec.kind](spec, f);
    frames++;
    if (/NaN|undefined/.test(svg) || !svg.startsWith("<svg")) broken.push(id);
    let m; RX.lastIndex = 0;
    while ((m = RX.exec(svg))) {
      const w = +m[1], size = m[2] ? +m[2] : 14, label = m[3];
      if (!label.trim()) continue;
      labels++;
      if (0.62 * size * label.length > w - 2) spills.push(id + ': "' + label + '"');
    }
  }
  test("visuals", broken.length === 0 && spills.length === 0,
    Object.keys(VIZ).length + " visuals, " + frames + " frames, " + labels + " labels fitted" +
    (spills.length ? "   <-- spilling: " + spills.slice(0,3).join(", ") : "") +
    (broken.length ? "   <-- broken: " + broken.join(", ") : ""));
}

/* ---------- 3. the visuals are painted with variables the stylesheet defines ---------- */
{
  const viz = fs.readFileSync(P + "viz.js", "utf8");
  const css = fs.readFileSync(P + "learn.css", "utf8");
  const cut = css.indexOf('[data-theme="dark"]');
  const light = css.slice(0, cut), dark = css.slice(cut);
  const wanted = [...new Set([...viz.matchAll(/var\(--([a-z0-9-]+)\)/g)].map(m => m[1]))];
  const missing = wanted.filter(v => !light.includes("--" + v + ":") || !dark.includes("--" + v + ":"));
  test("viz colours", missing.length === 0,
    wanted.length + " variables, all defined in both themes" +
    (missing.length ? "   <-- undefined: " + missing.join(", ") : ""));
}

/* ---------- 4. code blocks: width, and no backtick that would end the literal ---------- */
{
  const LIMIT = 88;
  const wide = [], quoted = [];
  CONCEPTS.forEach(c => Object.entries(c.code).forEach(([lang, src]) => {
    if (src.includes("`")) quoted.push(c.id + "/" + lang);
    src.split("\n").forEach(l => { if (l.length > LIMIT) wide.push(c.id + "/" + lang + " (" + l.length + ")"); });
  }));
  const lines = CONCEPTS.reduce((a,c)=>a+Object.values(c.code).reduce((b,s)=>b+s.split("\n").length,0),0);
  test("code", wide.length === 0 && quoted.length === 0,
    lines + " lines, all within " + LIMIT + " columns" +
    (wide.length ? "   <-- too wide: " + wide.slice(0,3).join(", ") : "") +
    (quoted.length ? "   <-- stray backtick: " + quoted.join(", ") : ""));
}

/* ---------- 5. no escape sequence may survive into the rendered text ----------
   A quoted heredoc once turned \u00b2 into a literal backslash-u-0-0-b-2, which
   the page then printed at the reader instead of a superscript two. */
{
  const hits = [];
  const scan = (obj, path) => {
    if (typeof obj === "string") {
      const m = obj.match(/\\u[0-9a-fA-F]{4}|\\n|\\t/);
      if (m) hits.push(path + ' shows "' + m[0] + '"');
    } else if (obj && typeof obj === "object") {
      for (const k in obj) scan(obj[k], path + "." + k);
    }
  };
  scan(CONCEPTS, "concept"); scan(VIZ, "visual");
  test("escapes", hits.length === 0,
    "no literal escape sequences reach the page" +
    (hits.length ? "   <-- " + hits.slice(0, 3).join("; ") : ""));
}

/* ---------- 5. house style: no em-dashes anywhere we author ---------- */
{
  const DASH = String.fromCharCode(0x2014);   // written this way so this file passes its own test
  const OURS = ["concept-data.js","viz.js","concept.html","revise.html","learn.css",
                "CONTENT-GUIDE.md","README.md","index.html","ai.html","check.js"];
  const guilty = OURS.filter(f => fs.existsSync(P + f) && fs.readFileSync(P + f, "utf8").includes(DASH));
  test("house style", guilty.length === 0,
    "no em-dashes across " + OURS.length + " files" +
    (guilty.length ? "   <-- " + guilty.join(", ") : ""));
}

/* ---------- 6. the complexity curves must leave the chart in the right order ---------- */
{
  const CURVES = ctx.CURVES || null;
  const spec = VIZ["big-o"];
  const svg = DRAW.curve(spec, spec.frames[spec.frames.length - 1]);
  const ys = [...svg.matchAll(/<text x="[0-9.]+" y="([0-9.]+)"[^>]*font-weight:600/g)].map(m => +m[1]);
  let collisions = 0;
  ys.forEach((a, i) => ys.slice(i + 1).forEach(b => { if (Math.abs(a - b) < 14) collisions++; }));
  test("curve labels", collisions === 0, ys.length + " labels on the final frame, none overlapping");
}

/* ---------- 7. the DOM checks, if jsdom happens to be available ---------- */
let JSDOM = null;
try { ({ JSDOM } = require("jsdom")); } catch (e) {}
if (!JSDOM) {
  console.log("  skip  dom             jsdom not installed (npm i --no-save jsdom to enable)");
} else {
  const render = (file, url) => {
    let html = fs.readFileSync(P + file, "utf8")
      .replace(/<script src="([^"]+)"><\/script>/g, (m, src) =>
        src.startsWith("http") ? "" : "<script>\n" + fs.readFileSync(P + src, "utf8") + "\n</script>")
      .replace(/<link rel="stylesheet" href="([^"]+)" \/>/g, (m, href) =>
        href.startsWith("http") ? "" : "<style>\n" + fs.readFileSync(P + href, "utf8") + "\n</style>");
    const errs = [];
    const { VirtualConsole } = require("jsdom");
    const vc = new VirtualConsole();
    vc.on("jsdomError", e => errs.push(e.message.split("\n")[0]));
    const dom = new JSDOM(html, { runScripts: "dangerously", url: "http://localhost/" + url,
      virtualConsole: vc,
      beforeParse(w) { w.matchMedia = () => ({ matches: false, addListener(){}, removeListener(){} }); } });
    return { d: dom.window.document, w: dom.window, errs };
  };

  const problems = [];
  for (const c of CONCEPTS) {
    const { d, w, errs } = render("concept.html", "concept.html?c=" + c.id);
    const n = s => d.querySelectorAll(s).length;
    if (errs.length) problems.push(c.id + ": " + errs[0]);
    const expectSections = 9 + (c.variants ? 1 : 0);
    if (n(".rung") !== expectSections)
      problems.push(c.id + ": " + n(".rung") + " sections, expected " + expectSections);
    if (n(".langtabs button") !== 5) problems.push(c.id + ": " + n(".langtabs button") + " code tabs");
    if (!n(".vizstage svg")) problems.push(c.id + ": no visual rendered");
    if (n(".nav-list a") !== CONCEPTS.length) problems.push(c.id + ": sidebar out of step");
    if (n("input[type=checkbox]") || n(".ptrack")) problems.push(c.id + ": progress tracking is back");
    // inline markup inside prose must stay inline, or sentences shatter across lines
    d.querySelectorAll(".body p, .chain li div, .hing, .oneline, .traps li").forEach(host =>
      host.querySelectorAll("b, i, em, code, span").forEach(e => {
        const disp = w.getComputedStyle(e).display;
        if (disp && disp !== "inline" && disp !== "inline-block")
          problems.push(c.id + ": <" + e.tagName.toLowerCase() + "> renders as " + disp);
      }));
    const codeEl = d.querySelector("pre.code code");
    if (!codeEl || codeEl.textContent.split("\n").length < 5)
      problems.push(c.id + ": code block collapsed");
  }
  test("concept pages", problems.length === 0,
    CONCEPTS.length + " pages render, all sections present" +
    (problems.length ? "   <-- " + problems.slice(0,3).join("; ") : ""));

  const { d, w, errs } = render("revise.html", "revise.html");
  const entries = d.querySelectorAll(".entry").length;
  const qs = d.querySelectorAll(".qa").length;
  d.querySelector("#toggleAll").dispatchEvent(new w.Event("click"));
  const opened = [...d.querySelectorAll(".qa")].filter(e => e.classList.contains("open")).length;
  test("revision page", entries === CONCEPTS.length && qs === opened && !errs.length,
    entries + " entries, " + qs + " questions, all open on demand");
}

console.log(fails ? "\n" + fails + " FAILED" : "\nall checks passed");
process.exit(fails ? 1 : 0);
