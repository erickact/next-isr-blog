import { ReadingProgress } from "@/app/components/ReadingProgress";

export default function PostLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<ReadingProgress />
			{children}
		</>
	);
}

