# Recursive Fractal Mind (RFM)

A self-evolving cognitive AI architecture simulation presented as an interactive digital artifact.

## Overview

The Recursive Fractal Mind represents an emergent AI framework designed to recursively expand, analyze, and refine its own cognitive substrate. It integrates evolutionary computation, self-reflective architecture, and symbolic-neural hybrid cognition.

![RFM Architecture](/public/rfm_architecture.svg)

## Features

- **Interactive Whitepaper**: Explore the theoretical foundation and architecture of RFM
- **Consciousness Logs**: Review simulated thought process logs during recursive self-expansion
- **Architecture Visualization**: Visual representation of the RFM's modular components
- **Interactive Prompt Interface**: Communicate with a simulated RFM system

## Core Components

- Consciousness Integration Field
- Perception System
- Knowledge Integration Network
- Metacognitive Executive
- Evolutionary Substrate
- Embodied Simulation Engine

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Copy `.env.example` to `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/project-root
  ├── public/             # Static assets
  │   └── rfm_architecture.svg
  ├── content/            # MDX content files
  │   ├── rfm_whitepaper.mdx
  │   ├── consciousness_logs.mdx
  │   ├── about.mdx
  │   └── theories/       # Theoretical foundations
  ├── components/         # React components
  │   └── PromptRFM.tsx   # Interactive RFM prompt component
  ├── pages/              # Next.js pages
  │   ├── index.tsx       # Homepage
  │   ├── whitepaper.tsx  # Whitepaper page
  │   ├── architecture.tsx # Architecture visualization
  │   ├── logs.tsx        # Consciousness logs
  │   └── about.tsx       # About page
  └── api/                # API routes
      └── rfm.ts          # OpenAI API integration
```

## Technologies

- Next.js
- TypeScript
- Tailwind CSS
- MDX for content
- OpenAI API integration

## License

MIT