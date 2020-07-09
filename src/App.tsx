import React, {useContext} from 'react';
import LandingPage from "./Components/LandingPage";
import HomePage from "./Components/HomePage";
import './App.css';
import {ThemeContext} from './Components/ThemeProvider'

const App: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div>
            <button onClick={toggleTheme}>
                Switch to {theme === "light" ? "dark" : "light"} mode
            </button>
            <HomePage/>

        </div>
    );
};

export default App;
