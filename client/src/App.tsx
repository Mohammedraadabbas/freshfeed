import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./style/main.css";
import { Header } from "./components/Header";
import { Article } from "./components/Article";
function App() {
    return (
        <>
        <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/article/:id" element={<Article />} />
            </Routes>
        </>
    );
}

export default App;
