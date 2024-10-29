import Disclaimer from "@/components/Disclaimer";
import TopItemsSection from "@/components/Home/TopItemsSection";
import MonthlyPlaylistMaker from "@/components/mainComponents/MonthlyPlaylistMaker";

export default function Home() {
	return (
		<main className="flex flex-col min-h-screen bg-black w-screen items-center">
			<Disclaimer />
			<MonthlyPlaylistMaker />
			<hr className="mx-10 my-5" />
			<TopItemsSection />
		</main>
	);
}
