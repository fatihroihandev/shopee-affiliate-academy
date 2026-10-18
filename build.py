#!/usr/bin/env python3
"""
Membangun situs statis (HTML + CSS) dari folder `sumber-markdown/`.

Cara pakai:
    pip install markdown
    python build.py

Hasilnya (file .html) ditulis ke folder yang sama dengan skrip ini,
jadi folder ini bisa langsung diunggah ke GitHub Pages.
"""
import html
import json
import os
import re
import unicodedata
from pathlib import Path
from urllib.parse import unquote

import markdown

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "sumber-markdown"
SITE_NAME = "Shopee Affiliate Academy"

# ---------------------------------------------------------------- utilitas


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii").lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text or "bagian"


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def strip_hash(name: str) -> str:
    return re.sub(r" [0-9a-f]{32}(?=\.md$)", "", name)


# ---------------------------------------------------------------- peta halaman

SPECIAL = {
    "Shopee Affiliate V2.md": ("index.html", "Beranda"),
    "shopee affiliate master.md": ("master.html", "Rangkuman Master"),
    "8 Project Praktik Wajib.md": ("proyek-praktik.html", "8 Project Praktik Wajib"),
    "Database Notion yang Wajib Dibangun.md": ("database-notion.html", "Database Notion"),
    "Kamus Istilah.md": ("kamus-istilah.html", "Kamus Istilah"),
    "Lembar Rumus dan Template.md": ("rumus-template.html", "Lembar Rumus dan Template"),
    "Studi Kasus Simulasi.md": ("studi-kasus.html", "Studi Kasus Simulasi"),
    "Panduan Pelatih dan Penilaian.md": ("panduan-pelatih.html", "Panduan Pelatih dan Penilaian"),
}

LEVEL_INFO = {
    1: ("Fundamentals", "Dasar affiliate, aturan program Shopee, dan persiapan akun."),
    2: ("Market and Product Research", "Riset pasar, niche dan audiens, evaluasi produk, dan kompetitor."),
    3: ("Content and Traffic", "Channel, strategi konten, hook, video, SEO, dan kepercayaan audiens."),
    4: ("Conversion and Analytics", "Link dan tracking, optimasi konversi, dashboard, dan eksperimen."),
    5: ("Professional Growth", "Monetisasi, keuangan, scaling, kepatuhan, otomasi, dan evaluasi bisnis."),
}


class Page:
    def __init__(self, src: Path):
        self.src = src
        self.name = strip_hash(src.name)
        self.md = read(src)
        m = re.search(r"^# (.+)$", self.md, re.M)
        self.title = m.group(1).strip() if m else self.name[:-3]
        self.kind = "umum"
        self.level = None
        self.number = None
        if self.name in SPECIAL:
            self.out, self.nav_title = SPECIAL[self.name]
            self.kind = "index" if self.out == "index.html" else "lampiran"
        elif self.name.startswith("LEVEL "):
            self.level = int(self.name.split()[1])
            self.out = f"level-{self.level}.html"
            self.nav_title = f"Level {self.level} — {LEVEL_INFO[self.level][0]}"
            self.kind = "level"
        elif self.name.startswith("Modul "):
            self.number = int(re.match(r"Modul (\d+)", self.name).group(1))
            stem = re.sub(r"^Modul \d+\s*[—:\-]?\s*", "", self.name[:-3])
            self.out = f"modul/modul-{self.number:02d}-{slugify(stem)}.html"
            self.nav_title = re.sub(r"^Modul (\d+)\s*[—:]\s*", r"\1. ", self.title)
            self.kind = "modul"
            self.level = (
                1 if self.number <= 3 else 2 if self.number <= 7 else 3 if self.number <= 13
                else 4 if self.number <= 17 else 5
            )
        else:
            raise SystemExit(f"File tidak dikenal: {src}")
        self.depth = self.out.count("/")
        self.root = "../" * self.depth


pages = [Page(p) for p in sorted(SRC.rglob("*.md"))]
by_name = {p.name: p for p in pages}


def get(name: str) -> Page:
    return by_name[name]


