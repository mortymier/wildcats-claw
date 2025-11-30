import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllBorrowsByStatus, updateBorrowStatus } from "../api/borrow.jsx";
import StaffHeader from "../components/StaffHeader.jsx";
import Footer from '../components/Footer.jsx';
import '../styles/StaffDashboard.css';

export default function StaffDashboard()
{
    const navigate = useNavigate();
    const [staffName, setStaffName] = useState('');
    const [pendingBorrows, setPendingBorrows] = useState([]);
    let newStatus = '';

    const showPendingBorrows = pendingBorrows.map
    (
        (borrow, index) =>
            <tr key={index}>
                <td> {borrow.requestdate} </td>
                <td> {borrow.student.firstname} {borrow.student.lastname} </td>
                <td> {borrow.schedule.course} - {borrow.schedule.section} - {borrow.schedule.description} - {borrow.schedule.type} </td>
                <td> {borrow.schedule.day} - {borrow.schedule.start} - {borrow.schedule.end} </td>
                <td> {borrow.laptop.brand} - {borrow.laptop.model} </td>
                <td> {borrow.reason} </td>
                <td> 
                    <button onClick={() => {handleApprove(); handleAction(borrow)}}> APPROVE </button>
                    <button onClick={() => {handleReject(); handleAction(borrow)}}> REJECT </button>
                </td>
            </tr>
    );

    const fetchPendingBorrows = async() =>
    {
        const borrowstatus = 'REVIEWING';
        const response = await getAllBorrowsByStatus(borrowstatus);

        if(response.ok)
        {
            const fetchedPendingBorrows = await response.json();
            setPendingBorrows(fetchedPendingBorrows);
        }
    };

    const handleApprove = () => { newStatus = 'APPROVED'; };

    const handleReject = () => { newStatus = 'REJECTED'; };

    const handleAction = async(borrow) =>
    {
        updateBorrowStatus(newStatus, borrow)
    }
    
    useEffect(() => 
    {
        const loggedInStaff = localStorage.getItem('loggedInStaff');

        if(!loggedInStaff)
        {
            navigate('/login');
        }
        else
        {
            const staffData = JSON.parse(loggedInStaff);
            setStaffName(staffData.firstname + ' ' + staffData.lastname);
            fetchPendingBorrows();
        }

    }, []);

    return (
        <>
            <title> Dashboard - Wildcats CLAW </title>
            <StaffHeader/>
            <main className="staffdashboard-container">
                <h1> Welcome, {staffName} </h1>
                {/* Pending Borrows Table */}
                <h2> Pending Requests </h2>
                <table className="borrows-table">
                    <thead>
                        <tr>
                            <th> Date </th>
                            <th> Student </th>
                            <th> Course </th>
                            <th> Schedule </th>
                            <th> Laptop </th>
                            <th> Reason </th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {showPendingBorrows}
                    </tbody>
                </table>
            </main>
                
            <Footer/>
        </>
    );
}