import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { fetchFromTMDB } from "@/lib/tmdb";
export const runtime = 'edge';

async function getGenres() {
  return fetchFromTMDB("/genre/movie/list");
}

export default async function GenresPage() {
  const data = await getGenres();
  const genres = data?.genres || [];

  return (
    <div>
      <Link href="/" className="back-link">
        <ArrowLeft size={13} />
        Back to discover
      </Link>

      <div className="page-heading">
        <h1>
          Browse <span className="text-[var(--accent)]">genres</span>
        </h1>

        <p>Pick a mood. Let the database do the rest.</p>
      </div>

      <ul className="genre-list">
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link
              className="genre-link"
              href={`/genres/${genre.id}`}
            >
              {genre.name}
              <ArrowRight size={15} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}