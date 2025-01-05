import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import FavCards from "./components/FavCards";
import "./App.css";
import PageNotFound from "./components/PageNotFound";
import { ThemeContext, themeMode } from "./services/darkLightTheme";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import Cards from "./components/Cards";
import Profile from "./components/Profile";
import MyCards from "./components/MyCards";
import LikeButton from "./components/tools/LikeButton";
import CardDetails from "./components/CardDetails";
import { CardProvider } from "./contex/useCardContext";
import SandBox from "./components/SandBox";
import { FavCardsProvider } from "./contex/favCardsContext";


function App() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    const toggleTheme = () => {
        setTheme((prevTheme: any) => !prevTheme);
    };

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
        document.body.className = theme ? "dark" : "light"; // Dynamically apply class
    }, [theme]);

    return (
        <ThemeContext.Provider value={theme ? themeMode.dark : themeMode.light}>
            <ToastContainer />
            <CardProvider>
                <FavCardsProvider>
                <Router>
                    <Navbar changeMode={toggleTheme} cardList={[]} />
                    <Routes>
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Cards />} />
                        <Route path="/like-button" element={<LikeButton cardId={""} userId={""} />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/card-details/:cardId" element={<CardDetails />} />
                        <Route path="/fav-cards" element={<FavCards />} />
                        <Route path="/sand-box" element={<SandBox />} />
                        <Route path="/my-cards" element={<MyCards />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
                </FavCardsProvider>
            </CardProvider>
        </ThemeContext.Provider>
    );
}

export default App;
