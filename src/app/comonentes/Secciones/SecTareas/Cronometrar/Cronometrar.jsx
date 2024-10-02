
import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, CreativeCommons } from "lucide-react"

const Cronometrar =  ({taskID,setMostrarCronometro})=> {
  const [tiempo, setTiempo] = useState(0)
  const [estaEnMarcha, setEstaEnMarcha] = useState(false)

  useEffect(()=>{
    console.log(taskID)
  },[taskID])

  // effecto que se encarga de de inicia el cronometro 
  useEffect(() => {
    let intervalo = null
    if (estaEnMarcha) {
      intervalo = setInterval(() => {
        setTiempo((prev) => prev + 1)
      }, 1000)
    }
     return ()=>  clearInterval(intervalo)
  }, [estaEnMarcha])

   // salir del model cuando el tiempo se complete 
  function obtenerDuracionTarea (){
    const tareas = JSON.parse(localStorage.getItem("tasks"));
    const tarea = tareas.find(tarea => tarea.id === taskID.id);
    return tarea.duration
  }



  // funcion  que  marca como tarea completada cuando termino la duracion de la tarea 
  function marcarTareaComoPletada (tareaID){
    const tareasLocales =  JSON.parse(localStorage.getItem("tasks"))
    const newTareasLocales =  tareasLocales.map(tarea => tarea.id === tareaID ? {...tarea,completed:true} : tarea )
    localStorage.setItem("tasks",JSON.stringify(newTareasLocales))
  }


  // funcion que se encarga de solucionar 
  useEffect(() => {
    function tareaFinalizada  (){
      const tareas = JSON.parse(localStorage.getItem("tasks"));
      const tarea = tareas.find(tarea => tarea.id === taskID.id);
      //  para la estructura 00:00
      if(tarea.duration.includes(":") ){
        const partes  = tarea.duration.split(":") 
        const horaSegundo  = parseInt(partes[0]) *  60 * 60 
        const minutosSegundos =  parseInt(partes[1]) * 60 
        const total =  horaSegundo +  minutosSegundos 
        if(total === tiempo ){
          console.log("tarea terminada")
          setEstaEnMarcha(false)
          setMostrarCronometro(false )
          marcarTareaComoPletada(taskID.id)
        }
        // se ejecuta en caso de que no tenga hora  y si minutos 
      }else{
        const partes  = tarea.duration.split(":") 
        const horaSegundo  = parseInt(partes[0]) * 60 
        if(horaSegundo === tiempo ){
          setEstaEnMarcha(false)
          setMostrarCronometro(false )
          marcarTareaComoPletada(taskID.id)
        }
      }
    }
    tareaFinalizada()
  }, [tiempo])



  // formatea la hora  y retorna esta estructura 00:00:00 
  const formatearTiempo = (segundos) => {
    const horas = Math.floor(segundos / 3600)
    const minutos = Math.floor((segundos % 3600) / 60)
    const segundosRestantes = segundos % 60
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`
  }

  const alternarTemporizador = () => setEstaEnMarcha(!estaEnMarcha)

  const reiniciarTemporizador = () => {
    setTiempo(0)
    setEstaEnMarcha(false)
  }




  return (
    <div className=" flex items-center justify-center flex-col py-32" >
         <div> 
            duracion: {obtenerDuracionTarea()}h
         </div>
        <div className="p-6">
          <div className="flex flex-col items-center space-y-8">
            <div className="text-7xl font-light text-gray-800 dark:text-gray-100 transition-all duration-300 ease-in-out">
              {formatearTiempo(tiempo)}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={alternarTemporizador}
                className="p-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors duration-300"
              >
                {estaEnMarcha ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              <button
                onClick={reiniciarTemporizador}
                className="p-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full transition-colors duration-300"
              >
                <RotateCcw className="h-6 w-6" />
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}


export default Cronometrar