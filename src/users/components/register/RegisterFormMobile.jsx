import {
	TextField,
	Grid,
	FormControlLabel,
	Checkbox,
	Box
} from "@mui/material";
import Form from "../../../components/Form";
import PasswordField from "../../../components/PasswordField";

function RegisterFormMobile({ fields, formDetails, errors, handleChange, handleSubmit, isFormValid, onReset }) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "flex-start",
				minHeight: "100vh",
				py: 4,
			}}
		>
			<Form onSubmit={handleSubmit} onReset={onReset} title="Sign Up" isFormValid={isFormValid}>
				<Grid container spacing={2}>
					{fields.map((field) => (
						<Grid item xs={12} key={field.name}>
							{field.name === "password" ? (
								<PasswordField
									sx={{ width: '320px' }}
									value={formDetails[field.name]}
									onChange={handleChange}
									error={errors[field.name]}
									helperText={errors[field.name]}
									label={field.label}
									name={field.name}
								/>
							) : (
								<TextField
									sx={{ width: '320px' }}
									fullWidth
									name={field.name}
									label={field.label}
									type={field.type || "text"}
									required={field.required !== false}
									error={!!errors[field.name]}
									helperText={errors[field.name]}
									onChange={handleChange}
									value={formDetails[field.name]}
								/>
							)}
						</Grid>
					))}
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									checked={formDetails.isBusiness}
									onChange={(e) =>
										handleChange({
											target: { name: "isBusiness", value: e.target.checked },
										})
									}
									name="isBusiness"
								/>
							}
							label="Signup as business"
						/>
					</Grid>
				</Grid>
			</Form>
		</Box>
	);
}

export default RegisterFormMobile;
