import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/RegisterRole.css';

export default function RegisterStudent()
{
    return (
        <>
            <title> Register - Wildcats CLAW </title>
            <Header/>
            <main className="registerstudent-container">
                <form>
                    <h1> Student Registration </h1>
                    <p> Please enter your details </p>
                    <hr/>
                    {/* Section 1: Personal Information */}
                    <div className="register-section">
                        <h2> Personal Information </h2>
                        {/* First Name */}
                        <div className="register-input">
                            <label htmlFor="firstname"> First Name </label>
                            <input id="firstname" type="text" required/>
                        </div>
                        {/* Last Name */}
                        <div className="register-input">
                            <label htmlFor="lastname"> Last Name </label>
                            <input id="lastname" type="text" required/>
                        </div>
                        {/* Program */}
                        <div className="register-input">
                            <label htmlFor="program"> Program </label>
                            <input id="program" type="text" required/>
                        </div>
                        {/* Year Level */}
                        <div className="register-input">
                            <label htmlFor="yearlvl"> Year Level </label>
                            <input id="yearlvl" type="number" min="1" max="5" required/>
                        </div>
                        {/* Contact Number */}
                        <div className="register-input">
                            <label htmlFor="contactnum"> Contact No. </label>
                            <input id="contactnum" type="text" required/>
                        </div>
                    </div>
                    {/* Section 2: Login Credentials */}
                    <div className="register-section">
                        <h2> Login Credentials </h2>
                        {/* Email */}
                        <div className="register-input">
                            <label htmlFor="email"> Email </label>
                            <input id="email" type="email" required/>
                        </div>
                        {/* Password */}
                        <div className="register-input">
                            <label htmlFor="password"> Password </label>
                            <input id="password" type="password" required/>
                        </div>
                        {/* Confirm Password */}
                        <div className="register-input">
                            <label htmlFor="confirm"> Confirm </label>
                            <input id="confirm" type="password" required/>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="register-buttons">
                        <button type="button"> Cancel </button>
                        <button type="submit"> Register </button>
                    </div>
                </form>
            </main>
            <Footer/>
        </>
    );
}