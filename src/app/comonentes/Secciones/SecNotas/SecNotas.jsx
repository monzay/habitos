import React from 'react';
import NotaInput from "./NotaInput"
import NotaLista from "./NotaLista"
const SecNotas = ({notas, setNotas, editingNote, addNote, editarNota, notes, toggleMenu, openMenuId, modoActualizar, deleteNote}) => {


    
return (
    <div className="space-y-4 ">
    <NotaInput 
      notas={notas} 
      setNotas={setNotas} 
      editingNote={editingNote} 
      addNote={addNote} 
      editarNota={editarNota} 
    />
    <NotaLista 
      notes={notes} 
      toggleMenu={toggleMenu} 
      openMenuId={openMenuId} 
      modoActualizar={modoActualizar} 
      deleteNote={deleteNote} 
    />
  </div>
)
}

export default SecNotas