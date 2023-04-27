import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./style/main.css";
import { Header } from "./components/Header";
function App() {
    return (
        <>
        <Header />
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </main>
        </>
    );
}

export default App;
