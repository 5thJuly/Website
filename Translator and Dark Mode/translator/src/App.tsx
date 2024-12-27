import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import LanguageSelector from "./components/language-selector";

interface DescriptionType {
  line1: string;
  line2: string;
  line3: string;
  line4: string;
}

function App() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  const { line1, line2, line3, line4 } = t("description", {
    returnObjects: true,
  }) as DescriptionType;

  useEffect(() => {
    setMounted(true);
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as "light" | "dark" || "dark";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
    return () => setMounted(false);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`container ${mounted ? 'fade-in' : ''}`}>
      <div className="header-controls">
        <LanguageSelector />
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="slider">
            <span className="slider-icon">
              {theme === "light" ? "🌞" : "🌙"}
            </span>
          </span>
        </label>
      </div>
      
      <h1 className="title-animation">{t("greeting")}</h1>
      
      <div className="content">
        <p className="text-fade">{line1}</p>
        <div className="lines-container">
          <span className="animated-line">{line2}</span>
          <span className="animated-line">{line3}</span>
          <span className="animated-line">{line4}</span>
        </div>
      </div>
    </div>
  );
}

export default App;