import { useEffect, useState } from 'react';
import { getAllLaptops, returnLaptop } from '../api/laptop.jsx';
import { getBorrowByLaptopAndStatus, updateBorrowStatus } from '../api/borrow.jsx';
import StaffHeader from "../components/StaffHeader.jsx";
import Footer from '../components/Footer.jsx';
import '../styles/StaffBrowse.css';

export default function StaffBrowse()
{
    const [laptops, setLaptops] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [imgPreview, setImgPreview] = useState(null);
    const [formLaptop, setFormLaptop] = useState({});
    const [formBorrow, setFormBorrow] = useState({});

    const fetchLaptops = async() =>
    {
        const response = await getAllLaptops();

        if(response.ok)
        {
            const fetchedLaptops = await response.json();
            setLaptops(fetchedLaptops);
        }
    };

    const showLaptops = laptops.map
    (
        (laptop, index) =>
            <div key={index} className="laptop-card" onClick={() => handleClickCard(laptop)}>
                <h2> {laptop.brand} - {laptop.model} </h2>
                <p> CPU: {laptop.cpu} </p>
                <p> RAM: {laptop.ram} </p>
                <p> Storage: {laptop.storage} </p>
                <p> Status: <span className={laptop.laptopstatus === 'AVAILABLE' ? 'status1' : 'status2'}>{laptop.laptopstatus}</span> </p>
            </div>
    );

    const handleClickCard = async(laptop) =>
    {
       if(laptop.laptopstatus === 'BORROWED')
       {
            setFormLaptop(laptop);
            const imgURL = `data:image/jpeg;base64,${laptop.image}`;
            setImgPreview(imgURL);

            const response = await getBorrowByLaptopAndStatus(laptop.brand, laptop.model, 'APPROVED');

            if(response.ok)
            {
                const borrowData = await response.json();
                setFormBorrow(borrowData);
            }
                
            setShowForm(true);
       }
    };

    const handleClose = () =>
    {
        setShowForm(false);
        setFormLaptop({});
        setFormBorrow({});
        setImgPreview(null);
    };

    const handleReturn = async(e) =>
    {
        e.preventDefault();

        if(window.confirm('Mark laptop as returned?'))
        {
            returnLaptop(formLaptop);
            updateBorrowStatus('RETURNED', formBorrow);
        }    
    };

    useEffect(() =>
    {
        fetchLaptops();

    }, []);

    return (
        <>
            <title> Browse - Wildcats CLAW </title>
            <StaffHeader/>
            <main className="browse-container">
                <div className="laptop-grid">
                    {showLaptops}
                </div>
            </main>
            { showForm ?
                <form className="returnform-container" onSubmit={handleReturn}>
                    <h2> BORROW DETAILS </h2>
                    {/* Form Header */}
                    <h3> {formLaptop.brand} - {formLaptop.model} </h3>
                    <div className="returnform-info">
                        <img src={imgPreview} alt="Laptop preview image"/>
                        <div>
                            <p> <span>Borrower:</span> {formBorrow.student.firstname} {formBorrow.student.lastname} </p>
                            <p> <span>Approved:</span> {formBorrow.approvaldate} </p>
                            <p> <span>Course:</span> {formBorrow.schedule.course} - {formBorrow.schedule.section} </p>
                            <p> <span>Description:</span> {formBorrow.schedule.description} </p>
                            <p> <span>Schedule:</span> {formBorrow.schedule.day} {formBorrow.schedule.start} - {formBorrow.schedule.end} </p>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="returnform-buttons">
                        <button type="button" onClick={handleClose}> Close </button>
                        <button type="submit"> Mark as Returned </button>
                    </div>
                </form> : ''
            }
            <Footer/>
        </>
    );
}