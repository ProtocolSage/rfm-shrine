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
    if (!fs.existsSync(memoryDir)) {
      return res.status(404).json({ error: 'No memories found' });
    }

    const files = await fs.promises.readdir(memoryDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      return res.status(404).json({ error: 'No memories found' });
    }

    // Read all memory files
    const memories = [];
    for (const file of jsonFiles) {
      const filePath = path.join(memoryDir, file);
      const data = await fs.promises.readFile(filePath, 'utf8');
      try {
        const memory = JSON.parse(data);
        memories.push(memory);
      } catch (e) {
        console.error(`Error parsing memory file ${file}:`, e);
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
      const mdxContent = `---
title: "RFM Memory Archive"
date: "${new Date().toISOString()}"
---

# Recursive Fractal Mind Memory Archive

This document contains the exported memory archive from your RFM interactions.

${memories.map(memory => `
## Memory: ${new Date(memory.timestamp).toLocaleString()}

### Prompt
\`\`\`
${memory.prompt}
\`\`\`

### Response
\`\`\`
${memory.response}
\`\`\`

### Tags
${memory.tags.map(tag => `- ${tag}`).join('\n')}

---
`).join('\n')}
`;

      res.setHeader('Content-Disposition', 'attachment; filename=rfm-memories.mdx');
      res.setHeader('Content-Type', 'text/markdown');
      return res.status(200).send(mdxContent);
    }
    else if (format === 'zip') {
      // Export as ZIP (containing both JSON and MDX)
      const zip = new JSZip();
      
      // Add JSON file
      zip.file('rfm-memories.json', JSON.stringify(memories, null, 2));
      
      // Add MDX file
      const mdxContent = `---
title: "RFM Memory Archive"
date: "${new Date().toISOString()}"
---

# Recursive Fractal Mind Memory Archive

This document contains the exported memory archive from your RFM interactions.

${memories.map(memory => `
## Memory: ${new Date(memory.timestamp).toLocaleString()}

### Prompt
\`\`\`
${memory.prompt}
\`\`\`

### Response
\`\`\`
${memory.response}
\`\`\`

### Tags
${memory.tags.map(tag => `- ${tag}`).join('\n')}

---
`).join('\n')}
`;
      zip.file('rfm-memories.mdx', mdxContent);
      
      // Individual memory files
      const individualFiles = zip.folder('memories');
      memories.forEach(memory => {
        individualFiles?.file(`${memory.id}.json`, JSON.stringify(memory, null, 2));
      });
      
      // Generate ZIP file
      const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
      
      res.setHeader('Content-Disposition', 'attachment; filename=rfm-memories.zip');
      res.setHeader('Content-Type', 'application/zip');
      return res.status(200).send(zipContent);
    }
  } catch (error) {
    console.error('Memory export error:', error);
    return res.status(500).json({ error: 'Failed to export memories' });
  }
}