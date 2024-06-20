"use client";
import axios, { AxiosRequestConfig } from "axios";
import { sha256, generateRandomString } from "./serverAuthentication";
import { access, accessSync } from "fs";
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI as string;
const scope = `user-read-private 
user-read-email 
user-top-read 
user-read-recently-played
 user-read-playback-position 
 user-follow-read 
 playlist-modify-public 
 playlist-modify-private 
 playlist-read-collaborative 
 playlist-read-private 
 user-library-read 
 user-library-modify`;
const authUrl = new URL("https://accounts.spotify.com/authorize");
//we got a URL object rather than just setting a plain string because
//it exposes the URL api that lets us access shit like authURL.search, authURL.protocol

// returns the base64 representation of the digest we just calculated with the sha256 function:
export const base64encode = async (input: string) => {
	const data = new TextEncoder().encode(input);
	const hashed = await crypto.subtle.digest("SHA-256", data);

	//@ts-ignore
	return btoa(String.fromCharCode(...new Uint8Array(hashed)))
		.replace(/=/g, "")
		.replace(/\+/g, "-")
		.replace(/\//g, "_");
};

export const redirect_to_authorize = async () => {
	const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
	const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
	const codeVerifier = await generateRandomString(64);
	localStorage.setItem("code_verifier", codeVerifier);

	console.log("these are the shits", clientId, redirectUri);

	const codeChallenge_base64 = await base64encode(codeVerifier);
	console.log("codechallenge:" + codeChallenge_base64);

	const params = {
		response_type: "code",
		client_id: clientId as string,
		scope,
		code_challenge_method: "S256",
		code_challenge: codeChallenge_base64,
		redirect_uri: redirectUri as string,
	};

	//sets the search params in the query
	//redirects the window to authURL
	authUrl.search = new URLSearchParams(params).toString();
	// console.log(authUrl);
	window.location.href = authUrl.toString();
};

//get token
export const getToken = async (code: string) => {
	console.log("auth code:", code);
	const codeVerifier = localStorage.getItem("code_verifier");

	const payloadParams = new URLSearchParams({
		client_id: clientId as string,
		grant_type: "authorization_code" as string,
		code: code as string,
		redirect_uri: redirectUri as string,
		code_verifier: codeVerifier as string,
	});

	const url = "https://accounts.spotify.com/api/token";
	const payload: AxiosRequestConfig = {
		method: "post",
		url,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: payloadParams,
	};

	try {
		const response = await axios(payload);

		if (response.status !== 200) {
			throw new Error(`Request failed with status: ${response.status}`);
		}

		const data = await response.data;
		console.log("auth token data", data);

		localStorage.setItem("playgen_access_token", data.access_token);
		localStorage.setItem("playgen_expires_in", data.expires_in);
		localStorage.setItem("playgen_refresh_token", data.refresh_token);
		localStorage.setItem("playgen_scopes", data.scope);
		console.log(data.access_token);

		return {
			accessToken: data.access_token,
			refreshToken: data.refresh_token,
			expiresIn: data.expires_in,
			scopes: data.scope,
		};
	} catch (err) {
		console.error("Token exchange error:", err);
		return null; // Or handle the error differently
	}
};
