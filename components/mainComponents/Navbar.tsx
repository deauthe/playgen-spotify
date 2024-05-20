"use client";
import { getMyDetails } from "@/helpers/apiCalls/userApi";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import LogInButton from "./LogInButton";
import { CiBurger } from "react-icons/ci";

type Props = {};

const Navbar = (props: Props) => {
	const { user, loggedIn } = useUser();

	return (
		<div className="w-screen flex flex-row h-20 bg-accent shadow-md border-2 border-black justify-between">
			{/* left side  */}
			<div className="flex gap-3 w-fit">
				<CiBurger className="text-6xl my-auto " />
			</div>

			{/* center section  */}
			<div className="w-fit h-full flex my-auto">
				<div className="font-extrabold text-6xl uppercase my-auto">
					{" "}
					playgen
				</div>
			</div>

			{/* right side  */}
			<div className="h-full p-1 border-1 rounded-md border-accent flex gap-3 w-fit">
				{/* userImage circle  */}
				<div className="size-16 overflow-hidden rounded-full my-auto">
					{loggedIn && user ? (
						<Image
							alt="user"
							src={user.images[1]?.url || user.images[0]?.url}
							height={200}
							width={200}
							priority={false}
							className="my-auto "
						/>
					) : (
						<CgProfile />
					)}
				</div>

				{/* account info  */}
				<div className="flex flex-col gap-1 my-auto">
					{loggedIn && user ? (
						<>
							<h1 className="font-bold text-xl">{user.display_name}</h1>
							<h2 className="text-xs">followers {user.followers?.total}</h2>
						</>
					) : (
						<LogInButton />
					)}
				</div>

				{/* dropdown  */}
				<div className="size-16 overflow-hidden rounded-full">
					<IoMdArrowDropdown />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
