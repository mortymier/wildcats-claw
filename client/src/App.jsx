import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import RegisterStudent from './pages/RegisterStudent.jsx';
import RegisterStaff from './pages/RegisterStaff.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import StudentBrowse from './pages/StudentBrowse.jsx';
import StudentSchedules from './pages/StudentSchedules.jsx';
import StaffDashboard from './pages/StaffDashboard.jsx';
import StaffBrowse from './pages/StaffBrowse.jsx';
import StaffAddLaptop from './pages/StaffAddLaptop.jsx';

export default function App()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/register/student" element={<RegisterStudent/>}/>
                <Route path="/register/staff" element={<RegisterStaff/>}/>
                <Route path="/student/dashboard" element={<StudentDashboard/>}/>
                <Route path="/student/browse" element={<StudentBrowse/>}/>
                <Route path="/student/schedules" element={<StudentSchedules/>}/>
                <Route path="/staff/dashboard" element={<StaffDashboard/>}/>
                <Route path="/staff/browse" element={<StaffBrowse/>}/>
                <Route path="/staff/addlaptop" element={<StaffAddLaptop/>}/>
            </Routes>
        </BrowserRouter>
    );
}