levels = {n: next(p for p in pages if p.kind == "level" and p.level == n) for n in range(1, 6)}
modules = sorted([p for p in pages if p.kind == "modul"], key=lambda p: p.number)

# urutan baca (untuk tombol sebelumnya / berikutnya)
sequence = [get("Shopee Affiliate V2.md")]
for n in range(1, 6):
    sequence.append(levels[n])
    sequence += [m for m in modules if m.level == n]
for nm in ["8 Project Praktik Wajib.md", "Database Notion yang Wajib Dibangun.md", "Kamus Istilah.md",
           "Lembar Rumus dan Template.md", "Studi Kasus Simulasi.md", "Panduan Pelatih dan Penilaian.md",
           "shopee affiliate master.md"]:
    sequence.append(get(nm))

# ---------------------------------------------------------------- markdown -> html

CALLOUT_WARN = re.compile(r"^\s*<p>\s*<strong>\s*(Penting|Ingat|Peringatan|Baca ini dulu|Catatan penting)", re.I)


def prepare_md(page: Page) -> str:
    text = page.md

    # tulis ulang link antar-halaman (.md -> .html)
    def fix_link(m):
        label, target = m.group(1), m.group(2)
        if target.startswith("http"):
            return m.group(0)
        base = strip_hash(os.path.basename(unquote(target)))
        if base in by_name:
            return f"[{label}]({page.root}{by_name[base].out})"
        return m.group(0)

    text = re.sub(r"\[([^\]]+)\]\((.+?\.md)\)", fix_link, text)

    # URL polos -> bisa diklik
    text = re.sub(r"(?<![(\[<\"'])(https?://[^\s<>)\]]+[^\s<>)\].,;:])", r"<\1>", text)
    return text


def convert(page: Page):
    md = markdown.Markdown(
        extensions=["tables", "fenced_code", "toc", "sane_lists", "attr_list"],
        extension_configs={"toc": {"slugify": lambda v, s: slugify(v), "toc_depth": "2-3"}},
    )
    body = md.convert(prepare_md(page))

    # kotak catatan
    def callout(m):
        inner = m.group(1)
        cls = "callout warn" if CALLOUT_WARN.match(inner) else "callout"
        return f'<blockquote class="{cls}">{inner}</blockquote>'

    body = re.sub(r"<blockquote>(.*?)</blockquote>", callout, body, flags=re.S)

    # tabel responsif
    body = body.replace("<table>", '<div class="table-wrap"><table>').replace("</table>", "</table></div>")

    # checklist interaktif
    counter = {"n": 0}

    def task(m):
        counter["n"] += 1
        checked = " checked" if m.group(1).lower() == "x" else ""
        key = f"{page.out}#{counter['n']}"
        return (f'<li class="task"><label><input type="checkbox" data-key="{html.escape(key)}"{checked}> '
                f'<span>{m.group(2)}</span></label></li>')

    body = re.sub(r"<li>\s*\[( |x|X)\]\s*((?:(?!</?li>).)*?)</li>", task, body, flags=re.S)
    return body, md.toc_tokens


def plain(md_text: str) -> str:
    t = re.sub(r"```.*?```", " ", md_text, flags=re.S)
    t = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", t)
    t = re.sub(r"[|*_`>#]", " ", t)
    t = re.sub(r"-{3,}", " ", t)
    t = re.sub(r"\s+", " ", t)
    return t.strip()


def first_paragraph(md_text: str) -> str:
    for block in re.split(r"\n\s*\n", md_text):
        b = block.strip()
        if b and not b.startswith(("#", "|", "-", ">", "[", "```", "*", "1.")):
            return plain(b)[:200]
    return ""


# ---------------------------------------------------------------- templat

ICON = {
    "home": '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>',
    "grid": '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    "search": '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    "next": '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    "menu": '<path d="M4 6h16M4 12h16M4 18h16"/>',
    "close": '<path d="M6 6l12 12M18 6 6 18"/>',
    "up": '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
    "text": '<path d="M4 20 10 5l6 15"/><path d="M6.5 14.5h7"/><path d="M15 12h5M17.5 12v8"/>',
    "focus": '<path d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4"/>',
}


def icon(name: str, size: int = 22) -> str:
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
            f'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICON[name]}</svg>')


