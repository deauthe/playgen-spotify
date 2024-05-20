import { getMyDetails } from "@/helpers/apiCalls/userApi";
import { useEffect, useState } from "react";

export const useUser = () => {
	const [loggedIn, setLoggedIn] = useState<boolean>(true);
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const findUser = async () => {
			const access_token = localStorage.getItem("playgen_access_token");
			if (access_token?.length != 0) {
				const user = await getMyDetails(access_token as string);
				setUser(user);
				setLoggedIn(true);
			} else {
				setLoggedIn(false);
			}
		};
		findUser();
	}, []);
	return { user, loggedIn };
};
