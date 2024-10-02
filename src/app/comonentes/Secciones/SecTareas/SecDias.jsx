import { daysOfWeek } from "@/app/json";


const SecDias  = ({  dayWeek, setNewTask, filtelForDay }) => {

    return (
      <div className="flex overflow-x-auto">
        {daysOfWeek.map((day, index) => (
          <div 
          style={{backdropFilter:"blur(10px)",background:"rgba(255,255,255,0.2)"}}
            className={`mx-px px-2.5 py-2.5 m-0.25 rounded text-white flex-shrink-0 ${day === dayWeek ? 'bg-[#4093b7]' : ''}`}
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