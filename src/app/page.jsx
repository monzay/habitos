"use client";
import { totalHorasTareas } from "./funcionesGlobales/CalcularHorasTotales";
import { useState, useEffect, useRef } from "react";
import {
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import HeaderMovil from "./comonentes/HeaderMovil/HeaderMovil";
import HeaderMovilDesplegable from "./comonentes/HeaderMovilDesplegable/HeaderMovilDesplegable";
import TopUserMovil from "./comonentes/TopUserMovil/TopUserMovil";
import HeaderDesktop from "./comonentes/HeaderDesktop/HeaderDesktop";
import TopDesktop from "./comonentes/TopDesktop/TopDesktop";
import Button from "./comonentes/ui/Button";
import reniciarTodasLasTareas from "./funcionesGlobales/EliminarTodasLasTareaHechaCadaSemana";
import SecTareas from "./comonentes/Secciones/SecTareas/SecTareas";
import { daysOfWeek } from "./json";
import { calculateDay } from "./funcionesGlobales/CalculaElDia";


export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [timedTasks, setTimedTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newTask, setNewTask] = useState({
    text: "",
    scheduledTime: "",
    duration: "",
    day: "",
  });
  const [newTaskTime, setNewTaskTime] = useState("");
  const [newTaskDuration, setNewTaskDuration] = useState("");
  const [newTimedTask, setNewTimedTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingTimedTask, setEditingTimedTask] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [activeTab, setActiveTab] = useState("tasks");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showTopUsers, setShowTopUsers] = useState(false);
  const menuRef = useRef(null);
  const [mostrarCronometro,setMostrarCronometro] = useState(false)
  const [notas, setNotas] = useState({
    text: "",
    fecha: "",
  });

  const [tasksDay, setTasksDay] = useState([]);
  const [intervalHacerLaTarea, setIntervalHacerLaTarea] = useState(null);
  const [horasTotalesTareasDelDia, setHorasTotalesTareasDelDia] = useState(0);
  const [taskID, setTaskID] = useState({});
  const [mostrarTiempo, setMostrarTiempo] = useState("");
  const [dayWeek, setDayWeek] = useState(calculateDay());


  // Efecto que se ejecuta al cargar el componente
  useEffect(() => {
    // Obtenemos las tareas, tareas temporizadas, notas y puntos del usuario almacenados en el localStorage
    const storedTasks = localStorage.getItem("tasks");
    const storedNotes = localStorage.getItem("notes");

    // Si existen, los cargamos en el estado inicial
    if (storedTasks) setTasks(JSON.parse(storedTasks));
    if (storedNotes) setNotes(JSON.parse(storedNotes));

    // Configuramos un temporizador que se ejecuta cada segundo
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      checkTimedTasks(now);
    }, 1000);

    // Añadimos un event listener para detectar clics fuera del menú
    document.addEventListener("mousedown", handleClickOutside);

    // Al desmontar el componente, limpiamos el temporizador y el event listener
    return () => {
      clearInterval(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función que se ejecuta al hacer clic fuera del menú
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenuId(null);
    }
  };

  // Función que comprueba si hay tareas temporizadas que se han pasado de tiempo
  const checkTimedTasks = (now) => {
    const updatedTimedTasks = timedTasks.map((task) => {
      if (!task.completed) {
        const taskTime = new Date(
          now.toDateString() + " " + task.scheduledTime
        );
        if (now >= taskTime) {
          return { ...task, overdue: true };
        }
      }
      return task;
    });
    setTimedTasks(updatedTimedTasks);
  };

  // Función que añade una nueva tarea
  const addTask = () => {

    if(!newTask.duration.includes(":") || !isNaN(newTask.duration) ){
      alert("pelotudo pone bien la estructura")
      return 
    }

    if (newTask.text.length !== 0) {
      const newTaskItem = {
        id: Date.now(),
        text: newTask.text,
        createdAt: new Date().toISOString(),
        scheduledTime: newTask.scheduledTime,
        duration: newTask.duration,
        done: 0,
        undone: 0,
        day: newTask.day || calculateDay(),
        completed: false,
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask({
        text: "",
        scheduledTime: "",
        duration: "",
        day: "",
      });
      setNewTaskTime("");
      setNewTaskDuration("");
    }
  };

  // effect que verifica si ya exite el tasks en el localstorage y lo extrae del el ,  y si no crea el espacio 
  
  useEffect(() => {
    const tasksExite = localStorage.getItem("tasks");
    if (tasksExite) {
      if (tasks.length > 0) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    } else {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  }, [tasks]);

// effect que verifica si ya exite el notes en el localstorage y lo extrae del el ,  y si no crea el espacio 
  useEffect(() => {
    const notasExite = localStorage.getItem("notes");
    if (notasExite) {
      if (notes.length > 0) {
        localStorage.setItem("notes", JSON.stringify(notes));
      }
    } else {
      localStorage.setItem("notes", JSON.stringify([]));
    }
  }, [notes]);


  // Función que edita una tarea
  // modo
  const editTask = (id) => {
    setEditingTask(id);
    const taskEncontrado = tasks.find((task) => task.id === id);
    setNewTask({
      text: taskEncontrado.text,
      scheduledTime: taskEncontrado.scheduledTime,
      duration: taskEncontrado.duration,
    });
    setOpenMenuId(null);
  };


  // Función que actualiza una tarea
  const updateTask = () => {
    setTasks((prev) => {
      const newTasks = prev.map((tarea) =>
        tarea.id === editingTask
          ? {
              ...tarea,
              text: newTask.text,
              scheduledTime: newTask.scheduledTime,
              duration: newTask.duration,
            }
          : tarea
      );
      return newTasks;
    });
    setEditingTimedTask(null);
    setNewTimedTask("");
    setNewTaskTime("");
    setEditingTask(null);
    setNewTask({
      text: "",
      scheduledTime: "",
      duration: "",
    });
  };
  

  // Función que elimina una tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (tasks.length === 1) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
    setOpenMenuId(null);
  };


  // Función que añade una nueva nota
  const addNote = () => {
    if (notas.text.length !== 0) {
      const nuevaNota = {
        id: Date.now(),
        text: notas.text,
        createdAt: new Date().toISOString(),
        fecha: notas.fecha,
      };
      setNotes([...notes, nuevaNota]);
      setNotas({
        fecha: "",
        text: "",
      });
    }
  };


  // mode actualizar 
  const modoActualizar = (id) => {
    setEditingNote(id);
    const notaEncontrada = notes.find((note) => note.id === id);
    setNotas({
      text: notaEncontrada.text,
      fecha: notaEncontrada.fecha,
    });
    setOpenMenuId(null);
  };


  // Función que actualiza una nota
  const editarNota = () => {
    setNotes((prev) => {
      const nuevasNotas = prev.map((nota) =>
        nota.id === editingNote
          ? {
              ...nota,
              text: notas.text,
              fecha: notas.fecha,
            }
          : nota
      );
      return nuevasNotas;
    });
    setEditingNote(null);
    setNotas({
      text: "",
      fecha: "",
    });
  };


  // Función que elimina una nota
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (notes.length === 1) {
      localStorage.setItem("notes", JSON.stringify([]));
    }
    setOpenMenuId(null);
  };


  // Función que muestra u oculta el menú
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };


  // Función que muestra u oculta el menú móvil
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };


  // Función que muestra u oculta el panel de usuarios destacados
  const toggleTopUsers = () => {
    setShowTopUsers(!showTopUsers);
  };


 
