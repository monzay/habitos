import TareaLista from './TareaLista';
import FormTarea from './FormTarea';
import SecDias from './SecDias';
import Cronometrar from './Cronometrar/Cronometrar';

const SecTareas = ({
  mostrarCronometro,
  dayWeek,
  filtelForDay,
  newTask,
  setNewTask,
  editingTask,
  updateTask,
  addTask,
  tasksDay,
  clickCheckboxTask,
  toggleMenu,
  openMenuId,
  editTask,
  setTaskID,
  setMostrarCronometro,
  deleteTask,
  taskID
}) => {
    

  return (
    <div>
      {mostrarCronometro ? (
        <Cronometrar  taskID={taskID} setMostrarCronometro={setMostrarCronometro}/>
      ) : (
        <div className="space-y-4">
          <SecDias 
            dayWeek={dayWeek}
            setNewTask={setNewTask}
            filtelForDay={filtelForDay}
          />
          <FormTarea 
            newTask={newTask}
            setNewTask={setNewTask}
            editingTask={editingTask}
            updateTask={updateTask}
            addTask={addTask}
          />
          <TareaLista 
            tasksDay={tasksDay}
            clickCheckboxTask={clickCheckboxTask}
            toggleMenu={toggleMenu}
            openMenuId={openMenuId}
            editTask={editTask}
            setTaskID={setTaskID}
            setMostrarCronometro={setMostrarCronometro}
            deleteTask={deleteTask}
          />
        </div>
      )}
    </div>
  );
}; 

export default SecTareas;