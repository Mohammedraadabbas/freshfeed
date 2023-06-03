import logo from "../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { ButtonStyle } from "./common/button";
import useAuth from "../hooks/useAuth";

export const Header = () => {
    let { auth } = useAuth();
    let [isOpen, setIsOpen] = useState(false);
    console.log("header_auth", auth);
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
                    
                    {auth?._id != null ? (
                        <div
                            style={{
                                width: "40px",
                                aspectRatio: "1/1",
                                borderRadius: "50%",
                                overflow:"hidden"
                            }}
                        >
                            <img src="/heading-img-1.jpg" />
                        </div>
                    ) : (
                        <Link
                        style={{ textDecoration: "none" }}
                        to="/sign-up"
                        className={`${ButtonStyle.button} ${ButtonStyle.Primary}`}
                    >
                        Sign Up
                    </Link>
                    )}
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
};
