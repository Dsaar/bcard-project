import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { getToken } from "../services/localStorageService";
import axios from "axios";
import useForm from "../../hooks/useForm";
import createCardSchema from "../models/createCardSchema";
import useFormLayout from "../../hooks/useFormLayout";
import Form from "../../components/Form";
import { useSnack } from "../../providers/SnackBarProvider";
import ENDPOINTS from "../../api/endpoints";

function EditCardForm() {
	const { id } = useParams();
	const navigate = useNavigate();
	const setSnack = useSnack();
	const [loading, setLoading] = useState(true);

	const {
		formDetails,
		setFormDetails,
		errors,
		handleChange,
		handleSubmit,
	} = useForm(
		{},
		createCardSchema,
		async (data) => {
			const token = getToken();
			const formattedData = {
				title: data.title,
				subtitle: data.subtitle,
				description: data.description,
				phone: data.phone,
				email: data.email,
				web: data.web,
				image: {
					url: data.imageUrl,
					alt: data.imageAlt,
				},
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
					ENDPOINTS.cards.update(id),
					formattedData,
					{
						headers: { "x-auth-token": token },
					}
				);
				setSnack("success", "Card updated successfully.");
				navigate("/my-cards");
			} catch (error) {
				console.error("Update failed:", error);
				setSnack("error", "Failed to update card.");
			}
		}
	);

	useEffect(() => {
		const fetchCard = async () => {
			try {
				const token = getToken();
				const { data } = await axios.get(
					ENDPOINTS.cards.single(id),
					{
						headers: { "x-auth-token": token },
					}
				);
				setFormDetails({
					title: data.title,
					subtitle: data.subtitle,
					description: data.description,
					phone: data.phone,
					email: data.email,
					web: data.web,
					imageUrl: data.image.url,
					imageAlt: data.image.alt,
					state: data.address.state,
					country: data.address.country,
					city: data.address.city,
					street: data.address.street,
					houseNumber: data.address.houseNumber,
					zip: data.address.zip,
				});
				setLoading(false);
			} catch (error) {
				console.error("Failed to load card:", error);
				setSnack("error", "Could not load card.");
			}
		};

		fetchCard();
	}, [id]);

	const layoutConfig = {
		fields: [
			{ name: "title", label: "Title" },
			{ name: "subtitle", label: "Subtitle" },
			{ name: "description", label: "Description" },
			{ name: "phone", label: "Phone" },
			{ name: "email", label: "Email", type: "email" },
			{ name: "web", label: "Website" },
			{ name: "imageUrl", label: "Image URL" },
			{ name: "imageAlt", label: "Image Alt" },
			{ name: "state", label: "State" },
			{ name: "country", label: "Country" },
			{ name: "city", label: "City" },
			{ name: "street", label: "Street" },
			{ name: "houseNumber", label: "House Number", type: "number" },
			{ name: "zip", label: "Zip", type: "number" },
		],
	};

	const formLayout = useFormLayout(
		layoutConfig,
		formDetails,
		errors,
		handleChange,
		handleSubmit
	);

	if (loading) return <div>Loading...</div>;

	return (
		<Form onSubmit={handleSubmit} title="Edit Card">
			<Grid container spacing={2} justifyContent="center">
				{formLayout}
			</Grid>
		</Form>
	);
}

export default EditCardForm;
