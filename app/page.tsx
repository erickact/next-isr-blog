import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "./components/PostCard";

export const metadata: Metadata = {
	title: "Home - Thoughts, Stories & Ideas",
	description:
		"A collection of articles on design, development, and building products.",
};

export const revalidate = 300;

export default function Home() {
	const posts = getAllPosts();

	return (
		<main className="mx-auto max-w-6xl px-4 py-16">
			<header className="mb-12 text-center">
				<h1 className="text-4xl font-bold">Thoughts, Stories & Ideas</h1>
				<p className="mt-4 text-slate-500">
					A collection of articles on design, development, and building
					products.
				</p>
			</header>

			{posts.length === 0 ? (
				<p className="text-center text-slate-500">
					No posts yet. Check back soon!
				</p>
			) : (
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => (
						<PostCard key={post.slug} post={post} />
					))}
				</div>
			)}
		</main>
	);
}
