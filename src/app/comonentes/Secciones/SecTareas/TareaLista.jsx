import { Clock, Timer, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';


function calcularHorasFaltantesDelDia() {
  const ahora = new Date();
  const finDelDia = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), 23, 59, 59);
  const milisegundosFaltantes = finDelDia - ahora;
  const horasFaltantes = Math.floor(milisegundosFaltantes / (1000 * 60 * 60));
  const minutosFaltantes = Math.floor((milisegundosFaltantes % (1000 * 60 * 60)) / (1000 * 60));
  return ` h${horasFaltantes} m${minutosFaltantes}`
} 

function calcularHorarioInput (){
  const ahora = new Date();
  const totalMinutos = ahora.getHours() * 60 + ahora.getMinutes();
  console.log(totalMinutos)
  return totalMinutos 
}

const TareaLista = ({ tasksDay, clickCheckboxTask, toggleMenu, openMenuId, editTask, setTaskID, setMostrarCronometro, deleteTask }) => {
  const [hora , setHora] = useState(calcularHorarioInput());

  useEffect(() => {
     const interval = setInterval(() => {
      setHora( calcularHorarioInput())
    },  60000);
   return ()=>  clearInterval(interval)
  }, []);


  

  return (
    <div className="max-h-[calc(100vh-300px)]">
      <input 
        className="w-full "
        type="range" 
        max="1440"
        value={hora}
      />
      <p>tiempo faltante  {calcularHorasFaltantesDelDia()} </p>
      {tasksDay.map((task) => (
        <div
         style={{
          backdropFilter:"blur(10px)",
          background:"rgba(255,255,255,0.1)",
          margin:"4px 0px",
        } }
          key={task.id}
          className="flex items-center justify-between py-2 px-3  my-0.75 rounded-lg relatice "
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
              <span  className={task.completed ? "line-through" : ""}>
                {task.text}
              </span>
            </div>
            <span>d:     {task.done + task.undone} </span>
            <span>h: {task.done} </span>
            <span>nh: {task.undone} </span>
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
                <div   style={{
                  background:"rgba(255,255,255,0.2)",
                  position:"absolute",
                  right:0,
                  borderRadius:5
                }} className=" ">
                  <button
                    className="flex tems-center w-full text-left px-4 py-2 hover:bg-secondary"
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