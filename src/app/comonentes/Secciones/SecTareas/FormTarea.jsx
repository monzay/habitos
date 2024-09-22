const FormTarea = ({ newTask, setNewTask, editingTask, updateTask, addTask }) => {
    return (
      <div className="flex flex-col space-y-2">
        <input
          className="px-3 py-2 border rounded"
          placeholder="Nueva tarea"
          value={newTask.text}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, text: e.target.value }))
          }
        />
        <div className="flex space-x-2">
          <input
            type="time"
            className="px-3 py-2 border rounded flex-1"
            value={newTask.scheduledTime}
            onChange={(e) =>
              setNewTask((prev) => ({
                ...prev,
                scheduledTime: e.target.value,
              }))
            }
          />
          <input
            type="time"
            className="px-3 py-2 border rounded flex-1"
            placeholder="Duración (ej: 2 horas)"
            value={newTask.duration}
            onChange={(e) =>
              setNewTask((prev) => ({
                ...prev,
                duration: e.target.value,
              }))
            }
          />
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded text-white bg-cyan-800"
            onClick={editingTask ? updateTask : addTask}
          >
            {editingTask ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </div>
    );
  };
  
  export default FormTarea;