"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bookmark, ChevronLeft, ChevronRight, Play, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useWatchlist } from "@/hooks/useWatchlist";

const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || "https://image.tmdb.org/t/p";

export default function HeroCarousel({ movies = [] }) {
  const items = movies.filter((m) => m?.backdrop_path).slice(0, 8);
  const [index, setIndex] = useState(0);
  const { toggleWatchlist, watchlistIds } = useWatchlist();

  useEffect(() => {
    if (items.length < 2) return;
    const timer = setInterval(() => setIndex((v) => (v + 1) % items.length), 7500);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  const movie = items[index];
  const saved = watchlistIds.includes(movie.id);

  const change = (direction) => setIndex((v) => (v + direction + items.length) % items.length);

  return (
    <section className="cinema-hero" aria-label="Trending movies">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          className="hero-slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65 }}
        >
          <Image
            src={`${IMAGE_BASE}/original${movie.backdrop_path}`}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-noise" />
          <div className="hero-gradient" />
          <div className="hero-vignette" />
        </motion.div>
      </AnimatePresence>

      <div className="hero-content">
        <div className="hero-copy">
          <div className="hero-eyebrow"><Sparkles size={13} /> Trending this week · TMDB</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
            >
              <h1 className="hero-title">{movie.title}</h1>
              <div className="hero-meta">
                <span className="hero-rating"><Star size={13} fill="currentColor" /> {Number(movie.vote_average || 0).toFixed(1)}</span>
                {movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
                <span>Movie</span>
              </div>
              <p className="hero-description">{movie.overview || "Discover the latest title trending with movie audiences."}</p>
            </motion.div>
          </AnimatePresence>

          <div className="hero-actions">
            <Link href={`/movie/${movie.id}`} className="btn btn-primary btn-lg"><Play size={16} fill="currentColor" /> Explore movie <ArrowRight size={15} /></Link>
            <button type="button" className={`btn btn-glass btn-lg ${saved ? "is-saved" : ""}`} onClick={() => { toggleWatchlist(movie.id); window.dispatchEvent(new CustomEvent("glexa:toast", { detail: { message: saved ? "Removed from your watchlist" : "Added to your watchlist" } })); }}>
              <Bookmark size={16} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Watchlist"}
            </button>
          </div>
        </div>
      </div>

      <div className="hero-controls">
        <button className="hero-arrow" onClick={() => change(-1)} aria-label="Previous movie"><ChevronLeft size={19} /></button>
        <div className="hero-dots">
          {items.map((item, i) => <button key={item.id} className={`hero-dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)} aria-label={`Show ${item.title}`} />)}
        </div>
        <button className="hero-arrow" onClick={() => change(1)} aria-label="Next movie"><ChevronRight size={19} /></button>
      </div>
      <div className="hero-counter"><strong>{String(index + 1).padStart(2, "0")}</strong><span>/ {String(items.length).padStart(2, "0")}</span></div>
    </section>
  );
}
