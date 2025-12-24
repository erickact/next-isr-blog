"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
	const pathname = usePathname();

	return (
		<nav className="border-b border-slate-200 bg-white">
			<div className="mx-auto flex max-w-6xl items-center justify-between p-4">
				<Link href="/" className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-500 text-white font-bold">
						M
					</div>
					<span className="text-xl font-bold text-slate-800">MinimalBlog</span>
				</Link>
				<div className="flex gap-6">
					<Link
						href="/"
						className={`font-medium hover:text-orange-600 ${
							pathname === "/" ? "text-orange-600" : "text-slate-600"
						}`}
					>
						Home
					</Link>
					<Link
						href="/tags"
						className={`font-medium hover:text-orange-600 ${
							pathname === "/tags" ? "text-orange-600" : "text-slate-600"
						}`}
					>
						Tags
					</Link>
				</div>
			</div>
		</nav>
	);
}
