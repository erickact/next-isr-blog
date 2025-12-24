import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CiCalendarDate } from "react-icons/ci";
import { LuUser } from "react-icons/lu";
import { TbClockHour3 } from "react-icons/tb";
import { getAllPosts, getPostBySlug, markdownToHtml } from "@/lib/posts";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	const posts = getAllPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		return { title: "Post not found" };
	}

	return {
		title: post.title,
		description: post.description,
	};
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	const contentHtml = await markdownToHtml(post.content);

	return (
		<main className="mx-auto max-w-3xl px-4 py-12">
			<Link
				href="/"
				className="inline-flex items-center text-slate-600 hover:text-orange-600 font-medium mb-8"
			>
				← Back to posts
			</Link>

			<article>
				{post.tags && post.tags.length > 0 && (
					<div className="mb-4 flex flex-wrap justify-center gap-8">
						{post.tags.map((tag) => (
							<Link
								key={tag}
								href={`/tag/${tag}`}
								className="text-sm font-semibold capitalize text-orange-600 hover:text-orange-700 bg-orange-100 rounded-full px-2 py-1"
							>
								{tag}
							</Link>
						))}
					</div>
				)}

				<h1 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-6">
					{post.title}
				</h1>

				<div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-8">
					{post.author && (
						<span className="flex items-center gap-1 font-bold">
							<LuUser className="h-4 w-4" />
							{post.author}
						</span>
					)}
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

				{post.coverImage && (
					<div className="relative mb-10 h-80 md:h-96 w-full overflow-hidden rounded-2xl">
						<Image
							src={post.coverImage}
							alt={post.title}
							fill
							className="object-cover"
							priority
						/>
					</div>
				)}

				<div
					className="max-w-none text-slate-700 leading-relaxed [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-slate-900 [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:mt-6 [&>h2]:mb-3 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>li]:mb-2 [&>a]:text-orange-600 [&>a]:underline [&>strong]:text-slate-900 [&>strong]:font-semibold"
					dangerouslySetInnerHTML={{ __html: contentHtml }}
				/>
			</article>
		</main>
	);
}
