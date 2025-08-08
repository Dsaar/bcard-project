import { Card, CardMedia, Box } from "@mui/material";
import BCardBody from "./BCardBody";
import BCardFooter from "./BCardFooter";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../router/routesDictionary";

function BCard({ card, onDelete, toggleLike, isLiked, user }) {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(ROUTES.cardDetailsDynamic(card._id));
	};

	return (
		<Card
			sx={{
				width: 300, // fixed width
				height: 400, // fixed height
				display: "flex",
				flexDirection: "column",
				mx: 2,
				cursor: "pointer",
			}}
			onClick={handleCardClick}
		>
			<CardMedia
				sx={{ height: 200 }}
				image={card.image.url}
				title="Business logo"
			/>
			<Box
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<BCardBody
					title={card.title}
					subtitle={card.subtitle}
					bizNumber={card.bizNumber}
					phone={card.phone}
					city={card.address.city}
				/>
				<BCardFooter
					toggleLike={toggleLike}
					isLiked={isLiked}
					cardId={card._id}
					bizNumber={card.bizNumber}
					onDelete={onDelete}
					user={user}
					ownerId={card.user_id}
				/>
			</Box>
		</Card>
	);
}

export default BCard;
