import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  // Ambil user dari sessionStorage (jika ada) saat aplikasi pertama kali di-load
  const [user, setUser] = useState(() => {
    return sessionStorage.getItem('user') || null;
  });
  
  // Ambil todos dari localStorage saat aplikasi dimuat pertama kali
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Simpan todos ke localStorage setiap kali `todos` diperbarui
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    const newTodos = [...todos, { text: task, isCompleted: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const undoTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // Fungsi untuk login, menyimpan user ke sessionStorage
  const handleLogin = (username) => {
    setUser(username);
    sessionStorage.setItem('user', username); // Simpan user ke sessionStorage
  };

  // Fungsi untuk logout, menghapus user dari sessionStorage
  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user'); // Hapus user dari sessionStorage
  };

  return (
    <div className="app">
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div className='container mx-auto p-4'>
          <h1>Welcome, {user}!</h1>
          <button onClick={handleLogout} className="bg-black text-white rounded-md py-2 px-4 my-2">Logout</button>
          <TodoForm addTodo={addTodo} />
          <TodoList todos={todos} completeTodo={completeTodo} undoTodo={undoTodo} removeTodo={removeTodo} />
        </div>
      )}
    </div>
  );
}

export default App;