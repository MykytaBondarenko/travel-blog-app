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
  const [currentUser, setCurrentUser] = useState("");

  function handleLoggedIn(data) {
    setLoggedIn(data);
  }

  function handleCurrentUser(data) {
    setCurrentUser(data);
  }

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<NavBar loggedIn={loggedIn}/>}>
              <Route path="/travelLogs" element={<TravelLogs/>}></Route>
              <Route path="/journeyPlans" element={<JourneyPlans/>}></Route>
              <Route path="/profile" element={loggedIn?<UserProfile currentUser={currentUser} sendLoggedInToApp={handleLoggedIn} sendCurrentUserToApp={handleCurrentUser}/>:<LoginPage sendLoggedInToApp={handleLoggedIn} sendCurrentUserToApp={handleCurrentUser}/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);