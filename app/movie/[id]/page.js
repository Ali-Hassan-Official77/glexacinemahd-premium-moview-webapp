import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Play,
  Star,
} from "lucide-react";

import ScreenshotCard from "@/components/ScreenshotCard";
import { fetchFromTMDB } from "@/lib/tmdb";

async function getMovie(id) {
  return fetchFromTMDB(`/movie/${id}`, {
    append_to_response: "credits,videos,images",
    include_image_language: "en,null",
  });
}

export default async function MoviePage({ params }) {
  const { id } = await params;

  const movie = await getMovie(id);

  const trailer = movie?.videos?.results?.find(
    (video) =>
      video.type === "Trailer" &&
      video.site === "YouTube"
  );

  const screenshots =
    movie?.images?.backdrops?.slice(0, 8) || [];

  return (
    <div>
      <Link href="/" className="back-link">
        <ArrowLeft size={13} />
        Back to discover
      </Link>

      <section className="detail-hero">
        <div className="detail-layout">
          <div className="detail-poster">
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="280px"
                priority
              />
            )}
          </div>

          <div>
            <div className="eyebrow">
              Movie profile
            </div>

            <h1 className="detail-title mt-3">
              {movie.title}
            </h1>

            <div className="info-pills">
              <span className="info-pill">
                <Star
                  size={12}
                  fill="currentColor"
                  className="inline text-[var(--accent)]"
                />
                {" "}
                {Number(movie.vote_average || 0).toFixed(1)} / 10
              </span>

              {movie.release_date && (
                <span className="info-pill">
                  <CalendarDays
                    size={12}
                    className="inline"
                  />
                  {" "}
                  {movie.release_date}
                </span>
              )}

              {movie.runtime && (
                <span className="info-pill">
                  <Clock3
                    size={12}
                    className="inline"
                  />
                  {" "}
                  {movie.runtime} min
                </span>
              )}
            </div>

            <p className="detail-overview">
              {movie.overview ||
                "No synopsis is available for this title."}
            </p>

            {trailer && (
              <div className="mt-5">
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  <Play
                    size={14}
                    fill="currentColor"
                  />
                  Watch trailer
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {movie?.credits?.cast?.length > 0 && (
        <section>
          <div className="section-head">
            <div>
              <div className="section-kicker">
                On screen
              </div>

              <h2 className="section-title">
                Cast <span>& crew</span>
              </h2>
            </div>
          </div>

          <div className="cast-grid">
            {movie.credits.cast
              .slice(0, 9)
              .map((actor) => (
                <div
                  className="cast-card"
                  key={actor.id}
                >
                  <strong>{actor.name}</strong>

                  <span>
                    as {actor.character || "—"}
                  </span>
                </div>
              ))}
          </div>
        </section>
      )}

      {trailer && (
        <section>
          <div className="section-head">
            <div>
              <div className="section-kicker">
                Official video
              </div>

              <h2 className="section-title">
                Movie <span>trailer</span>
              </h2>
            </div>
          </div>

          <div className="trailer-wrap">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name || movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {screenshots.length > 0 && (
        <section>
          <div className="section-head">
            <div>
              <div className="section-kicker">
                Visual archive
              </div>

              <h2 className="section-title">
                Selected <span>frames</span>
              </h2>
            </div>
          </div>

          <div className="screenshot-grid">
            {screenshots.map((screenshot) => (
              <ScreenshotCard
                key={screenshot.file_path}
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/w780${screenshot.file_path}`}
                alt={`${movie.title} screenshot`}
                href={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/original${screenshot.file_path}`}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}