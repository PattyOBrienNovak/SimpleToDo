'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import GoalModal from '../components/GoalModal';
import { generateTasks } from '../utils/openai';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Home component mounted');
    return () => {
      console.log('Home component unmounted');
    };
  }, []);

  const addTodo = (text: string) => {
    console.log('Adding todo:', text);
    setTodos(prevTodos => [...prevTodos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    console.log('Toggling todo:', id);
    setTodos(prevTodos => prevTodos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    console.log('Deleting todo:', id);
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleGenerateTasks = async (goal: string) => {
    try {
      console.log('Generating tasks for goal:', goal);
      const generatedTasks = await generateTasks(goal);
      generatedTasks.forEach(task => addTodo(task));
      setIsGoalModalOpen(false);
    } catch (err) {
      console.error('Error generating tasks:', err);
      setError('Failed to generate tasks. Please try again.');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="home-content">
      <section className="hero relative h-[500px] overflow-hidden rounded-lg">
        <Image
          src="/hero-image.jpg"
          alt="Colorful abstract representation of AI and technology"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink/50 to-purple-600/50 flex items-center justify-center">
          <div className="text-center w-full max-w-md px-4">
            <div className="bg-gray-800/80 p-4 rounded-lg inline-block mb-4">
              <h1 className="text-5xl font-bold">Organize Your Life</h1>
            </div>
            <div className="bg-gray-800/80 p-4 rounded-lg inline-block mb-8">
              <p className="text-xl">
                Efficiently manage your tasks with<br />
                our AI-powered to-do list
              </p>
            </div>
            <div className="mt-4 bg-gray-800/80 p-4 rounded-lg">
              <AddTodo addTodo={addTodo} />
              <button
                onClick={() => setIsGoalModalOpen(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded transition-colors mt-2"
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-8 p-4">
        <h2 className="text-3xl font-bold mb-4">Your To-Do List</h2>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </section>

      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onGenerateTasks={handleGenerateTasks}
      />
    </div>
  );
}