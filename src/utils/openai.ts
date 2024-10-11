export async function generateTasks(goal: string): Promise<string[]> {
  try {
    const response = await fetch('/api/generate-tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate tasks');
    }

    const data = await response.json();
    return data.tasks;
  } catch (error) {
    console.error('Error generating tasks:', error);
    throw error;
  }
}
