"use client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getToken } from "../../helpers/auth/authentication";

const CallBack = () => {
	useEffect(() => {
		const currentToken = {
			get access_token() {
				return localStorage.getItem("access_token") || null;
			},
			get refresh_token() {
				return localStorage.getItem("refresh_token") || null;
			},
			get expires_in() {
				return localStorage.getItem("refresh_in") || null;
			},
			get expires() {
				return localStorage.getItem("expires") || null;
			},

			save: function (response: any) {
				const { access_token, refresh_token, expires_in } = response;
				localStorage.setItem("access_token", access_token);
				localStorage.setItem("refresh_token", refresh_token);
				localStorage.setItem("expires_in", expires_in);

				const now = new Date();
				const expiry = new Date(now.getTime() + expires_in * 1000);
				localStorage.setItem("expires", expiry.toString());
			},
		};
		const args = new URLSearchParams(window.location.search);
		const code = args.get("code");

		const getAndSaveToken = async () => {
			if (code) {
				const token = getToken(code);
				currentToken.save(token);

				// Remove code from URL so we can refresh correctly.
				const url = new URL(window.location.href);
				url.searchParams.delete("code");

				const updatedUrl = url.search ? url.href : url.href.replace("?", "");
				window.history.replaceState({}, document.title, updatedUrl);
			}
		};
		getAndSaveToken();
	}, []);

	return <div></div>;
};

export default CallBack;