def sidebar_html(current: Page) -> str:
    def link(p: Page, label=None):
        cur = ' aria-current="page"' if p is current else ""
        return (f'<a href="{current.root}{p.out}" data-page="{p.out}"{cur}>'
                f'<span>{html.escape(label or p.nav_title)}</span></a>')

    out = ['<nav class="sidebar" id="sidebar" aria-label="Navigasi materi">']
    out.append('<div class="nav-group">')
    out.append(link(get("Shopee Affiliate V2.md"), "Beranda dan Pengantar"))
    out.append(link(get("shopee affiliate master.md"), "Rangkuman Master"))
    out.append("</div>")
    for n in range(1, 6):
        lv = levels[n]
        mods = [x for x in modules if x.level == n]
        open_attr = " open" if (current.level == n) else ""
        out.append(f'<details class="nav-level" data-mods="{",".join(m.out for m in mods)}"{open_attr}>'
                   f'<summary><span class="lv-badge">{n}</span><span class="lv-name">{html.escape(LEVEL_INFO[n][0])}</span>'
                   f'<span class="lv-count">0/{len(mods)}</span></summary>')
        out.append(link(lv, "Ringkasan level"))
        for m in mods:
            out.append(link(m, f"Modul {m.number:02d} — {re.sub(r'^Modul \d+\s*[—:]\s*', '', m.title)}"))
        out.append("</details>")
    out.append('<div class="nav-group"><p class="nav-label">Praktik</p>')
    out.append(link(get("8 Project Praktik Wajib.md")))
    out.append(link(get("Database Notion yang Wajib Dibangun.md")))
    out.append("</div>")
    out.append('<div class="nav-group"><p class="nav-label">Lampiran</p>')
    for nm in ["Kamus Istilah.md", "Lembar Rumus dan Template.md", "Studi Kasus Simulasi.md",
               "Panduan Pelatih dan Penilaian.md"]:
        out.append(link(get(nm)))
    out.append("</div></nav>")
    return "\n".join(out)


def breadcrumb(page: Page) -> str:
    parts = [f'<a href="{page.root}index.html">Beranda</a>']
    if page.kind == "modul":
        lv = levels[page.level]
        parts.append(f'<a href="{page.root}{lv.out}">Level {page.level}</a>')
        parts.append(f"Modul {page.number:02d}")
    elif page.kind == "level":
        parts.append(f"Level {page.level}")
    elif page.kind == "lampiran":
        parts.append(html.escape(page.nav_title))
    return '<nav class="crumbs" aria-label="Jejak halaman">' + " <span>/</span> ".join(parts) + "</nav>"


def toc_items(tokens):
    return [(h2["id"], re.sub(r"^\d+\.\s*", "", h2["name"])) for h2 in tokens]


def toc_html(tokens) -> str:
    items = toc_items(tokens)
    if len(items) < 3:
        return ""
    lis = "".join(f'<li><a href="#{i}">{html.escape(n)}</a></li>' for i, n in items)
    return f'<aside class="toc" aria-label="Isi halaman"><p class="toc-title">Di halaman ini</p><ol>{lis}</ol></aside>'


def toc_mobile_html(tokens) -> str:
    items = toc_items(tokens)
    if len(items) < 3:
        return ""
    lis = "".join(f'<li><a href="#{i}">{html.escape(n)}</a></li>' for i, n in items)
    return f'<details class="toc-mobile"><summary>Di halaman ini</summary><ol>{lis}</ol></details>'


def neighbours(page: Page):
    if page not in sequence:
        return None, None
    i = sequence.index(page)
    return (sequence[i - 1] if i > 0 else None), (sequence[i + 1] if i < len(sequence) - 1 else None)


def prev_next(page: Page) -> str:
    if page.out == "master.html":
        return ""
    prev_p, next_p = neighbours(page)
    out = ['<nav class="pager" aria-label="Halaman sebelumnya dan berikutnya">']
    if prev_p:
        out.append(f'<a class="prev" href="{page.root}{prev_p.out}"><small>← Sebelumnya</small>'
                   f'<span>{html.escape(prev_p.nav_title)}</span></a>')
    if next_p:
        out.append(f'<a class="next" href="{page.root}{next_p.out}"><small>Berikutnya →</small>'
                   f'<span>{html.escape(next_p.nav_title)}</span></a>')
    out.append("</nav>")
    return "".join(out)


