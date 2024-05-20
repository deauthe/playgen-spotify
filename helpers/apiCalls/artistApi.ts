import axios, { AxiosRequestConfig } from "axios";

export const getArtistsByArtistId = async (props: {
	access_token: string;
	id: string;
}) => {
	const { access_token, id } = props;

	let url: string | URL = new URL(`https://api.spotify.com/v1/artists/${id}`);
	url = url.toString();

	const payload: AxiosRequestConfig = {
		method: "get",
		url,
		headers: {
			Authorization: ("Bearer " + access_token) as string,
		},
	};
	try {
		const response = await axios(payload);
		console.log("response from get artist:", response.data);
		return response.data;
	} catch (e) {
		console.log("hello errors", e);
	}
};
