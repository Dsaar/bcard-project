import { createContext, useCallback, useContext, useState } from "react";
import {  Alert, Snackbar } from "@mui/material";


//step 1: create the context

const SnackBarContext = createContext();

//step 2: create the provider

export default function SnackBarProvider({ children }) {
	const [isSnackOpen, setSnackOpen] = useState(false)
	const [snackColor, setSnackColor] = useState("success")
	const [snackVariant, setSnackVariant] = useState("filled")
	const [snackMessage, setSnackMessage] = useState("in snackbar")

	const setSnack = useCallback((color, message, variant = 'filled') => {
		setSnackOpen(true);
		setSnackColor(color);
		setSnackVariant(variant);
		setSnackMessage(message);
	}, [])
	return (
		<>
			<SnackBarContext.Provider value={setSnack}>
				{children}
			</SnackBarContext.Provider>

			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				open={isSnackOpen}
				onClose={() => {
					setSnackOpen(false);
				}}
				autoHideDuration={5000}
			>
				<Alert severity={snackColor} variant={snackVariant}>
					{snackMessage}
				</Alert>
			</Snackbar>
	
	</>
	)



}

//step 3: create custom hook for using the context (optional)

export const useSnack = () => {

	const context = useContext(SnackBarContext);

	if (!context) {

		throw new Error("useSnackBar must be used within a Nameprovider");

	}

	return context;

};