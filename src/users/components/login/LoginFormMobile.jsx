import {
	Grid,
	Box,
	Button
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useNavigate } from "react-router-dom";
import Form from "../../../components/Form";
import PasswordField from "../../../components/PasswordField";

function LoginFormMobile({ formDetails, errors, handleChange, handleSubmit, onReset, isFormValid }) {
	const navigate = useNavigate();

	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", py: 4 }}>
			<Form
				onSubmit={handleSubmit}
				onReset={onReset}
				title="Sign In"
				styles={{ maxWidth: "100%" }}
				isFormValid={isFormValid}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<PasswordField
							label="Email"
							name="email"
							sx={{ width: "320px" }}
							value={formDetails.email}
							onChange={handleChange}
							error={errors.email}
							helperText={errors.email}
							type="email"
							InputProps={{}} 
						/>
					</Grid>
					<Grid item xs={12}>
						<PasswordField
							sx={{ width: '320px' }}
							value={formDetails.password}
							onChange={handleChange}
							error={errors.password}
							helperText={errors.password}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							sx={{ width: '320px' }}
							fullWidth
							variant="outlined"
							startIcon={<PersonAddAltIcon />}
							onClick={() => navigate("/register")}
						>
							Sign Up
						</Button>
					</Grid>
				</Grid>
			</Form>
		</Box>
	);
}

export default LoginFormMobile;
