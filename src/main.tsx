import React from "react";
import './index.css';
import App from './App.tsx';
import ReactDOM from "react-dom/client";
import { LoginProvider } from '../context/LoginContext.tsx'; //
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Comando from '@/pages/Comando.tsx'; 
import ChefeDeTurma from '@/pages/ChefeDeTurma.tsx';
import Czinho from '@/pages/Czinho.tsx';
import Czao from '@/pages/Czao.tsx';
import Papeletas from './pages/Papeletas.tsx';
import FaltasDescriminadas from './pages/FaltasDescriminadas.tsx';
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <LoginProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/comando" element={
        
                <Comando/>
             
              }
                />
            <Route path="/chefe" element={
             
                <ChefeDeTurma/>
              
              }
                />
            <Route path="/czinho" element={
              
                <Czinho/>
              
              }
                />
            <Route path="/czao" element={
              
                <Czao/>
              
              }
                />
            <Route path="/papeletas" element={
              
                <Papeletas />
              
              }
                />
            <Route path="/faltas" element={
              
                <FaltasDescriminadas />
              }
                />
            <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </React.StrictMode>
  
);

