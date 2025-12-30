"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "./SearchBar";

type NavbarProps = {
	tags: string[];
};

export function Navbar({ tags }: NavbarProps) {
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

				<div className="flex items-center gap-6">
					{pathname === "/" && <SearchBar />}

					<Link
						href="/"
						className={`font-medium hover:text-orange-600 ${
							pathname === "/" ? "text-orange-600" : "text-slate-600"
						}`}
					>
						Home
					</Link>

					<div className="relative group">
						<button
							type="button"
							className={`font-medium hover:text-orange-600 ${
								pathname.startsWith("/tag")
									? "text-orange-600"
									: "text-slate-600"
							}`}
						>
							Tags
						</button>

						<div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
							<div className="bg-white border border-slate-200 rounded-lg shadow-lg py-2 min-w-[160px]">
								{tags.map((tag) => (
									<Link
										key={tag}
										href={`/tag/${tag}`}
										className="block px-4 py-2 text-slate-600 hover:bg-orange-50 hover:text-orange-600 capitalize"
									>
										{tag}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
