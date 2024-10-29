import { getMyDetails } from "@/helpers/apiCalls/userApi";
import {
	AuthStatus,
	AuthStatusAtom,
	authTokensAtom,
	UserAtom,
} from "@/store/atoms";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export const useUser = () => {
	const [loggedIn, setLoggedIn] = useRecoilState<AuthStatus>(AuthStatusAtom);
	const accessToken = useRecoilValue(authTokensAtom).accessToken;
	const [user, setUser] = useRecoilState<any>(UserAtom);

	useEffect(() => {
		const findUser = async () => {
			setLoggedIn(AuthStatus.Authenticating);

			if (accessToken && accessToken?.length != 0) {
				const user = await getMyDetails(accessToken as string);
				console.log("user and token from useUser hook", accessToken, " ", user);

				setUser(user);
				setLoggedIn(AuthStatus.Authenticated);
			} else {
				setLoggedIn(AuthStatus.Unauthenticated);
			}
		};
		findUser();
	}, [accessToken]);

	return { user, loggedIn };
};