/////////////////////////////////////////////////////////////////////////////////////


  // al hacer click en un dia se filtra las tareas por el dia 
  const filtelForDay = (day) => {
    const tasksDay = tasks.filter((task) => task.day === day);
    setTasksDay(tasksDay);
    setDayWeek(day);
  };


//////////////////////////////////////////////////////////////////////////////////


  // funcion no implementada en iu 
  function calcularHorasTotalesTareas() {
    let horasTotales = 0;
    let minutosTotales = 0;
    for (let i = 0; i < tasksDay.length; i++) {
      let txt = tasksDay[i].duration;

      if (txt.includes(":")) {
        const [horas, minutos] = txt.split(":");
        horasTotales += parseInt(horas);
        minutosTotales += parseInt(minutos);
      } else {
        horasTotales += parseInt(txt);
      }
      if (minutosTotales >= 60) {
        horasTotales += Math.floor(minutosTotales / 60);
        minutosTotales %= 60;
      }
    }

    const horasFinales = horasTotales + Math.floor(minutosTotales / 60);
    const minutosFinales = minutosTotales % 60;

    const tiempoFinalString = `${horasFinales}:${minutosFinales}`;
    setHorasTotalesTareasDelDia(tiempoFinalString);
  }

//////////////////////////////////////////////////////////////////////////////////

  // por ahora no vamos a gurdar el timepo trancurrido
  function HacerLaTarea() {
    let tiempo = taskID.duration;
    if (tiempo) {
      const partesTiempo = tiempo.split(":");
      let horasRestante = parseInt(partesTiempo[0]);
      let minutosRestante = parseInt(partesTiempo[1]);
      const interval = setInterval(() => {
        if (horasRestante !== 0 || minutosRestante !== 0) {
          minutosRestante -= 1;
          if (minutosRestante === 0) {
            if (horasRestante !== 0) {
              horasRestante -= 1;
              minutosRestante += 60;
            }
          }
          let tiempoTranscurrido = `${horasRestante}:${minutosRestante}`;
          setMostrarTiempo(tiempoTranscurrido);
          setIntervalHacerLaTarea(interval);
        }
      }, 1000);
    }
  }

