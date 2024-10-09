import React from 'react';

const NotaInput = ({ notas, setNotas, editingNote, addNote, editarNota }) => {
  return (
    <div className="flex space-x-2">
      <input
        style={{background:"rgba(255,255,255,0.1)",border:"none"}}
        className="flex-1 px-3 py-2 border rounded"
        placeholder="Nueva nota"
        value={notas.text}
        onChange={(e) =>
          setNotas((prev) => ({ ...prev, text: e.target.value }))
        }
      />
      <input
        style={{background:"rgba(255,255,255,0.1)",border:"none"}}
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
  );
};

export default NotaInput;