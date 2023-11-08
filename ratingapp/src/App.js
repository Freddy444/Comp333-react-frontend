import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import './App.css';

import HomeV from './components/homeview';
import CreateV from './views/createview';
import ReadV from './views/readview';
import UpdateV from './views/updateview';
import DeleteV from './views/deleteview';
import LoginV from './views/loginview';
import RegisterV from './views/registerview';





function App() {
  return (
    // setting different routing parth for different files 
    <BrowserRouter>
        <Routes>
              <Route path="/" element={<HomeV />} />
              <Route path="/register" element={<RegisterV />} />
              <Route path="/login" element={<LoginV />} />
              <Route path="/create" element={<CreateV />} />
              <Route path="/read" element={<ReadV />} />
              <Route path="/update/:id" element={<UpdateV onClose={() =>{}} />} />
              <Route path="/delete" element={<DeleteV />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
