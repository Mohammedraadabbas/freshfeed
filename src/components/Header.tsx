import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import Home from "../pages/home";
import { useState } from "react";

export function Header() {
    let [isOpen, setIsOpen] = useState(false);

    const handleNav = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <header>
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <nav className={`navBar ${isOpen ? "active" : ""}`}>
                    <button onClick={handleNav}>close</button>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink
                                className={`link `}
                                to="/"
                                onClick={handleNav}
                            >
                                HOME
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="link"
                                to="/about"
                                onClick={handleNav}
                            >
                                ABOUT
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="link"
                                to="/contact"
                                onClick={handleNav}
                            >
                                CONTACT
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="rightSide">
                    <button className="button primary">Sign up</button>
                    <button
                        className="hamburgerMenu button"
                        role="menu"
                        onClick={handleNav}
                    >
                        <img src="/hamburgerMenu.svg" alt="" />
                    </button>
                </div>
            </div>
        </header>
    );
}
