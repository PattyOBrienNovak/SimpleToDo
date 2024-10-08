import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
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
