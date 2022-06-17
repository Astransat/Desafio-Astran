import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Compare from './pages/Compare'
import Gains from "./pages/Gains";
import History from "./pages/History";
import Home from "./pages/Home";
import Quote from "./pages/Quote";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/history" element={<History />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/gains" element={<Gains />} />
            </Routes>
        </Router>
    )
}