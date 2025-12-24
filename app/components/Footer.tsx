export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-slate-200 bg-white py-8">
			<div className="mx-auto max-w-6xl py-4 text-center text-sm text-slate-500">
				© {currentYear} MinimalBlog. All rights reserved.
			</div>
		</footer>
	);
}
