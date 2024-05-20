"use client";
import React, { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { getMyTopItems, topItemsProps } from "@/helpers/apiCalls/userApi";
import SongCard from "../Cards/SongCard";

export default function TopItemsSection() {
	const [type, setType] = useState<"tracks" | "artists">("tracks");
	const [timeRange, setTimerange] = useState<
		"short_term" | "medium_term" | "long_term"
	>("short_term");
	const access_token = localStorage.getItem("playgen_access_token") as string;
	const [tracks, setTracks] = useState<any>();
	const [artists, setArtists] = useState<any>();
	const getTopItems = async () => {
		const props: topItemsProps = {
			access_token,
			limit: 10,
			offset: 0,
			time_range: timeRange,
			type: type,
		};
		const items = await getMyTopItems(props);
		if (props.type == "artists") {
			setArtists(items);
		} else if (props.type == "tracks") {
			setTracks(items);
		}
	};

	return (
		<div className="flex flex-col gap-5 w-full">
			<h1 className="text-3xl mx-auto uppercase">
				get your top tracks/artists
			</h1>
			<div className="w-full h-fit tranisition-all duration-150 md:grid grid-cols-12 gap-5 md:px-3">
				<div className="bg-gradient-to-tr from-primary to-accent md:col-span-8 w-full rounded-md overflow-y-auto flex flex-col gap-1 p-1">
					{type == "artists" &&
						artists &&
						artists.map((artist: any, index: number) => {
							return;
						})}
					{type == "tracks" &&
						tracks &&
						tracks.map((track: any, index: number) => {
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
				<div className="col-span-4 flex md:flex-col items-center justify-center gap-4">
					<SelectType onChange={setType} />
					<SelectTimeRange onChange={setTimerange} />
					<Button className="uppercase" onClick={getTopItems}>
						find
					</Button>
				</div>
			</div>
		</div>
	);
}

export function SelectType(props: { onChange: any }) {
	return (
		<Select onValueChange={(e) => props.onChange(e)}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a type" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Type</SelectLabel>
					<SelectItem value="tracks">Tracks</SelectItem>
					<SelectItem value="artists">Artists</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

export function SelectTimeRange(props: { onChange: any }) {
	return (
		<Select onValueChange={(e) => props.onChange(e)}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select a time range" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>range</SelectLabel>
					<SelectItem value="long_term">1 year</SelectItem>
					<SelectItem value="medium_term">6 months</SelectItem>
					<SelectItem value="short_term">4 weeks</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
