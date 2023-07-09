import React, { useState, useEffect } from 'react';
import './TodoApp.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

//To fetch data whenever the page is render
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTodo,
          completed: false
        })
      });
      const data = await response.json();
      //To show new Todo at top
      setTodos([data,...todos]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Updated Todo',
          completed: true
        })
      });
      const data = await response.json();
      const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
          return data;
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      });
      //we are basically filtering the todolist using if
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
    <h1>Todo App</h1>
    <div className="input-container">
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
    <ul>
      {todos.map(todo => (
        <div className='tab'>
        <li key={todo.id}>
          {todo.title} - {todo.completed ? 'Completed' : 'Not Completed'}
          <ul>
          <button onClick={() => updateTodo(todo.id)}>Update</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </ul>
        </li>
        </div>
      ))}
    </ul>
  </div>
);
};

export default TodoApp;
