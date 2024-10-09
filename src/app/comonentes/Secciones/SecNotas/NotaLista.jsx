import React, { useEffect } from 'react';
import { Edit, Trash2, MoreVertical } from "lucide-react";




const NotaLista = ({ notes, toggleMenu, openMenuId, modoActualizar, deleteNote }) => {


  // Esta función ordena un arreglo de fechas en formato 'YYYY-MM-DD' de manera ascendente.
  function ordenarNotasPorFechas (fechas){
    // Ordenar el arreglo de fechas utilizando el método sort() y una función de comparación.
    // La función de comparación convierte cada fecha a un objeto Date y luego compara los objetos.
    // El método sort() devuelve el arreglo ordenado, pero en este caso, estamos devolviendo el arreglo original.
    const fechasOrdenadas = fechas.sort((a, b) => {
      const fechaA = new Date(a);
      const fechaB = new Date(b);
      return fechaA - fechaB;
    });

    return fechasOrdenadas  ;
  }



  return (
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
  );
};

export default NotaLista;