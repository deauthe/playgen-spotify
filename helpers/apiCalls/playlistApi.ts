import axios, { AxiosRequestConfig } from "axios";

export const createPlaylist = async (props: {
	userId: string;
	name: string;
	description: string;
	isPublic: boolean;
	access_token: string;
}) => {
	const { userId, access_token, name, description, isPublic } = props;
	const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
	const payload: AxiosRequestConfig = {
		method: "post",
		url,
		headers: {
			Authorization: ("Bearer " + access_token) as string,
		},
		data: {
			name,
			description,
			public: isPublic,
		},
	};
	try {
		const response = await axios(payload);
		console.log("response from create a playlist:", response.data);
		return response.data;
	} catch (e) {
		console.log("hello errors", e);
	}
};

export const addItemsToAPlaylist = async (props: {
	uris: string[];
	postion: number;
	access_token: string;
	playlistId: string;
}) => {
	const { uris, postion, access_token, playlistId } = props;
	console.log("uris", uris);
	const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
	const payload: AxiosRequestConfig = {
		method: "post",
		url,
		headers: {
			Authorization: ("Bearer " + access_token) as string,
		},
		data: {
			uris,
			postion,
		},
	};
	try {
		const response = await axios(payload);
		console.log("response from get my top items:", response.data);
		return response.data.items;
	} catch (e) {
		console.log("hello errors", e);
	}
};

export const getMyPlaylists = async (props: {
	limit: number;
	offset: number;
	access_token: string;
}) => {
	const { limit, offset, access_token } = props;
	const searchParams = {
		offset: offset.toString(),
		limit: limit.toString(),
	};
	let url: string | URL = new URL(`https://api.spotify.com/v1/me/playlists`);
	url.search = new URLSearchParams(searchParams).toString();
	url = url.toString();

	const payload: AxiosRequestConfig = {
		method: "post",
		url,
		headers: {
			Authorization: ("Bearer " + access_token) as string,
		},
	};
	try {
		const response = await axios(payload);
		console.log("response from get my top items:", response.data);
		return response.data.items;
	} catch (e) {
		console.log("hello errors", e);
	}
};
