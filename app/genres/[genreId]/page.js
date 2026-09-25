import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import MovieGridClient from "@/components/MovieGridClient";
import { fetchFromTMDB } from "@/lib/tmdb";

async function getGenreMovies(id) {
  return fetchFromTMDB("/discover/movie", {
    with_genres: id,
    sort_by: "popularity.desc",
    page: 1,
  });
}

export default async function GenreMoviesPage({ params }) {
  const { genreId } = await params;

  const data = await getGenreMovies(genreId);
  const movies = data?.results || [];

  return (
    <div>
      <Link href="/genres" className="back-link">
        <ArrowLeft size={13} />
        All genres
      </Link>

      <div className="page-heading">
        <h1>
          Genre <span className="text-[var(--accent)]">movies</span>
        </h1>

        <p>{movies.length} titles ready to explore.</p>
      </div>

      {movies.length ? (
        <MovieGridClient movies={movies} />
      ) : (
        <div className="empty-state">
          No movies were found for this genre.
        </div>
      )}
    </div>
  );
}