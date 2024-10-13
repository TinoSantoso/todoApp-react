import React from 'react';

function TodoList({ todos, completeTodo, undoTodo, removeTodo }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Task</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className={`py-2 px-4 border-b ${todo.isCompleted ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </td>
              <td className="py-2 px-4 border-b">
                {/* Conditional rendering untuk tombol Complete atau Undo */}
                {!todo.isCompleted ? (
                  <button
                    onClick={() => completeTodo(index)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    Complete
                  </button>
                ) : (
                  <button
                    onClick={() => undoTodo(index)}
                    className="bg-amber-500 text-white px-2 py-1 rounded hover:bg-amber-600 mr-2"
                  >
                    Undo
                  </button>
                )}
                <button
                  onClick={() => removeTodo(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;