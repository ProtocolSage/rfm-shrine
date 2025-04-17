'use client'
import { useState } from 'react'

type ReflectionProps = {
  onReflect: (reflection: string) => void;
  isLoading: boolean;
}

export default function MemoryReflection({ onReflect, isLoading }: ReflectionProps) {
  const [reflectionType, setReflectionType] = useState('daily')
  
  const reflectionOptions = [
    { id: 'daily', label: 'Daily Reflection', prompt: 'Reflect on today\'s memory interactions and extract patterns' },
    { id: 'patterns', label: 'Pattern Recognition', prompt: 'Analyze the recurring patterns in my memory archive' },
    { id: 'metacognition', label: 'Metacognitive Analysis', prompt: 'Perform a meta-analysis of your own thinking based on memory archive' },
    { id: 'evolution', label: 'Cognitive Evolution', prompt: 'Reflect on how your thinking has evolved based on stored memories' }
  ]
  
  const handleReflect = () => {
    const selectedOption = reflectionOptions.find(option => option.id === reflectionType)
    if (selectedOption) {
      onReflect(selectedOption.prompt)
    }
  }
  
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-blue-400">Memory Reflection</h2>
      <p className="text-gray-300 mb-4">
        Request a reflection on the memory archive to reveal patterns and insights.
      </p>
      
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Reflection Type:</label>
        <select 
          value={reflectionType}
          onChange={(e) => setReflectionType(e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700"
        >
          {reflectionOptions.map(option => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <button
        onClick={handleReflect}
        disabled={isLoading}
        className={`w-full bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded font-bold transition-all ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Generating Reflection...' : 'Generate Reflection'}
      </button>
    </div>
  )
}