import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../api/auth.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import user_icon from '../images/user_icon.png';
import email_icon from '../images/email_icon.png';
import lock_icon from '../images/lock_icon.png';
import '../styles/Login.css';

export default function Login()
{
    const navigate = useNavigate();
    const [role, setRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCancel = () => 
    {
        navigate('/');
    };

    const handleSubmit = async(e) =>
    {
        e.preventDefault();

        const response = await loginUser(role, email, password);
    }

    return (
        <>
            <title> Login - Wildcats CLAW </title>
            <Header/>
            <main className="login-container">
                <form onSubmit={handleSubmit}>
                    <h1> Wildcats CLAW </h1>
                    <p> Login to your account </p>
                    <hr/>
                    <div> 
                        {/* Role Input */}
                        <div className="login-input">
                            <div className="input-label">
                                <img src={user_icon} alt="Role icon"/>
                                <label htmlFor="role"> Role </label>
                            </div>
                            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="student"> STUDENT </option>
                                <option value="staff"> STAFF </option>
                            </select>
                        </div>
                        {/* Email Input */}
                        <div className="login-input">
                            <div className="input-label">
                                <img src={email_icon} alt="Email icon"/>
                                <label htmlFor="email"> Email </label>
                            </div>
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        {/* Password Input */}
                        <div className="login-input">
                            <div className="input-label">
                                <img src={lock_icon} alt="Password icon"/>
                                <label htmlFor="password"> Password </label>
                            </div>
                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        {/* Buttons */}
                        <div className="login-buttons">
                            <button type="button" onClick={handleCancel}> Cancel </button>
                            <button type="submit"> Login </button>
                        </div>
                    </div>
                </form>
            </main>
            <Footer/>
        </>
    );
}