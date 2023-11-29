import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Visualizar from "pages/Visualizar";
import Header from "components/Header";
import Footer from "components/Footer";
import Cadastrar from "pages/Cadastrar";
import Projeto from "pages/Projeto";

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Header />}>
                    <Route index element={<Visualizar />} />
                    <Route path='/Cadastro' element={<Cadastrar />} />
                    <Route path='/Projeto/:id' element={<Projeto />} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    )
}