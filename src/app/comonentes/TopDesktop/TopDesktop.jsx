import React, { useState } from "react";

const TopDesktop = () => {
  const [isActiveModo, setIsActiveMode] = useState("top");

  return (
    <aside style={{background:"rgba(255,255,255,0.1)",borderRadius:"10px",margin:"5px"}} className="hidden md:block w-64 p-4 bg-muted">
      {isActiveModo === "top" && (
        <>
          <h2 className="text-lg font-semibold mb-4">Usuarios Destacados</h2>
          <div className="">
            {[
              { name: "tetas", completed: 100 },
              { name: "Jose.", completed: 12 },
              { name: "Benja", completed: 10 },
            ].map((user, index) => (
              <div  style={{background:"rgba(255,255,255,0.1)",margin:"5px 0px",borderRadius:"5px",padding:"8px 5px"}} key={index} className="flex items-center space-x-2">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.completed} puntos{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {
        isActiveModo === "data" && (
          <div>
            data
          </div>
        )
      }
      <div style={{ display: "flex" , width:"100%"}}>
      <div style={{ flex: 1, background: "rgba(255,255,255,0.2)", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" ,borderRadius:"5px"}}>top</div>
      <div style={{ flex: 1, background: "rgba(255,255,255,0.2)", height: "40px", display: "flex", alignItems: "center", justifyContent: "center",borderRadius:"5px" }}>estadi</div>
    </div>
    </aside>
  );
};

export default TopDesktop;
