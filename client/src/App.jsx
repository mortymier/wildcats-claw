import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import RegisterStudent from './pages/RegisterStudent.jsx';

export default function App()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/register/student" element={<RegisterStudent/>}/>
            </Routes>
        </BrowserRouter>
    );
}