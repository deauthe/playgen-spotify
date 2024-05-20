"use client";
import React from "react";
import { Button } from "../ui/button";
import { redirect_to_authorize } from "@/helpers/auth/authentication";

type Props = {};

const LogInButton = (props: Props) => {
	const handleLogIn = async () => {
		await redirect_to_authorize();
	};

	return (
		<Button className="mx-auto my-2" onClick={handleLogIn}>
			login
		</Button>
	);
};

export default LogInButton;
