import axios, { AxiosRequestConfig } from "axios";
import { DateFormat, dateSchema, isDateBetween } from "../utilityFunctions";

export const getMyDetails = async (access_token: string) => {
	const payload: AxiosRequestConfig = {
		url: "https://api.spotify.com/v1/me",
		method: "get",
		headers: {
			Authorization: ("Bearer " + access_token) as string,
		},
	};

	try {
		const response = await axios(payload);
		console.log("response from get my details:", response.data);
		return response.data;
	} catch (e) {
		console.log("hello errors", e);
	}
};

export interface topItemsProps {
	access_token: string;
	type: "artists" | "tracks";
	time_range: "short_term" | "long_term" | "medium_term";
	limit: number;
	offset: number;
}

export const getMyTopItems = async (props: topItemsProps) => {
	const { offset, type, time_range, limit, access_token } = props;
	const searchParams = {
		offset: offset.toString(),
		time_range: time_range as string,
		limit: limit.toString(),
	};
	let url: string | URL = new URL(`https://api.spotify.com/v1/me/top/${type}`);
	url.search = new URLSearchParams(searchParams).toString();
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
		console.log("response from get my top items:", response.data);
		return response.data.items;
	} catch (e) {
		console.log("hello errors", e);
	}
};

export const getMySavedTracks = async (props: {
	offset: number;
	limit: number;
	access_token: string;
}) => {
	const { offset, limit, access_token } = props;
	const searchParams = {
		offset: offset.toString(),
		limit: limit.toString(),
	};
	let url: string | URL = new URL(`https://api.spotify.com/v1/me/tracks`);
	url.search = new URLSearchParams(searchParams).toString();
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
		console.log("response from get my top items:", response.data);
		return response.data.items;
	} catch (e) {
		console.log("hello errors", e);
	}
};

export const getSavedTracksBetweenMonths = async (props: {
	startDate: DateFormat;
	endDate: DateFormat;
	access_token: string;
}) => {
	const { startDate, endDate, access_token } = props;
	const parsedStartDate = dateSchema.safeParse(startDate);
	const parsedEndDate = dateSchema.safeParse(endDate);
	const limit = 50;
	let offset = 0;

	if (!parsedStartDate.success || !parsedEndDate.success) {
		throw new Error("Invalid start or end date format. Expected YYYY-MM-DD");
	}
	let requiredTracks: string[] = [];

	//Fix Bruteforce approach:
	for (let i = 0; i <= 50; i++) {
		offset = i * limit;
		let currTracks: any = await getMySavedTracks({
			access_token,
			limit,
			offset,
		});

		let nextIterationNeeded = true;

		//sorting tracks that lie in between preferred dates
		let goodTracks = currTracks?.filter((track: any, index: number) => {
			console.log("reaching here");

			let { isBetween, shouldContinue } = isDateBetween({
				timestamp: track?.added_at,
				startDate,
				endDate,
			});
			nextIterationNeeded = shouldContinue;
			// console.log("isBetween", "nextIterationNeeded", {
			// 	isBetween,
			// 	nextIterationNeeded,
			// });

			return isBetween;
		});

		//keeping only the ids of goodTracks, removing everything else
		if (!goodTracks) {
			console.log(
				"no good tracks",
				"next iteration needed",
				nextIterationNeeded
			);

			continue;
		}

		goodTracks = goodTracks.map((track: any, index: number) => {
			requiredTracks.push("spotify:track:" + track?.track?.id || "");
			return track.track.id;
		});
		console.log("required tracks", requiredTracks);

		if (!nextIterationNeeded) return requiredTracks;
	}
	//Test function

	return requiredTracks;
};
