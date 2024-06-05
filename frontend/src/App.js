import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Rest from "./Vista/RestApi/Rest";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/button1" />} />
                <Route path="/button1" element={<Rest />} />
            </Routes>
        </Router>
    );
}

export default App;
