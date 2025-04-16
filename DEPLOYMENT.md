# Deployment Guide for Recursive Fractal Mind

This guide covers how to deploy your RFM project to GitHub and Vercel.

## 1. GitHub Repository Setup

### Creating a New Repository on GitHub

1. Go to [GitHub](https://github.com) and log in to your account
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "recursive-fractal-mind")
4. Add a description (optional)
5. Choose public or private visibility
6. Click "Create repository"

### Pushing Your Local Repository to GitHub

After creating the repository on GitHub, run these commands in your terminal:

```bash
# Add the remote repository URL
git remote add origin https://github.com/YOUR_USERNAME/recursive-fractal-mind.git

# Push your code to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## 2. Deploying to Vercel

### Option 1: Deploying with Vercel Dashboard

1. Go to [Vercel](https://vercel.com) and sign up or log in
2. Click "Add New..." and select "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Environment Variables: Add `OPENAI_API_KEY` with your actual API key
5. Click "Deploy"

### Option 2: Using Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy your project:
   ```bash
   cd /path/to/project-root
   vercel
   ```

4. Follow the CLI prompts:
   - Set up and deploy: Yes
   - Link to existing project: No
   - Project name: recursive-fractal-mind (or your chosen name)
   - Root directory: ./
   - Override settings: Yes
   - Build Command: `npm run build`
   - Output Directory: .next
   - Development Command: `npm run dev`

5. Add your environment variable:
   ```bash
   vercel env add OPENAI_API_KEY
   ```

6. Deploy to production:
   ```bash
   vercel --prod
   ```

## 3. Setting Up Environment Variables

Your project requires the `OPENAI_API_KEY` environment variable to function correctly.

### Local Development

Create a `.env.local` file in your project root and add:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### Vercel Deployment

In the Vercel dashboard:
1. Go to your project settings
2. Click on "Environment Variables"
3. Add a new variable:
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
4. Click "Save"

## 4. Testing Your Deployment

After deployment, open your project URL to verify it's working correctly:
1. Test navigation between pages
2. Verify that MDX content renders properly
3. Test the RFM prompt functionality

## 5. Custom Domain Setup (Optional)

In the Vercel dashboard:
1. Go to your project settings
2. Click on "Domains"
3. Add your custom domain
4. Follow the instructions to configure DNS

## Troubleshooting

1. **API Errors**: If the RFM prompt doesn't work, check your OpenAI API key and usage limits
2. **MDX Rendering Issues**: Verify your MDX files have correct frontmatter format
3. **Style Problems**: Check that Tailwind is configured correctly
4. **Build Failures**: Review Vercel build logs for detailed error information

For more help, check the [Next.js documentation](https://nextjs.org/docs) and [Vercel documentation](https://vercel.com/docs).