import AddIcon from "@mui/icons-material/Add";
import { Button, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddNewItemButton({
	to,
	setIsDialogOpen,
	actionFunc,
	text = "",
	sx = {},
}) {
	const [buttonSize, setButtonSize] = useState(64);
	const theme = useTheme();
	const navigate = useNavigate();

	useEffect(() => {
		const newSize = Math.max(80, text.length * 8 + 40);
		setButtonSize(newSize);
	}, [text]);

	const handleClick = () => {
		if (to) navigate(to);
		else if (setIsDialogOpen) setIsDialogOpen(true);
		else if (actionFunc) actionFunc();
		else console.error("Missing navigation or action handler.");
	};

	return (
		<Button
			aria-label="add"
			variant="contained"
			color="primary"
			disableElevation
			sx={{
				position: "fixed",
				bottom: 75,
				right: 40,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: `${buttonSize}px`,
				height: `${buttonSize}px`,
				borderRadius: "50%",
				padding: "10px",
				boxSizing: "border-box",
				color: theme.palette.getContrastText(theme.palette.primary.main),
				zIndex: 10000000,
				...sx,
			}}
			onClick={handleClick}
		>
			<AddIcon />
			<Typography
				variant="caption"
				sx={{
					fontWeight: 500,
					textTransform: "uppercase",
					fontSize: "0.75rem",
					mt: 0.5,
				}}
			>
				{text}
			</Typography>
		</Button>
	);
}

export default AddNewItemButton;
