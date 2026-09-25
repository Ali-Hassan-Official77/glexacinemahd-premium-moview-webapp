# GlexaGinema

Premium movie discovery experience built with Next.js and The Movie Database (TMDB).

## Environment

Create `.env.local`:

```env
API_ACCESS_TOKEN=
TMDB_API_KEY=
TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
```

`API_ACCESS_TOKEN` is preferred. `TMDB_API_KEY` remains supported as a fallback.

## Run

```bash
npm install
npm run dev
```

The app uses live TMDB data for trending, latest, popular, top-rated, genres, trailers, cast and movie backdrops/screenshots. It does not fabricate movie metadata or business contact information.

This product uses the TMDB API but is not endorsed or certified by TMDB.
