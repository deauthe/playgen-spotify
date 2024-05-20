"use server";
import crypto from "crypto";

//generating a code verifier for the PKCE auth flow:

export const generateRandomString = async (length: number) => {
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const values = crypto.getRandomValues(new Uint8Array(length));
	return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

// Once the code verifier has been generated, we must transform (hash) it using the SHA256 algorithm. This is the value that will be sent within the user authorization request.
export const sha256 = async (plain: any) => {
	const hash = crypto.createHash("sha256");
	hash.update(plain);
	return hash.digest("hex");
};
