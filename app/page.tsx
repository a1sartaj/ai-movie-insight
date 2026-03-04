export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">
        AI Movie Insight Builder
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter IMDb ID (tt0133093)"
          className="border px-4 py-2 rounded"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
    </main>
  )
}