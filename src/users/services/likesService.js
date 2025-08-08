import axios from "axios";
import { getToken } from "./localStorageService";
import ENDPOINTS from "../../api/endpoints";

export const toggleLikedCard = async (cardId) => {
	const token = getToken();
	if (!token) throw new Error("Missing token");

	try {
		// Toggle like status on server
		const response = await axios.patch(
			ENDPOINTS.cards.toggleLike(cardId),
			{},
			{ headers: { "x-auth-token": token } }
		);
		return response.data; // updated card object
	} catch (err) {
		console.error("Failed to toggle like on server:", err);
		throw err;
	}
};