import React, { useState, useEffect } from 'react';
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [editingToDo, setEditingToDo] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleSaveToDo = (newToDo) => {
    setLoading(true);
    if (editingToDo) {
      console.log('si se actualizaa', newToDo);
      const editBody = {isCompleted: newToDo.isCompleted, taskName: newToDo.taskName, id: editingToDo.id}
      axios.put(`https://localhost:7071/api/ToDo/${editingToDo.id}`, editBody)
        .then(() => {
          fetchTodos();
          setEditingToDo(null);
        })
        .catch((error) => {
          console.error('Error al actualizarr todo:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log('entra a crear nueva tarea', newToDo)
      axios.post('https://localhost:7071/api/ToDo', newToDo)
        .then(() => {
          fetchTodos();
        })
        .catch((error) => {
          console.error('Error al crear todo:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // Función para cargar todas las tareas desde el backe /////
  const fetchTodos = () => {
    setLoading(true);
    axios.get('https://localhost:7071/api/ToDo')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Error al obyener todos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleToggleComplete = (id) => {
    const updatedToDo = todos.find(todo => todo.id === id);
    updatedToDo.isCompleted = !updatedToDo.isCompleted;
    axios.put(`https://localhost:7071/api/ToDo/${id}`, updatedToDo)
      .then(() => {
        fetchTodos();
      })
      .catch((error) => {
        console.error('Error al hacer update de status:', error);
      });
  };
  const handleDeleteToDo = (id) => {
    setLoading(true);
    axios.delete(`https://localhost:7071/api/ToDo/${id}`)
      .then(() => {
        fetchTodos();
      })
      .catch((error) => {
        console.error('Error al eliminar todo:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.isCompleted;
    if (filter === 'pending') return !todo.isCompleted;
    return true;
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center">Mi Lista de Tareas</h1>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">...</span>
          </div>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Filtrar Tareas:</label>
        <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>
      <ToDoForm todo={editingToDo} onSave={handleSaveToDo} />
      <ToDoList todos={filteredTodos} onEdit={setEditingToDo} onDelete={handleDeleteToDo} onToggleComplete={handleToggleComplete} />
    </div>
  );
};

export default App;
