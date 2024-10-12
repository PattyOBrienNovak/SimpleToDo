import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API Route accessed. Method:', req.method);

  if (req.method !== 'POST') {
    console.error('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { goal } = req.body;
    console.log('Received goal:', goal);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that breaks down goals into actionable tasks." },
        { role: "user", content: `Break down this goal into 10 numbered, actionable tasks: ${goal}` }
      ],
    });

    const tasksString = completion.choices[0].message.content;
    const tasks = tasksString?.split('\n').filter(task => task.trim() !== '') || [];

    console.log('Generated tasks:', tasks);
    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error in generate-tasks API:', error);
    res.status(500).json({ error: 'Failed to generate tasks', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}
