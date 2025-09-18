import { createContext, useContext, useState } from "react";

// 1. buat context
const ThemeContext = createContext();

// 2. provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. custom hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}

//EX: USING CONTEXT ABOVE

import { useTheme } from "./ThemeContext";

function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Theme sekarang: {theme}</p>
      <button onClick={toggleTheme}>Ganti Theme</button>
    </div>
  );
}
