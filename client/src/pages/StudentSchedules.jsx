import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addScheduleByEmail, getStudentSchedules } from '../api/schedule.jsx';
import StudentHeader from '../components/StudentHeader.jsx';
import Footer from "../components/Footer.jsx";
import '../styles/StudentSchedules.css';

export default function StudentSchedules()
{
    const navigate = useNavigate();
    const [studentName, setStudentName] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState
    ({
        schoolyear: '',
        semester: '',
        course: '',
        section: '',
        description: '',
        type: '',
        day: '',
        start: '',
        end: ''
    });

    const fetchSchedules = async() =>
    {
        const loggedInStudent = localStorage.getItem('loggedInStudent');
        const studentData = JSON.parse(loggedInStudent);
        const email = studentData.email;
        setStudentName(studentData.firstname + ' ' + studentData.lastname);
        
        const response = await getStudentSchedules(email);

        if(response.ok)
        {
            const fetchedSchedules = await response.json();
            setSchedules(fetchedSchedules);
        }
    };

    const showSchedules = schedules.map
    (
        (schedule, index) =>
            <tr key={index}>
                <td> {schedule.schoolyear} </td>
                <td> {schedule.semester} </td>
                <td> {schedule.course} - {schedule.section} </td>
                <td> {schedule.description} </td>
                <td> {schedule.type} </td>
                <td> {schedule.day} </td>
                <td> {schedule.start} - {schedule.end} </td>
            </tr>
    );

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleCancel = () =>
    {
        setShowForm(false);
        setFormData
        ({
            schoolyear: '',
            semester: '',
            course: '',
            section: '',
            description: '',
            type: '',
            day: '',
            start: '',
            end: ''
        });
    };

    const handleSubmit = async(e) =>
    {
        e.preventDefault();

        // Validate time inputs (start cannot be equal or later than end)
        if(formData.start >= formData.end)
        {
            alert('End time must be after start time');
            return;
        }
        else
        {
            const loggedInStudent = localStorage.getItem('loggedInStudent');
            const studentData = JSON.parse(loggedInStudent);
            const email = studentData.email;

            const response = await addScheduleByEmail(email, formData);

            if(response.ok)
            {
                alert('Schedule has been added!');
                handleCancel();
                fetchSchedules();
            }     
        } 
    };

    useEffect(() => 
    {
        fetchSchedules();

    }, []);

    return (
        <>
            <title> Schedules - Wildcats CLAW </title>
            <StudentHeader/>
            <main className="schedules-container">
                <div className="schedules-header">
                    <h2> These are the list of schedules for : <span>{studentName}</span> </h2>
                    <button onClick={() => setShowForm(!showForm)}> + &nbsp; Add Schedule </button>
                </div>
                {/* Schedules Table */}
                <table className="schedules-table">
                    <thead>
                        <tr>
                            <th> School Year </th>
                            <th> Semester </th>
                            <th> Course & Section </th>
                            <th> Description </th>
                            <th> Type </th>
                            <th> Day </th>
                            <th> Time </th>
                        </tr>
                    </thead>
                    <tbody>
                        {showSchedules}
                    </tbody>
                </table>
                {/* Hidden Add Schedule Form */}
                {showForm ?
                    <form onSubmit={handleSubmit}> 
                        <h2> Add New Schedule </h2>
                        {/* School Year */}
                        <div className="schedules-input"> 
                            <label htmlFor="schoolyear"> School Year </label>
                            <select
                                id="schoolyear"
                                name="schoolyear"
                                value={formData.schoolyear}
                                onChange={handleChange}
                                required
                            >
                                <option value=""> </option>
                                <option value="2024 - 2025"> 2024 - 2025 </option>
                                <option value="2025 - 2026"> 2025 - 2026 </option>
                            </select>
                        </div>
                        {/* Semester */}
                        <div className="schedules-input"> 
                            <label htmlFor="semester"> Semester </label>
                            <select
                                id="semester"
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                required
                            >
                                <option value=""> </option>
                                <option value="First Semester"> First </option>
                                <option value="Second Semester"> Second </option>
                                <option value="Summer"> Summer </option>
                            </select>
                        </div>
                        {/* Course Code */}
                        <div className="schedules-input"> 
                            <label htmlFor="course"> Course </label>
                            <input 
                                id="course"
                                name="course"
                                type="text"
                                placeholder="CSIT123"
                                value={formData.course}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Section */}
                        <div className="schedules-input"> 
                            <label htmlFor="section"> Section </label>
                            <input 
                                id="section"
                                name="section"
                                type="text"
                                placeholder="G1"
                                value={formData.section}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Course Description */}
                        <div className="schedules-input"> 
                            <label htmlFor="description"> Description </label>
                            <input 
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Programming Fundamentals 1"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Schedule Type */}
                        <div className="schedules-input"> 
                            <label htmlFor="type"> Type </label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value=""> </option>
                                <option value="Laboratory"> Laboratory </option>
                                <option value="Lecture"> Lecture </option>
                            </select>
                        </div>
                        {/* Day */}
                        <div className="schedules-input"> 
                            <label htmlFor="day"> Day </label>
                            <select
                                id="day"
                                name="day"
                                value={formData.day}
                                onChange={handleChange}
                                required
                            >
                                <option value=""> </option>
                                <option value="Monday"> Monday </option>
                                <option value="Tuesday"> Tuesday </option>
                                <option value="Wednesday"> Wednesday </option>
                                <option value="Thursday"> Thursday </option>
                                <option value="Friday"> Friday </option>
                                <option value="Saturday"> Saturday </option>
                            </select>
                        </div>
                        {/* Start Time */}
                        <div className="schedules-input"> 
                            <label htmlFor="start"> Start Time </label>
                            <input
                                id="start"
                                name="start"
                                type="time"
                                value={formData.start}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* End Time */}
                        <div className="schedules-input"> 
                            <label htmlFor="end"> End Time </label>
                            <input
                                id="end"
                                name="end"
                                type="time"
                                value={formData.end}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Buttons */}
                        <div className="schedules-buttons">
                            <button type="submit"> Submit </button>
                            <button type="button" onClick={handleCancel}> Cancel </button>
                        </div>
                    </form> : ''
                }
            </main>
            <Footer/>
        </>
    );
}