import React, { useState } from 'react';

interface AddTodoProps {
  addTodo: (text: string) => void; // Define the type for the addTodo prop
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return; // Prevent adding empty tasks
    addTodo(text); // Call the addTodo function passed as a prop
    setText(''); // Clear the input field
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        className="w-full border border-gray-300 bg-white p-2 rounded text-gray-800 placeholder-gray-400 mb-2"
      />
      <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold p-2 rounded transition-colors">
        Add Task
      </button>
    </form>
  );
};

export default AddTodo; 