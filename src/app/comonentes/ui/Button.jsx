import React from "react";

const Button = ({ activeTab, setActiveTab, seccion, txt }) => {
  return (
    <button
      style={{ background: "#275e7d", color: "white" }}
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
