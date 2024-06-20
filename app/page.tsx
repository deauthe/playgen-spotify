import TopItemsSection from "@/components/Home/TopItemsSection";
import MonthlyPlaylistMaker from "@/components/mainComponents/MonthlyPlaylistMaker";

export default function Home() {
	return (
		<main className="flex flex-col min-h-screen bg-black w-screen ">
			<MonthlyPlaylistMaker />
			<TopItemsSection />
		</main>
	);
}
