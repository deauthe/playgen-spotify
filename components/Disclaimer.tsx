"use client";

import React from "react";
import Typewriter from "typewriter-effect";

const Disclaimer = () => {
	return (
		<div className="max-w-5xl text-2xl bg-gradient-to-r from-primary to-white text-transparent bg-clip-text">
			<Typewriter
				onInit={(typewriter) => {
					typewriter
						.typeString(
							`This is a demo project, As of now spotify doesn't allow me to create a playlist for you. 
                            You can star the project on github for now to show your support,
                             A youtube video to show the use case for this is in the making.
                              Thanks for visiting :)`
						)
						.start();
				}}
			/>
		</div>
	);
};

export default Disclaimer;
