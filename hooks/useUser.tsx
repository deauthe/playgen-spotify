import { getMyDetails } from "@/helpers/apiCalls/userApi";
import { AuthStatus, AuthStatusAtom, UserAtom } from "@/store/atoms";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export const useUser = () => {
	const [loggedIn, setLoggedIn] = useRecoilState<AuthStatus>(AuthStatusAtom);
	const [user, setUser] = useRecoilState<any>(UserAtom);

	useEffect(() => {
		const findUser = async () => {
			setLoggedIn(AuthStatus.Authenticating);
			const access_token = localStorage.getItem("playgen_access_token");
			if (access_token?.length != 0) {
				const user = await getMyDetails(access_token as string);
				setUser(user);
				setLoggedIn(AuthStatus.Authenticated);
			} else {
				setLoggedIn(AuthStatus.Unauthenticated);
			}
		};
		findUser();
	}, []);
	return { user, loggedIn };
};
