import React, { useEffect } from "react";
import "../css/darkmode.css";

// Custom hook for handling dark mode
const useDarkMode = () => {
  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  // Instead of using 'defaultDark', use a single state to keep track of the current theme
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const storedTheme = localStorage.getItem("theme");
    const preferDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return storedTheme === "dark" || (storedTheme === null && preferDark);
  });

  // Set initial theme based on stored or preferred theme
  useEffect(() => {
    isDarkMode ? setDark() : setLight();
  }, [isDarkMode]);

  // Toggle the theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return {
    isDarkMode,
    toggleTheme,
  };
};

const DarkMode = () => {
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <div className="toggle-theme-wrapper">
      <span>☀️</span>
      <label className="toggle-theme" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={toggleTheme}
          checked={isDarkMode}
        />
        <div className="slider round"></div>
      </label>
      <span>🌒</span>
    </div>
  );
};

export default DarkMode;
