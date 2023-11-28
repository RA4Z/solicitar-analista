import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Header />}>

                </Route>
            </Routes>
        </Router>
    )
}