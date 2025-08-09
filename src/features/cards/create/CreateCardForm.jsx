import { useMediaQuery, useTheme } from "@mui/material";
import useForm from "../../../shared/hooks/useForm";
import createCardSchema from "../../../shared/models/createCardSchema";
import initialCreateCardForm from "../../users/helpers/initialForms/initialCreateCardForm";
import axios from "axios";
import ENDPOINTS from "../../../shared/api/endpoints";
import { getToken } from "../../users/services/localStorageService";
import { useSnack } from "../../../app/providers/SnackBarProvider";
import { useNavigate } from "react-router-dom";
import CreateCardFormDesktop from "./CreateCardFormDesktop";
import CreateCardFormMobile from "./CreateCardFormMobile";
import { formatCardData } from "../helpers/formatCardData";

function CreateCardForm() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const setSnack = useSnack();
	const navigate = useNavigate();

	const handleCreateCard = async (data) => {
		console.log("Submitting data:", data); 
		const formattedData = formatCardData(data);
		try {
			const token = getToken();
			await axios.post(
				ENDPOINTS.cards.create,
				formattedData,
				{ headers: { "x-auth-token": token } }
			);
			setSnack("success", "Card created successfully!");
			navigate("/my-cards");
		} catch (error) {
			console.error(error.response?.data || error.message);
			setSnack("error", "Failed to create card.");
		}
	};



	const { formDetails, errors, handleChange, handleSubmit, handleReset,isFormValid } = useForm(
		initialCreateCardForm,
		createCardSchema,
		handleCreateCard
	);

	const fields = [
		{ name: "title", label: "Title" },
		{ name: "subtitle", label: "Subtitle" },
		{ name: "description", label: "Description" },
		{ name: "phone", label: "Phone" },
		{ name: "email", label: "Email", type: "email" },
		{ name: "web", label: "Website", required: false },
		{ name: "imageUrl", label: "Image URL" },
		{ name: "imageAlt", label: "Image Alt" },
		{ name: "state", label: "State", required: false },
		{ name: "country", label: "Country" },
		{ name: "city", label: "City" },
		{ name: "street", label: "Street" },
		{ name: "houseNumber", label: "House Number", type: "number" },
		{ name: "zip", label: "Zip", type: "number", required: false },
	];

	return isMobile ? (
		<CreateCardFormMobile
			fields={fields}
			formDetails={formDetails}
			errors={errors}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			onReset={handleReset}
			isFormValid={isFormValid}
		/>
	) : (
		<CreateCardFormDesktop
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

export default CreateCardForm;
