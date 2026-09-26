"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import MovieGrid from "@/components/MovieGrid";
import { useWatchlist } from "@/hooks/useWatchlist";
export const runtime = 'edge';
export default function WatchlistPage(){const {watchlistIds,toggleWatchlist,loaded}=useWatchlist();const [movies,setMovies]=useState([]),[loading,setLoading]=useState(true);useEffect(()=>{if(!loaded)return;if(!watchlistIds.length){setMovies([]);setLoading(false);return}let cancelled=false;setLoading(true);Promise.all(watchlistIds.map(id=>fetch(`/api/movies/${id}`).then(r=>r.ok?r.json():null).catch(()=>null))).then(r=>{if(!cancelled){setMovies(r.filter(Boolean));setLoading(false)}});return()=>{cancelled=true}},[watchlistIds,loaded]);return <div><Link href="/" className="back-link"><ArrowLeft size={13}/> Back to discover</Link><div className="page-heading"><h1>My <span className="text-[var(--accent)]">watchlist</span></h1><p>Keep the films you want to come back to close at hand.</p></div>{!loaded||loading?<div className="empty-state">Loading your watchlist…</div>:movies.length?<MovieGrid movies={movies} watchlistIds={watchlistIds} onToggleWatchlist={toggleWatchlist}/>:<div className="empty-state"><Heart className="mx-auto mb-3 text-[var(--muted-2)]"/>Your watchlist is empty. Save a movie with the heart button.</div>}</div>}
