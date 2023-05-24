import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/sign-up";
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
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </>
    );
}

export default App;
