"use client";

import Link from "next/link";
import Image from "next/image";
import { Compass, Heart, Menu, Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Discover", icon: Compass },
  { href: "/genres", label: "Genres" },
  { href: "/watchlist", label: "Watchlist", icon: Heart },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  function submit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href="/"
          className="brand"
          onClick={() => setOpen(false)}
          aria-label="GlexaGinema home"
        >
          <Image
            src="/logo.svg"
            alt="GlexaGinema"
            width={50}
            height={2}
            priority
            className="brand-logo"
          />
          <span className="brand-name">Glexa<span>Ginema</span></span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return <Link key={href} href={href} className={`nav-link ${active ? "active" : ""}`}>{Icon && <Icon size={14} />}{label}</Link>;
          })}
          <form onSubmit={submit} className="nav-search">
            <Search size={14} />
            <input aria-label="Search movies" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search titles" />
          </form>
          <ThemeToggle />
        </nav>

        <div className="mobile-tools"><ThemeToggle /><button type="button" className="mobile-menu btn" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">{open ? <X size={18} /> : <Menu size={18} />}</button></div>
      </div>

      {open && (
        <div className="mobile-nav">
          <form onSubmit={submit} className="mobile-search"><Search size={16} /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies, actors, titles..." /></form>
          <div className="mobile-links">{links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setOpen(false)} className="nav-link">{Icon && <Icon size={15} />}{label}</Link>)}</div>
        </div>
      )}
    </header>
  );
}
