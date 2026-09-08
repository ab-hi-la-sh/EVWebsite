#!/usr/bin/env python3
"""Port one page of the old static export into Hugo.

Splits an old .html file into:
  content/<dest>.md              frontmatter + the <main> body
  assets/css/pages/<name>.css    the page's inline <style> block (if any)
  assets/js/pages/<name>.js      the page's inline <script> block (if any)

and rewrites every old .html link / relative asset path to the new clean URL.

Usage:
  port_page.py <old-html-relative-path> <content-dest> [--styles a.css,b.css]

  port_page.py vault/overview.html vault/overview.md --styles vaults.css
"""
import argparse
import html
import pathlib
import re
import sys

SRC = pathlib.Path(
    "/private/tmp/claude-501/-Users-omarsheriff-Desktop-piperocket-site/"
    "e7aac88f-51d0-40b6-9119-1fe0e57b1bfa/scratchpad/enigma/site-export"
)
DST = pathlib.Path("/Users/omarsheriff/Desktop/enigma-hugo")

# Old path -> new clean URL. Anything not listed keeps its resolved path.
URL_MAP = {
    "index.html": "/",
    "pricing.html": "/pricing/",
    "contact.html": "/contact/",
    "request-demo.html": "/request-demo/",
    "login.html": "/login/",
    "company/about.html": "/company/about/",
    "solutions/industries/index.html": "/solutions/industries/",
    "resources/blog.html": "/resources/blog/",
    "resources/docs.html": "/resources/docs/",
    # the one real article; the other 14 in blog-data.js were never published
    "resources/article.html": "/resources/blog/confident-wrong-answer/",
}
for _section in ("platform", "triplets", "nopii", "vault"):
    for _p in SRC.glob(f"{_section}/*.html"):
        URL_MAP[f"{_section}/{_p.stem}.html"] = f"/{_section}/{_p.stem}/"


def resolve(href: str, page_dir: str) -> str:
    """Resolve an href written relative to page_dir, then map it to a clean URL."""
    if not href or href.startswith(("#", "http://", "https://", "mailto:", "tel:", "/")):
        return href

    frag = ""
    if "#" in href:
        href, frag = href.split("#", 1)
        frag = "#" + frag
    if not href:
        return frag

    parts = [p for p in (page_dir.split("/") if page_dir else [])]
    for seg in href.split("/"):
        if seg == "..":
            if parts:
                parts.pop()
        elif seg not in (".", ""):
            parts.append(seg)
    path = "/".join(parts)

    if path in URL_MAP:
        return URL_MAP[path] + frag
    return "/" + path + frag


def rewrite(markup: str, page_dir: str) -> str:
    def sub(m):
        attr, quote, val = m.group(1), m.group(2), m.group(3)
        return f'{attr}={quote}{resolve(val, page_dir)}{quote}'

    return re.sub(r'\b(href|src|poster|data-bg)=(["\'])([^"\']*)\2', sub, markup)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("source")
    ap.add_argument("dest")
    ap.add_argument("--styles", default="")
    ap.add_argument("--title", default="")
    args = ap.parse_args()

    src = SRC / args.source
    if not src.exists():
        sys.exit(f"no such page: {src}")
    raw = src.read_text()
    page_dir = str(pathlib.PurePosixPath(args.source).parent)
    page_dir = "" if page_dir == "." else page_dir
    name = pathlib.PurePosixPath(args.dest).with_suffix("").as_posix().replace("/", "-")

    head = raw.split("</head>", 1)[0]

    def meta(pattern, default=""):
        m = re.search(pattern, head)
        return html.unescape(m.group(1)) if m else default

    meta_title = meta(r"<title>(.*?)</title>")
    desc = meta(r'<meta name="description" content="(.*?)">')
    og_image = meta(r'<meta property="og:image" content="(.*?)">')
    og_alt = meta(r'<meta property="og:image:alt" content="(.*?)">')
    if og_image:
        og_image = re.sub(r"^https?://[^/]+", "", og_image)

    # page-scoped <style> from <head>
    styles = [s.strip() for s in args.styles.split(",") if s.strip()]
    css_blocks = re.findall(r"<style>(.*?)</style>", head, re.S)
    if css_blocks:
        out = DST / "assets/css/pages" / f"{name}.css"
        out.parent.mkdir(parents=True, exist_ok=True)
        body = "\n".join(b.strip() for b in css_blocks)
        out.write_text(f"/* {args.source} — page-scoped styles */\n{body}\n")
        styles.append(f"pages/{name}.css")

    # <main> body
    m = re.search(r"<main>(.*?)</main>", raw, re.S)
    if not m:
        sys.exit(f"{args.source}: no <main> block found")
    body = rewrite(m.group(1).strip(), page_dir)

    # page-scoped inline <script> from <body> (skip GTM, which the partial owns)
    after_main = raw.split("</main>", 1)[1]
    scripts = []
    js_blocks = [
        b for b in re.findall(r"<script>(.*?)</script>", after_main, re.S)
        if "gtm.start" not in b and "initBlogArticle" not in b
    ]
    if js_blocks:
        out = DST / "assets/js/pages" / f"{name}.js"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(
            f"/* {args.source} — page-scoped behaviour */\n"
            + "\n".join(b.strip() for b in js_blocks) + "\n"
        )
        scripts.append(f"pages/{name}.js")

    def yq(s):
        return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'

    fm = ["---"]
    fm.append(f"title: {yq(args.title or meta_title.split(' | ')[0])}")
    fm.append(f"metaTitle: {yq(meta_title)}")
    fm.append(f"description: {yq(desc)}")
    if og_image:
        fm.append(f"ogImage: {yq(og_image)}")
    if og_alt:
        fm.append(f"ogImageAlt: {yq(og_alt)}")
    if styles:
        fm.append("styles: [" + ", ".join(yq(s) for s in styles) + "]")
    if scripts:
        fm.append("scripts: [" + ", ".join(yq(s) for s in scripts) + "]")
    fm.append("---")

    dest = DST / "content" / args.dest
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text("\n".join(fm) + "\n\n" + body + "\n")

    print(f"{args.source} -> content/{args.dest}")
    print(f"  styles:  {styles or '-'}")
    print(f"  scripts: {scripts or '-'}")


if __name__ == "__main__":
    main()
