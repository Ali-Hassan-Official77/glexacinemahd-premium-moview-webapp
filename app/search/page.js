"use client";
import { Suspense,useEffect,useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import MovieGrid from "@/components/MovieGrid";
export const runtime = 'edge';

function Results(){const params=useSearchParams();const query=params.get("q")||"";const [results,setResults]=useState([]),[loading,setLoading]=useState(false);useEffect(()=>{if(!query.trim()){setResults([]);return}let cancelled=false;setLoading(true);fetch(`/api/movies/search?q=${encodeURIComponent(query)}`).then(r=>r.json()).then(d=>{if(!cancelled)setResults(d.results||[])}).catch(()=>{if(!cancelled)setResults([])}).finally(()=>{if(!cancelled)setLoading(false)});return()=>{cancelled=true}},[query]);return <>{loading?<div className="empty-state">Searching the catalog…</div>:query?<><div className="mb-6 text-xs text-[var(--muted)]">Showing matches for <strong className="text-[var(--text)]">“{query}”</strong></div>{results.length?<MovieGrid movies={results}/>:<div className="empty-state">No titles found for “{query}”.</div>}</>:<div className="empty-state"><Search className="mx-auto mb-3 text-[var(--muted-2)]"/>Search from the bar above.</div>}</>}
export default function SearchPage(){return <div><Link href="/" className="back-link"><ArrowLeft size={13}/> Back to discover</Link><div className="page-heading"><h1>Search <span className="text-[#38bdf8]">the catalog</span></h1><p>Find a film by title and jump straight into its profile.</p></div><Suspense fallback={<div className="empty-state">Loading search…</div>}><Results/></Suspense></div>}
