import React from 'react'
import { Home,ListTodo,CalendarDays ,Users,Settings} from 'lucide-react'
const HeaderDesktop = () => {
  return (
    <nav  style={{background:"rgba(255,255,255,0.1)"}} className="hidden md:flex md:flex-col items-center justify-start space-y-4 py-4 px-2 bg-secondary">
    <button className="p-2 rounded-full hover:bg-primary/10"><Home className="h-6 w-6" /></button>
    <button className="p-2 rounded-full hover:bg-primary/10"><ListTodo className="h-6 w-6" /></button>
    <button className="p-2 rounded-full hover:bg-primary/10"><CalendarDays className="h-6 w-6" /></button>
    <button className="p-2 rounded-full hover:bg-primary/10"><Users className="h-6 w-6" /></button>
    <button className="p-2 rounded-full hover:bg-primary/10"><Settings className="h-6 w-6" /></button>
  </nav>
  )
}

export default HeaderDesktop