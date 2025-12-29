import Image from "next/image";
import Link from "next/link";
import { CiCalendarDate } from "react-icons/ci";
import { TbClockHour3 } from "react-icons/tb";
import type { PostSummary } from "@/lib/posts";

type PostCardProps = {
	post: PostSummary;
	highlightTag?: string;
};

export function PostCard({ post, highlightTag }: PostCardProps) {
	return (
		<article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
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
								className={`text-xs font-semibold capitalize px-2 rounded-full ${
									highlightTag &&
									tag.toLowerCase() === highlightTag.toLowerCase()
										? "text-white bg-orange-600"
										: "text-orange-600 bg-orange-100 hover:text-orange-700"
								}`}
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
	);
}
