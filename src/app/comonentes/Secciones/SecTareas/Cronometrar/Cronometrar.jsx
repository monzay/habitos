
import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from "lucide-react"

const Cronometrar =  ()=> {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [taskProgress, setTaskProgress] = useState(0)

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
        setTaskProgress((prevProgress) => Math.min(prevProgress + 0.05, 100))
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => setIsRunning(!isRunning)

  const resetTimer = () => {
    setTime(0)
    setTaskProgress(0)
    setIsRunning(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl rounded-2xl">
        <div className="p-6">
          <div className="flex flex-col items-center space-y-8">
            <div className="text-7xl font-light text-gray-800 dark:text-gray-100 transition-all duration-300 ease-in-out">
              {formatTime(time)}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={toggleTimer}
                className="p-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors duration-300"
              >
                {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full transition-colors duration-300"
              >
                <RotateCcw className="h-6 w-6" />
              </button>
            </div>
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-300">
                <span>Progreso</span>
                <span>{Math.round(taskProgress)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 ease-in-out" 
                  style={{ width: `${taskProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Cronometrar