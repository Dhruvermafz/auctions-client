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

  const storedTheme = localStorage.getItem("theme");
  const preferDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && preferDark);

  // Set initial theme based on stored or preferred theme
  useEffect(() => {
    if (defaultDark) {
      setDark();
    } else {
      setLight();
    }
  }, []);

  // Toggle the theme
  const toggleTheme = () => {
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      setLight();
    } else {
      setDark();
    }
  };

  return {
    defaultDark,
    toggleTheme,
  };
};

const DarkMode = () => {
  const { defaultDark, toggleTheme } = useDarkMode();

  return (
    <div className="toggle-theme-wrapper">
      <span>☀️</span>
      <label className="toggle-theme" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={toggleTheme}
          checked={defaultDark} // Use 'checked' instead of 'defaultChecked'
        />
        <div className="slider round"></div>
      </label>
      <span>🌒</span>
    </div>
  );
};

export default DarkMode;
