"use client";
import { getMyDetails } from "@/helpers/apiCalls/userApi";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoLogoGithub, IoMdArrowDropdown } from "react-icons/io";
import LogInButton from "./LogInButton";
import { CiBurger } from "react-icons/ci";
import { AuthStatus, authTokensAtom } from "@/store/atoms";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { ArrowLeftSquare } from "lucide-react";

type Props = {};

const Navbar = (props: Props) => {
	const { user, loggedIn } = useUser();
	const [authToken, setAuthToken] = useRecoilState(authTokensAtom);

	const [show, setShow] = useState<boolean>(false); //to show navbar on top or with a background

	const controlNavbar = () => {
		if (window.scrollY >= 40) {
			setShow(true);
		} else {
			setShow(false);
		}
	};

	useEffect(() => {
		setAuthToken({
			accessToken: localStorage.getItem("playgen_access_token"),
			refreshToken: localStorage.getItem("playgen_refresh_token"),
			expires_in: localStorage.getItem("playgen_expires_in"),
			scopes: localStorage.getItem("playgen_scopes"),
		});
		window.addEventListener("scroll", controlNavbar);
		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
	}, []);

	return (
		<div
			className={` w-full h-[30px] items-center md:h-[80px]  z-20 fixed  top-0 transition-all duration-500  md:px-5 px-1    `}
		>
			<div
				className={` rounded-full relative ${
					show
						? "bg-primary mt-2 text-primary-content border-primary-content border-[1px]"
						: "bg-black/70 mt-1 text-primary"
				} items-center w-full flex justify-between transition-all duration-500 md:px-5 px-2 py-1`}
			>
				<div className="flex gap-5 items-center ml-5">
					<Link href="https://github.com/deauthe/playgen-spotify">
						<IoLogoGithub className="md:text-6xl text-4xl my-auto hover:scale-105 active:scale-90 transition-all duration-200" />
					</Link>
					<ArrowLeftSquare
						className={`${show ? "text-black/50" : "text-secondary/70"}`}
					/>
				</div>
				<div className="flex gap-2 items-center ml-5">
					<Link href="/">
						<div className=" flex items-end gap-2 ">
							<p className="md:text-3xl text-xl font-extrabold font-heading1 ">
								PLAYGEN
							</p>
						</div>
					</Link>
					<CiBurger className="md:text-6xl text-4xl my-auto " />
				</div>

				<div className="flex flex-row gap-1 my-auto w-fit  h-fit ">
					<div className="  flex items-center gap-2   ">
						<LogInButton
							className={`${
								show ? "bg-black text-primary" : "bg-primary text-black"
							} border-none mr-2`}
						/>
					</div>

					{loggedIn === AuthStatus.Authenticated && user && (
						<div className=" flex-col text-right my-auto hidden md:flex">
							<h1 className=" text-xs">{user.display_name}</h1>
							<h2 className="text-xs">followers {user.followers?.total}</h2>
						</div>
					)}
					<div className="md:size-12 size-10 overflow-hidden rounded-full my-auto ">
						{loggedIn === AuthStatus.Authenticated && user && (
							<Image
								alt="user"
								src={user.images[1]?.url || user.images[0]?.url}
								height={200}
								width={200}
								priority={false}
								className="my-auto mx-auto "
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
