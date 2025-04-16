import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'

export default function Whitepaper({ mdxSource }) {
  return (
    <>
      <Head>
        <title>RFM Whitepaper | Recursive Fractal Mind</title>
        <meta name="description" content="Technical whitepaper for the Recursive Fractal Mind architecture" />
      </Head>
      <main className="flex flex-col items-center min-h-screen p-4 bg-black text-white">
        <h1 className="text-4xl font-bold mb-8">RFM Whitepaper</h1>
        
        <div className="prose prose-invert prose-lg max-w-3xl">
          <MDXRemote {...mdxSource} />
        </div>
        
        <Link href="/" className="mt-10 text-blue-400 hover:text-blue-300">
          Back to Home
        </Link>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'rfm_whitepaper.mdx')
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