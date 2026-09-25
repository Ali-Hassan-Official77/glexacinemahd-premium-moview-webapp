export default function Loading() {
  return (
    <div>
      <div className="skeleton" style={{ minHeight: "clamp(420px, 55vw, 650px)", borderRadius: 28, marginBottom: 50 }}>
        <div className="skeleton-poster" style={{ aspectRatio: "auto", height: "100%" }} />
      </div>
      <div className="section-head"><div><div className="section-kicker">Loading cinema</div><div className="section-title">Preparing <span>your feed</span></div></div></div>
      <div className="skeleton-grid">{Array.from({length: 12}).map((_,i)=><div className="skeleton" key={i}><div className="skeleton-poster"/><div className="skeleton-line"/><div className="skeleton-line short"/></div>)}</div>
    </div>
  );
}
