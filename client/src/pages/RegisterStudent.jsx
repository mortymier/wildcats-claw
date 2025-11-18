import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
import { registerStudent } from '../api/auth.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/RegisterRole.css';

export default function RegisterStudent()
{
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState('');
    const [formData, setFormData] = useState
    ({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        contactnum: '',
        program: '',
        yearlvl: ''
    });

    const handleCancel = () => 
    {
        navigate('/register');
    };

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async(e) =>
    {
        e.preventDefault();

        if(formData.password !== confirm)
        {
            alert("Passwords do not match");
        }
        else if(window.confirm('Proceed with registration?'))
        {
            const response = await registerStudent(formData);

            if(response.ok)
                navigate("/login");
        }
    };

    return (
        <>
            <title> Register - Wildcats CLAW </title>
            <Header/>
            <main className="registerrole-container">
                <form onSubmit={handleSubmit}>
                    <h1> Student Registration </h1>
                    <p> Please enter your details </p>
                    <hr/>
                    {/* Section 1: Personal Information */}
                    <div className="register-section">
                        <h2> Personal Information </h2>
                        {/* First Name */}
                        <div className="register-input">
                            <label htmlFor="firstname"> First Name </label>
                            <input
                                id="firstname" 
                                name="firstname"
                                type="text" 
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                             />
                        </div>
                        {/* Last Name */}
                        <div className="register-input">
                            <label htmlFor="lastname"> Last Name </label>
                            <input 
                                id="lastname"
                                name="lastname" 
                                type="text" 
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Program */}
                        <div className="register-input">
                            <label htmlFor="program"> Program </label>
                            <input 
                                id="program" 
                                name="program" 
                                type="text" 
                                value={formData.program} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                        {/* Year Level */}
                        <div className="register-input">
                            <label htmlFor="yearlvl"> Year Level </label>
                            <input 
                                id="yearlvl"
                                name="yearlvl" 
                                type="number" 
                                value={formData.yearlvl} 
                                onChange={handleChange} 
                                min="1" 
                                max="5" 
                                required
                            />
                        </div>
                        {/* Contact Number */}
                        <div className="register-input">
                            <label htmlFor="contactnum"> Contact No. </label>
                            <input 
                                id="contactnum" 
                                name="contactnum"
                                type="text" 
                                value={formData.contactnum} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                    </div>
                    {/* Section 2: Login Credentials */}
                    <div className="register-section">
                        <h2> Login Credentials </h2>
                        {/* Email */}
                        <div className="register-input">
                            <label htmlFor="email"> Email </label>
                            <input 
                                id="email" 
                                name="email"
                                type="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                        {/* Password */}
                        <div className="register-input">
                            <label htmlFor="password"> Password </label>
                            <input 
                                id="password" 
                                name="password"
                                type="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                        {/* Confirm Password */}
                        <div className="register-input">
                            <label htmlFor="confirm"> Confirm </label>
                            <input 
                                id="confirm" 
                                name="confirm"
                                type="password" 
                                value={confirm} 
                                onChange={(e) => setConfirm(e.target.value)} 
                                required
                            />
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="register-buttons">
                        <button type="button" onClick={handleCancel}> Cancel </button>
                        <button type="submit"> Register </button>
                    </div>
                </form>
            </main>
            <Footer/>
        </>
    );
}