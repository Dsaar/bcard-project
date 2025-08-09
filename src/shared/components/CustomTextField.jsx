import React from "react";
import { Grid, TextField } from "@mui/material";

const CustomTextField = ({ name, label, type = "text", error, value, onChange, required = true }) => (
	<Grid item sx={{ width: 360, mx: "auto" }}>
		<TextField
			fullWidth
			name={name}
			label={label}
			type={type}
			required={required}
			error={!!error}
			helperText={error || " "}
			value={value}
			onChange={onChange}
		/>
	</Grid>
);

export default CustomTextField;