export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-slate-200 bg-white">
			<div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
				© {currentYear} MinimalBlog. All rights reserved.
			</div>
		</footer>
	);
}
