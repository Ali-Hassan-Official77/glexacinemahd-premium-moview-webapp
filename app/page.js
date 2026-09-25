import Link from "next/link";
import { ArrowRight, Film, Layers3, Sparkles } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import LatestMoviesSection from "@/components/LatestMoviesSection";
import PopularRow from "@/components/PopularRow";
import { fetchFromTMDB } from "@/lib/tmdb";

async function getHomeData() {
  const [trendingData, latestData, popularData, topRatedData] = await Promise.all([
    fetchFromTMDB("/trending/movie/week"),
    fetchFromTMDB("/discover/movie", { sort_by: "primary_release_date.desc", "vote_count.gte": 20, page: 1 }),
    fetchFromTMDB("/movie/popular"),
    fetchFromTMDB("/movie/top_rated"),
  ]);
  return { trendingData, latestData, popularData, topRatedData };
}

export default async function HomePage() {
  try {
    const { trendingData, latestData, popularData, topRatedData } = await getHomeData();
    const trending = (trendingData?.results || []).filter((m) => m.poster_path && m.backdrop_path);
    const latest = latestData?.results || [];
    const popular = popularData?.results || [];
    const topRated = topRatedData?.results || [];
    const totalPages = Math.min(latestData?.total_pages || 1, 500);

    return (
      <div className="home">
        <HeroCarousel movies={trending} />

        <section className="discovery-intro">
          <div>
            <div className="section-kicker"><Sparkles size={12} /> The GlexaGinema edit</div>
            <h2>Find something <span>worth watching.</span></h2>
            <p>Live movie data, official artwork and audience signals — arranged into a calm, cinematic browsing experience.</p>
          </div>
          <div className="intro-stats">
            <div><Film size={17} /><strong>Live catalog</strong><span>TMDB powered</span></div>
            <div><Layers3 size={17} /><strong>Curated rails</strong><span>Freshly arranged</span></div>
          </div>
        </section>

        <LatestMoviesSection initialMovies={latest} initialPage={1} totalPages={totalPages} />
        <PopularRow movies={popular} title="Popular" kicker="Audience pulse" />
        <PopularRow movies={topRated} title="Top rated" kicker="Highest rated" />

        <section className="browse-cta">
          <div>
            <div className="section-kicker">Explore by mood</div>
            <h2>There is always another <span>story.</span></h2>
            <p>Browse the full genre catalog and discover movies beyond the homepage rails.</p>
          </div>
          <Link href="/genres" className="btn btn-primary btn-lg">Browse all genres <ArrowRight size={15} /></Link>
        </section>
      </div>
    );
  } catch (error) {
    console.error("GlexaGinema home error:", error);
    return <div className="error-state"><div className="section-kicker">Connection notice</div><h1>Movie data is temporarily unavailable.</h1><p>Check your TMDB credentials in <code>.env.local</code> and try again.</p><Link href="/" className="btn btn-primary">Retry</Link></div>;
  }
}
