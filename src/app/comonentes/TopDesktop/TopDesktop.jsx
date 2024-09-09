import React from 'react'

const TopDesktop = () => {
  return (
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
  )
}

export default TopDesktop