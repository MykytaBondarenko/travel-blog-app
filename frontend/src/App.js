import './App.css';
import TravelLogs from "./components/TravelLogs/TravelLogs.js";
import JourneyPlans from "./components/JourneyPlans/JourneyPlans.js";
import LoginPage from "./components/LoginPage/LoginPage.js";
import UserProfile from "./components/UserProfile/UserProfile.js";
import NavBar from "./components/NavBar/NavBar.js";

function App() {
  let CurrentPage;
  switch(window.location.pathname) {
    case '/':
    case '/travelLogs':
      CurrentPage = TravelLogs;
      break;
    case '/journeyPlans':
      CurrentPage = JourneyPlans;
      break;
    case '/login':
      CurrentPage = LoginPage;
      break;
  }
  return (
    <div className="App">
      <NavBar></NavBar>
      <CurrentPage></CurrentPage>
    </div>
  );
}

export default App;
