import {
	Grid,
	TextField,
	Checkbox,
	Button,
	FormControlLabel,
} from "@mui/material";

const useFormLayout = (
	layoutConfig,
	formDetails,
	errors,
	handleChange,
	handleSubmit
) => {
	const { fields = [], checkboxes = [], buttons = [] } = layoutConfig;

	const fieldElements = fields.map(({ label, name, type = "text", xs = 12, sm = 6 }) => (
		<Grid item xs={xs} sm={sm} key={name}>
			<TextField
				fullWidth
				sx={{ width: "400px", mx: "auto" }}
				label={label}
				name={name}
				type={type}
				value={formDetails[name]}
				onChange={handleChange}
				error={Boolean(errors[name])}
				helperText={errors[name]}
			/>
		</Grid>
	));

	const checkboxElements = checkboxes.map(({ label, name, xs = 12, sm = 12 }) => (
		<Grid item xs={xs} sm={sm} key={name} sx={{ display: "flex", justifyContent: "center" }}>
			<FormControlLabel
				control={
					<Checkbox
						name={name}
						checked={formDetails[name]}
						onChange={(e) =>
							handleChange({
								target: {
									name,
									value: e.target.checked,
								},
							})
						}
					/>
				}
				label={label}
			/>
		</Grid>
	));

	const buttonElements = buttons.map(
		({ label, color = "primary", variant = "contained", onClick, xs = 12, sm = 6 }, i) => (
			<Grid item xs={xs} sm={sm} key={label + i}>
				<Button
					fullWidth
					variant={variant}
					color={color}
					onClick={onClick}
				>
					{label}
				</Button>
			</Grid>
		)
	);

	return [...fieldElements, ...checkboxElements, ...buttonElements];
};

export default useFormLayout;
