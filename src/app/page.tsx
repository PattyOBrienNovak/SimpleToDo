'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

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
          <div className="text-center w-full max-w-md px-4"> {/* Added px-4 for some horizontal padding */}
            <div className="bg-gray-800/80 p-4 rounded-lg inline-block mb-4">
              <h1 className="text-5xl font-bold">Organize Your Life</h1>
            </div>
            <div className="bg-gray-800/80 p-4 rounded-lg inline-block mb-8">
              <p className="text-xl">
                Efficiently manage your tasks with<br />
                our AI-powered to-do list
              </p>
            </div>
            <div className="mt-4 bg-gray-800/80 p-4 rounded-lg"> {/* Added background and padding */}
              <AddTodo addTodo={addTodo} />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-8 p-4">
        <h2 className="text-3xl font-bold mb-4">Your To-Do List</h2>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </section>
    </div>
  );
}
