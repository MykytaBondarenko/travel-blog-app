import './NavBar.css';

export default function NavBar() {
    return (
        <nav class="navbar">
            <a href="/travelLogs" id="sitetitle">OnTheRoad</a>
            <ul>
                <CustomLink href="/travelLogs">Travels</CustomLink>
                <CustomLink href="/journeyPlans">Plans</CustomLink>
                <CustomLink href="/login">Login</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ href, children, ...props }) {
    const path = window.location.pathname;

    return (
        <li className={path === href ? "active" : ""}>
            <a href={href} {...props}>{children}</a>
        </li>
    )
}