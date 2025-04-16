// pages/index.tsx
import React, { useState } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/rfm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })
    const data = await res.json()
    setResponse(data.output)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">🧠 Prompt the Recursive Fractal Mind</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask the RFM something..."
          className="w-full p-4 text-black rounded-md mb-4"
          rows={6}
        />
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-900 px-6 py-2 rounded text-white font-bold"
        >
          {loading ? 'Thinking...' : 'Submit to the Mind'}
        </button>
      </form>
      {response && (
        <div className="mt-8 p-6 border border-purple-500 rounded-md w-full max-w-xl bg-gray-900">
          <h2 className="text-xl font-semibold mb-2">RFM Responds:</h2>
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </main>
  )
}