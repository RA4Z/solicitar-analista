import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, lazy, Suspense } from 'react'
import Visualizar from "pages/Visualizar";
import Header from "components/Header";
import Footer from "components/Footer";
import { Box, LinearProgress } from "@mui/material";

const Cadastrar = lazy(() => import('pages/Cadastrar'));
const Projeto = lazy(() => import('pages/Projeto'));
const Atualizar = lazy(() => import('pages/Atualizar'));

export default function AppRouter() {
    const [viewForm, setViewForm] = useState('list')

    const formato = (childdata: string) => {
        setViewForm(childdata)
    }
    return (
        <Router>
            <Suspense fallback={<Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>}>
                <Routes>
                    <Route path='/' element={<Header formato={formato} />}>
                        <Route index element={<Visualizar view={viewForm} />} />
                        <Route path='/Cadastro' element={<Cadastrar />} />
                        <Route path='/Projeto/:id' element={<Projeto />} />
                        <Route path='/Atualizar/:id' element={<Atualizar />} />
                    </Route>
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    )
}