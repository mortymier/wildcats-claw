import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import hero from '../images/laptop_hero.jpg';
import process from '../images/borrow_process.png';
import '../styles/Home.css';

export default function Home()
{
    return (
        <>
            <Header/>
            <main className="home-container">
                <img src={hero} alt="A woman handing someone a laptop"/>
                <div className="get-started-overlay">
                    <h3> WE GOT YOU COVERED! </h3>
                    <p>
                        Need a laptop for your next task? <br/>
                        We can help you get one from the CCS Office. <br/>
                        Create an account now and start borrowing!
                    </p>
                    <Link> Start Borrowing </Link>
                </div>
                <div className="borrow-process">
                    <h3> BORROWING PROCESS </h3>
                    <img src={process} alt="Laptop borrow process"/>
                </div>
            </main>
            <Footer/>
        </>
    )
}