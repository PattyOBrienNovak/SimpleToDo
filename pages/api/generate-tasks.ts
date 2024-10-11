import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Remove this line:
// console.log('API Key:', process.env.OPENAI_API_KEY.slice(0, 5) + '...');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { goal } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that breaks down goals into actionable tasks." },
        { role: "user", content: `Break down this goal into 10 numbered, actionable tasks. If you can't think of 10 tasks, it's okay to provide fewer, but please try to get as close to 10 as possible.: ${goal}` }
      ],
    });

    const tasksString = completion.choices[0].message.content;
    const tasks = tasksString?.split('\n').filter(task => task.trim() !== '') || [];

    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error generating tasks:', error);
    res.status(500).json({ error: 'Failed to generate tasks' });
  }
}