def level_progress_attr(n: int) -> str:
    return ",".join(m.out for m in modules if m.level == n)


def home_cards(page: Page) -> str:
    cards = ['<section class="cards" aria-label="Level belajar">']
    for n in range(1, 6):
        mods = [m for m in modules if m.level == n]
        rng = f"Modul {mods[0].number:02d}–{mods[-1].number:02d}"
        cards.append(
            f'<a class="card reveal" href="{page.root}{levels[n].out}" data-mods="{level_progress_attr(n)}">'
            f'<span class="card-num">Level {n}</span><strong>{html.escape(LEVEL_INFO[n][0])}</strong>'
            f"<p>{html.escape(LEVEL_INFO[n][1])}</p>"
            f'<span class="card-bar"><i></i></span>'
            f'<span class="card-meta">{rng} · <em class="cm-done">0</em>/{len(mods)} selesai</span></a>'
        )
    cards.append("</section>")
    return "".join(cards)


def hero_html(page: Page) -> str:
    first = modules[0]
    all_mods = ",".join(m.out for m in modules)
    return (
        '<section class="hero">'
        '<span class="blob b1" aria-hidden="true"></span><span class="blob b2" aria-hidden="true"></span>'
        '<div class="hero-text"><span class="hero-badge">Materi pelatihan lengkap</span>'
        "<h1>Shopee Affiliate V2</h1>"
        "<p>Panduan dari pemula sampai profesional. Belajar memilih produk, membuat konten, "
        "dan mengukur hasil dengan data.</p>"
        f'<div class="hero-cta"><a class="btn btn-light" href="{page.root}{first.out}">Mulai dari Modul 01</a>'
        f'<a class="btn btn-outline" href="{page.root}master.html">Lihat rangkuman</a></div></div>'
        '<ul class="hero-stats"><li><b data-count="5">5</b><span>Level</span></li>'
        '<li><b data-count="24">24</b><span>Modul</span></li>'
        '<li><b data-count="8">8</b><span>Proyek</span></li><li><b data-count="6">6</b><span>Database</span></li></ul>'
        "</section>"
        '<a class="resume-card" id="resume" href="#" hidden><span class="rc-label">Lanjutkan membaca</span>'
        '<strong class="rc-title"></strong><span class="rc-meta"></span></a>'
        f'<section class="progress-card" data-modules="{all_mods}" aria-live="polite">'
        '<div class="pc-top"><strong>Progres belajarmu</strong><span class="pc-text">0 dari 24 modul selesai</span></div>'
        '<div class="pc-bar"><i></i></div>'
        '<p class="pc-hint">Tandai modul selesai di akhir tiap modul. Progres tersimpan di browser ini.</p></section>'
    )


def link_cards(body: str) -> str:
    """Paragraf yang hanya berisi satu link internal menjadi kartu tautan."""
    run_re = re.compile(r'((?:<p><a href="[^"#:]+\.html">.*?</a></p>\s*)+)')

    def run(m):
        items = re.findall(r'<p><a href="([^"#:]+\.html)">(.*?)</a></p>', m.group(1))
        cards = []
        for href, label in items:
            data = re.sub(r"^(\.\./)+", "", href)
            cards.append(f'<a class="link-card reveal" href="{href}" data-page="{data}"><span>{label}</span>'
                         f'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
                         f'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
                         f'<path d="m9 6 6 6-6 6"/></svg></a>')
        return '<div class="link-list">' + "".join(cards) + "</div>"

    return run_re.sub(run, body)


def qa_html(q: str, a: str) -> str:
    return (f'<div class="qa"><p class="q">{q}</p><details class="ans"><summary>Lihat jawaban</summary>'
            f'<div class="a">{a}</div></details></div>')


