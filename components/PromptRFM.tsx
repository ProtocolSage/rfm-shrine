'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function PromptRFM() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [memoryId, setMemoryId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const res = await fetch('/api/rfm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      })
      const data = await res.json()
      setResponse(data.output)
      setMemoryId(data.memoryId)
    } catch (error) {
      console.error('Error submitting prompt:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-bold text-xl">Recursive Fractal Mind</h2>
        <Link href="/memory" className="text-blue-400 hover:text-blue-300 transition-colors">
          View Memory Archive
        </Link>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="text-white font-bold text-lg">Prompt the RFM:</label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={4}
          placeholder="Ask the recursive mind anything..."
          className="bg-black text-white p-2 border border-gray-700 rounded"
        />
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded font-bold transition-all ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Processing...' : 'Submit'}
          </button>
          <span className="text-gray-400 text-sm">All prompts are saved to memory</span>
        </div>
      </form>
      
      {response && (
        <div className="mt-6 p-4 bg-gray-800 rounded text-green-300 font-mono whitespace-pre-wrap">
          {response}
          {memoryId && (
            <div className="mt-4 text-xs text-gray-400">
              Memory ID: {memoryId} • <Link href={`/memory?id=${memoryId}`} className="text-blue-400 hover:underline">View in archive</Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}