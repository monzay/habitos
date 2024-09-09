import React from 'react'
import { X } from 'lucide-react'
const TopUserMovil = ({toggleTopUsers}) => {
  return (
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
  )
}

export default TopUserMovil