def qa_transform(sec: str) -> str:
    # 1) "**Kunci:**" + daftar -> satu kotak jawaban
    sec = re.sub(
        r"<p><strong>(Kunci(?: jawaban)?:?)</strong></p>\s*(<(?:ul|ol)>.*?</(?:ul|ol)>)",
        lambda m: f'<details class="ans solo"><summary>Lihat kunci jawaban</summary><div class="a">{m.group(2)}</div></details>',
        sec, flags=re.S)

    # 2) paragraf "<strong>pertanyaan</strong>\njawaban"
    def p_qa(m):
        inner = m.group(1)
        if "\n" not in inner:
            return m.group(0)
        q, a = inner.split("\n", 1)
        a_html = "<p>" + a.strip().replace("\n", "<br>") + "</p>"
        if re.fullmatch(r"<strong>\s*Kunci(?: jawaban)?:?\s*</strong>", q.strip()):
            return ('<details class="ans solo"><summary>Lihat kunci jawaban</summary>'
                    f'<div class="a">{a_html}</div></details>')
        return qa_html(q.strip(), a_html)

    sec = re.sub(r"<p>(<strong>.*?)</p>", p_qa, sec, flags=re.S)

    # 3) pertanyaan tebal lalu daftar jawaban
    sec = re.sub(
        r"<p>(<strong>[^<]*</strong>)</p>\s*(<(?:ul|ol)>.*?</(?:ul|ol)>)",
        lambda m: qa_html(m.group(1), m.group(2)), sec, flags=re.S)
    return sec


def add_anchors(body: str) -> str:
    def rep(m):
        tag, hid, text = m.group(1), m.group(2), m.group(3)
        return (f'<{tag} id="{hid}"><span class="h-text">{text}</span>'
                f'<a class="anchor" href="#{hid}" aria-label="Tautan ke bagian ini">#</a></{tag}>')

    return re.sub(r'<(h2|h3) id="([^"]+)">(.*?)</\1>', rep, body, flags=re.S)


def wrap_sections(body: str) -> str:
    parts = re.split(r"(?=<h2 id=)", body)
    out = [parts[0]]
    for part in parts[1:]:
        head = re.search(r"<span class=\"h-text\">(.*?)</span>", part, re.S)
        title = re.sub(r"<[^>]+>", "", head.group(1)) if head else ""
        extra = ""
        if re.search(r"Latihan|Kuis", title):
            part = qa_transform(part)
            extra = " sec-latihan"
        out.append(f'<section class="sec reveal{extra}">{part}</section>')
    return "".join(out)


def reading_minutes(page: Page) -> int:
    words = len(re.findall(r"\w+", plain(page.md)))
    return max(1, round(words / 200))


def eyebrow(page: Page) -> str:
    mins = f'<span class="chip ghost">± {reading_minutes(page)} menit baca</span>'
    if page.kind == "modul":
        return (f'<div class="eyebrow"><a class="chip" href="{page.root}{levels[page.level].out}">Level {page.level} · '
                f'{html.escape(LEVEL_INFO[page.level][0])}</a><span class="chip ghost">Modul {page.number:02d} dari 24</span>'
                f"{mins}</div>")
    if page.kind == "level":
        return f'<div class="eyebrow"><span class="chip">Level {page.level} dari 5</span>{mins}</div>'
    if page.kind == "lampiran":
        return f'<div class="eyebrow">{mins}</div>'
    return ""


def complete_button(page: Page) -> str:
    if page.kind != "modul":
        return ""
    return (f'<div class="complete reveal"><button type="button" id="mark-done" data-page="{page.out}">'
            f'Tandai modul ini selesai</button><span class="hint">Tersimpan di browser kamu.</span></div>')


