import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/sign-up";
import NewArticle from "./pages/new-article";
import "./style/main.css";
import { Header } from "./components/Header";
import { Article } from "./components/Article";
import { AuthProvider } from "./context/AuthProvider";
import VerifyRegister from "./pages/VerifyRegister";
import Login from "./pages/login";
import VerifyLogin from "./pages/VerifyLogin";
import PreventLoggedUser from "./components/PreventLoggedUser";

function App() {
    return (
        <>
        
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/article">
                        <Route path="new" element={<NewArticle />} />
                    </Route>
                    <Route path="/article/:id" element={<Article />} />

                    <Route element={<PreventLoggedUser />}>
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route
                            path="/register/verify"
                            element={<VerifyRegister />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/login/verify" element={<VerifyLogin />} />
                    </Route>

                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
