import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/Global.css';

const root = createRoot(document.getElementById('root'));
root.render
(
  <StrictMode>
    <App/>
  </StrictMode>
)