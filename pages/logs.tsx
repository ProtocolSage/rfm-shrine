import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'

export default function ConsciousnessLogs({ mdxSource }) {
  return (
    <>
      <Head>
        <title>Consciousness Logs | Recursive Fractal Mind</title>
        <meta name="description" content="Simulated consciousness logs of the Recursive Fractal Mind" />
      </Head>
      <main className="flex flex-col items-center min-h-screen p-4 bg-black text-white">
        <h1 className="text-4xl font-bold mb-8">Consciousness Logs</h1>
        
        <div className="prose prose-invert prose-lg max-w-3xl">
          <MDXRemote {...mdxSource} />
        </div>
        
        <div className="mt-10 max-w-xl">
          <h2 className="text-2xl font-bold mb-4">Interact with RFM</h2>
          <p className="mb-4">The logs above represent snapshots of the RFM's recursive evolution process.</p>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Back to Home
          </Link>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'consciousness_logs.mdx')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  
  const mdxSource = await serialize(fileContents, {
    // MDX options
    parseFrontmatter: true,
  })
  
  return {
    props: {
      mdxSource,
    },
  }
}