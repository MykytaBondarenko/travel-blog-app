import './NavBar.css';
import { Outlet, Link } from 'react-router-dom';

const NavBar = ({ loggedIn }) => {
    return (
        <>
            <nav class="navbar">
                <Link to="/travelLogs" id="sitetitle">OnTheRoad</Link>
                <ul>
                    <li><Link to="/travelLogs">Travels</Link></li>
                    <li><Link to="/journeyPlans">Plans</Link></li>
                    <li><Link to="/profile">{loggedIn?"Profile":"Login"}</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}

export default NavBar;