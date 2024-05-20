import axios from "axios";

export const getTrackById = async (props: {
	id: string;
	access_token: string;
}) => {
	const { id, access_token } = props;

	const payload = {
		method: "get",
		url: `https://api.spotify.com/v1/tracks/${id}`,
		headers: {
			Authorization: "Bearer " + access_token,
		},
	};
	try {
		const response = await axios(payload);
		console.log("response from get track with track id:", response.data);
		return response.data;
	} catch (e) {
		console.log("hello errors", e);
	}
};
