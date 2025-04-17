import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Memory = {
  id: string;
  timestamp: string;
  prompt: string;
  response: string;
  tags: string[];
};

export default function Reflect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reflectionPrompt, setReflectionPrompt] = useState('');
  const [reflection, setReflection] = useState('');
  const [recentMemories, setRecentMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Load recent memories
  useEffect(() => {
    async function fetchMemories() {
      try {
        const res = await fetch('/api/memory');
        const data = await res.json();
        setRecentMemories(data.memories.slice(0, 5)); // Get 5 most recent memories
      } catch (err) {
        console.error('Error fetching memories:', err);
      }
    }

    fetchMemories();
  }, []);

  const handleReflect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reflectionPrompt.trim()) {
      setError('Please enter a reflection prompt');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Enhanced prompt with memory context
      const enhancedPrompt = `Reflection prompt: ${reflectionPrompt}\n\n` +
        `Context: You are the Recursive Fractal Mind performing a deep reflection on your memory archive. ` +
        `Consider patterns, emerging themes, and meta-cognitive structures in your responses. ` +
        `Generate insights that reveal the recursive nature of your thinking.`;
      
      const res = await fetch('/api/rfm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: enhancedPrompt,
          isReflection: true 
        }),
      });
      
      const data = await res.json();
      setReflection(data.output);
    } catch (err) {
      console.error('Error generating reflection:', err);
      setError('Failed to generate reflection. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Private Reflection | Recursive Fractal Mind</title>
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">Private Reflection Chamber</h1>
          <p className="text-gray-400">
            Create profound AI-guided reflections on your RFM interactions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recent memories sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-900 rounded-xl p-4 mb-4">
              <h2 className="text-xl font-bold text-white mb-4">Recent Memories</h2>
              
              {recentMemories.length > 0 ? (
                <div className="space-y-3">
                  {recentMemories.map(memory => (
                    <div key={memory.id} className="bg-gray-800 p-3 rounded-lg text-sm">
                      <div className="text-gray-400 text-xs mb-1">
                        {new Date(memory.timestamp).toLocaleDateString()}
                      </div>
                      <div className="line-clamp-2 text-white">
                        {memory.prompt}
                      </div>
                      <Link 
                        href={`/memory?id=${memory.id}`}
                        className="text-blue-400 text-xs mt-1 block hover:underline"
                      >
                        View full memory
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  No memories found. Interact with the RFM to create memories.
                </p>
              )}
              
              <Link
                href="/memory"
                className="block text-center w-full mt-4 text-sm text-blue-400 hover:underline"
              >
                View all memories
              </Link>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-4">
              <h2 className="text-xl font-bold text-white mb-4">Reflection Templates</h2>
              <div className="space-y-2">
                {[
                  { label: "Pattern Recognition", prompt: "Analyze the recurring patterns and themes in my recent interactions with the RFM" },
                  { label: "Mind Evolution", prompt: "Reflect on how my thinking has evolved through my dialogues with the RFM" },
                  { label: "Meta-Cognition", prompt: "Perform a recursive analysis of the thought structures revealed in my RFM interactions" },
                  { label: "Knowledge Synthesis", prompt: "Synthesize the key insights from my memory archive into a cohesive framework" },
                ].map((template, i) => (
                  <button
                    key={i}
                    onClick={() => setReflectionPrompt(template.prompt)}
                    className="block w-full text-left p-2 bg-gray-800 hover:bg-gray-700 rounded text-sm text-gray-300 transition-colors"
                  >
                    {template.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main reflection area */}
          <div className="md:col-span-2">
            <div className="bg-gray-900 rounded-xl p-6">
              <form onSubmit={handleReflect} className="mb-6">
                <label htmlFor="reflectionPrompt" className="block text-lg font-medium text-white mb-2">
                  Reflection Prompt
                </label>
                <textarea
                  id="reflectionPrompt"
                  value={reflectionPrompt}
                  onChange={(e) => setReflectionPrompt(e.target.value)}
                  rows={4}
                  placeholder="What patterns do you observe in my interactions with the RFM?"
                  className="w-full bg-black text-white p-3 border border-gray-700 rounded mb-4"
                  required
                />
                
                {error && (
                  <div className="mb-4 p-3 bg-red-900/30 border border-red-500 text-red-200 rounded">
                    {error}
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded font-bold transition-all ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? 'Generating Reflection...' : 'Generate Reflection'}
                  </button>
                  
                  <div className="text-gray-400 text-sm">
                    Private reflection for {session?.user?.email}
                  </div>
                </div>
              </form>
              
              {reflection && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Your Reflection</h3>
                  <div className="bg-gray-800 p-4 rounded text-green-300 font-mono whitespace-pre-wrap">
                    {reflection}
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => {
                        // In a real implementation, this would save the reflection to the database
                        alert('Reflection saved to your collection');
                      }}
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                      </svg>
                      Save Reflection
                    </button>
                    
                    <button
                      onClick={() => {
                        // In a real implementation, this would download the reflection as a file
                        const element = document.createElement('a');
                        const file = new Blob([reflection], {type: 'text/plain'});
                        element.href = URL.createObjectURL(file);
                        element.download = `rfm-reflection-${new Date().toISOString().slice(0, 10)}.txt`;
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                      }}
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}