
import './App.css';
import React from 'react';
import Dashboard from "./Dashboard";
import TempWidget from "./Services/Weather/WeatherWidgets/TempWidget";
import ArtistWidget from "./Services/Deezer/DeezerWidgets/ArtistWidget";
import WeatherForm from "./Services/Weather/WeatherForms/WeatherForm";
import Weather from "./Services/Weather/Weather";

function App() {


  return (
    // <Weather/>
      <Dashboard/>
  );
}

export default App;
