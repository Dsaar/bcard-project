import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import { getToken } from "../../users/services/localStorageService";
import axios from "axios";
import useForm from "../../../shared/hooks/useForm";
import { useSnack } from "../../../app/providers/SnackBarProvider";
import ENDPOINTS from "../../../shared/api/endpoints";
import EditUserFormDesktop from "./EditUserFormDesktop";
import EditUserFormMobile from "./EditUserFormMobile";
import { useCurrentUser } from "../../../app/providers/UserProvider";
import editUserSchema from "../../../shared/models/editUserSchema";

function EditUserForm() {
	const { user } = useCurrentUser();
	const navigate = useNavigate();
	const setSnack = useSnack();
	const [loading, setLoading] = useState(true);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const { formDetails, setFormDetails, errors, handleChange, handleSubmit, handleReset, isFormValid } = useForm(
		{},
		editUserSchema,
		async (data) => {
			const token = getToken();
			const formattedData = {
				name: { first: data.first, middle: data.middle, last: data.last },
				phone: data.phone,
				image: { url: data.url, alt: data.alt },
				address: {
					state: data.state,
					country: data.country,
					city: data.city,
					street: data.street,
					houseNumber: data.houseNumber,
					zip: data.zip,
				},
			};

			try {
				await axios.put(
					`${ENDPOINTS.users.all}/${user._id}`,
					formattedData,
					{ headers: { "x-auth-token": token } }
				);
				setSnack("success", "Profile updated successfully.");
				navigate("/profile");
			} catch (error) {
				console.error("Update failed:", error);
				setSnack("error", "Failed to update profile.");
			}
		}
	);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = getToken();
				const { data } = await axios.get(
					`${ENDPOINTS.users.all}/${user._id}`,
					{ headers: { "x-auth-token": token } }
				);
				setFormDetails({
					first: data.name.first,
					middle: data.name.middle,
					last: data.name.last,
					phone: data.phone,
					url: data.image.url,
					alt: data.image.alt,
					state: data.address.state,
					country: data.address.country,
					city: data.address.city,
					street: data.address.street,
					houseNumber: data.address.houseNumber,
					zip: data.address.zip,
				});
				setLoading(false);
			} catch (error) {
				console.error("Failed to load user:", error);
				setSnack("error", "Could not load profile.");
			}
		};
		fetchUser();
	}, [user._id, setFormDetails, setSnack]);

	if (loading) return <div>Loading...</div>;

	const fields = [
		{ name: "first", label: "First Name" },
		{ name: "middle", label: "Middle Name", required: false },
		{ name: "last", label: "Last Name" },
		{ name: "phone", label: "Phone" },
		{ name: "url", label: "Image URL" },
		{ name: "alt", label: "Image Alt" },
		{ name: "state", label: "State" },
		{ name: "country", label: "Country" },
		{ name: "city", label: "City" },
		{ name: "street", label: "Street" },
		{ name: "houseNumber", label: "House Number", type: "number" },
		{ name: "zip", label: "Zip", type: "number" },
	];

	return isMobile ? (
		<EditUserFormMobile
			fields={fields}
			formDetails={formDetails}
			errors={errors}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			onReset={handleReset}
			isFormValid={isFormValid}
		/>
	) : (
		<EditUserFormDesktop
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

export default EditUserForm;
