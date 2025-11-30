import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllBorrowsByStudentAndStatus } from "../api/borrow.jsx";
import StudentHeader from '../components/StudentHeader.jsx';
import Footer from "../components/Footer.jsx";
import '../styles/StudentDashboard.css';

export default function StudentDashboard()
{
    const navigate = useNavigate();
    const [studentName, setStudentName] = useState('');
    const [pendingBorrows, setPendingBorrows] = useState([]);
    const [approvedBorrows, setApprovedBorrows] = useState([]);

    const showPendingBorrows = pendingBorrows.map
    (
        (borrow, index) =>
            <tr key={index}>
                <td> {borrow.requestdate} </td>
                <td> {borrow.schedule.course} - {borrow.schedule.section} - {borrow.schedule.description} - {borrow.schedule.type} </td>
                <td> {borrow.schedule.day} - {borrow.schedule.start} - {borrow.schedule.end} </td>
                <td> {borrow.laptop.brand} - {borrow.laptop.model} </td>
                <td> {borrow.laptop.cpu} - {borrow.laptop.ram} - {borrow.laptop.storage} </td>
                <td> {borrow.reason} </td>
                <td> {borrow.borrowstatus} </td>
            </tr>
    );

    const showApprovedBorrows = approvedBorrows.map
    (
        (borrow, index) =>
            <tr key={index}>
                <td> {borrow.approvaldate} </td>
                <td> {borrow.schedule.course} - {borrow.schedule.section} - {borrow.schedule.description} - {borrow.schedule.type} </td>
                <td> {borrow.schedule.day} - {borrow.schedule.start} - {borrow.schedule.end} </td>
                <td> {borrow.laptop.brand} - {borrow.laptop.model} </td>
                <td> {borrow.laptop.cpu} - {borrow.laptop.ram} - {borrow.laptop.storage} </td>
                <td> {borrow.reason} </td>
                <td> {borrow.borrowstatus} </td>
            </tr>
    );

    const fetchPendingBorrows = async(email) =>
    {
        const borrowstatus = 'REVIEWING';
        const response = await getAllBorrowsByStudentAndStatus(email, borrowstatus);

        if(response.ok)
        {
            const fetchedPendingBorrows = await response.json();
            setPendingBorrows(fetchedPendingBorrows);
        }
    };

    const fetchApprovedBorrows = async(email) =>
    {
        const borrowstatus = 'APPROVED';
        const response = await getAllBorrowsByStudentAndStatus(email, borrowstatus);

        if(response.ok)
        {
            const fetchedApprovedBorrows = await response.json();
            setApprovedBorrows(fetchedApprovedBorrows);
        }
    };

    useEffect(() => 
    {
        const loggedInStudent = localStorage.getItem('loggedInStudent');

        if(!loggedInStudent)
        {
            navigate('/login');
        }
        else
        {
            const studentData = JSON.parse(loggedInStudent);
            const email = studentData.email;
            setStudentName(studentData.firstname + ' ' + studentData.lastname);
            fetchPendingBorrows(email);
            fetchApprovedBorrows(email);
        }

    }, []);

    return (
        <>
            <title> Dashboard - Wildcats CLAW </title>
            <StudentHeader/>
            <main className="studentdashboard-container">
                <h1> Welcome, {studentName} </h1>
                {/* Pending Borrows Table */}
                <h2> Pending Requests </h2>
                <table className="borrows-table">
                    <thead>
                        <tr>
                            <th> Date </th>
                            <th> Course </th>
                            <th> Schedule </th>
                            <th> Laptop </th>
                            <th> Specs </th>
                            <th> Reason </th>
                            <th> Status </th>
                        </tr>
                    </thead>
                    <tbody>
                        {showPendingBorrows}
                    </tbody>
                </table>
                {/* Approved Borrows Table */}
                <h2> Approved Requests </h2>
                <table className="borrows-table">
                    <thead>
                        <tr>
                            <th> Date </th>
                            <th> Course </th>
                            <th> Schedule </th>
                            <th> Laptop </th>
                            <th> Specs </th>
                            <th> Reason </th>
                            <th> Status </th>
                        </tr>
                    </thead>
                    <tbody>
                        {showApprovedBorrows}
                    </tbody>
                </table>
            </main>
            <Footer/>
        </>
    );
}