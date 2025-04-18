// pages/index.tsx
import PromptRFM from '../components/PromptRFM'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">🧠 Recursive Fractal Mind</h1>
      <div className="w-full max-w-xl">
        <PromptRFM />
      </div>
    </main>
  )
}