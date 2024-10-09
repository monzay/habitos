function reniciarTodasLasTareas() {

  const existe = localStorage.getItem("ultamaVezVisita")
  if(!existe){
    localStorage.setItem("ultamaVezVisita",JSON.stringify(new Date().getTime()))   
  }else{
    const lastVisited = JSON.parse(localStorage.getItem("ultamaVezVisita"))
    const today = new Date();
    const oneWeek = 7 * 24 * 60 * 60 * 1000; 
 
    if (today.getTime() - lastVisited >= oneWeek  ) {
      localStorage.setItem("ultamaVezVisita",JSON.stringify(new Date().getTime()))   
      const tareas = JSON.parse(localStorage.getItem("tasks") || "[]")
       .map(t => ({ ...t, completed: false }));
       
       console.log(tareas)
      localStorage.setItem("tasks",JSON.stringify(tareas))
    }
  }
}

export default reniciarTodasLasTareas