def prefs_html() -> str:
    def seg(pref, items):
        return "".join(f'<button type="button" data-pref="{pref}" data-val="{v}">{l}</button>' for v, l in items)

    return f"""<div class="prefs" id="prefs" hidden role="dialog" aria-label="Pengaturan tampilan">
  <div class="prefs-head"><strong>Pengaturan baca</strong><button class="icon-btn sm" id="prefs-close" type="button" aria-label="Tutup">{icon("close", 18)}</button></div>
  <div class="pref-row"><span>Ukuran teks</span><div class="seg" role="group" aria-label="Ukuran teks">
    <button type="button" id="fs-down" aria-label="Perkecil teks">A−</button><output id="fs-val">3/5</output><button type="button" id="fs-up" aria-label="Perbesar teks">A+</button></div></div>
  <div class="pref-row"><span>Jarak baris</span><div class="seg">{seg("lh", [("tight", "Rapat"), ("normal", "Normal"), ("loose", "Lega")])}</div></div>
  <div class="pref-row"><span>Huruf</span><div class="seg">{seg("font", [("sans", "Sans"), ("serif", "Serif")])}</div></div>
  <div class="pref-row"><span>Lebar teks</span><div class="seg">{seg("width", [("normal", "Standar"), ("wide", "Lebar")])}</div></div>
  <div class="pref-row"><span>Tema</span><div class="seg theme-seg">{seg("theme", [("light", "Terang"), ("sepia", "Sepia"), ("dark", "Gelap"), ("auto", "Auto")])}</div></div>
  <label class="pref-switch"><input type="checkbox" id="pref-break" checked><span class="sw"></span><span>Pengingat istirahat (tiap 25 menit)</span></label>
  <label class="pref-switch desk-only"><input type="checkbox" id="pref-focus"><span class="sw"></span><span>Mode fokus (sembunyikan menu)</span></label>
  <button type="button" class="reset" id="prefs-reset">Kembalikan ke bawaan</button>
</div>"""


TEMPLATE = """<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title} · {site}</title>
<meta name="description" content="{desc}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#EE4D2D">
<link rel="icon" href="{root}assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="{root}assets/style.css">
<script>(function(){{var d=document.documentElement;d.classList.add('js');try{{var t=localStorage.getItem('sea-theme');if(t&&t!=='auto')d.setAttribute('data-theme',t);var p=JSON.parse(localStorage.getItem('sea-prefs')||'{{}}');['fs','lh','font','width'].forEach(function(k){{if(p[k])d.setAttribute('data-'+k,p[k]);}});if(p.focus)d.setAttribute('data-focus','1');}}catch(e){{}}}})();</script>
</head>
<body data-root="{root}" data-kind="{kind}" data-page="{page}" data-title="{title_attr}">
<a class="skip" href="#isi">Lewati ke isi</a>
<div class="read-progress" id="read-progress" aria-hidden="true"></div>
<div class="top" id="top">
<header class="topbar">
  <button class="icon-btn menu-btn" id="menu-btn" aria-label="Buka menu materi" aria-controls="sidebar" aria-expanded="false">{i_menu}</button>
  <a class="brand" href="{root}index.html"><span class="brand-mark" aria-hidden="true">SA</span><span class="brand-name">{site}</span></a>
  <div class="search" id="search">
    <div class="search-box">
      {i_search}
      <input id="search-input" type="search" placeholder="Cari materi…" autocomplete="off" aria-label="Cari materi">
      <button class="icon-btn search-close" id="search-close" type="button" aria-label="Tutup pencarian">{i_close}</button>
    </div>
    <div class="search-results" id="search-results" hidden></div>
  </div>
  <button class="icon-btn desk-only" id="focus-btn" aria-label="Mode fokus" title="Mode fokus">{i_focus}</button>
  <button class="icon-btn aa-btn" id="aa-btn" aria-label="Pengaturan baca" aria-expanded="false" aria-controls="prefs">{i_text}</button>
</header>
<div class="subbar" id="subbar" aria-hidden="true"><span class="sb-title"></span><span class="sb-pct"></span></div>
</div>
{prefs}
<div class="shell">
{sidebar}
<div class="scrim" id="scrim" hidden></div>
<main id="isi" class="content">
{crumbs}
{toc_mobile}
<article class="prose">
{eyebrow}
{body}
</article>
{complete}
{pager}
<footer class="foot">
  <p>Materi pembelajaran, bukan nasihat hukum atau pajak. Aturan Shopee Affiliate bisa berubah, jadi selalu cek sumber resmi dan catat tanggal pemeriksaannya. Situs ini bukan situs resmi Shopee.</p>
</footer>
</main>
{toc}
</div>
<nav class="bottom-nav" id="bottom-nav" aria-label="Navigasi cepat">
  <a class="bn-item" href="{root}index.html">{i_home}<span>Beranda</span></a>
  <button class="bn-item" id="bn-menu" type="button" aria-controls="sidebar">{i_grid}<span>Materi</span></button>
  <button class="bn-item" id="bn-search" type="button">{i_search}<span>Cari</span></button>
  <a class="bn-item bn-primary" href="{next_href}">{i_next}<span>{next_label}</span></a>
</nav>
<button class="to-top" id="to-top" type="button" aria-label="Kembali ke atas" hidden>{i_up}</button>
<div class="toast-wrap" id="toasts" aria-live="polite"></div>
<script src="{root}assets/search-index.js"></script>
<script src="{root}assets/app.js"></script>
</body>
</html>
"""

