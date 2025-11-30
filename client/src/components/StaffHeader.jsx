import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/citu_logo.png';
import '../styles/Header.css';

export default function StaffHeader()
{
    const navigate = useNavigate();

    const handleLogout = () =>
    {
        localStorage.removeItem('loggedInStaff');
        console.log('Staff logged out');
        navigate('/login');
    };

    return (
        <header className="header-container">
            <Link to="/staff/dashboard"> <img src={logo} alt="CIT-U Logo"/> </Link>
            <Link to="/staff/dashboard" className="site-name">
                <h1> Wildcats CLAW </h1>
                <h2> Campus Laptop Allocation Website </h2>
            </Link>
            <nav>
                <ul>
                    <li> <Link to="/staff/dashboard"> Dashboard </Link> </li>
                    <li> <Link to="/staff/browse"> Browse </Link> </li>
                    <li> <Link to="/staff/addlaptop"> Add Laptop </Link> </li>
                </ul>
            </nav>
            <div className="auth-buttons">
                <button onClick={handleLogout}> Logout </button>
            </div>
        </header>
    );
}