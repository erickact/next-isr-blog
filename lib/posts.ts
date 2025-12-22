import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
	title: string;
	date: string;
	description?: string;
	tags?: string[];
	draft?: boolean;
	coverImage?: string;
};

export type PostSummary = PostFrontmatter & {
	slug: string;
	readingTime: number;
};

export type Post = PostSummary & {
	content: string;
};

function getSlugFromFilename(filename: string) {
	return filename.replace(/\.md$/, "");
}

/**
 * Calcula el tiempo de lectura estimado basado en el contenido
 * Promedio: 200 palabras por minuto
 */
function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	const minutes = Math.ceil(words / wordsPerMinute);
	return minutes < 1 ? 1 : minutes;
}

export function getAllPosts(): PostSummary[] {
	const filenames = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

	const posts = filenames.map((filename) => {
		const slug = getSlugFromFilename(filename);
		const filePath = path.join(POSTS_DIR, filename);
		const raw = fs.readFileSync(filePath, "utf8");

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
			readingTime: calculateReadingTime(content),
		};
	});

	posts.sort((a, b) => (a.date < b.date ? 1 : -1));

	if (process.env.NODE_ENV === "production") {
		return posts.filter((p) => !p.draft);
	}

	return posts;
}

export function getPostBySlug(slug: string): Post | null {
	const filePath = path.join(POSTS_DIR, `${slug}.md`);

	if (!fs.existsSync(filePath)) return null;

	const raw = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(raw);

	const fm = data as PostFrontmatter;

	const post: Post = {
		slug,
		title: fm.title,
		date: fm.date,
		description: fm.description ?? "",
		tags: fm.tags ?? [],
		draft: fm.draft ?? false,
		coverImage: fm.coverImage,
		readingTime: calculateReadingTime(content),
		content,
	};

	if (process.env.NODE_ENV === "production" && post.draft) {
		return null;
	}

	return post;
}
