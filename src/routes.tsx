import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Visualizar from "pages/Visualizar";
import Header from "components/Header";
import Footer from "components/Footer";
import Cadastrar from "pages/Cadastrar";
import Projeto from "pages/Projeto";
import Atualizar from "pages/Atualizar";

export default function AppRouter() {
    const [viewForm, setViewForm] = useState('list')

    const formato = (childdata: string) => {
        setViewForm(childdata)
    }
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Header formato={formato} />}>
                    <Route index element={<Visualizar view={viewForm} />} />
                    <Route path='/Cadastro' element={<Cadastrar />} />
                    <Route path='/Projeto/:id' element={<Projeto />} />
                    <Route path='/Atualizar/:id' element={<Atualizar />} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    )
}