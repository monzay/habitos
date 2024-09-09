import React from 'react'
import { Home,ListTodo,CalendarDays,Users,Settings ,X} from 'lucide-react'
const HeaderMovilDesplegable = ({toggleMobileMenu}) => {
  return (
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
  )
}

export default HeaderMovilDesplegable