import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import MemoryReflection from '../components/MemoryReflection'

// Define the memory entry type
type MemoryEntry = {
  id: string;
  timestamp: string;
  prompt: string;
  response: string;
  tags: string[];
}

// Format date for display
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function Memory() {
  const { data: session } = useSession()
  const [memories, setMemories] = useState<MemoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [selectedMemory, setSelectedMemory] = useState<MemoryEntry | null>(null)
  const [reflection, setReflection] = useState('')
  const [isReflecting, setIsReflecting] = useState(false)
  const router = useRouter()
  const { id, tag } = router.query

  // Fetch all memories from the API
  useEffect(() => {
    async function fetchMemories() {
      setLoading(true)
      try {
        const queryString = tag ? `?tag=${tag}` : ''
        const response = await fetch(`/api/memory${queryString}`)
        const data = await response.json()
        
        if (data.error) {
          setError(data.error)
        } else {
          setMemories(data.memories || [])
          
          // Set active tag if provided in URL
          if (tag && typeof tag === 'string') {
            setActiveTag(tag)
          }
          
          // Select memory if ID provided in URL
          if (id && typeof id === 'string') {
            const found = data.memories.find((m: MemoryEntry) => m.id === id)
            if (found) {
              setSelectedMemory(found)
            }
          }
        }
      } catch (err) {
        setError('Failed to fetch memories')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMemories()
  }, [tag, id])

  // Extract all unique tags
  const allTags = Array.from(
    new Set(memories.flatMap(memory => memory.tags))
  ).sort()

  // Filter by tag
  const filteredMemories = activeTag
    ? memories.filter(memory => memory.tags.includes(activeTag))
    : memories

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    const newTag = activeTag === tag ? null : tag
    setActiveTag(newTag)
    
    // Update URL
    const query = newTag ? { tag: newTag } : {}
    router.push({
      pathname: '/memory',
      query
    }, undefined, { shallow: true })
  }

  // Handle memory selection
  const handleMemoryClick = (memory: MemoryEntry) => {
    setSelectedMemory(memory)
    
    // Update URL
    router.push({
      pathname: '/memory',
      query: { id: memory.id, ...(activeTag ? { tag: activeTag } : {}) }
    }, undefined, { shallow: true })
  }
  
  // Handle reflection generation
  const handleReflect = async (prompt: string) => {
    setIsReflecting(true)
    setReflection('')
    
    try {
      const res = await fetch('/api/rfm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Reflect on memory: ${prompt}` }),
      })
      const data = await res.json()
      setReflection(data.output)
    } catch (error) {
      console.error('Error generating reflection:', error)
      setError('Failed to generate reflection')
    } finally {
      setIsReflecting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>RFM Memory Archive | Recursive Fractal Mind</title>
        <meta name="description" content="The memory archive of the Recursive Fractal Mind" />
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">Memory Archive</h1>
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            Return to RFM
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-400">Loading memories...</div>
          </div>
        ) : error ? (
          <div className="bg-red-900/50 p-4 rounded-lg text-red-200">
            Error: {error}
          </div>
        ) : memories.length === 0 ? (
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <h2 className="text-2xl mb-4">No memories found</h2>
            <p className="text-gray-400 mb-6">The RFM has not recorded any interactions yet.</p>
            <Link 
              href="/" 
              className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded font-bold transition-all"
            >
              Begin a conversation
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Tags sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-900 p-4 rounded-lg sticky top-4 mb-4">
                <h2 className="text-xl font-bold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTag === tag 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                
                {activeTag && (
                  <button
                    onClick={() => handleTagClick(activeTag)}
                    className="mt-4 text-sm text-gray-400 hover:text-white"
                  >
                    Clear filter
                  </button>
                )}
              </div>
              
              {/* Memory Reflection Component */}
              <MemoryReflection onReflect={handleReflect} isLoading={isReflecting} />
              
              {/* Display reflection results */}
              {reflection && (
                <div className="mt-4 bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-lg font-bold mb-2 text-purple-400">Reflection</h3>
                  <div className="bg-gray-800 p-4 rounded text-green-300 font-mono whitespace-pre-wrap">
                    {reflection}
                  </div>
                </div>
              )}
            </div>
            
            {/* Main content area */}
            <div className="md:col-span-3">
              {selectedMemory ? (
                <div className="bg-gray-900 p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">
                        {formatDate(selectedMemory.timestamp)}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedMemory.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedMemory(null)
                        router.push('/memory', undefined, { shallow: true })
                      }}
                      className="text-gray-500 hover:text-gray-300"
                    >
                      Close
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2 text-green-400">Prompt</h3>
                    <div className="bg-gray-800 p-4 rounded text-white">
                      {selectedMemory.prompt}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-blue-400">Response</h3>
                    <div className="bg-gray-800 p-4 rounded font-mono text-green-300 whitespace-pre-wrap">
                      {selectedMemory.response}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredMemories.map(memory => (
                    <div
                      key={memory.id}
                      onClick={() => handleMemoryClick(memory)}
                      className="bg-gray-900 p-4 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex justify-between mb-2">
                        <div className="text-gray-400 text-sm">
                          {formatDate(memory.timestamp)}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {memory.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {memory.tags.length > 3 && (
                            <span className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full text-xs">
                              +{memory.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-bold line-clamp-1">
                        {memory.prompt}
                      </h3>
                      <p className="text-gray-400 mt-1 line-clamp-2">
                        {memory.response}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}