import React from "react";
import IconBox from "../components/IconBox";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useTheme } from "@mui/material";

// We wrap this in a function to allow using `useTheme()` for dynamic colors
export const getOffers = () => {
	const theme = useTheme();

	return [
		{
			title: "Create",
			text: "Design unique and professional business cards effortlessly with our intuitive creation tools.",
			icon: (
				<IconBox bgColor="#72aed9ff">
					<CreateIcon sx={{ fontSize: 32, color: theme.palette.primary.light }} />
				</IconBox>
			),
		},
		{
			title: "Browse",
			text: "Explore a wide range of business cards, discover new contacts, and connect with professionals.",
			icon: (
				<IconBox bgColor="#cb77d7ff">
					<SearchIcon sx={{ fontSize: 32, color: theme.palette.primary.light }} />
				</IconBox>
			),
		},
		{
			title: "CRM for Admins",
			text: "Manage business card data, users, and maintain business relationships with advanced analytics.",
			icon: (
				<IconBox bgColor="#88f891ff">
					<SupervisorAccountIcon sx={{ fontSize: 32, color: theme.palette.primary.light }} />
				</IconBox>
			),
		},
	];
};
