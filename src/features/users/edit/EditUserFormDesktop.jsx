import { Box, TextField, Grid } from "@mui/material";
import Form from "../../../shared/components/Form";

function EditUserFormDesktop({ fields, formDetails, errors, handleChange, handleSubmit, onReset, isFormValid }) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				py: 4
			}}
		>
			<Form onSubmit={handleSubmit} onReset={onReset} title="Edit Profile" isFormValid={isFormValid} styles={{ maxWidth: "900px", width: "100%" }}>
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
		</Box>
	);
}

export default EditUserFormDesktop;
