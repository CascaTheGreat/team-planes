import "../App.css";
import React from "react";
import { jsonToFirestore, getFlights } from "../helpers/firestore";

function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Page</h1>
      <div className="about-text">
        Flights of the future provides a platform for users to examine trends in
        Delta's flight patterns. Users can view the most popular routes, the
        most popular airports, and compare between years.
      </div>
      <div className="about-text">
        <a href="https://hoyalytics.com/">A Hoyalytics Project</a>
      </div>
    </div>
  );
}

export default AboutPage;
