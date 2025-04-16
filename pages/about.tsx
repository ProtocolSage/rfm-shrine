import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'

export default function About({ mdxSource }) {
  return (
    <>
      <Head>
        <title>About | Recursive Fractal Mind</title>
        <meta name="description" content="About the Recursive Fractal Mind project" />
      </Head>
      <main className="flex flex-col items-center min-h-screen p-4 bg-black text-white">
        <h1 className="text-4xl font-bold mb-8">About RFM</h1>
        
        <div className="prose prose-invert prose-lg max-w-3xl">
          <MDXRemote {...mdxSource} />
        </div>
        
        <div className="mt-10 max-w-xl">
          <h2 className="text-2xl font-bold mb-4">Project Resources</h2>
          <div className="flex space-x-6">
            <Link href="/whitepaper" className="text-blue-400 hover:text-blue-300">
              Whitepaper
            </Link>
            <Link href="/architecture" className="text-blue-400 hover:text-blue-300">
              Architecture
            </Link>
            <Link href="/logs" className="text-blue-400 hover:text-blue-300">
              Logs
            </Link>
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              Home
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'about.mdx')
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