"use client ";
import { getAlbumByAlbumId } from "@/helpers/apiCalls/albumApi";
import { getArtistsByArtistId } from "@/helpers/apiCalls/artistApi";
import { authTokensAtom } from "@/store/atoms";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

type Props = {
	albumId: string;
	albumImage: string;
	albumName: string;
	artistIds: string[];
	artistsName: string[];
	name: string;
	popularity: number;
	id: string;
	included?: boolean;
	setIncluded: (id: string, included: boolean) => void;
};

const SongCard = (props: Props) => {
	const authTokens = useRecoilValue(authTokensAtom);
	const access_token = authTokens?.accessToken as string;
	const {
		albumId,
		artistIds,
		name,
		popularity,
		id,
		albumImage,
		albumName,
		artistsName,
	} = props;

	const [isChecked, setIsChecked] = useState<boolean>(props.included || true);

	const handleCheck = () => {
		setIsChecked(!isChecked);
		props.setIncluded(id, !isChecked);
	};

	return (
		<button
			onClick={() => handleCheck()}
			className="card card-side bg-transparent card-bordered h-16 overflow-hidden md:overflow-auto grid grid-cols-5 grid-flow-row relative shrink-0"
		>
			<input
				key={props.id}
				checked={isChecked}
				onChange={() => handleCheck()}
				type="checkbox"
				className="checkbox-primary checkbox checkbox-xs rounded-xl absolute bottom-0 right-0 z-10"
			/>
			{/* album art  */}
			<figure className="relative mb-auto h-16 ">
				<img
					src={albumImage || "/unknown.png"}
					alt={albumName as string}
					className="object-cover h-16"
				/>
			</figure>

			{/* song info  */}

			<div className=" text-xs font-light ">{name}</div>

			<h2 className="text-xs font-extralight opacity-90">
				{artistsName.join(", ")}
			</h2>

			<h2 className="text-xs font-extralight opacity-80">{albumName}</h2>

			<h3 className="text-xs font-extralight opacity-60">
				obscurity: {100 - popularity}%
			</h3>
		</button>
	);
};

export default SongCard;
