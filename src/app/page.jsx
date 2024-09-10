'use client'

// Importamos los hooks de React que vamos a utilizar
import { useState, useEffect, useRef } from "react"
// Importamos los iconos que vamos a utilizar
import {  Edit, Trash2, Clock, MoreVertical, Timer, Navigation, ChevronDownSquare } from "lucide-react"
import HeaderMovil from "./comonentes/HeaderMovil/HeaderMovil"
import HeaderMovilDesplegable from "./comonentes/HeaderMovilDesplegable/HeaderMovilDesplegable"
import TopUserMovil from "./comonentes/TopUserMovil/TopUserMovil"
import HeaderDesktop from "./comonentes/HeaderDesktop/HeaderDesktop"
import TopDesktop from "./comonentes/TopDesktop/TopDesktop"

// Definimos el componente principal
export default function TaskManager() {
  // Definimos los estados iniciales de las tareas, tareas temporizadas, notas, etc.
  const [tasks, setTasks] = useState([])
  const [timedTasks, setTimedTasks] = useState([])
  const [notes, setNotes] = useState([])
  const [newTask, setNewTask] = useState({
        text: "",
        scheduledTime: "",
        duration: "",
        day:""
  })
  const [newTaskTime, setNewTaskTime] = useState("")
  const [newTaskDuration, setNewTaskDuration] = useState("")
  const [newTimedTask, setNewTimedTask] = useState("")
  const [newNote, setNewNote] = useState("")
  const [editingTask, setEditingTask] = useState(null)
  const [editingTimedTask, setEditingTimedTask] = useState(null)
  const [editingNote, setEditingNote] = useState(null)
  const [activeTab, setActiveTab] = useState("tasks")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [openMenuId, setOpenMenuId] = useState(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showTopUsers, setShowTopUsers] = useState(false)
  const menuRef = useRef(null)



  const [notas,setNotas] = useState({
    text:"",
    fecha:"",
  })


  const [tasksDay,setTasksDay] = useState([])


  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  // Efecto que se ejecuta al cargar el componente
  useEffect(() => {
    // Obtenemos las tareas, tareas temporizadas, notas y puntos del usuario almacenados en el localStorage
    const storedTasks = localStorage.getItem('tasks')
    const storedNotes = localStorage.getItem('notes')
    
    // Si existen, los cargamos en el estado inicial
    if (storedTasks) setTasks(JSON.parse(storedTasks))
    if (storedNotes) setNotes(JSON.parse(storedNotes))
        
    // Configuramos un temporizador que se ejecuta cada segundo
    const timer = setInterval(() => {
      const now = new Date()
      console.log(now.toLocaleTimeString())
      setCurrentTime(now)
      checkTimedTasks(now)
    }, 1000)

    // Añadimos un event listener para detectar clics fuera del menú
    document.addEventListener('mousedown', handleClickOutside)

    // Al desmontar el componente, limpiamos el temporizador y el event listener
    return () => {
      clearInterval(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])




  // Función que se ejecuta al hacer clic fuera del menú
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenuId(null)
    }
  }

  // Función que comprueba si hay tareas temporizadas que se han pasado de tiempo
  const checkTimedTasks = (now) => {
 
    const updatedTimedTasks = timedTasks.map(task => {
      if (!task.completed) {
        const taskTime = new Date(now.toDateString() + ' ' + task.scheduledTime)
        if (now >= taskTime) {
          return { ...task, overdue: true }
        }
      }
      return task
    })
    setTimedTasks(updatedTimedTasks)
  }

  // Función que añade una nueva tarea
  const addTask = () => {
    if (newTask.text.length  !== 0 ) {
      const newTaskItem = {
        id: Date.now(),
        text: newTask.text,
        createdAt: new Date().toISOString(),
        scheduledTime: newTask.scheduledTime,
        duration: newTask.duration,
        done:0,
        undone:0,
        day:newTask.day || calculateDay(),
        completed:false,
      }
      setTasks([...tasks, newTaskItem])
      setNewTask({
        text: "",
        scheduledTime: "",
        duration: "",
        day:""
      })
      setNewTaskTime("")
      setNewTaskDuration("")
    }
  }

  useEffect(() => {
    console.log(tasks)
  }, [tasks])
  
  

  useEffect(() => {
    const tasksExite = localStorage.getItem("tasks")
    if(tasksExite){
        if(tasks.length > 0){
            localStorage.setItem("tasks",JSON.stringify(tasks))
        }
    }else{
        localStorage.setItem("tasks",JSON.stringify([]))
    }
  }, [tasks])

  // Función que edita una tarea
  // modo 
  const editTask = (id) => {
    setEditingTask(id)
      const taskEncontrado  = tasks.find(task => task.id === id)
      setNewTask({
        text:taskEncontrado.text,
        scheduledTime: taskEncontrado.scheduledTime,
        duration: taskEncontrado.duration,
      })   
    setOpenMenuId(null)
  }
  
  // Función que actualiza una tarea
  const updateTask = () => {
    setTasks(prev => {
        const newTasks = prev.map(tarea  => tarea.id === editingTask  ? {
            ...tarea,
            text:newTask.text,
            scheduledTime: newTask.scheduledTime,
            duration: newTask.duration,
        } : tarea)
        return newTasks
    })
        setEditingTimedTask(null)
        setNewTimedTask("")
        setNewTaskTime("")
        setEditingTask(null)
        setNewTask({
            text:"",
            scheduledTime:"",
            duration:""
        })
  }
  // Función que elimina una tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
    if(tasks.length === 1){
        localStorage.setItem("tasks",JSON.stringify([]))
    }
    setOpenMenuId(null)
  }


  // Función que añade una nueva nota
  const addNote = () => {
    if (notas.text.length !== 0 ) {
      const nuevaNota = {
        id: Date.now(),
        text: notas.text,
        createdAt: new Date().toISOString(),
        fecha: notas.fecha,
      }
      setNotes([...notes, nuevaNota])
      setNotas({
        fecha:"",
        text:""
      })
    }
  }

  useEffect(() => {
    const notasExite = localStorage.getItem("notes")
    if(notasExite){
        if(notes.length > 0){
            console.log(notes)
            localStorage.setItem("notes",JSON.stringify(notes))
        }
    }else{
        localStorage.setItem("notes",JSON.stringify([]))
    }
  }, [notes])


 

  const modoActualizar   = (id) => {
    setEditingNote(id)
    const notaEncontrada = notes.find(note  => note.id === id )
    setNotas({
        text:notaEncontrada.text,
        fecha:notaEncontrada.fecha
    })
    setOpenMenuId(null)
  }
  // Función que actualiza una nota
  const editarNota  = () => {
    setNotes(prev => {
     const nuevasNotas = prev.map(nota =>  nota.id === editingNote ?  {
        ...nota,text: notas.text,
        fecha: notas.fecha 
    } : nota 
    )
     return nuevasNotas
    })
    setEditingNote(null)
    setNotas({
        text:"",
        fecha:""
    })
  }

  // Función que elimina una nota
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
    if(notes.length === 1){
        localStorage.setItem("notes",JSON.stringify([]))
    }
    setOpenMenuId(null)
  }

  // Función que muestra u oculta el menú
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  // Función que muestra u oculta el menú móvil
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  // Función que muestra u oculta el panel de usuarios destacados
  const toggleTopUsers = () => {
    setShowTopUsers(!showTopUsers)
  }


  const calculateDay  = () =>{
  const days  = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const date = new Date().getDay()
    if(date > 6 ){
      return "Domingo"
    }
    return  days[date - 1 ]
  }

    const filtelForDay = (day) =>{
        const tasksDay  =   tasks.filter(task => task.day === day)
        console.log(tasksDay)
        setTasksDay(tasksDay)
    }

    useEffect(() => {
      filtelForDay(calculateDay())
    }, [tasks])
    




    
  
  // Renderizamos el componente
  return (
    <div className="flex flex-col md:flex-row h-screen bg-background text-foreground">
      {/* Header de iconos para móviles */}
      <HeaderMovil toggleTopUsers={toggleTopUsers} toggleMobileMenu={toggleMobileMenu} />
      {/* Menú móvil desplegable */}
      {showMobileMenu && ( <HeaderMovilDesplegable toggleMobileMenu={toggleMobileMenu} /> )}
      {/* Panel de usuarios destacados para móviles */}
      {showTopUsers && ( <TopUserMovil toggleTopUsers={toggleTopUsers}/> )}
      {/* Header de iconos para desktop */}
     <HeaderDesktop/>
 {/* Área principal */}
   <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold hidden md:block">Gestor de Tareas</h1>
          <div className="text-lg font-semibold">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-2 mb-4">
            <button
              className={`px-4 py-2 rounded ${activeTab === 'tasks' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tareas
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'timedTasks' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              onClick={() => setActiveTab('timedTasks')}
            >
              Tareas Temporizadas
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'notes' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              onClick={() => setActiveTab('notes')}
            >
              Notas
            </button>
          </div>

          {activeTab === 'tasks' && (
            <div className="space-y-4">
                <div className="flex " >
                 {daysOfWeek.map((day, index) => (
                  <div onClick={() => {
                    setNewTask(prev => ({...prev,day}))
                    filtelForDay(day)
                  } } key={index} style={{padding:"10px 6px",background:"black",margin:"0px 1px",borderRadius:"4px",color:"white"}}>
                 {day}
             </div>
              ))}
           </div>
              <div className="flex flex-col space-y-2">
                <input
                  className="px-3 py-2 border rounded"
                  placeholder="Nueva tarea"
                  value={newTask.text}
                  onChange={(e) => setNewTask(prev => ({...prev,text:e.target.value}))}
                />
                <div className="flex space-x-2">
                  <input
                    type="time"
                    className="px-3 py-2 border rounded flex-1"
                    value={newTask.scheduledTime}
                    onChange={(e) => setNewTask(prev => ({...prev,scheduledTime:e.target.value}))}
                  />
                  <input
                    type="text"
                    className="px-3 py-2 border rounded flex-1"
                    placeholder="Duración (ej: 2 horas)"
                    value={newTask.duration}
                    onChange={(e) => setNewTask(prev => ({...prev,duration:e.target.value}))}
                  />
                  <button
                    className="px-4 py-2 bg-primary text-primary-foreground rounded"
                    onClick={editingTask ? updateTask : addTask}
                  >
                    {editingTask ? "Actualizar" : "Agregar"}
                  </button>
                </div>
              </div>
              <div className=" max-h-[calc(100vh-300px)] ">
                {tasksDay.map((task) => (
                  <div key={task.id} className="flex items-center justify-between py-2 px-3 bg-secondary rounded-lg">
                   <div>
                   <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => false}
                        className="rounded"
                      />
                      <span className={task.completed ? "line-through" : ""}>{task.text}</span>
                    </div>
                   {/* estadisticas de la tarea  */}
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
                        <button onClick={() => toggleMenu(task.id)} className="p-1 hover:bg-primary/10 rounded">
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
            </div>
          )}

          {activeTab === 'timedTasks' && (
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <input
                  className="px-3 py-2 border rounded"
                  placeholder="Nueva tarea temporizada"
                  value={newTimedTask}
                  onChange={(e) => setNewTimedTask(e.target.value)}
                />
                <div className="flex space-x-2">
                  <input
                    type="time"
                    className="px-3 py-2 border rounded flex-1"
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 bg-primary text-primary-foreground rounded"
                    onClick={editingTimedTask ? () => updateTask(true) : addTimedTask}
                  >
                    {editingTimedTask ? "Actualizar" : "Agregar"}
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-auto">
                {timedTasks.map((task) => (
                  <div key={task.id} className={`flex items-center justify-between py-2 px-3 rounded-lg ${task.overdue ? 'bg-red-100' : 'bg-secondary'}`}>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id, true)}
                        className="rounded"
                      />
                      <span className={task.completed ? "line-through" : ""}>{task.text}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">
                        <Timer className="h-4 w-4 inline mr-1" />
                        {task.scheduledTime}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                      <div className="relative">
                        <button onClick={() => toggleMenu(task.id)} className="p-1 hover:bg-primary/10 rounded">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openMenuId === task.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg z-10">
                            <button
                              className="flex items-center w-full text-left px-4 py-2 hover:bg-secondary"
                              onClick={() => editTask(task.id, true)}
                            >
                              <Edit className="h-4 w-4 mr-2" /> Editar
                            </button>
                            <button
                              className="flex items-center w-full text-left px-4 py-2 hover:bg-secondary text-red-500"
                              onClick={() => deleteTask(task.id, true)}
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
          
          {activeTab === 'notes' && (
            <div className="space-y-4 ">
              <div className="flex space-x-2">
                <input
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder="Nueva nota"
                  value={notas.text}
                  onChange={(e) => setNotas((prev) => ({...prev, text:e.target.value}))}
                />
                <input type="date" value={notas.fecha}   onChange={(e) => setNotas((prev) => ({...prev, fecha:e.target.value}))}/>
                <button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded"
                  onClick={editingNote ? editarNota : addNote}
                >
                  {editingNote ? "Actualizar" : "Agregar"}
                </button>
              </div>
              <div className="space-y-2 max-h-[calc(100vh-300px)] ">
                {notes.map((note) => (
                  <div key={note.id} className="flex items-center justify-between py-2 px-3 bg-secondary rounded-lg">
                    <span>{note.text}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {note.fecha}
                      </span>
                      <div className="relative">
                        <button onClick={() => toggleMenu(note.id)} className="p-1 hover:bg-primary/10 rounded">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openMenuId === note.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg z-10">
                            <button
                              className="flex items-center w-full text-left px-4 py-2 hover:bg-secondary"
                              onClick={() => modoActualizar(note.id) }
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
        <TopDesktop/>
    </div>
  )
}