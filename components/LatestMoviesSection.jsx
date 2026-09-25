"use client";
import { useCallback, useState } from "react";
import MovieGrid from "./MovieGrid";
import { useWatchlist } from "@/hooks/useWatchlist";

export default function LatestMoviesSection({ initialMovies=[], initialPage=1, totalPages=1 }) {
  const [movies,setMovies]=useState(initialMovies),[page,setPage]=useState(initialPage),[loading,setLoading]=useState(false);
  const {watchlistIds,toggleWatchlist}=useWatchlist();
  const loadMore=useCallback(async()=>{if(loading||page>=totalPages)return;setLoading(true);try{const next=page+1;const r=await fetch(`/api/movies/latest?page=${next}`);const d=await r.json();setMovies(v=>[...v,...(d.results||[])]);setPage(next)}finally{setLoading(false)}},[loading,page,totalPages]);
  return <section><div className="section-head"><div><div className="section-kicker">Fresh from the database</div><h2 className="section-title">Latest <span>releases</span></h2></div><span className="section-link">Updated continuously</span></div><MovieGrid movies={movies} watchlistIds={watchlistIds} onToggleWatchlist={toggleWatchlist}/>{page<totalPages&&<div className="mt-8 flex justify-center"><button className="btn" onClick={loadMore} disabled={loading}>{loading?"Loading…":"Load more movies"}</button></div>}</section>;
}
