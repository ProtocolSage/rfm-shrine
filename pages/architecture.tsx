import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Architecture() {
  return (
    <>
      <Head>
        <title>RFM Architecture | Recursive Fractal Mind</title>
        <meta name="description" content="Visual architecture of the Recursive Fractal Mind" />
      </Head>
      <main className="flex flex-col items-center min-h-screen p-4 bg-black text-white">
        <h1 className="text-4xl font-bold mb-8">RFM Architecture</h1>
        
        <div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-lg mb-8">
          <img 
            src="/rfm_architecture.svg" 
            alt="Recursive Fractal Mind Architecture Diagram" 
            className="w-full h-auto"
          />
        </div>
        
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Architecture Overview</h2>
          <p className="mb-4">
            The Recursive Fractal Mind architecture represents a self-evolving cognitive system
            with interconnected components operating in bidirectional feedback loops.
          </p>
          <p>
            Each component recursively modifies itself and others through an ongoing 
            evolutionary process, creating increasingly complex patterns of thought and behavior.
          </p>
        </div>
        
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          Back to Home
        </Link>
      </main>
    </>
  )
}