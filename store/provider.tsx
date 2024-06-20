"use client";
import { RecoilRoot } from "recoil";

import React from "react";

type Props = {
	children: React.ReactNode;
};

const RecoilProvider = ({ children }: Props) => {
	return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
