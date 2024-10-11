import React, { useState } from 'react';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateTasks: (goal: string) => Promise<void>;
}

const GoalModal: React.FC<GoalModalProps> = ({ isOpen, onClose, onGenerateTasks }) => {
  const [goal, setGoal] = useState('');
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateTasks = async () => {
    try {
      setError(null);
      await onGenerateTasks(goal);
      // For now, we'll use dummy data. We'll update this later with the API call.
      setGeneratedTasks(['Task 1', 'Task 2', 'Task 3']);
    } catch (err) {
      console.error('Error in GoalModal:', err);
      setError('Failed to generate tasks. Please try again.');
    }
  };

  const handleSelectAll = () => {
    setSelectedTasks([...generatedTasks]);
  };

  const handleDeselectAll = () => {
    setSelectedTasks([]);
  };

  const handleTaskSelection = (task: string) => {
    if (selectedTasks.includes(task)) {
      setSelectedTasks(selectedTasks.filter(t => t !== task));
    } else {
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <h2 className="text-2xl font-bold mb-4">Set Your Goal</h2>
        <textarea
          id="goal-input"
          className="w-full p-2 border rounded mb-4 text-gray-800 placeholder-gray-400 bg-gray-50" // Added bg-gray-50
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter your goal..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleGenerateTasks}
        >
          Generate Tasks with AI
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={onClose}
        >
          Exit
        </button>

        {generatedTasks.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Generated Tasks:</h3>
            <button onClick={handleSelectAll} className="mr-2">Select All</button>
            <button onClick={handleDeselectAll}>Deselect All</button>
            <ul>
              {generatedTasks.map((task, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task)}
                    onChange={() => handleTaskSelection(task)}
                    className="mr-2"
                  />
                  {task}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalModal;
