import React, { useState } from "react";

const TopDesktop = () => {
  const [isActiveModo, setIsActiveMode] = useState("top");

  return (
    <aside className="hidden md:block w-64 p-4 bg-muted">
      {isActiveModo === "top" && (
        <>
          <h2 className="text-lg font-semibold mb-4">Usuarios Destacados</h2>
          <div className="space-y-4">
            {[
              { name: "tetas", completed: 100 },
              { name: "Jose.", completed: 12 },
              { name: "Benja", completed: 10 },
            ].map((user, index) => (
              <div key={index} className="flex items-center space-x-2">
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
      <div>
        <button>top</button>
        <button>data</button>
      </div>
    </aside>
  );
};

export default TopDesktop;
