'use client'

import { useEffect, useState } from "react"

interface Movie {
  Title: string,
  Year: string,
  Poster: string,
  imdbRating: string
}


export default function Home() {

  const [imdbId, setImdbId] = useState('')
  const [movie, setMovie] = useState<Movie | null>(null)
  const [history, setHistory] = useState<Movie[]>([])

  const searchMovie = async () => {
    if (!imdbId) return;

    const response = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`)

    const data = await response.json()

    const updateHistory = [data, ...history].slice(0, 5)
    setHistory(updateHistory)
    localStorage.setItem('movieHistory', JSON.stringify(updateHistory))
    setMovie(data)

  }

  useEffect(() => {
    const saved = localStorage.getItem('movieHistory')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">
        AI Movie Insight Builder
      </h1>

      <div className="flex gap-2">
        <input
          onChange={(e) => setImdbId(e.target.value)}
          type="text"
          placeholder="Enter IMDb ID (tt0133093)"
          className="border px-4 py-2 rounded"
          value={imdbId}
        />

        <button type="button" onClick={searchMovie} className="bg-black text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {/* Movie Result */}
      {movie && (
        <div className="border p-4 rounded w-80 text-center">

          <img
            src={movie.Poster}
            alt={movie.Title}
            className="mb-3"
          />

          <h2 className="text-xl font-bold">
            {movie.Title}
          </h2>

          <p>Year: {movie.Year}</p>
          <p>Rating: {movie.imdbRating}</p>

        </div>
      )}

      {/* Recent History */}
      <div className="mt-10">

        <h2 className="text-xl font-bold mb-4">
          Recent Searches
        </h2>

        <div className="grid grid-cols-2 gap-4">

          {history.map((m, index) => (

            <div
              key={index}
              className="border p-3 rounded cursor-pointer"
              onClick={() => setMovie(m)}
            >

              <img src={m.Poster} alt={m.Title} />

              <p className="font-bold">{m.Title}</p>
              <p>{m.Year}</p>

            </div>

          ))}

        </div>

      </div>
    </main>
  )
}