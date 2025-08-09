import {
	Grid,
	Box,
	Button
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useNavigate } from "react-router-dom";
import Form from "../../../shared/components/Form";
import PasswordField from "../../../shared/components/PasswordField";

function LoginFormDesktop({ formDetails, errors, handleChange, handleSubmit, onReset, isFormValid }) {
	const navigate = useNavigate();

	return (
		<Form
			onSubmit={handleSubmit}
			onReset={onReset}
			title="Sign In"
			styles={{ maxWidth: "900px" }}
			isFormValid={isFormValid}
		>
			<Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
				<Grid item xs={12} sm={6}>
					<PasswordField
						label="Email"
						name="email"
						sx={{ width: "400px" }}
						value={formDetails.email}
						onChange={handleChange}
						error={errors.email}
						helperText={errors.email}
						type="email"
						InputProps={{}} 
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<PasswordField
						sx={{ width: "400px" }}
						value={formDetails.password}
						onChange={handleChange}
						error={errors.password}
						helperText={errors.password}
					/>
				</Grid>

				<Grid item xs={12}>
					<Box sx={{ width: "820px", mx: "auto" }}>
						<Button
							fullWidth
							variant="outlined"
							startIcon={<PersonAddAltIcon />}
							onClick={() => navigate("/register")}
						>
							Sign Up
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Form>
	);
}

export default LoginFormDesktop;
