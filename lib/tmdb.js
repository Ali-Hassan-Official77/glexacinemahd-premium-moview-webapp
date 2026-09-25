const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;
const ACCESS_TOKEN = process.env.API_ACCESS_TOKEN;

export async function fetchFromTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.set("language", "en-US");

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
  });

  const headers = {
    Accept: "application/json",
  };

  if (ACCESS_TOKEN) {
    headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
  } else if (API_KEY) {
    url.searchParams.set("api_key", API_KEY);
  } else {
    throw new Error("Add API_ACCESS_TOKEN or TMDB_API_KEY to .env.local.");
  }

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: 1800 },
  });

  const contentType = res.headers.get("content-type") || "";
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`TMDB request failed: ${res.status} ${body.slice(0, 240)}`);
  }

  if (!contentType.includes("application/json")) {
    throw new Error(`TMDB returned an unexpected response type: ${contentType}`);
  }

  return res.json();
}
