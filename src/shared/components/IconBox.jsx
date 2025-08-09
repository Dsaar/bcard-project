import { Box } from "@mui/material";

export default function IconBox({ children, bgColor }) {
	return (
		<Box
			sx={{
				width: 64,
				height: 64,
				borderRadius: 2,
				backgroundColor: bgColor,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				mx: "auto",
				mb: 2,
			}}
		>
			{children}
		</Box>
	);
}
