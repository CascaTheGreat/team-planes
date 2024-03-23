import "../App.css";
import React from "react";
import { jsonToFirestore, getFlights } from "../helpers/firestore";

function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Page</h1>
      <button onClick={jsonToFirestore}>Import JSON</button>
      <button onClick={() => getFlights(2020)}>Get Flights</button>
    </div>
  );
}

export default AboutPage;
