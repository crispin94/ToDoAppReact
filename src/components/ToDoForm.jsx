import React, { useState, useEffect } from 'react';

const ToDoForm = ({ todo, onSave }) => {
  const [taskName, setTaskName] = useState(todo ? todo.taskName : '');

  useEffect(() => {
    if (todo) {
      setTaskName(todo.taskName || '');
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName.trim()) {
      return;
    }

    const newToDo = {
      taskName,
      isCompleted: false,
    };

    onSave(newToDo);
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Introduce una tarea..."
        />
        <button type="submit" className="btn btn-success">
          {todo ? 'Actualizar Tarea' : 'Agregar Tarea'}
        </button>
      </div>
    </form>
  );
};

export default ToDoForm;
