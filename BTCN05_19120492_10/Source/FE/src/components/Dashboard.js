import { Navigate } from "react-router-dom";
import React from "react";

function Dashboard() {
    const authenticated = localStorage.getItem("authenticated");

    if (authenticated === 'false') {
      return <Navigate replace to="/login" />;
    } 

    return (
      <div>
        <h1 className="text-white">Welcome to your Dashboard</h1>
      </div>
    );
}

export default Dashboard;