# ---------------------------------------------------------------- bangun

search_entries = []


def build(page: Page):
    body, tokens = convert(page)
    if page.kind == "index":
        body = re.sub(r"<h1[^>]*>.*?</h1>\s*<p><strong>.*?</strong></p>", "", body, count=1, flags=re.S)
        marker = '<h2 id="untuk-siapa-materi-ini">'
        cards = home_cards(page)
        body = hero_html(page) + (body.replace(marker, cards + marker, 1) if marker in body else cards + body)
    if page.kind in ("index", "level"):
        body = link_cards(body)
    body = add_anchors(body)
    body = wrap_sections(body)

    _, next_p = neighbours(page)
    if next_p is None or page.out == "master.html":
        next_href, next_label = f"{page.root}index.html", "Awal"
        if page.out != "master.html":
            next_href, next_label = f"{page.root}master.html", "Master"
    else:
        next_href, next_label = f"{page.root}{next_p.out}", "Lanjut"

    doc = TEMPLATE.format(
        title=html.escape(page.title), title_attr=html.escape(page.title, quote=True), site=SITE_NAME,
        desc=html.escape(first_paragraph(page.md)), root=page.root, kind=page.kind, page=page.out,
        sidebar=sidebar_html(page), crumbs=breadcrumb(page), body=body, eyebrow=eyebrow(page),
        complete=complete_button(page), pager=prev_next(page), toc=toc_html(tokens),
        toc_mobile="" if page.kind == "index" else toc_mobile_html(tokens), prefs=prefs_html(),
        next_href=next_href, next_label=next_label,
        i_menu=icon("menu"), i_search=icon("search", 20), i_close=icon("close", 20), i_text=icon("text", 22),
        i_focus=icon("focus", 20), i_home=icon("home"), i_grid=icon("grid"), i_next=icon("next"), i_up=icon("up", 20),
    )
    out_path = ROOT / page.out
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(doc, encoding="utf-8")

    # indeks pencarian per bagian (## ...)
    h2_ids = [h2["id"] for h2 in tokens]
    sections = re.split(r"(?m)^## ", page.md)
    for idx, sec in enumerate(sections):
        if idx == 0:
            head, text, anchor = page.title, sec, ""
        else:
            head, _, text = sec.partition("\n")
            anchor = f"#{h2_ids[idx - 1]}" if idx - 1 < len(h2_ids) else ""
        search_entries.append({
            "p": page.nav_title, "h": plain(head)[:90], "u": page.out + anchor,
            "x": plain(text)[:1400],
        })


for p in pages:
    build(p)

(ROOT / "assets").mkdir(exist_ok=True)
(ROOT / "assets" / "search-index.js").write_text(
    "window.SEARCH_INDEX=" + json.dumps(search_entries, ensure_ascii=False, separators=(",", ":")) + ";",
    encoding="utf-8",
)

# 404
four = (ROOT / "index.html").read_text(encoding="utf-8")
four = re.sub(r'<article class="prose">.*?</article>',
              '<article class="prose"><h1>Halaman tidak ditemukan</h1><p>Alamat yang kamu buka tidak ada. '
              'Kembali ke <a href="index.html">beranda</a> atau pilih materi dari menu.</p></article>',
              four, flags=re.S)
(ROOT / "404.html").write_text(four, encoding="utf-8")
print(f"Selesai: {len(pages)} halaman, {len(search_entries)} entri pencarian.")
