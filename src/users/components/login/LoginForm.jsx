// LoginForm.jsx
import { useMediaQuery, useTheme } from "@mui/material";
import useForm from "../../../hooks/useForm";
import loginSchema from "../../models/loginSchema";
import initialLoginForm from "../../helpers/initialForms/initialLogInForm";
import { getUser, setTokenInLocalStorage } from "../../services/localStorageService";
import { useCurrentUser } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ENDPOINTS from "../../../api/endpoints";
import { useSnack } from "../../../providers/SnackBarProvider";
import LoginFormDesktop from "./LoginFormDesktop";
import LoginFormMobile from "./LoginFormMobile";

function LoginForm() {
	const { setUser, setToken } = useCurrentUser();
	const navigate = useNavigate();
	const setSnack = useSnack();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleLogin = async (credentials) => {
		const failedAttempts = parseInt(localStorage.getItem("failedLoginAttempts")) || 0;
		const lockedUntil = localStorage.getItem("loginLockedUntil");

		if (lockedUntil && Date.now() < parseInt(lockedUntil)) {
			const minutesLeft = Math.ceil((parseInt(lockedUntil) - Date.now()) / 60000);
			setSnack("error", `You are locked out. Try again in ${minutesLeft} minute(s).`);
			return;
		}

		try {
			const response = await axios.post(ENDPOINTS.users.login, credentials);
			localStorage.removeItem("failedLoginAttempts");
			localStorage.removeItem("loginLockedUntil");
			setTokenInLocalStorage(response.data);
			setToken(response.data);
			setUser(getUser());
			navigate("/");
		} catch (error) {
			const newAttempts = failedAttempts + 1;
			localStorage.setItem("failedLoginAttempts", newAttempts);
			if (newAttempts >= 3) {
				const lockUntil = Date.now() + 24 * 60 * 60 * 1000;
				localStorage.setItem("loginLockedUntil", lockUntil);
				setSnack("error", "Too many failed attempts. You are locked out for 24 hours.");
			} else {
				setSnack("error", `Login failed. You have ${3 - newAttempts} attempt(s) left.`);
			}
		}
	};

	const { formDetails, errors, handleChange, handleSubmit,handleReset,isFormValid } = useForm(
		initialLoginForm,
		loginSchema,
		handleLogin
	);

	return isMobile ? (
		<LoginFormMobile
			formDetails={formDetails}
			errors={errors}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			onReset={handleReset}
			isFormValid={isFormValid}
		/>
	) : (
		<LoginFormDesktop
			formDetails={formDetails}
			errors={errors}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			onReset={handleReset}
			isFormValid={isFormValid}
		/>
	);
}

export default LoginForm;
