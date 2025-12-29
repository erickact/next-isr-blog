import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";

const SITE_URL = (
	process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = getAllPosts();
	const tags = getAllTags();

	const routes: MetadataRoute.Sitemap = [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
	];

	const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
		url: `${SITE_URL}/post/${post.slug}`,
		lastModified: new Date(post.date),
		changeFrequency: "weekly",
		priority: 0.8,
	}));

	const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
		url: `${SITE_URL}/tag/${tag}`,
		changeFrequency: "weekly",
		priority: 0.6,
	}));

	return [...routes, ...postRoutes, ...tagRoutes];
}
