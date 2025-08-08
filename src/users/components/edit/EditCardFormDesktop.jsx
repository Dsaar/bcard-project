import { TextField, Grid } from "@mui/material";
import Form from "../../../components/Form";

function EditCardFormDesktop({ fields, formDetails, errors, handleChange, handleSubmit,onReset,isFormValid }) {
	return (
		<Form onSubmit={handleSubmit} onReset={onReset} title="Edit Card" isFormValid={isFormValid}>
			<Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
				{fields.map((field) => (
					<Grid item xs={12} sm={6} key={field.name}>
						<TextField
							fullWidth
							sx={{ width: "400px" }}
							name={field.name}
							label={field.label}
							type={field.type || "text"}
							required={field.required !== false}
							error={!!errors[field.name]}
							helperText={errors[field.name]}
							value={formDetails[field.name] || ""}
							onChange={handleChange}
						/>
					</Grid>
				))}
			</Grid>
		</Form>
	);
}

export default EditCardFormDesktop;
