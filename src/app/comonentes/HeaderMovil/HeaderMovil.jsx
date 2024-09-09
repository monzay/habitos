import React from 'react'
import { Users,Menu } from 'lucide-react'
const HeaderMovil = ({toggleMobileMenu,toggleTopUsers}) => {
    
  return (
    <nav className="md:hidden flex items-center justify-between p-4 bg-secondary">
    <button onClick={toggleMobileMenu} className="p-2 rounded-full hover:bg-primary/10">
      <Menu className="h-6 w-6" />
    </button>
    <h1 className="text-xl font-bold">Gestor de Tareas</h1>
    <button onClick={toggleTopUsers} className="p-2 rounded-full hover:bg-primary/10">
      <Users className="h-6 w-6" />
    </button>
  </nav>
  )
}

export default HeaderMovil