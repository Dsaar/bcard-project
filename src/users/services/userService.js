import axios from "axios";
import { getToken } from "./localStorageService";
import ENDPOINTS from "../../api/endpoints";

export const getUserById = async (userId) => {
	const token = getToken();
	if (!token) throw new Error("No token found");

	const response = await axios.get(
		`${ENDPOINTS.users.all}/${userId}`,
		{
			headers: { "x-auth-token": token },
		}
	);
	return response.data;
};


export const deleteUserById = async (userId) => {
	const token = getToken();
	if (!token) throw new Error("No token found");

	const response = await axios.delete(
		ENDPOINTS.users.deleteUser(userId),
		{
			headers: { "x-auth-token": token },
		}
	);
	return response.data;
}