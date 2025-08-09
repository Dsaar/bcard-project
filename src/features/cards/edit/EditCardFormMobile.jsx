import { TextField, Grid, Box } from "@mui/material";
import Form from "../../../shared/components/Form";

function EditCardFormMobile({ fields, formDetails, errors, handleChange, handleSubmit,onReset,isFormValid }) {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", py: 4 }}>
			<Form onSubmit={handleSubmit} onReset={onReset} title="Edit Card" isFormValid={isFormValid}>
				<Grid container spacing={2}>
					{fields.map((field) => (
						<Grid item xs={12} key={field.name}>
							<TextField
							sx={{width:'350px'}}
								fullWidth
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
		</Box>
	);
}

export default EditCardFormMobile;
