
import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from "lucide-react"

const Cronometrar =  ()=> {
  const [tiempo, setTiempo] = useState(0)
  const [estaEnMarcha, setEstaEnMarcha] = useState(false)

  useEffect(() => {
    
    let intervalo = null
    if (estaEnMarcha) {
      intervalo = setInterval(() => {
        setTiempo((tiempoAnterior) => tiempoAnterior + 1)
      }, 1000)
    } else if (intervalo) {
      clearInterval(intervalo)
    }
    return () => {
      if (intervalo) clearInterval(intervalo)
    }

  }, [estaEnMarcha])

   // salir del model cuando el tiempo se complete 
  useEffect(() => {
    
    if(false){
      setsalir(false)
      setEstaEnMarcha(false)
    }
  }, [tiempo])


  const formatearTiempo = (segundos) => {
    const horas = Math.floor(segundos / 3600)
    const minutos = Math.floor((segundos % 3600) / 60)
    const segundosRestantes = segundos % 60
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`
  }

  const alternarTemporizador = () => setEstaEnMarcha(!estaEnMarcha)

  const reiniciarTemporizador = () => {
    setTiempo(0)
    setProgresoTarea(0)
    setEstaEnMarcha(false)
  }




  return (
    <div className=" flex items-center justify-center flex-col py-32" >
         <div> 
            duracion: 2:23h
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