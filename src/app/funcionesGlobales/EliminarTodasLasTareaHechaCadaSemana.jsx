
function reniciarTodasLasTareas() {
    const exite = localStorage.getItem("ultamaVezVisita")
    if(!exite){
      localStorage.setItem("ultamaVezVisita",JSON.stringify(new Date().getTime()))   
    }else{
      const lastVisited = JSON.parse(localStorage.getItem("ultamaVezVisita"))
      const today = new Date();
      const oneWeek = 7 * 24 * 60 * 60 * 1000; 
      if (today.getTime() - lastVisited >= oneWeek ) {
        localStorage.setItem("ultamaVezVisita",JSON.stringify(new Date().getTime()))   
        const tareas = JSON.parse(localStorage.getItem("tareas") || "[]").map(t => ({ ...t, completada: false }));
        console.log(newTask)
        localStorage.setItem("tasks",JSON.stringify(tareas))
      }
    }
  }
  export default reniciarTodasLasTareas
