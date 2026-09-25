import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export default function PopularRow({ movies = [], title = "Popular", kicker = "Audience pulse" }) {
  if (!movies.length) return null;
  return (
    <section>
      <div className="section-head">
        <div><div className="section-kicker">{kicker}</div><h2 className="section-title">{title} <span>now</span></h2></div>
        <span className="section-link">Swipe to explore →</span>
      </div>
      <div className="rail">
        {movies.slice(0, 14).map((m) => (
          <Link key={m.id} href={`/movie/${m.id}`} className="rail-card">
            <div className="rail-poster">
              {m.poster_path && <Image src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/w500${m.poster_path}`} alt={m.title} fill sizes="136px" />}
              <span className="rating"><Star size={9} fill="currentColor" /> {Number(m.vote_average || 0).toFixed(1)}</span>
            </div>
            <p className="rail-title">{m.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
