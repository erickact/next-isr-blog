import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CiCalendarDate } from "react-icons/ci";
import { TbClockHour3 } from "react-icons/tb";
import { getAllPosts } from "@/lib/posts";

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
						<article
							key={post.slug}
							className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
						>
							{post.coverImage && (
								<div className="relative h-48 w-full">
									<Image
										src={post.coverImage}
										alt={post.title}
										fill
										className="object-cover"
									/>
								</div>
							)}

							<div className="flex flex-1 flex-col p-5">
								{post.tags && post.tags.length > 0 && (
									<div className="mb-3 flex flex-wrap gap-3">
										{post.tags.map((tag) => (
											<Link
												key={tag}
												href={`/tag/${tag}`}
												className="text-xs font-semibold capitalize text-orange-600 bg-orange-100 px-2 hover:text-orange-700 rounded-full"
											>
												{tag}
											</Link>
										))}
									</div>
								)}

								<Link href={`/post/${post.slug}`} className="group">
									<h2 className="text-lg font-bold group-hover:text-orange-600">
										{post.title}
									</h2>
								</Link>

								{post.description && (
									<p className="mt-2 flex-1 text-sm text-slate-700 line-clamp-3">
										{post.description}
									</p>
								)}

								<div className="mt-4 flex items-center justify-between text-xs text-slate-600 border-t border-slate-200 pt-4">
									<span className="flex items-center gap-1">
										<CiCalendarDate className="h-4 w-4" />
										{new Date(post.date).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</span>

									<span className="flex items-center gap-1">
										<TbClockHour3 className="h-4 w-4" />
										{post.readingTime} min read
									</span>
								</div>
							</div>
						</article>
					))}
				</div>
			)}
		</main>
	);
}
