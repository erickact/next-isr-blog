import type { Metadata } from "next";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	return {
		title: `Post: ${slug}`,
	};
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">Post</h1>
				<p className="text-2xl">Slug: {slug}</p>
			</div>
		</div>
	);
}
