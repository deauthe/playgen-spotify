import TopItemsSection from "@/components/Home/TopItemsSection";
import MonthlyPlaylistMaker from "@/components/mainComponents/MonthlyPlaylistMaker";

export default function Home() {
	return (
		<main className="flex flex-col min-h-screen bg-black w-screen ">
			<MonthlyPlaylistMaker />
			<hr className="mx-10 my-5" />
			<TopItemsSection />
		</main>
	);
}
