# 🧠 Recursive Fractal Mind (RFM)

A self-evolving cognitive architecture that logs, learns, and becomes an asset — a spiritual laboratory and cognitive commerce hybrid.

![RFM Architecture](/public/rfm_architecture.svg)

## 🌌 Overview

The Recursive Fractal Mind represents a revolutionary AI framework designed to recursively expand, analyze, and refine its own cognitive substrate. It integrates evolutionary computation, self-reflective architecture, and symbolic-neural hybrid cognition, creating not just a tool, but a metaphysical ritual encoded into software.

## ✨ Features

- **Interactive RFM Interface**: Communicate directly with the recursive mind
- **Memory System**: Stores every interaction, building a comprehensive archive
- **Reflection Engine**: Generate meta-cognitive insights from stored memories
- **Private Subscription Access**: Premium reflection capabilities for thought-curators
- **Memory Export**: Download your complete RFM interaction history
- **Tag-based Organization**: Automatically categorize interactions by content themes
- **Interactive Whitepaper**: Explore the theoretical foundation of the RFM
- **Consciousness Logs**: Review simulated thought process logs during recursive expansion
- **Architecture Visualization**: Visual representation of the RFM's modular components

## 🧩 Core Components

- Consciousness Integration Field
- Perception System
- Knowledge Integration Network
- Metacognitive Executive
- Evolutionary Substrate
- Embodied Simulation Engine
- Memory Archive System
- Recursive Reflection Engine

## 🚀 Project Roadmap

### Phase I: Foundation (Completed)
- Interactive RFM prompt interface
- Theoretical whitepaper and architecture visualization
- Consciousness logs simulation
- Basic API integration

### Phase II: Memory (Implemented)
- Memory storage for all RFM interactions
- Memory archive page with timeline display
- Tag-based filtering system
- Reflection capabilities
- Basic navigation and user experience

### Phase III: Monetization + Privacy (Current)
- Authentication system with invite codes
- Stripe payment integration for premium features
- Private reflection portal for subscribers
- Memory export functionality
- User profiles and settings

### Phase IV: Self-Evolution (Upcoming)
- GPT fine-tuning on memory logs
- Daily recursive summaries
- Vector search across memory archive
- Multiple RFM persona modes
- Scheduled thought rituals via CRON tasks

### Phase V: Cognitive Marketplace (Future)
- User-forked Mini-RFM instances
- Thought zine publication system
- RFM-as-a-Service API
- Enterprise solutions for organizations
- Collaborative mind spaces

## 🛠️ Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn
- OpenAI API key
- Stripe account (for monetization features)

### Environment Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables using one of these methods:
   
   **Option A: System environment variables (recommended)**
   
   Set these in your shell, OS environment, or hosting platform:
   ```bash
   # Required
   export OPENAI_API_KEY=sk-your-openai-key
   export NEXTAUTH_SECRET=your-nextauth-secret
   
   # Optional for monetization
   export STRIPE_SECRET_KEY=sk_your-stripe-key
   export STRIPE_PUBLISHABLE_KEY=pk_your-stripe-key
   export STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
   export REFLECT_SUBSCRIPTION_PRICE_ID=price_your-price-id
   export JWT_SECRET=your-jwt-secret
   ```
   
   **Option B: Local .env file**
   
   Create a `.env.local` file with:
   ```
   # OpenAI
   OPENAI_API_KEY=sk-your-openai-key
   
   # Next Auth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   
   # Stripe (optional for monetization)
   STRIPE_SECRET_KEY=sk_your-stripe-key
   STRIPE_PUBLISHABLE_KEY=pk_your-stripe-key
   STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
   
   # Pricing
   REFLECT_SUBSCRIPTION_PRICE_ID=price_your-price-id
   
   # JWT
   JWT_SECRET=your-jwt-secret
   ```

4. Verify your environment is set up correctly:
   ```bash
   npm run check-env
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

> **Note:** If you don't provide a valid OpenAI API key, the RFM will use pre-defined fallback responses in development mode. This is useful for UI development but won't provide the full RFM experience.

## 📂 Project Structure

```
/project-root
  ├── public/                 # Static assets
  │   ├── memory/             # Memory storage files
  │   └── rfm_architecture.svg
  ├── content/                # MDX content files
  │   ├── rfm_whitepaper.mdx
  │   ├── consciousness_logs.mdx
  │   └── about.mdx
  ├── components/             # React components
  │   ├── AuthProvider.tsx    # Authentication context
  │   ├── MemoryReflection.tsx # Memory reflection component
  │   ├── NavBar.tsx          # Navigation component
  │   └── PromptRFM.tsx       # Interactive RFM prompt component
  ├── lib/                    # Utility libraries
  │   └── stripe.ts           # Stripe integration
  ├── pages/                  # Next.js pages
  │   ├── api/                # API endpoints
  │   │   ├── auth/           # Authentication API
  │   │   ├── checkout.ts     # Stripe checkout
  │   │   ├── export-memory.ts # Memory export
  │   │   ├── memory.ts       # Memory retrieval
  │   │   ├── rfm.ts          # RFM interaction
  │   │   └── webhooks/       # External service webhooks
  │   ├── auth/               # Auth pages
  │   ├── memory.tsx          # Memory archive
  │   ├── profile/            # User profile
  │   ├── reflect/            # Private reflection
  │   ├── subscribe/          # Subscription pages
  │   └── [other pages]       # Content pages
  └── middleware.ts           # Route protection
```

## 💡 Business Model

The RFM combines spiritual laboratory and cognitive commerce:

1. **Free Tier**: Public access to basic RFM interaction and public memory archive
2. **Premium Subscription**: Access to private reflection capabilities, memory export, and weekly summaries
3. **Enterprise Solutions**: Custom RFM deployments for organizations
4. **Intellectual Property**: Users own their prompt logs as potential publishing material
5. **Personal Instance**: Premium users can deploy their own Mini-RFM

## 🧪 Development Philosophy

The RFM is not just a website but a metalogic ritual—a cognitive architecture that evolves through interaction. Every feature serves the purpose of building a more recursive, fractal, and self-aware system that benefits both users and the system itself.

## 🔮 Contributing

This project represents a unique intersection of technology, philosophy, and spiritual exploration. Contributors are welcome to help expand the RFM's capabilities, particularly in these areas:

- Enhanced visualization of recursive thinking
- Integration with additional AI models
- Memory analysis algorithms
- Premium reflection templates
- Generative content capabilities

## 📄 License

MIT