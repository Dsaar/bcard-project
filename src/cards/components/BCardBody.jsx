import { CardContent, Divider, Typography } from "@mui/material";

function BCardBody({ title, subtitle, phone, city, bizNumber }) {
	return (
		<CardContent sx={{ overflow: "hidden" }}>
			<Typography
				variant="h5"
				sx={{
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
			>
				{title}
			</Typography>
			<Typography
				variant="h6"
				sx={{
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
			>
				{subtitle}
			</Typography>
			<Divider sx={{ marginY: 1 }} />
			<Typography variant="body2">
				<strong>Phone:</strong> {phone}
			</Typography>
			<Typography variant="body2">
				<strong>Address:</strong> {city}
			</Typography>
			<Typography variant="body2">Card Number: {bizNumber}</Typography>
		</CardContent>
	);
}

export default BCardBody;
