import React from "react";

const Button = ({ activeTab, setActiveTab, seccion, txt }) => {
  return (
    <button
    style={{backdropFilter:"blur(10px)",background:"rgba(255,255,255,0.3"}}
      className={`px-4 py-2 rounded ${
        activeTab === seccion
          ? "bg-primary text-primary-foreground "
          : "bg-secondary"
      }`}
      onClick={() => setActiveTab("tasks")}
    >
      {txt}
    </button>
  );
};

export default Button;
