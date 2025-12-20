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
};

export type PostSummary = PostFrontmatter & {
	slug: string;
};

export type Post = PostSummary & {
	content: string;
};

function getSlugFromFilename(filename: string) {
	return filename.replace(/\.md$/, "");
}

export function getAllPosts(): PostSummary[] {
	const filenames = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

	const posts = filenames.map((filename) => {
		const slug = getSlugFromFilename(filename);
		const filePath = path.join(POSTS_DIR, filename);
		const raw = fs.readFileSync(filePath, "utf8");

		const { data } = matter(raw);
		const fm = data as PostFrontmatter;

		return {
			slug,
			title: fm.title,
			date: fm.date,
			description: fm.description ?? "",
			tags: fm.tags ?? [],
			draft: fm.draft ?? false,
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
		content,
	};

	if (process.env.NODE_ENV === "production" && post.draft) {
		return null;
	}

	return post;
}