//////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    HacerLaTarea();
    return () => clearInterval(intervalHacerLaTarea);
  }, [taskID]);


  //////////////////////////////////////////////////////////////////////////////////

  
  useEffect(() => {
    totalHorasTareas(tasksDay);
  }, [tasksDay]);
  //////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    filtelForDay(calculateDay());
  }, [tasks]);


  useEffect(() => {
    calcularHorasTotalesTareas();
  }, [dayWeek]);


  // click  y se marca la tarea que fue completada 
  const clickCheckboxTask = (id) => {
    const existingTask = tasks.find((task) => task.id === id);
    const isCompletedToday =
      existingTask?.completed && existingTask.day === getTodaysName();
    if (!existingTask || isCompletedToday) {
      return;
    }
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: task.done + 1, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  // Helper function to get today's day name in Spanish (replace with your preferred method)
  function getTodaysName() {
    const today = new Date().toLocaleDateString("es-ES", { weekday: "long" });
    return today.charAt(0).toUpperCase() + today.slice(1); // Capitalize the first letter
  }

  useEffect(() => {
    reniciarTodasLasTareas()
  }, [])




  
  // Renderizamos el componente
  return (
    <div className="flex flex-col md:flex-row h-screen bg-background text-foreground">
      {/* Header de iconos para móviles */}
      <HeaderMovil toggleTopUsers={toggleTopUsers} toggleMobileMenu={toggleMobileMenu}  />
      {/* Menú móvil desplegable */}
      {showMobileMenu && ( <HeaderMovilDesplegable toggleMobileMenu={toggleMobileMenu} /> )}
      {/* Panel de usuarios destacados para móviles */}
      {showTopUsers && <TopUserMovil toggleTopUsers={toggleTopUsers} />}
      {/* Header de iconos para desktop */}
      <HeaderDesktop />
      {/* Área principal */}
      <main className="flex-1 p-6 overflow-auto ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl  font-bold hidden md:block">
            {calculateDay()}{" "}
          </h1>
          <div className="text-lg font-semibold">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-2 mb-4">
            <Button
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              seccion="tasks"
              txt="Tarea"
            />
            <button
           style={{backdropFilter:"blur(10px)",background:"rgba(255,255,255,0.3"}}
              className={`px-4 py-2 rounded ${
                activeTab === "timedTasks"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
              onClick={() => setActiveTab("timedTasks")}
            >
              Tareas Temporizadas
            </button>
            <button
              style={{backdropFilter:"blur(10px)",background:"rgba(255,255,255,0.3"}}
              className={`px-4 py-2 rounded ${
                activeTab === "notes"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
              onClick={() => setActiveTab("notes")}
            >
              Notas
            </button>
          </div>
          {activeTab === "tasks" && (
            <SecTareas
              mostrarCronometro={mostrarCronometro}
              daysOfWeek={daysOfWeek}
              dayWeek={dayWeek}
              filtelForDay={filtelForDay}
              newTask={newTask}
              setNewTask={setNewTask}
              editingTask={editingTask}
              updateTask={updateTask}
              addTask={addTask}
              tasksDay={tasksDay}
              clickCheckboxTask={clickCheckboxTask}
              toggleMenu={toggleMenu}
              openMenuId={openMenuId}
              editTask={editTask}
              setTaskID={setTaskID}
              taskID={taskID}
              setMostrarCronometro={setMostrarCronometro}
              deleteTask={deleteTask}
              tasks={tasks}
              setTasks={setTasks}
              setEditingTask={setEditingTask}
              setTasksDay={setTasksDay}
              setDayWeek={setDayWeek}
              calcularHorasTotalesTareas={calcularHorasTotalesTareas}
              horasTotalesTareasDelDia={horasTotalesTareasDelDia}
            />
          )}
          {activeTab === "timedTasks" && (
           <div></div>
          )}
          {activeTab === "notes" && (
            <div className="space-y-4 ">
              <div className="flex space-x-2">
                <input
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder="Nueva nota"
                  value={notas.text}
                  onChange={(e) =>
                    setNotas((prev) => ({ ...prev, text: e.target.value }))
                  }
                />
                <input
                  type="date"
                  value={notas.fecha}
                  onChange={(e) =>
                    setNotas((prev) => ({ ...prev, fecha: e.target.value }))
                  }
                />
                <button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded"
                  onClick={editingNote ? editarNota : addNote}
                >
                  {editingNote ? "Actualizar" : "Agregar"}
                </button>
              </div>
              <div className="space-y-2 max-h-[calc(100vh-300px)] ">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-center justify-between py-2 px-3 bg-secondary rounded-lg"
                  >
                    <span>{note.text}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {note.fecha}
                      </span>
                      <div className="relative">
                        <button
                          onClick={() => toggleMenu(note.id)}
                          className="p-1 hover:bg-primary/10 rounded"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openMenuId === note.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg z-10">
                            <button
                              className="flex items-center w-full text-left px-4 py-2 hover:bg-secondary"
                              onClick={() => modoActualizar(note.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" /> Editar
                            </button>
                            <button
                              className="flex items-center w-full text-left px-4 py-2 hover:bg-secondary text-red-500"
                              onClick={() => deleteNote(note.id)}
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
            </div>
          )}
        </div>
      </main>
      {/* Panel de usuarios destacados para desktop */}
      <TopDesktop />
    </div>
  );
}
