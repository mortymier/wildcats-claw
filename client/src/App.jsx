import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import RegisterStudent from './pages/RegisterStudent.jsx';
import RegisterStaff from './pages/RegisterStaff.jsx';

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
            </Routes>
        </BrowserRouter>
    );
}