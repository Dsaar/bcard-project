import React, { useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import Form from '../../components/Form';
import useForm from '../../hooks/useForm';
import { getToken } from '../services/localStorageService';
import axios from 'axios';
import ENDPOINTS from '../../api/endpoints';
import editUserSchema from '../models/editUserSchema';
import { useSnack } from '../../providers/SnackBarProvider';

function EditUserForm({ userData, onSuccess }) {
	const setSnack = useSnack();

	const handleUpdate = async (formDetails) => {
		const token = getToken();

		const payload = {
			name: {
				first: formDetails.first,
				middle: formDetails.middle,
				last: formDetails.last,
			},
			phone: formDetails.phone,
			image: {
				url: formDetails.url,
				alt: formDetails.alt,
			},
			address: {
				state: formDetails.state,
				country: formDetails.country,
				city: formDetails.city,
				street: formDetails.street,
				houseNumber: Number(formDetails.houseNumber),
				zip: Number(formDetails.zip),
			},
		};

		try {
			await axios.put(`${ENDPOINTS.users.all}/${userData._id}`, payload, {
				headers: { 'x-auth-token': token },
			});
			setSnack('success', 'Profile updated successfully');
			if (onSuccess) onSuccess();
		} catch (err) {
			console.error('Update failed:', err.response?.data || err);
			setSnack('error', 'Update failed: ' + (err.response?.data || 'Unknown error'));
		}
	};


	const { formDetails, handleChange, handleSubmit, setFormDetails, errors } = useForm(
		{},
		editUserSchema,
		handleUpdate
	);

	// Prefill from API response
	useEffect(() => {
		setFormDetails({
			first: userData.name.first,
			middle: userData.name.middle,
			last: userData.name.last,
			phone: userData.phone,
			url: userData.image?.url,
			alt: userData.image?.alt,
			state: userData.address?.state,
			country: userData.address?.country,
			city: userData.address?.city,
			street: userData.address?.street,
			houseNumber: userData.address?.houseNumber,
			zip: userData.address?.zip,
		});
	}, [userData, setFormDetails]);

	const fields = [
		{ name: 'first', label: 'First Name' },
		{ name: 'middle', label: 'Middle Name' },
		{ name: 'last', label: 'Last Name' },
		{ name: 'phone', label: 'Phone' },
		{ name: 'url', label: 'Image URL' },
		{ name: 'alt', label: 'Image Alt' },
		{ name: 'state', label: 'State' },
		{ name: 'country', label: 'Country' },
		{ name: 'city', label: 'City' },
		{ name: 'street', label: 'Street' },
		{ name: 'houseNumber', label: 'House Number', type: 'number' },
		{ name: 'zip', label: 'Zip', type: 'number' },
	];

	if (!formDetails || !formDetails.first) return null;

	return (
		<Form onSubmit={handleSubmit} title="Edit Profile">
			<Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
				{fields.map((field) => (
					<Grid item xs={12} sm={6} key={field.name}>
						<TextField
							fullWidth
							sx={{ width: '400px' }}
							name={field.name}
							label={field.label}
							type={field.type || 'text'}
							value={formDetails[field.name] || ''}
							onChange={handleChange}
							error={!!errors[field.name]}
							helperText={errors[field.name]}
						/>
					</Grid>
				))}
			</Grid>
		</Form>
	);
}

export default EditUserForm;
