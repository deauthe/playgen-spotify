"use client";
import React from "react";
import { redirect_to_authorize } from "@/helpers/auth/authentication";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
	AuthStatus,
	AuthStatusAtom,
	authTokensAtom,
	AuthTokensType,
} from "@/store/atoms";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";

const AuthButton = ({ className }: { className?: string }) => {
	const setAuthState = useSetRecoilState(AuthStatusAtom);
	const router = useRouter();
	const { user, loggedIn } = useUser();

	const handleLogIn = async () => {
		await redirect_to_authorize();
	};
	const handleLogout = async () => {
		localStorage.removeItem("playgen_access_token");
		router.refresh();
		setAuthState(AuthStatus.Unauthenticated);
	};

	if (loggedIn === AuthStatus.Authenticated) {
		return (
			<button
				className={cn("btn rounded-full btn-md mx-auto", className)}
				onClick={handleLogout}
			>
				logout
			</button>
		);
	}

	return (
		<button
			className={cn("btn rounded-full btn-md mx-auto ", className)}
			onClick={handleLogIn}
		>
			login
		</button>
	);
};

export default AuthButton;
