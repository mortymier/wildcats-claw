import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/Register.css';

export default function Register()
{
    return (
        <>
            <title> Register - Wildcats CLAW </title>
            <Header/>
            <main className="register-container">
                <div>
                    <h1> User Registration </h1>
                    <p> Please select role: </p>
                    <hr/>
                    <Link to="/register/student"> STUDENT </Link>
                    <p> or </p>
                    <Link to="/register/staff"> STAFF </Link>
                </div>
            </main>
            <Footer/>
        </>
    );
}