import { daysOfWeek } from "@/app/json";
import { useEffect } from "react";


const SecDias  = ({  dayWeek, setNewTask, filtelForDay }) => {

  useEffect(()=> {
  },[dayWeek])
    return (
      <div className="flex overflow-x-auto">
        {daysOfWeek.map((day, index) => (
          <div 
          style={{backdropFilter:"blur(10px)",background:"rgba(255,255,255,0.2)"}}
            className={`mx-px px-2.5 py-2.5 m-0.25 rounded  flex-shrink-0`}
            onClick={() => {
              setNewTask((prev) => ({ ...prev, day }));
              filtelForDay(day);
            }}
            key={index}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  
  export default SecDias;