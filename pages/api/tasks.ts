import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res)
    case 'GET':
      return handleGet(req, res)
    case 'PUT':
      return handlePut(req, res)
    case 'DELETE':
      return handleDelete(req, res)
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { text } = req.body;
    const task = await prisma.task.create({
      data: { text },
    });
    res.status(201).json(task);
  } catch (error) {
    handleError(res, 'Error creating task', error);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tasks = await prisma.task.findMany()
    res.status(200).json(tasks)
  } catch (error) {
    handleError(res, 'Error fetching tasks', error)
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, completed } = req.body
    if (typeof id !== 'number' || typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'Invalid input' })
    }
    const task = await prisma.task.update({
      where: { id },
      data: { completed },
    })
    res.status(200).json(task)
  } catch (error) {
    handleError(res, 'Error updating task', error)
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = parseInt(req.query.id as string, 10)
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid task ID' })
    }
    await prisma.task.delete({ where: { id } })
    res.status(204).end()
  } catch (error) {
    handleError(res, 'Error deleting task', error)
  }
}

function handleError(res: NextApiResponse, message: string, error: unknown) {
  console.error(`${message}:`, error)
  res.status(500).json({ message, error: error instanceof Error ? error.message : 'Unknown error' })
}
