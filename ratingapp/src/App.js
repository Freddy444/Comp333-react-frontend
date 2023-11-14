import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import './App.css';
import HomeView from './views/homeview';
import CreateView from './views/createview';
import ReadView from './views/readview';
import UpdateView from './views/updateview';
import DeleteView from './views/deleteview';
import LoginView from './views/loginview';
import RegisterView from './views/registerview';

//<Route path="/delete/:id" element={<UpdateView onClose={() =>{}} />} />




function App() {
  return (
    // setting different routing parth for different files 
    <BrowserRouter>
        <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/create" element={<CreateView />} />
              <Route path="/read" element={<ReadView />} />
              <Route path="/update/:id" element={<UpdateView onClose={() =>{}} />} />
              <Route path="/delete/:id" element={<DeleteView onClose={() =>{}} />} />
              <Route path="/register" element={<RegisterView />} />
              <Route path="/login" element={<LoginView />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

