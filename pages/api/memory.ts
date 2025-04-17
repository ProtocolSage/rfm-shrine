// pages/api/memory.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type MemoryEntry = {
  id: string;
  timestamp: string;
  prompt: string;
  response: string;
  tags: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end('Method Not Allowed')

  try {
    const memoryDir = path.join(process.cwd(), 'public/memory')
    
    // Check if directory exists
    if (!fs.existsSync(memoryDir)) {
      return res.status(200).json({ memories: [] })
    }
    
    // Read all memory files
    const files = await fs.promises.readdir(memoryDir)
    const jsonFiles = files.filter(file => file.endsWith('.json'))
    
    const memories: MemoryEntry[] = []
    
    // Read and parse each file
    for (const file of jsonFiles) {
      const filePath = path.join(memoryDir, file)
      const data = await fs.promises.readFile(filePath, 'utf8')
      try {
        const memory = JSON.parse(data) as MemoryEntry
        memories.push(memory)
      } catch (e) {
        console.error(`Error parsing memory file ${file}:`, e)
      }
    }
    
    // Sort by timestamp, newest first
    memories.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    
    // Filter by tag if provided
    const tag = req.query.tag as string | undefined
    const filteredMemories = tag 
      ? memories.filter(m => m.tags.includes(tag))
      : memories
    
    res.status(200).json({ memories: filteredMemories })
  } catch (err) {
    console.error('Memory API Error:', err)
    res.status(500).json({ error: 'Error retrieving memories' })
  }
}