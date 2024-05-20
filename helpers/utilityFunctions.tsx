import { z } from "zod";
import { ToastAction, ToastProps } from "@/components/ui/toast";

export const dateSchema = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Expected YYYY-MM-DD");

export type DateFormat = z.infer<typeof dateSchema>; // Type based on schema

export function isDateBetween(props: {
	timestamp: string;
	startDate: DateFormat;
	endDate: DateFormat;
}): { isBetween: boolean; shouldContinue: boolean } {
	const { timestamp, startDate, endDate } = props;
	// Validate dates using Zod
	const parsedStartDate = dateSchema.safeParse(startDate);
	const parsedEndDate = dateSchema.safeParse(endDate);

	if (!parsedStartDate.success || !parsedEndDate.success) {
		throw new Error("Invalid start or end date format. Expected YYYY-MM-DD");
	}

	const parsedDate = new Date(timestamp);

	// Check if parsed date is valid (avoids errors with invalid timestamps)
	if (isNaN(parsedDate.getTime())) {
		return { isBetween: false, shouldContinue: true };
	}

	const parsedDateStr = parsedDate.toISOString().split("T")[0]; // Extract date only
	console.log(
		"parsedDateStr",
		parsedDateStr,
		"startDate",
		startDate,
		"endDate",
		endDate
	);

	const isBetween = parsedDateStr >= startDate && parsedDateStr <= endDate;
	const shouldContinue = parsedDateStr >= startDate;
	return { isBetween, shouldContinue };
}

export function getFormattedDate(monthNumber: number) {
	const today = new Date();
	const currentYear = today.getFullYear();
	let year;
	// Check if the month has already passed in the current year
	if (monthNumber < today.getMonth() + 1) {
		// Use current year
		year = currentYear;
	} else {
		// Use previous year
		year = currentYear - 1;
	}

	console.log("year", year, "month", monthNumber);

	// Format the date string with leading zeros using padStart()
	const formattedDate = `${year.toString().padStart(4, "0")}-${monthNumber
		.toString()
		.padStart(2, "0")}-01`;

	return formattedDate;
}

export const loginToastOptions: any = {
	title: "Authentication Error ",
	description: "Please Login to use these features",
	action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
};
