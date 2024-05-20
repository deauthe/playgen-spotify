"use client ";
import { getAlbumByAlbumId } from "@/helpers/apiCalls/albumApi";
import { getArtistsByArtistId } from "@/helpers/apiCalls/artistApi";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
	albumId: string;
	artistIds: string[];
	name: string;
	popularity: number;
	id: string;
};

const SongCard = (props: Props) => {
	const access_token = localStorage.getItem("playgen_access_token") as string;
	const { albumId, artistIds, name, popularity, id } = props;
	const [artist, setArtist] = useState<any>();
	const [album, setAlbum] = useState<any>();
	const setTrackArt = async () => {
		const artist = await getArtistsByArtistId({
			id: artistIds[0],
			access_token: access_token,
		});
		const album = await getAlbumByAlbumId({
			id: albumId,
			access_token: access_token,
		});

		setAlbum(album);
		setArtist(artist);
	};

	useEffect(() => {
		setTrackArt();
	}, []);

	return (
		<div className="w-full rounded-md bg-background text-foreground flex justify-between md:h-20 text-center">
			{/* album art  */}
			<div className="size-16 overflow-hidden bg-green-300 my-auto ">
				{album && (
					<Image
						src={album?.images[0]?.url || "/unknown.png"}
						alt={album?.name as string}
						height={200}
						width={200}
					/>
				)}
			</div>

			{/* song info  */}
			<div className="flex flex-col md:gap-1 mx-auto">
				<h1 className="text-md">{name}</h1>
				{artist && album && (
					<>
						<h2 className="text-xs">{artist.name}</h2>
						<h2 className="text-xs">{album.name}</h2>
					</>
				)}
				<h3 className="text-xs">obscurity: {100 - popularity}%</h3>
			</div>

			{/* artist photo  */}
			<div className="size-16 rounded-full overflow-hidden my-auto">
				{artist && (
					<Image
						src={artist?.images[0]?.url || "/unknown.png"}
						alt={artist.artistName}
						height={200}
						width={200}
					/>
				)}
			</div>
		</div>
	);
};

export default SongCard;
