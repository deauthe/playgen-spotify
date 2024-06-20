import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/mainComponents/Navbar";
import { Toaster } from "@/components/ui/toaster";
import RecoilProvider from "@/store/provider";

const oswald = Oswald({
	subsets: ["latin"],
	weight: ["400", "200", "300", "500", "600", "700"],
	style: "normal",
});

export const metadata: Metadata = {
	title: "Spotify Playgen",
	description: "Generates your monthly playlists",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<RecoilProvider>
			<html lang="en">
				<body className={oswald.className}>
					<Navbar />
					<Toaster />
					{children}
				</body>
			</html>
		</RecoilProvider>
	);
}
