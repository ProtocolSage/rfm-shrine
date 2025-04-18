import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import JSZip from 'jszip';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get user from session
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify premium access (in a real app, you would check user subscription status)
    // For now, we'll assume all logged-in users have access to export
    // const hasSubscription = (session.user as any).hasSubscription === true;
    // if (!hasSubscription) {
    //   return res.status(403).json({ error: 'Premium subscription required' });
    // }

    // Get format from query params
    const { format = 'json' } = req.query;
    
    // Validate format
    if (!['json', 'mdx', 'zip'].includes(format as string)) {
      return res.status(400).json({ error: 'Invalid format. Supported formats: json, mdx, zip' });
    }

    // Read memory files
    const memoryDir = path.join(process.cwd(), 'public/memory');
    
    // Make sure directory exists
    if (!fs.existsSync(memoryDir)) {
      try {
        fs.mkdirSync(memoryDir, { recursive: true });
      } catch (err) {
        console.warn('Could not create memory directory for export:', err);
      }
      return res.status(200).json({ message: 'No memories found to export', memories: [] });
    }

    // Read directory safely
    let files: string[] = [];
    try {
      files = await fs.promises.readdir(memoryDir);
    } catch (err) {
      console.error('Error reading memory directory for export:', err);
      return res.status(200).json({ message: 'Unable to read memories', memories: [] });
    }
    
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      return res.status(200).json({ message: 'No memory files found', memories: [] });
    }

    // Read all memory files
    const memories = [];
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(memoryDir, file);
        const data = await fs.promises.readFile(filePath, 'utf8');
        const memory = JSON.parse(data);
        memories.push(memory);
      } catch (e) {
        console.error(`Error reading or parsing memory file ${file}:`, e);
      }
    }

    // Sort by timestamp
    memories.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Handle different export formats
    if (format === 'json') {
      // Export as JSON
      res.setHeader('Content-Disposition', 'attachment; filename=rfm-memories.json');
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(memories);
    } 
    else if (format === 'mdx') {
      // Export as MDX
      try {
        // Create safe MDX content
        let mdxContent = `---
title: "RFM Memory Archive"
date: "${new Date().toISOString()}"
---

# Recursive Fractal Mind Memory Archive

This document contains the exported memory archive from your RFM interactions.

`;

        // Add each memory with safer content handling
        for (const memory of memories) {
          try {
            const timestamp = new Date(memory.timestamp).toLocaleString();
            const prompt = memory.prompt || '';
            const response = memory.response || '';
            const tags = Array.isArray(memory.tags) ? memory.tags : [];
            
            mdxContent += `
## Memory: ${timestamp}

### Prompt
\`\`\`
${prompt}
\`\`\`

### Response
\`\`\`
${response}
\`\`\`

### Tags
${tags.map(tag => `- ${tag}`).join('\n')}

---
`;
          } catch (err) {
            console.error('Error adding memory to MDX', err);
          }
        }

        res.setHeader('Content-Disposition', 'attachment; filename=rfm-memories.mdx');
        res.setHeader('Content-Type', 'text/markdown');
        return res.status(200).send(mdxContent);
      } catch (err) {
        console.error('Error generating MDX file:', err);
        return res.status(500).json({ error: 'Failed to generate MDX file' });
      }
    }
    else if (format === 'zip') {
      // Export as ZIP (containing both JSON and MDX)
      try {
        const zip = new JSZip();
        
        // Add JSON file with safe formatting
        zip.file('rfm-memories.json', JSON.stringify(memories, null, 2));
        
        // Create safe MDX content
        let mdxContent = `---
title: "RFM Memory Archive"
date: "${new Date().toISOString()}"
---

# Recursive Fractal Mind Memory Archive

This document contains the exported memory archive from your RFM interactions.

`;

        // Add each memory with safer content handling
        for (const memory of memories) {
          try {
            const timestamp = new Date(memory.timestamp).toLocaleString();
            const prompt = memory.prompt || '';
            const response = memory.response || '';
            const tags = Array.isArray(memory.tags) ? memory.tags : [];
            
            mdxContent += `
## Memory: ${timestamp}

### Prompt
\`\`\`
${prompt}
\`\`\`

### Response
\`\`\`
${response}
\`\`\`

### Tags
${tags.map(tag => `- ${tag}`).join('\n')}

---
`;
          } catch (err) {
            console.error('Error adding memory to MDX', err);
          }
        }
        
        zip.file('rfm-memories.mdx', mdxContent);
        
        // Individual memory files
        const individualFiles = zip.folder('memories');
        if (individualFiles) {
          memories.forEach(memory => {
            try {
              if (memory && memory.id) {
                individualFiles.file(`${memory.id}.json`, JSON.stringify(memory, null, 2));
              }
            } catch (err) {
              console.error('Error adding individual memory file', err);
            }
          });
        }
        
        // Generate ZIP file
        const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
        
        res.setHeader('Content-Disposition', 'attachment; filename=rfm-memories.zip');
        res.setHeader('Content-Type', 'application/zip');
        return res.status(200).send(zipContent);
      } catch (err) {
        console.error('Error generating ZIP file:', err);
        return res.status(500).json({ error: 'Failed to generate ZIP archive' });
      }
    }
  } catch (error) {
    console.error('Memory export error:', error);
    return res.status(500).json({ error: 'Failed to export memories' });
  }
}