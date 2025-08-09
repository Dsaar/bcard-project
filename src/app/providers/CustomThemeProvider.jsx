import { createContext, useContext, useState, useEffect } from "react";
import {
	createTheme,
	ThemeProvider,
	CssBaseline,
	GlobalStyles,
} from "@mui/material";
import { useCurrentUser } from "../providers/UserProvider"; 

// Step 1: Create the context
const ThemeContext = createContext();

// Step 2: Create the provider
export default function CustomThemeProvider({ children }) {
	const { user } = useCurrentUser();
	const [isDark, setIsDark] = useState(false);

	// Step 2.1: Load theme when a user logs in
	useEffect(() => {
		if (user && user._id) {
			// Check for saved theme preference
			const savedTheme = localStorage.getItem(`theme-${user._id}`);
			if (savedTheme !== null) {
				setIsDark(savedTheme === "dark");
			} else {
				// If no saved theme, default to light
				setIsDark(false);
				localStorage.setItem(`theme-${user._id}`, "light"); // ensure key exists
			}
		} else {
			// On logout: reset to default
			setIsDark(false);
		}
	}, [user]);

	// Step 2.2: Toggle theme & save for the current user
	const toggleMode = () => {
		setIsDark((prev) => {
			const newMode = !prev;
			if (user && user._id) {
				localStorage.setItem(`theme-${user._id}`, newMode ? "dark" : "light");
			}
			return newMode;
		});
	};

	// Step 2.3: Create the theme
	const theme = createTheme({
		palette: { mode: isDark ? "dark" : "light" },
	});

	// Step 2.4: Provide context + apply theme
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalStyles
				styles={{
					"*": { margin: 0, padding: 0, boxSizing: "border-box" },
				}}
			/>
			<ThemeContext.Provider value={{ toggleMode, isDark }}>
				{children}
			</ThemeContext.Provider>
		</ThemeProvider>
	);
}

// Step 3: Create a custom hook to use the theme
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a provider");
	}
	return context;
};
