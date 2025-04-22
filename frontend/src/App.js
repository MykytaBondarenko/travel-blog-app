import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {useState} from 'react';
import TravelLogs from "./components/TravelLogs/TravelLogs.js";
import JourneyPlans from "./components/JourneyPlans/JourneyPlans.js";
import LoginPage from "./components/LoginPage/LoginPage.js";
import UserProfile from "./components/UserProfile/UserProfile.js";
import NavBar from "./components/NavBar/NavBar.js";

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  function handleLoggedIn(data) {
    setLoggedIn(data);
  }

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<NavBar loggedIn={loggedIn}/>}>
              <Route path="/travelLogs" element={<TravelLogs/>}></Route>
              <Route path="/journeyPlans" element={<JourneyPlans/>}></Route>
              <Route path="/profile" element={loggedIn?<UserProfile sendLoggedInToApp={handleLoggedIn}/>:<LoginPage sendLoggedInToApp={handleLoggedIn}/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);