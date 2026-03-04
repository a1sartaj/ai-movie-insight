'use client'

import { useEffect, useState } from "react"

export default function Home() {

  const [imdbId, setImdbId] = useState('')
  const [movie, setMovie] = useState(null)
  const [history, setHistory] = useState([])
  const [sentiment, setSentiment] = useState("")
  const [showReviews, setShowReviews] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchReviews = async (imdbId) => {

    try {

      setLoading(true)

      const findRes = await fetch(
        `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      )

      const findData = await findRes.json()

      const movieId = findData.movie_results[0]?.id

      if (!movieId) {
        setSentiment("No reviews found for this movie.")
        setShowReviews(true)
        return
      }

      const reviewRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      )


      const reviewData = await reviewRes.json()
      if (!reviewData.results.length) {
        setSentiment("No audience reviews available.")
        setShowReviews(true)
        return
      }

      const aiRes = await fetch("/api/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reviews: reviewData.results.slice(0, 5)
        })
      })


      const aiData = await aiRes.json()


      setSentiment(aiData.result)
      setShowReviews(true)
    } catch (error) {
      console.log("Error is : ", error)
    } finally {
      setLoading(false)
    }
  }

  const searchMovie = async () => {
    if (!imdbId) return;

    try {
      setLoading(true)
      const response = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`)

      const data = await response.json()
      if (data.Response === "False") {
        alert("Movie not found")
        return
      }


      const updateHistory = [data, ...history].slice(0, 5)

      setHistory(updateHistory)
      localStorage.setItem('movieHistory', JSON.stringify(updateHistory))
      setMovie(data)

      await fetchReviews(imdbId)

    } catch (error) {
      console.log("Error in searching movie : ", error)
    } finally {
      setLoading(false)
    }


  }

  useEffect(() => {
    const saved = localStorage.getItem('movieHistory')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-2 pt-10">


      {/* Loading screen */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl flex flex-col items-center gap-4 shadow-lg">

            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

            <p className="text-gray-700 font-medium">
              Fetching movie insights...
            </p>

          </div>

        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        AI Movie Insight Builder
      </h1>

      {/* Search Bar */}
      <div className="w-full max-w-xl flex gap-3 mb-12">

        <input
          type="text"
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          placeholder="Enter IMDb ID (example: tt0133093)"
          className="flex-1 border border-gray-300 bg-white rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={searchMovie}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition shadow"
        >
          Search
        </button>

      </div>

      {/* Movie Result */}
      {movie && (
        <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-3xl flex flex-col md:flex-row gap-6 mb-12">

          {/* Movie left */}
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-40 rounded-lg shadow"
          />

          {/* Movie right */}
          <div className="flex flex-col justify-center">

            <h2 className="text-2xl font-bold mb-2">
              {movie.Title}
            </h2>

            <p className="text-gray-500 mb-2">
              {movie.Year}
            </p>

            <p className="mb-3 font-medium">
              ⭐ IMDb Rating: {movie.imdbRating}
            </p>

            <p className="text-sm text-gray-700 leading-relaxed">
              {movie.Plot}
            </p>

          </div>

        </div>
      )}

      {/* Recent History */}
      <div className="w-full max-w-5xl">

        <h2 className="text-2xl font-semibold mb-6">
          Recent Searches
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {history.map((m, index) => (

            <div
              key={index}
              onClick={() => {
                setMovie(m)
                fetchReviews(m.imdbID)
              }}
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-xl transition transform hover:scale-105 p-3"
            >

              <img
                src={m.Poster}
                alt={m.Title}
                className="rounded-lg mb-3"
              />

              <p className="font-semibold text-sm line-clamp-1">
                {m.Title}
              </p>

              <p className="text-gray-500 text-xs">
                {m.Year}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Sentiment Popup */}
      {showReviews && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg relative">

            <button
              onClick={() => setShowReviews(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Audience Sentiment
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {sentiment}
            </p>

          </div>

        </div>
      )}

    </main>
  )
}