import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const testTask = await prisma.task.create({
      data: {
        text: 'Test Task',
        completed: false,
      },
    })
    res.status(200).json({ message: 'Database connection successful', task: testTask })
  } catch (error) {
    console.error('Database connection error:', error)
    res.status(500).json({ 
      message: 'Database connection failed', 
      error: error instanceof Error ? error.message : String(error) 
    })
  } finally {
    await prisma.$disconnect()
  }
}
