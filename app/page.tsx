import TopItemsSection from "@/components/Home/TopItemsSection";
import LogInButton from "@/components/mainComponents/LogInButton";
import MonthlyPlaylistMaker from "@/components/mainComponents/MonthlyPlaylistMaker";
import { getMyDetails } from "@/helpers/apiCalls/userApi";

export default function Home() {
	return (
		<main className="flex min-h-screen bg-black">
			<MonthlyPlaylistMaker />
			<TopItemsSection />
		</main>
	);
}
