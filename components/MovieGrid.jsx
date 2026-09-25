"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function isNew(date) {
  if (!date) return false;

  const d =
    (Date.now() - new Date(date).getTime()) /
    86400000;

  return d >= 0 && d <= 30;
}

export default function MovieGrid({
  movies = [],
  onToggleWatchlist,
  watchlistIds = [],
}) {
  if (!movies.length) {
    return (
      <div className="empty-state">
        No movies available right now.
      </div>
    );
  }

  // Remove duplicate movies based on TMDB ID.
  // Some API responses can contain the same movie more than once.
  const uniqueMovies = Array.from(
    new Map(
      movies
        .filter((movie) => movie?.id != null)
        .map((movie) => [String(movie.id), movie])
    ).values()
  );

  if (!uniqueMovies.length) {
    return (
      <div className="empty-state">
        No movies available right now.
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {uniqueMovies.map((m, i) => {
        const saved = watchlistIds.some(
          (id) => String(id) === String(m.id)
        );

        const fresh = isNew(m.release_date);

        const genre =
          m.genre_ids?.[0] != null
            ? GENRE_MAP[m.genre_ids[0]]
            : null;

        return (
          <motion.article
            key={String(m.id)}
            className="movie-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.32,
              delay: Math.min(i * 0.025, 0.22),
            }}
          >
            <Link
              href={`/movie/${m.id}`}
              className="block"
            >
              <div className="movie-poster">
                {m.poster_path ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/w500${m.poster_path}`}
                    alt={m.title || "Movie poster"}
                    fill
                    sizes="(max-width:640px) 50vw,(max-width:900px) 33vw,20vw"
                    quality={80}
                    loading={i < 8 ? "eager" : "lazy"}
                    priority={i < 4}
                  />
                ) : (
                  <div className="grid h-full place-items-center p-5 text-center text-xs text-white/30">
                    {m.title || "No poster available"}
                  </div>
                )}

                <div className="poster-shade" />

                {fresh && (
                  <span className="new-badge">
                    New
                  </span>
                )}

                <span className="rating">
                  <Star
                    size={10}
                    fill="currentColor"
                  />
                  {Number(m.vote_average || 0).toFixed(1)}
                </span>

                {onToggleWatchlist && (
                  <button
                    type="button"
                    className={`card-watchlist-btn ${
                      saved ? "is-saved" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      onToggleWatchlist(m.id);

                      window.dispatchEvent(
                        new CustomEvent("glexa:toast", {
                          detail: {
                            message: saved
                              ? "Removed from your watchlist"
                              : "Added to your watchlist",
                          },
                        })
                      );
                    }}
                    aria-label={
                      saved
                        ? "Remove from watchlist"
                        : "Add to watchlist"
                    }
                  >
                    <Heart
                      size={16}
                      fill={
                        saved
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                )}
              </div>

              <div className="movie-info">
                <h3 className="movie-title">
                  {m.title}
                </h3>

                <div className="movie-meta">
                  <span>
                    {m.release_date
                      ? new Date(
                          m.release_date
                        ).getFullYear()
                      : "—"}
                  </span>

                  {genre && (
                    <>
                      <i className="h-1 w-1 rounded-full bg-white/20" />
                      <span className="truncate">
                        {genre}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </motion.article>
        );
      })}
    </div>
  );
}