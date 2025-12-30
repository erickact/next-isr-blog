"use client";

import { useQueryState } from "nuqs";
import { type FormEvent, useEffect, useState } from "react";
import { HiX } from "react-icons/hi";

export function SearchBar() {
	const [q, setQ] = useQueryState("q", {
		defaultValue: "",
		clearOnDefault: true,
		shallow: false,
	});

	const [inputValue, setInputValue] = useState(q || "");

	useEffect(() => {
		setInputValue(q || "");
	}, [q]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const value = inputValue.trim();
		setQ(value || null);
	};

	const handleClear = () => {
		setInputValue("");
		setQ(null);
	};

	return (
		<form onSubmit={handleSubmit} className="relative flex items-center">
			<input
				type="text"
				placeholder="Search posts..."
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				className="w-64 rounded-lg border border-slate-300 px-4 py-2 pr-8 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
			/>
			{inputValue && (
				<button
					type="button"
					onClick={handleClear}
					className="absolute right-2 flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 focus:outline-none"
					aria-label="Clear search"
				>
					<HiX className="h-3 w-3" />
				</button>
			)}
		</form>
	);
}
