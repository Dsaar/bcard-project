import { Paper, Typography } from "@mui/material";

export default function OfferCard({ icon, title, text }) {
	return (
		<Paper
			elevation={2}
			sx={{
				p: 3,
				textAlign: "center",
				height: "100%",
				borderRadius: 3,
				maxWidth: 560,
				mx: "auto",
			}}
		>
			{icon}
			<Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
				{title}
			</Typography>
			<Typography sx={{ color: "text.secondary" }}>{text}</Typography>
		</Paper>
	);
}
