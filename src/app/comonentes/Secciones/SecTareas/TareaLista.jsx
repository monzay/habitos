import { Clock, Timer, MoreVertical, Edit, Trash2 } from 'lucide-react';

const TareaLista = ({ tasksDay, clickCheckboxTask, toggleMenu, openMenuId, editTask, setTaskID, setMostrarCronometro, deleteTask }) => {
  return (
    <div className="max-h-[calc(100vh-300px)]">
      {tasksDay.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between py-2 px-3 bg-[#c9e1ee] my-0.75 rounded-lg"
        >
          <div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {
                  clickCheckboxTask(task.id);
                }}
                className="rounded"
              />
              <span className={task.completed ? "line-through" : ""}>
                {task.text}
              </span>
            </div>
            <span>dias: {task.done + task.undone} </span>
            <span>x: {task.done} </span>
            <span>x: {task.undone} </span>
          </div>
          <div className="flex items-center space-x-2">
            {task.scheduledTime && (
              <span className="text-sm">
                <Clock className="h-4 w-4 inline mr-1" />
                {task.scheduledTime}
              </span>
            )}

            {task.duration && (
              <span className="text-sm">
                <Timer className="h-4 w-4 inline mr-1" />
                {task.duration}
              </span>
            )}

            <div className="relative">
              <button
                onClick={() => toggleMenu(task.id)}
                className="p-1 hover:bg-primary/10 rounded"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
              {openMenuId === task.id && (
                <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg z-10">
                  <button
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-secondary"
                    onClick={() => editTask(task.id)}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Editar
                  </button>
                  <button
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-secondary"
                    onClick={() => {
                      setTaskID(task)
                      setMostrarCronometro(true)
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Comenzar
                  </button>
                  <button
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-secondary text-red-500"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TareaLista;