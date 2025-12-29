import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { getAllTags } from "@/lib/posts";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "MinimalBlog",
	description:
		"A collection of articles on design, development, and building products.",
	alternates: {
		types: {
			"application/rss+xml": "/rss",
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const tags = getAllTags();

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 min-h-screen`}
			>
				<NuqsAdapter>
					<Navbar tags={tags} />
					{children}
					<Footer />
				</NuqsAdapter>
			</body>
		</html>
	);
}
