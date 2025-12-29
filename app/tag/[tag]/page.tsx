import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/app/components/PostCard";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type Props = {
	params: Promise<{ tag: string }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
	const tags = getAllTags();
	return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { tag } = await params;
	return {
		title: `Posts tagged "${tag}"`,
		description: `All posts tagged with ${tag}`,
	};
}

export default async function TagPage({ params }: Props) {
	const { tag } = await params;
	const posts = getPostsByTag(tag);

	if (posts.length === 0) {
		notFound();
	}

	return (
		<main className="mx-auto max-w-6xl px-4 py-16">
			<header className="mb-8">
				<Link
					href="/"
					className="inline-flex items-center text-slate-600 hover:text-orange-600 font-medium mb-6"
				>
					← Back to all posts
				</Link>
				<h1 className="text-4xl font-bold">
					<span className="capitalize">{tag}</span>{" "}
					<span className="text-slate-500 font-normal text-xl">
						{posts.length} {posts.length === 1 ? "post" : "posts"}
					</span>
				</h1>
			</header>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{posts.map((post) => (
					<PostCard key={post.slug} post={post} highlightTag={tag} />
				))}
			</div>
		</main>
	);
}
