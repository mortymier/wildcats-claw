import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllLaptops } from '../api/laptop.jsx';
import { getStudentSchedules } from '../api/schedule.jsx';
import { addBorrowRecord } from '../api/borrow.jsx';
import StudentHeader from '../components/StudentHeader.jsx';
import Footer from "../components/Footer.jsx";
import '../styles/StudentBrowse.css';

export default function StudentBrowse()
{
    const navigate = useNavigate();
    const [laptops, setLaptops] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [imgPreview, setImgPreview] = useState(null);
    const [formLaptop, setFormLaptop] = useState({});

    const [formData, setFormData] = useState
    ({
        reason: '',
        scheduleObj: {}
    });

    const fetchLaptops = async() =>
    {
        const response = await getAllLaptops();

        if(response.ok)
        {
            const fetchedLaptops = await response.json();
            setLaptops(fetchedLaptops);
        }
    };

    const fetchSchedules = async() =>
    {
        const loggedInStudent = localStorage.getItem('loggedInStudent');
        const studentData = JSON.parse(loggedInStudent);
        const email = studentData.email;
            
        const response = await getStudentSchedules(email);
    
        if(response.ok)
        {
            const fetchedSchedules = await response.json();
            setSchedules(fetchedSchedules);
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

    const showSchedulesAsOptions = schedules.map
    (
        (schedule, index) =>
            <option key={index} value={JSON.stringify(schedule)}> {schedule.course} - {schedule.section} - {schedule.type} - {schedule.day} </option>
    );

    const handleClickCard = (laptop) =>
    {
        if(laptop.laptopstatus === 'AVAILABLE')
        {
            setFormLaptop(laptop);
            const imgURL = `data:image/jpeg;base64,${laptop.image}`;
            setImgPreview(imgURL);
            setShowForm(true);
        }
        else
        {
            alert('This laptop is not available for borrowing');
        }
    };

    const handleCancel = () =>
    {
        setShowForm(false);
        setFormLaptop({});
        setImgPreview(null);
        setFormData
        ({
            reason: '',
            scheduleObj: {}
        });
    };

    const handleSubmit = async(e) =>
    {
        e.preventDefault();

        const loggedInStudent = localStorage.getItem('loggedInStudent');
        const studentData = JSON.parse(loggedInStudent);
        const scheduleData = JSON.parse(formData.scheduleObj);
        const email = studentData.email;
        const course = scheduleData.course;
        const type = scheduleData.type;
        const brand = formLaptop.brand;
        const model = formLaptop.model;
        
        const response = await addBorrowRecord(email, course, type, brand, model, formData);

        if(response.ok)
        {
            alert('Borrow request created!');
            handleCancel();
            navigate('/student/dashboard');
        }
    };
    
    useEffect(() =>
    {
        fetchLaptops();
        fetchSchedules();

    }, []);

    return (
        <>
            <title> Browse - Wildcats CLAW </title>
            <StudentHeader/>
            <main className="browse-container">
                <div className="laptop-grid">
                    {showLaptops}
                </div>
            </main>
            {showForm ?
                <form className="borrowform-container" onSubmit={handleSubmit}>
                    <h2> BORROW LAPTOP </h2>
                    {/* Form Header */}
                    <h3> {formLaptop.brand} - {formLaptop.model} </h3>
                    <div className="borrowform-info">
                        <img src={imgPreview} alt="Laptop preview image"/>
                        <div>
                            <p> Status: <span className="status1">{formLaptop.laptopstatus}</span> </p>
                            <p> CPU : {formLaptop.cpu} </p>
                            <p> RAM : {formLaptop.ram} </p>
                            <p> Storage : {formLaptop.storage} </p>
                        </div>
                    </div>
                    {/* Schedule */}
                    <div className="borrowform-input">
                        <label htmlFor="schedule"> Schedule </label>
                        <select
                            id="schedule"
                            name="schedule"
                            value={formData.schedule}
                            onChange={(e) => setFormData((prev) => ({...prev, scheduleObj: e.target.value}))}
                            required
                        >
                            <option> </option>
                            {showSchedulesAsOptions}
                        </select>
                    </div>
                    {/* Reason */}
                    <div className="borrowform-input">
                        <label htmlFor="reason"> Reason </label>
                        <textarea 
                            id="reason"
                            name="reason"
                            rows="5"
                            value={formData.reason}
                            onChange={(e) => setFormData((prev) => ({...prev, reason: e.target.value}))}
                            required
                        />
                    </div>
                    {/* Buttons */}
                    <div className="borrowform-buttons">
                        <button type="button" onClick={handleCancel}> Cancel </button>
                        <button type="submit"> Submit </button>
                    </div>
                </form> : ''
            }
            <Footer/>
        </>
    );
};