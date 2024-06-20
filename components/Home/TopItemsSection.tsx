"use client";
import React, { useCallback, useState } from "react";

import { getMyTopItems, topItemsProps } from "@/helpers/apiCalls/userApi";
import SongCard from "../Cards/SongCard";
import { boolean } from "zod";
import { useRecoilValue } from "recoil";
import { authTokensAtom } from "@/store/atoms";

export default function TopItemsSection() {
	const [type, setType] = useState<"tracks" | "artists">("tracks");
	const [timeRange, setTimerange] = useState<
		"short_term" | "medium_term" | "long_term"
	>("short_term");
	const access_token = useRecoilValue(authTokensAtom).accessToken as string;
	const [tracks, setTracks] = useState<any>();
	const [includedIds, setIncludedIds] = useState<string[]>([]);
	const [artists, setArtists] = useState<any>();
	const setIncluded = (id: string, included: boolean) => {
		if (included) {
			setIncludedIds([...includedIds, id]);
			console.log(id, " added");
		} else {
			setIncludedIds(includedIds.filter((item) => item !== id));
			console.log(id, " removed");
		}
	};

	const getTopItems = async () => {
		const props: topItemsProps = {
			access_token,
			limit: 20,
			offset: 0,
			time_range: timeRange,
			type: type,
		};
		console.log("the props", props);

		const items = await getMyTopItems(props);
		if (props.type == "artists") {
			setArtists(items);
			// setIncludedIds(items.map((item: any) => item.id));
		} else if (props.type == "tracks") {
			setTracks(items);
			// setIncludedIds(items.map((item: any) => item.id));
		}
	};

	React.useEffect(() => {
		getTopItems();
		console.log("inside rerender");
	}, [access_token]);

	React.useEffect(() => {}, [type, timeRange]);

	return (
		<div className="flex flex-col gap-5 w-full md:px-20 px-5 min-h-screen my-auto items-center mb-10">
			<h1 className="text-5xl font-extrabold uppercase bg-gradient-to-r from-accent to-popover text-transparent bg-clip-text p-3 ">
				get your top tracks/artists
			</h1>

			<div className="w-full h-fit tranisition-all duration-150 flex flex-col gap-5">
				<div className="col-span-2 flex md:flex-col items-center justify-center gap-4">
					<SelectType onChange={setType} />
					<SelectTimeRange onChange={setTimerange} />
					<button
						className="rounded-full btn btn-sm btn-primary uppercase"
						onClick={getTopItems}
					>
						find
					</button>
				</div>

				<div className="bg-black w-full h-[500px] md:h-full rounded-md overflow-y-auto flex flex-col gap-1 overflow-x-clip py-1 md:grid md:grid-cols-3 lg:grid-cols-4 mb-10">
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
									albumImage={track.album.images[0].url}
									albumName={track.album.name}
									artistIds={track.artists.map((artist: any) => artist.id)}
									artistsName={track.artists.map((artist: any) => artist.name)}
									id={track.id}
									name={track.name}
									popularity={track.popularity}
									included={true}
									setIncluded={setIncluded}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export function SelectType(props: { onChange: any }) {
	return (
		<select
			className="select select-primary bg-transparent select-sm rounded-full"
			onChange={(e) => props.onChange(e.target.value)}
		>
			<option disabled selected>
				type
			</option>
			<option value="artists">Artists</option>
			<option value="tracks">Tracks</option>
		</select>
	);
}

export function SelectTimeRange(props: { onChange: any }) {
	return (
		<select
			className="select select-primary bg-transparent select-sm rounded-full"
			onChange={(e) => props.onChange(e.target.value)}
		>
			<option disabled selected>
				time range
			</option>
			<option value="long_term">1 year</option>
			<option value="medium_term">6 months</option>
			<option value="short_term">4 weeks</option>
		</select>
	);
}
