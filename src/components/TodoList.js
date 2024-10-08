import React from 'react';

const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="mr-2"
          />
          <span className={`text-gray-800 ${todo.completed ? 'line-through' : ''}`}>
            {todo.text}
          </span>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="ml-auto bg-red-500 text-white p-1 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
