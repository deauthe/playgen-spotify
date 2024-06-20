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

const SongCardHorizontal = (props: Props) => {
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
			className="card card-side bg-transparent overflow-hidden card-bordered h-20 grid grid-cols-5 grid-flow-row relative"
		>
			<input
				key={props.id}
				checked={isChecked}
				onChange={() => handleCheck()}
				type="checkbox"
				className="checkbox-primary checkbox checkbox-xs rounded-xl absolute bottom-0 right-0 z-10"
			/>
			{/* album art  */}
			<figure className="relative mb-auto h-20 ">
				<img
					src={albumImage || "/unknown.png"}
					alt={albumName as string}
					className="object-cover h-20"
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

const SongCardVertical = (props: Props) => {
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
			className="card overflow-hidden max-w-80"
		>
			{/* album art  */}
			<figure>
				<img
					src={albumImage || "/unknown.png"}
					alt={albumName as string}
					className="object-cover "
				/>
			</figure>

			{/* song info  */}

			<div
				className="card-body text-left w-full 
		"
			>
				<div className=" card-title font-light ">{name}</div>
				<h2 className="opacity-90">{artistsName.join(", ")}</h2>

				<h2 className="opacity-80">{albumName}</h2>

				<h3 className="opacity-60">obscurity: {100 - popularity}%</h3>

				<div className="card-actions justify-start mr-auto">
					{isChecked ? (
						<div className="badge badge-md rounded-none badge-outline opacity-55">
							selected
						</div>
					) : (
						<div className="badge badge-warning rounded-none">not selected</div>
					)}
				</div>
			</div>
		</button>
	);
};

export default SongCardVertical;
