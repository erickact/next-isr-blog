import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");


const WORDS_PER_MINUTE = 200;

export type PostFrontmatter = {
	title: string;
	date: string;
	description?: string;
	tags?: string[];
	draft?: boolean;
	coverImage?: string;
	author?: string;
};


export type PostSummary = {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags: string[];
	draft: boolean;
	coverImage?: string;
	author?: string;
	readingTime: number;
};

export type Post = PostSummary & {
	content: string;
};

function getSlugFromFilename(filename: string): string {
	return filename.replace(/\.md$/, "");
}

function sanitizeSlug(slug: string): string {
	return path.basename(slug).replace(/[^a-zA-Z0-9-_]/g, "");
}

function calculateReadingTime(content: string): number {
	const words = content.trim().split(/\s+/).length;
	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function parsePostFile(slug: string, raw: string): Post {
	const { data, content } = matter(raw);
	const fm = data as PostFrontmatter;

	return {
		slug,
		title: fm.title,
		date: fm.date,
		description: fm.description ?? "",
		tags: fm.tags ?? [],
		draft: fm.draft ?? false,
		coverImage: fm.coverImage,
		author: fm.author,
		readingTime: calculateReadingTime(content),
		content,
	};
}

export function getAllPosts(): PostSummary[] {
	try {
		const filenames = fs
			.readdirSync(POSTS_DIR)
			.filter((f) => f.endsWith(".md"));

		const posts: PostSummary[] = [];

		for (const filename of filenames) {
			try {
				const slug = getSlugFromFilename(filename);
				const filePath = path.join(POSTS_DIR, filename);
				const raw = fs.readFileSync(filePath, "utf8");
				const post = parsePostFile(slug, raw);

				
				const { content: _, ...summary } = post;
				posts.push(summary);
			} catch (error) {
				console.error(`Error parsing post file ${filename}:`, error);
				
			}
		}

		posts.sort((a, b) => (a.date < b.date ? 1 : -1));

		if (process.env.NODE_ENV === "production") {
			return posts.filter((p) => !p.draft);
		}

		return posts;
	} catch (error) {
		console.error("Error reading posts directory:", error);
		return [];
	}
}

export function getPostBySlug(slug: string): Post | null {
	try {
		const safeSlug = sanitizeSlug(slug);
		const filePath = path.join(POSTS_DIR, `${safeSlug}.md`);

		if (!fs.existsSync(filePath)) return null;

		const raw = fs.readFileSync(filePath, "utf8");
		const post = parsePostFile(safeSlug, raw);

		if (process.env.NODE_ENV === "production" && post.draft) {
			return null;
		}

		return post;
	} catch (error) {
		console.error(`Error reading post ${slug}:`, error);
		return null;
	}
}

export async function markdownToHtml(markdown: string): Promise<string> {
	const result = await remark().use(remarkHtml).process(markdown);
	return result.toString();
}

export function getAllTags(): string[] {
	const posts = getAllPosts();
	const tagsSet = new Set<string>();

	for (const post of posts) {
		for (const tag of post.tags) {
			tagsSet.add(tag);
		}
	}

	return Array.from(tagsSet).sort();
}

export function getPostsByTag(tag: string): PostSummary[] {
	return getAllPosts().filter((post) =>
		post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
	);
}
