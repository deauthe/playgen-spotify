"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { getToken } from "../../helpers/auth/authentication";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthTokensType, authTokensAtom } from "@/store/atoms";

const CallBack = () => {
	const router = useRouter();
	const [currentToken, setCurrentToken] =
		useRecoilState<AuthTokensType>(authTokensAtom);
	useEffect(() => {
		const args = new URLSearchParams(window.location.search);
		const code = args.get("code");

		const getAndSaveToken = async () => {
			if (code) {
				const token = await getToken(code);
				if (token)
					setCurrentToken({
						accessToken: token.accessToken,
						refreshToken: token.refreshToken,
						expires_in: token.expiresIn,
						scopes: token.scopes,
					});

				// Remove code from URL so we can refresh correctly.
				const url = new URL(window.location.href);
				url.searchParams.delete("code");

				const updatedUrl = url.search ? url.href : url.href.replace("?", "");
				window.history.replaceState({}, document.title, updatedUrl);
				router.push("/");
			}
		};
		getAndSaveToken();
	}, []);

	return <div></div>;
};

export default CallBack;
