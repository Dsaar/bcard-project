import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormButton from "./FormButton";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LoopIcon from "@mui/icons-material/Loop";
import { useMediaQuery, useTheme } from "@mui/material";

const Form = ({
	title = "",
	onSubmit,
	onReset,
	to = "/",
	color = "inherit",
	spacing = 2,
	styles = {},
	children,
	isFormValid = () => true,
}) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleReset = (e) => {
		e.preventDefault();
		const form = e.target.closest("form");
		if (form) form.reset();
	};

	return (
		<Box
			component="form"
			color={color}
			sx={{
				mt: 2,
				p: { xs: 2, sm: 4 },
				width: "100%",
				maxWidth: isMobile ? "100%" : "900px", // full-width on mobile
				...styles,
			}}
			onSubmit={onSubmit}
			autoComplete="off"
			noValidate
		>
			<Typography align="center" variant="h5" component="h1" mb={3}>
				{title.toUpperCase()}
			</Typography>

			<Grid container spacing={spacing}>
				{children}
			</Grid>

			<Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
				<Grid item xs={12} sm={6}>
					<Box sx={{ width: isMobile ? "100%" : "400px", mx: "auto" }}>
						<FormButton
							node="CANCEL"
							color="error"
							variant="outlined"
							onClick={() => navigate(to)}
							fullWidth
						/>
					</Box>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Box sx={{ width: isMobile ? "100%" : "400px", mx: "auto" }}>
						<FormButton
							node={<LoopIcon />}
							variant="outlined"
							onClick={onReset || handleReset}
							fullWidth
						/>
					</Box>
				</Grid>

				<Grid item xs={12}>
					<Box sx={{ width: isMobile ? "100%" : "820px", mx: "auto" }}>
						<FormButton
							node="SUBMIT"
							onClick={onSubmit}
							size={isMobile ? "medium" : "large"}
							fullWidth
							disabled={!isFormValid()}
							sx={{
								fontSize: isMobile ? "0.9rem" : "1rem",
								py: isMobile ? 1 : 1.5
							}}
						/>
					</Box>

				</Grid>
			</Grid>
		</Box>
	);
};

export default Form;
