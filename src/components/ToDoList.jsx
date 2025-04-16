import React from 'react';

const ToDoList = ({ todos, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className="mt-3">
      {todos.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No se encontraron tareas! Puede agregar una tarea usando el formulario.
        </div>
      ) : (
        <table className="table table-bordered table-striped table-responsive">
          <thead>
            <tr>
              <th className="text-center">Id</th>
              <th className="text-center">Completar Tarea</th>
              <th className="text-center">Nombre de la Tarea</th>
              <th className="text-center">Status</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr 
                key={todo.id} 
                className={todo.isCompleted ? 'table-success' : ''}
              >
                <td className="text-center">{todo.id}</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => onToggleComplete(todo.id)} 
                  />
                </td>
                <td>{todo.taskName}</td>

                <td className="text-center">
                  <span className={`badge ${todo.isCompleted ? 'bg-success' : 'bg-warning'}`}>
                    {todo.isCompleted ? 'Completed' : 'Pending'}
                  </span>
                </td>
                <td className="text-center">
                  <button className="btn btn-info me-2" onClick={() => onEdit(todo)}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ToDoList;
