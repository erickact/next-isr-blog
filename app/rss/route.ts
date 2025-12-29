import { getAllPosts } from "@/lib/posts";

const SITE_URL = (
	process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

function formatDate(dateString: string): string {
	const normalized = /^\d{4}-\d{2}-\d{2}$/.test(dateString)
		? `${dateString}T00:00:00Z`
		: dateString;

	return new Date(normalized).toUTCString();
}

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

export function GET() {
	const posts = getAllPosts();

	const rssItems = posts
		.map(
			(post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/post/${post.slug}</link>
      <description>${escapeXml(post.description || "")}</description>
      <pubDate>${formatDate(post.date)}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/post/${post.slug}</guid>
    </item>`,
		)
		.join("");

	const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MinimalBlog</title>
    <link>${SITE_URL}</link>
    <description>A collection of articles on design, development, and building products.</description>
    <language>en</language>
    <lastBuildDate>${formatDate(new Date().toISOString())}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

	return new Response(rssFeed, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
		},
	});
}
