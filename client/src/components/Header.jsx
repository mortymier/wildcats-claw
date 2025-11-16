import { Link } from 'react-router-dom';
import logo from '../images/citu_logo.png';
import '../styles/Header.css';

export default function Header()
{
    return (
        <header className="header-container">
            <Link to="/"> <img src={logo} alt="CIT-U Logo"/> </Link>
            <Link to="/" className="site-name">
                <h1> Wildcats CLAW </h1>
                <h2> Campus Laptop Allocation Website </h2>
            </Link>
            <nav>
                <ul>
                    <li> <Link> Home </Link> </li>
                    <li> <Link> About </Link> </li>
                    <li> <Link> Contact </Link> </li>
                    <li> <Link> News </Link> </li>
                </ul>
            </nav>
            <div className="auth-buttons">
                <Link> Login </Link>
                <Link> Register </Link>
            </div>
        </header>
    );
}