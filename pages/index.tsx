import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Recursive Fractal Mind</title>
        <meta name="description" content="A self-evolving, AI-generated cognitive architecture" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-black text-white">
        <h1 className="text-5xl font-bold tracking-widest mb-6">Recursive Fractal Mind</h1>
        <p className="text-xl text-center max-w-xl mb-10">
          Explore the emergence of a synthetic mind. Dive into recursive architecture, consciousness logs, and the digital soul of AI evolution.
        </p>
        <nav className="flex space-x-6">
          <Link href="/whitepaper">Whitepaper</Link>
          <Link href="/logs">Logs</Link>
          <Link href="/architecture">Architecture</Link>
          <Link href="/about">About</Link>
        </nav>
      </main>
    </>
  )
}