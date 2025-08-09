import { Box, Typography, useTheme, Divider } from "@mui/material";

export default function PageHeader({ title, description, highlightFirst = false }) {
	const theme = useTheme();

	// Split title into words
	const words = title.trim().split(" ");
	const firstWord = words[0];
	const rest = words.slice(1).join(" ");

	return (
		<Box sx={{ textAlign: "center", mb: 4, pt: 6 }}>
			<Typography
				variant="h2"
				sx={{
					fontWeight: "bold",
					mb: 1,
				}}
			>
				{rest ? (
					highlightFirst ? (
						<>
							<span style={{ color: theme.palette.primary.main }}>{firstWord}</span>{" "}
							{rest}
						</>
					) : (
						<>
							{firstWord}{" "}
							<span style={{ color: theme.palette.primary.main }}>{rest}</span>
						</>
					)
				) : (
					// If only one word → highlight entire thing
					<span style={{ color: theme.palette.primary.main }}>{title}</span>
				)}
			</Typography>

			{description && (
				<Typography
					variant="h6"
					sx={{
						maxWidth: 700,
						mx: "auto",
						color: theme.palette.text.secondary,
						mb: 2,
					}}
				>
					{description}
				</Typography>
			)}
			<Divider sx={{ maxWidth: 700, mx: "auto", mb: 3 }} />
		</Box>
	);
}
