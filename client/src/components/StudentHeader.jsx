import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/citu_logo.png';
import '../styles/Header.css';

export default function StudentHeader()
{
    const navigate = useNavigate();

    const handleLogout = () =>
    {
        localStorage.removeItem('loggedInStudent');
        console.log('Student logged out');
        navigate('/login');
    };

    return (
        <header className="header-container">
            <Link to="/student/dashboard"> <img src={logo} alt="CIT-U Logo"/> </Link>
            <Link to="/student/dashboard" className="site-name">
                <h1> Wildcats CLAW </h1>
                <h2> Campus Laptop Allocation Website </h2>
            </Link>
            <nav>
                <ul>
                    <li> <Link to="/student/dashboard"> Dashboard </Link> </li>
                    <li> <Link to="/student/browse"> Browse </Link> </li>
                    <li> <Link to="/student/schedules"> Schedules </Link> </li>
                </ul>
            </nav>
            <div className="auth-buttons">
                <button onClick={handleLogout}> Logout </button>
            </div>
        </header>
    );
}