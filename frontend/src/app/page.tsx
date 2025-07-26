"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "@/util/api";

interface Article {
	id: string;
	title: string;
	coverImage?: string;
}

export default function Home() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const router = useRouter();

	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const [totalArticles, setTotalArticles] = useState(0);
	const limit = 10;

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token);
	}, []);

	const fetchArticles = async (pageNumber: number) => {
		try {
			setLoading(true);
			const params = new URLSearchParams();
			params.append("page", pageNumber.toString());
			params.append("limit", limit.toString());

			const response = await API.get(`/articles?${params.toString()}`);
			setArticles(prevArticles => {
				const newArticles = (response?.data?.articles || []).filter(
					(newArticle: Article) =>
						!prevArticles.some(prevArticle => prevArticle.id === newArticle.id)
				);
				return [...prevArticles, ...newArticles];
			});
			setTotalArticles(response.data.total);
			setError(null);
		} catch (err) {
			console.error("Error fetching articles:", err);
			setError("Failed to load articles. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchArticles(1);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		router.push("/auth/signin");
	};

	const handleLoadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		fetchArticles(nextPage);
	};

	return (
		<div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<header className="w-full flex justify-end p-4 absolute top-0 right-0">
				{isLoggedIn ? (
					<div className="relative">
						<button
							onClick={() => setShowDropdown(!showDropdown)}
							className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
						>
							Profile
						</button>
						{showDropdown && (
							<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
								<a
									href="/articles"
									className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
									onClick={() => setShowDropdown(false)}
								>
									My articles
								</a>
								<button
									onClick={handleLogout}
									className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
								>
									Log out
								</button>
							</div>
						)}
					</div>
				) : (
					<div>
						Want to write?
						<button
							onClick={() => router.push("/auth/signin")}
							className="px-4 py-2 text-white hover:text-blue-500"
						>
							Sign in
						</button>
					</div>
				)}
			</header>

			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<h1 className="text-3xl font-bold text-gray-800 dark:text-white">
					Latest Articles
				</h1>

				{error && (
					<div
						className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
						role="alert"
					>
						<span className="block sm:inline">{error}</span>
					</div>
				)}

				{loading && articles.length === 0 ? (
					<div className="text-center p-10">Loading articles...</div>
				) : articles.length > 0 ? (
					<>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{articles.map(article => (
								<div
									key={article.id}
									className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group relative"
								>
									<Link href={`/articles/${article.id}`} passHref>
										<div className="block">
											<div className="w-full h-40 bg-gray-200 dark:bg-gray-700">
												{article.coverImage && (
													<img
														src={article.coverImage}
														alt={article.title}
														className="w-full h-full object-cover"
													/>
												)}
											</div>
											<div className="p-4">
												<h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
													{article.title}
												</h2>
											</div>
										</div>
									</Link>
								</div>
							))}
						</div>
						{articles.length < totalArticles && (
							<div className="text-center mt-8 w-full">
								<button
									onClick={handleLoadMore}
									disabled={loading}
									className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{loading ? "Loading..." : "Load More"}
								</button>
							</div>
						)}
					</>
				) : (
					<div className="text-center py-10 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg w-full">
						<p className="text-gray-500 dark:text-gray-400">
							No articles found. Check back later!
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
