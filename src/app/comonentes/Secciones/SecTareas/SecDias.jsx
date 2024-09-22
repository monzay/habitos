const SecDias  = ({ daysOfWeek, dayWeek, setNewTask, filtelForDay }) => {
    return (
      <div className="flex overflow-x-auto">
        {daysOfWeek.map((day, index) => (
          <div 
            className={`mx-px bg-cyan-800 px-2.5 py-2.5 m-0.25 rounded text-white flex-shrink-0 ${day === dayWeek ? 'bg-[#4093b7]' : ''}`}
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