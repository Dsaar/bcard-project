import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMediaQuery, useTheme } from "@mui/material";
import useForm from "../../../hooks/useForm";
import signupSchema from "../../models/signupShcema";
import initialSignupForm from "../../helpers/initialForms/initialSignupForm";
import { useCurrentUser } from "../../providers/UserProvider";
import { getUser, setTokenInLocalStorage } from "../../services/localStorageService";
import ENDPOINTS from "../../../api/endpoints";
import RegisterFormDesktop from "./RegisterFormDesktop";
import RegisterFormMobile from "./RegisterFormMobile";

function RegisterForm() {
	const navigate = useNavigate();
	const { setUser, setToken } = useCurrentUser();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
	console.log("Current screen width breakpoint match:", isMobile);

	const handleSignUp = async (userDetails) => {
		const userDetailsForServer = {
			name: {
				first: userDetails.first,
				middle: userDetails.middle,
				last: userDetails.last,
			},
			phone: userDetails.phone,
			email: userDetails.email,
			password: userDetails.password,
			image: {
				url: userDetails.url,
				alt: userDetails.alt,
			},
			address: {
				state: userDetails.state,
				country: userDetails.country,
				city: userDetails.city,
				street: userDetails.street,
				houseNumber: userDetails.houseNumber,
				zip: userDetails.zip,
			},
			isBusiness: userDetails.isBusiness,
		};

		try {
			const response = await axios.post(ENDPOINTS.users.register, userDetailsForServer);
			const loginResponse = await axios.post(ENDPOINTS.users.login, {
				email: userDetails.email,
				password: userDetails.password,
			});
			setTokenInLocalStorage(loginResponse.data);
			setToken(loginResponse.data);
			setUser(getUser());
			navigate("/");
		} catch (error) {
			console.error("Signup failed:", error);
			if (error.response?.data) alert(error.response.data);
		}
	};

	const { formDetails, errors, handleChange, handleSubmit,handleReset,isFormValid } = useForm(
		initialSignupForm,
		signupSchema,
		handleSignUp
	);

	const fields = [
		{ name: "first", label: "First Name" },
		{ name: "middle", label: "Middle Name", required: false },
		{ name: "last", label: "Last Name" },
		{ name: "phone", label: "Phone", type: "phone" },
		{ name: "email", label: "Email", type: "email" },
		{ name: "password", label: "Password", type: "password" },
		{ name: "url", label: "Image URL", required: false },
		{ name: "alt", label: "Image Alt", required: false },
		{ name: "state", label: "State", required: false },
		{ name: "country", label: "Country" },
		{ name: "city", label: "City" },
		{ name: "street", label: "Street" },
		{ name: "houseNumber", label: "House Number", type: "number" },
		{ name: "zip", label: "Zip", type: "number", required: false },
	];

	if (isMobile) {
		console.log("Rendering: MOBILE form");
	} else {
		console.log("Rendering: DESKTOP form");
	}
	
	return isMobile ? (
		<RegisterFormMobile
			fields={fields}
			formDetails={formDetails}
			errors={errors}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			onReset={handleReset}
			isFormValid={isFormValid}
		/>
	) : (
		<RegisterFormDesktop
			fields={fields}
			formDetails={formDetails}
			errors={errors}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			onReset={handleReset}
			isFormValid={isFormValid}
		/>
	);
}

export default RegisterForm;
