export async function generateTasks(goal: string): Promise<string[]> {
  try {
    console.log('Sending request to generate tasks for goal:', goal);
    const response = await fetch('/api/generate-tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error response:', errorData);
      throw new Error(`API error: ${response.status} - ${errorData.error}`);
    }

    const data = await response.json();
    console.log('Received tasks:', data.tasks);
    return data.tasks;
  } catch (error) {
    console.error('Error generating tasks:', error);
    throw error;
  }
}
