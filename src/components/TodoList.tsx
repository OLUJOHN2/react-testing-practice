// import { useState, ChangeEvent } from "react";

// interface Todo {
//   text: string;
//   completed: boolean;
// }

// const TodoList = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [newTodo, setNewTodo] = useState("");

//   const handleAddTodo = () => {
//     if (newTodo.trim()) {
//       setTodos([...todos, { text: newTodo, completed: false }]);
//       setNewTodo("");
//     }
//   };

//   const handleToggleTodo = (index: number) => {
//     const updatedTodos = [...todos];
//     updatedTodos[index].completed = !updatedTodos[index].completed;
//     setTodos(updatedTodos);
//   };

//   const handleDeleteTodo = (index: number) => {
//     const updatedTodos = todos.filter((_, i) => i !== index);
//     setTodos(updatedTodos);
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setNewTodo(e.target.value);
//   };

//   return (
//     <div>
//       <h1>Todo App</h1>
//       <input
//         type="text"
//         value={newTodo}
//         onChange={handleInputChange}
//         placeholder="Enter new todo"
//       />
//       <button onClick={handleAddTodo}>Add Todo</button>
//       <ul>
//         {todos.map((todo, index) => (
//           <li
//             key={index}
//             style={{ textDecoration: todo.completed ? "line-through" : "none" }}
//           >
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => handleToggleTodo(index)}
//             />
//             {todo.text}
//             <button onClick={() => handleDeleteTodo(index)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;

import { useEffect, useState } from "react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (todos.length === 0) return <div>No todos</div>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.title} {todo.completed ? "(Completed)" : "(Pending)"}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
