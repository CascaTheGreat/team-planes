import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;
