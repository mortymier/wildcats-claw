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
                    <li> <Link to="/"> Home </Link> </li>
                    <li> <Link to="/"> About </Link> </li>
                    <li> <Link to="/"> Contact </Link> </li>
                    <li> <Link to="/"> News </Link> </li>
                </ul>
            </nav>
            <div className="auth-buttons">
                <Link to="/login"> Login </Link>
                <Link to="/register"> Register </Link>
            </div>
        </header>
    );
}