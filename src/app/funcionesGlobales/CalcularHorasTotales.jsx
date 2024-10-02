export function totalHorasTareas(arrayDeTareas) {
    let hora = 0;
    let minutos = 0;
    for (let i = 0; i < arrayDeTareas.length; i++) {
      const parte = arrayDeTareas[i].duration.split(":");
      hora += parseInt(parte[0]);
      minutos += parseInt(parte[1]);
    }
    hora += Math.floor(minutos / 60);
    minutos %= 60;
    const timeTotal = `${hora}:${minutos}`;
    return timeTotal;
  }