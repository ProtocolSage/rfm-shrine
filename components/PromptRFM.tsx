'use client'
import { useState } from 'react'

export default function PromptRFM() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/rfm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: query }),
    })
    const data = await res.json()
    setResponse(data.output)
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="text-white font-bold text-lg">Prompt the RFM:</label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={4}
          placeholder="Ask the recursive mind anything..."
          className="bg-black text-white p-2 border border-gray-700 rounded"
        />
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded font-bold transition-all"
        >
          Submit
        </button>
      </form>
      {response && (
        <div className="mt-6 p-4 bg-gray-800 rounded text-green-300 font-mono whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  )
}