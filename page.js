'use client'

import { useState, useEffect, useRef } from "react"
import { CalendarDays, CheckCircle2, Home, ListTodo, Settings, Users, Edit, Trash2, XCircle, Menu, Clock, MoreVertical, Star, Timer, X } from "lucide-react"

export default function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [timedTasks, setTimedTasks] = useState([])
  const [notes, setNotes] = useState([])
  const [newTask, setNewTask] = useState("")
  const [newTaskTime, setNewTaskTime] = useState("")
  const [newTaskDuration, setNewTaskDuration] = useState("")
  const [newTimedTask, setNewTimedTask] = useState("")
  const [newNote, setNewNote] = useState("")
  const [editingTask, setEditingTask] = useState(null)
  const [editingTimedTask, setEditingTimedTask] = useState(null)
  const [editingNote, setEditingNote] = useState(null)
  const [activeTab, setActiveTab] = useState("tasks")
  const [showSidebar, setShowSidebar] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [openMenuId, setOpenMenuId] = useState(null)
  const [userPoints, setUserPoints] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showTopUsers, setShowTopUsers] = useState(false)
  const menuRef = useRef(null)

  

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    const storedTimedTasks = localStorage.getItem('timedTasks')
    const storedNotes = localStorage.getItem('notes')
    const storedPoints = localStorage.getItem('userPoints')
    if (storedTasks) setTasks(JSON.parse(storedTasks))
    if (storedTimedTasks) setTimedTasks(JSON.parse(storedTimedTasks))
    if (storedNotes) setNotes(JSON.parse(storedNotes))
    if (storedPoints) setUserPoints(parseInt(storedPoints))

    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      checkTimedTasks(now)
    }, 1000)

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      clearInterval(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('timedTasks', JSON.stringify(timedTasks))
  }, [timedTasks])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem('userPoints', userPoints.toString())
  }, [userPoints])

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenuId(null)
    }
  }

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

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskItem = {
        id: Date.now(),
        text: newTask,
        completed: false,
        createdAt: new Date().toISOString(),
        scheduledTime: newTaskTime,
        duration: newTaskDuration,
      }
      setTasks([...tasks, newTaskItem])
      setNewTask("")
      setNewTaskTime("")
      setNewTaskDuration("")
    }
  }

  const addTimedTask = () => {
    if (newTimedTask.trim() !== "" && newTaskTime !== "") {
      const newTimedTaskItem = {
        id: Date.now(),
        text: newTimedTask,
        completed: false,
        createdAt: new Date().toISOString(),
        scheduledTime: newTaskTime,
        overdue: false,
      }
      setTimedTasks([...timedTasks, newTimedTaskItem])
      setNewTimedTask("")
      setNewTaskTime("")
    }
  }

  const toggleTask = (id, isTimedTask = false) => {
    if (isTimedTask) {
      setTimedTasks(timedTasks.map(task => {
        if (task.id === id) {
          const completed = !task.completed
          if (completed) {
            setUserPoints(prevPoints => prevPoints + 1)
          }
          return { ...task, completed, overdue: false }
        }
        return task
      }))
    } else {
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return { ...task, completed: !task.completed }
        }
        return task
      }))
    }
  }

  const editTask = (id, isTimedTask = false) => {
    if (isTimedTask) {
      const taskToEdit = timedTasks.find(task => task.id === id)
      setEditingTimedTask(taskToEdit)
      setNewTimedTask(taskToEdit.text)
      setNewTaskTime(taskToEdit.scheduledTime || "")
    } else {
      const taskToEdit = tasks.find(task => task.id === id)
      setEditingTask(taskToEdit)
      setNewTask(taskToEdit.text)
      setNewTaskTime(taskToEdit.scheduledTime || "")
      setNewTaskDuration(taskToEdit.duration || "")
    }
    setOpenMenuId(null)
  }

  const updateTask = (isTimedTask = false) => {
    if (isTimedTask) {
      if (editingTimedTask && newTimedTask.trim() !== "" && newTaskTime !== "") {
        setTimedTasks(timedTasks.map(task => 
          task.id === editingTimedTask.id ? {
            ...task,
            text: newTimedTask,
            scheduledTime: newTaskTime,
          } : task
        ))
        setEditingTimedTask(null)
        setNewTimedTask("")
        setNewTaskTime("")
      }
    } else {
      if (editingTask && newTask.trim() !== "") {
        setTasks(tasks.map(task => 
          task.id === editingTask.id ? {
            ...task,
            text: newTask,
            scheduledTime: newTaskTime,
            duration: newTaskDuration,
          } : task
        ))
        setEditingTask(null)
        setNewTask("")
        setNewTaskTime("")
        setNewTaskDuration("")
      }
    }
  }

  const deleteTask = (id, isTimedTask = false) => {
    if (isTimedTask) {
      setTimedTasks(timedTasks.filter(task => task.id !== id))
    } else {
      setTasks(tasks.filter(task => task.id !== id))
    }
    setOpenMenuId(null)
  }

  const addNote = () => {
    if (newNote.trim() !== "") {
      const newNoteItem = {
        id: Date.now(),
        text: newNote,
        createdAt: new Date().toISOString()
      }
      setNotes([...notes, newNoteItem])
      setNewNote("")
    }
  }

  const editNote = (id) => {
    const noteToEdit = notes.find(note => note.id === id)
    setEditingNote(noteToEdit)
    setNewNote(noteToEdit.text)
    setOpenMenuId(null)
  }

  const updateNote = () => {
    if (editingNote && newNote.trim() !== "") {
      setNotes(notes.map(note => 
        note.id === editingNote.id ? {
          ...note,
          text: newNote,
        } : note
      ))
      setEditingNote(null)
      setNewNote("")
    }
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
    setOpenMenuId(null)
  }

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  const toggleTopUsers = () => {
    setShowTopUsers(!showTopUsers)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background text-foreground">
      {/* Header de iconos para móviles */}
      <nav className="md:hidden flex items-center justify-between p-4 bg-secondary">
        <button onClick={toggleMobileMenu} className="p-2 rounded-full hover:bg-primary/10">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Gestor de Tareas</h1>
        <button onClick={toggleTopUsers} className="p-2 rounded-full hover:bg-primary/10">
          <Users className="h-6 w-6" />
        </button>
      </nav>

      {/* Menú móvil desplegable */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Menú</h2>
            <button onClick={toggleMobileMenu} className="p-2 rounded-full hover:bg-primary/10">
              <X className="h-6 w-6" />
            </button>
          </div>
          <button className="p-2 rounded-full hover:bg-primary/10 mb-2 flex items-center">
            <Home className="h-6 w-6 mr-2" /> Inicio
          </button>
          <button className="p-2 rounded-full hover:bg-primary/10 mb-2 flex items-center">
            <ListTodo className="h-6 w-6 mr-2" /> Tareas
          </button>
          <button className="p-2 rounded-full hover:bg-primary/10 mb-2 flex items-center">
            <CalendarDays className="h-6 w-6 mr-2" /> Calendario
          </button>
          <button className="p-2 rounded-full hover:bg-primary/10 mb-2 flex items-center">
            <Users className="h-6 w-6 mr-2" /> Usuarios
          </button>
          <button className="p-2 rounded-full hover:bg-primary/10 mb-2 flex items-center">
            <Settings className="h-6 w-6 mr-2" /> Configuración
          </button>
        </div>
      )}

      {/* Panel de usuarios destacados para móviles */}
      {showTopUsers && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Usuarios Destacados</h2>
            <button onClick={toggleTopUsers} className="p-2 rounded-full hover:bg-primary/10">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: "Ana S.", completed: 15 },
              { name: "Carlos M.", completed: 12 },
              { name: "Elena R.", completed: 10 },
            ].map((user, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-lg">{user.name}</p>
                  <p className="text-muted-foreground">{user.completed} tareas completadas</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header de iconos para desktop */}
      <nav className="hidden md:flex md:flex-col items-center justify-start space-y-4 py-4 px-2 bg-secondary">
        <button className="p-2 rounded-full hover:bg-primary/10"><Home className="h-6 w-6" /></button>
        <button className="p-2 rounded-full hover:bg-primary/10"><ListTodo className="h-6 w-6" /></button>
        <button className="p-2 rounded-full hover:bg-primary/10"><CalendarDays className="h-6 w-6" /></button>
        <button className="p-2 rounded-full hover:bg-primary/10"><Users className="h-6 w-6" /></button>
        <button className="p-2 rounded-full hover:bg-primary/10"><Settings className="h-6 w-6" /></button>
      </nav>

 {/* Área principal */}
 <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold hidden md:block">Gestor de Tareas</h1>
          <div className="text-lg font-semibold">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Puntos: </span>
          <span className="text-primary">{userPoints}</span>
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
              <div className="flex flex-col space-y-2">
                <input
                  className="px-3 py-2 border rounded"
                  placeholder="Nueva tarea"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <div className="flex space-x-2">
                  <input
                    type="time"
                    className="px-3 py-2 border rounded flex-1"
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                  />
                  <input
                    type="text"
                    className="px-3 py-2 border rounded flex-1"
                    placeholder="Duración (ej: 2 horas)"
                    value={newTaskDuration}
                    onChange={(e) => setNewTaskDuration(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 bg-primary text-primary-foreground rounded"
                    onClick={editingTask ? updateTask : addTask}
                  >
                    {editingTask ? "Actualizar" : "Agregar"}
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-auto">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between py-2 px-3 bg-secondary rounded-lg">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="rounded"
                      />
                      <span className={task.completed ? "line-through" : ""}>{task.text}</span>
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
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder="Nueva nota"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded"
                  onClick={editingNote ? updateNote : addNote}
                >
                  {editingNote ? "Actualizar" : "Agregar"}
                </button>
              </div>
              <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-auto">
                {notes.map((note) => (
                  <div key={note.id} className="flex items-center justify-between py-2 px-3 bg-secondary rounded-lg">
                    <span>{note.text}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                      <div className="relative">
                        <button onClick={() => toggleMenu(note.id)} className="p-1 hover:bg-primary/10 rounded">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openMenuId === note.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg z-10">
                            <button
                              className="flex items-center w-full text-left px-4 py-2 hover:bg-secondary"
                              onClick={() => editNote(note.id)}
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
      <aside className="hidden md:block w-64 p-4 bg-muted">
        <h2 className="text-lg font-semibold mb-4">Usuarios Destacados</h2>
        <div className="space-y-4">
          {[
            { name: "Ana S.", completed: 15 },
            { name: "Carlos M.", completed: 12 },
            { name: "Elena R.", completed: 10 },
          ].map((user, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                {user.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.completed} tareas completadas</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}