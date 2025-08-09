import { TextField, Grid } from "@mui/material";
import Form from "../../../shared/components/Form";

function CreateCardFormDesktop({ fields, formDetails, errors, handleChange, handleSubmit, onReset,isFormValid }) {
	return (
		<Form onSubmit={handleSubmit} onReset={onReset} title="Create Card" isFormValid={isFormValid}>
			<Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
				{fields.map((field) => (
					<Grid item xs={12} sm={6} key={field.name}>
						<TextField
							fullWidth
							sx={{ width: '400px' }}
							name={field.name}
							label={field.label}
							type={field.type || "text"}
							required={field.required !== false}
							error={!!errors[field.name]}
							helperText={errors[field.name]}
							onChange={handleChange}
							value={formDetails[field.name]}
						/>
					</Grid>
				))}
			</Grid>
		</Form>
	);
}

export default CreateCardFormDesktop;
