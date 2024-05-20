"use client";
import {
	getMyDetails,
	getMyTopItems,
	getSavedTracksBetweenMonths,
} from "@/helpers/apiCalls/userApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import SongCard from "../Cards/SongCard";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	getFormattedDate,
	loginToastOptions,
} from "@/helpers/utilityFunctions";

import { useToast } from "@/components/ui/use-toast";
import {
	addItemsToAPlaylist,
	createPlaylist,
} from "@/helpers/apiCalls/playlistApi";

type Props = {};

const MonthlyPlaylistMaker = (props: Props) => {
	const { toast } = useToast();
	const access_token = localStorage.getItem("playgen_access_token");
	const router = useRouter();
	const [visibleTracks, setVisibleTracks] = useState<any>();
	const [month, setMonth] = useState<number>(1);
	const showLoginToast = () => {
		toast(loginToastOptions);
	};
	const makeMonthlyPlaylists = async () => {
		const startDate = getFormattedDate(month);
		const endDate = getFormattedDate(month + 1);
		console.log("top level end date", startDate, " ", endDate);

		if (access_token) {
			const currentUser = await getMyDetails(access_token);
			const currentUserId = currentUser.id;
			const trackIds = await getSavedTracksBetweenMonths({
				access_token,
				endDate,
				startDate,
			});
			if (trackIds.length === 0) {
				toast({
					title: "No tracks found",
					description: `There are no songs saved between ${startDate} and ${endDate}`,
					duration: 5000,
				});
			} else {
				let newPlaylistId = await createPlaylist({
					access_token,
					description: `Monthly Playlist ${startDate}`,
					isPublic: false,
					name: "monthly playlist for you :3",
					userId: currentUserId,
				});
				newPlaylistId = newPlaylistId.id;

				addItemsToAPlaylist({
					access_token,
					playlistId: newPlaylistId,
					uris: trackIds,
					postion: 0,
				});
			}
		}
	};

	if (!access_token) {
		//route to login
	}
	useEffect(() => {
		if (access_token) {
			async () => {
				const defaultTracks = await getMyTopItems({
					access_token,
					limit: 30,
					offset: 0,
					time_range: "short_term",
					type: "tracks",
				});
				setVisibleTracks(defaultTracks);
			};
		}
	});
	return (
		<div className="flex flex-col items-center justify-center w-full min-h-screen">
			<div className="bg-black md:w-2/3 mx-auto ">
				<h1>preview tracks</h1>
				{visibleTracks &&
					visibleTracks.map((track: any, index: number) => {
						return (
							<SongCard
								key={index}
								albumId={track.album.id}
								artistIds={track.artists.map((artist: any) => artist.id)}
								id={track.id}
								name={track.name}
								popularity={track.popularity}
							/>
						);
					})}
			</div>
			<SelectMonth onValueChange={setMonth} />

			<Button onClick={makeMonthlyPlaylists}>Make Monthly Playlist</Button>
		</div>
	);
};

export default MonthlyPlaylistMaker;

export function SelectMonth(props: { onValueChange: any }) {
	return (
		<Select onValueChange={(e) => props.onValueChange(Number(e))}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a type" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Type</SelectLabel>
					<SelectItem value="1">January</SelectItem>
					<SelectItem value="2">February</SelectItem>
					<SelectItem value="3">March</SelectItem>
					<SelectItem value="4">April</SelectItem>
					<SelectItem value="5">May</SelectItem>
					<SelectItem value="6">June</SelectItem>
					<SelectItem value="7">July</SelectItem>
					<SelectItem value="8">August</SelectItem>
					<SelectItem value="9">September</SelectItem>
					<SelectItem value="10">October</SelectItem>
					<SelectItem value="11">November</SelectItem>
					<SelectItem value="12">December</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
