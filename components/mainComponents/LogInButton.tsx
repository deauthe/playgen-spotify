"use client";
import React from "react";
import { redirect_to_authorize } from "@/helpers/auth/authentication";
import { useRecoilState } from "recoil";
import { authTokensAtom, AuthTokensType } from "@/store/atoms";
import { useRouter } from "next/navigation";

const AuthButton = () => {
	const router = useRouter();
	const [authTokenState, setAuthTokenState] =
		useRecoilState<AuthTokensType>(authTokensAtom);

	const handleLogIn = async () => {
		await redirect_to_authorize();
	};
	const handleLogout = async () => {
		localStorage.removeItem("playgen_access_token");
		setAuthTokenState((prev) => ({ ...prev, accessToken: null }));
		router.refresh();
	};

	if (authTokenState.accessToken) {
		return (
			<button
				className="btn btn-primary rounded-full btn-sm mx-auto my-2"
				onClick={handleLogout}
			>
				logout
			</button>
		);
	}

	return (
		<button
			className="btn btn-primary rounded-full btn-sm mx-auto my-2"
			onClick={handleLogIn}
		>
			login
		</button>
	);
};

export default AuthButton;
