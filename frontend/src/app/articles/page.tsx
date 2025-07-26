"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import API from "@/util/api";
import {
	EllipsisHorizontalIcon,
	PencilIcon,
	TrashIcon,
	MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
const Select = dynamic(() => import("react-select"), { ssr: false });

// Define the type for a single article for type safety
interface Article {
	id: string;
	title: string;
	coverImage?: string;
}

// Define the type for a tag for type safety
interface Tag {
	name: string;
}

export default function ArticlesPage() {
	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [search, setSearch] = useState("");
	const [tags, setTags] = useState<Tag[]>([]);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [page, setPage] = useState(1);
	const [totalArticles, setTotalArticles] = useState(0);
	const limit = 10;

	const fetchArticles = async (pageNumber: number) => {
		try {
			setLoading(true);
			const params = new URLSearchParams();
			if (search) {
				params.append("keyword", search);
			}
			if (selectedTags.length > 0) {
				params.append("tags", selectedTags.join(","));
			}
			params.append("page", pageNumber.toString());
			params.append("limit", limit.toString());

			const response = await API.get(`/articles?${params.toString()}`);
			setArticles((prevArticles) => {
				const newArticles = response.data.articles.filter(
					(newArticle: Article) =>
						!prevArticles.some((prevArticle) => prevArticle.id === newArticle.id)
				);
				return [...prevArticles, ...newArticles];
			});
			setTotalArticles(response.data.total);
			setError(null);
		} catch (err) {
			console.error("Error fetching articles:", err);
			setError("Failed to load your articles. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	const fetchTags = async () => {
		try {
			const response = await API.get("/tags");
			setTags(response.data);
		} catch (err) {
			console.error("Error fetching tags:", err);
		}
	};

	useEffect(() => {
		setArticles([]); // Clear articles when search or tags change
		setPage(1); // Reset page to 1
		fetchArticles(1); // Fetch first page
	}, [search, selectedTags]);

	useEffect(() => {
		fetchTags();
	}, []);

	const handleDeleteClick = (articleId: string) => {
		setArticleToDelete(articleId);
		setShowDeleteModal(true);
		setActiveDropdown(null); // Close dropdown
	};

	const confirmDelete = async () => {
		if (!articleToDelete) return;

		try {
			await API.delete(`/articles/${articleToDelete}`);
			setArticles(articles.filter((article) => article.id !== articleToDelete));
			setShowDeleteModal(false);
			setArticleToDelete(null);
		} catch (err) {
			console.error("Error deleting article:", err);
			setError("Failed to delete the article. Please try again.");
			setShowDeleteModal(false); // Hide modal even on error
		}
	};

	const toggleDropdown = (articleId: string) => {
		setActiveDropdown(activeDropdown === articleId ? null : articleId);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleTagChange = (selectedOptions: any) => {
		setSelectedTags(selectedOptions.map((option: any) => option.value));
	};

	const handleLoadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		fetchArticles(nextPage);
	};

	return (
		<div className="container mx-auto p-4 sm:p-6 lg:p-8">
			{/* Page Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
				<h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
					My Articles
				</h1>
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
					<div className="relative w-full sm:w-64">
						<MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input
							type="text"
							placeholder="Search articles..."
							value={search}
							onChange={handleSearchChange}
							className="pl-10 pr-4 py-2 w-full border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						/>
					</div>
					<div className="w-full sm:w-64">
						<Select
							isMulti
							name="tags"
							options={tags.map((tag) => ({ value: tag.name, label: tag.name }))}
							className="basic-multi-select"
							classNamePrefix="select"
							onChange={handleTagChange}
							placeholder="Filter by tags..."
						/>
					</div>
					<Link
						href="/articles/create"
						className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
					>
						Create New Article
					</Link>
				</div>
			</div>

			{/* Error Message */}
			{error && (
				<div
					className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
					role="alert"
				>
					<span className="block sm:inline">{error}</span>
				</div>
			)}

			{/* Articles Grid */}
			{loading && articles.length === 0 ? (
				<div className="text-center p-10">Loading your articles...</div>
			) : articles.length > 0 ? (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{articles.map((article) => (
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
								{/* Dropdown for Edit/Delete */}
								<div className="absolute top-2 right-2">
									<button
										onClick={() => toggleDropdown(article.id)}
										className="p-1.5 rounded-full bg-gray-100 bg-opacity-50 hover:bg-opacity-75 focus:outline-none"
									>
										<EllipsisHorizontalIcon className="h-6 w-6 text-gray-600" />
									</button>
									{activeDropdown === article.id && (
										<div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10">
											<Link
												href={`/articles/${article.id}/edit`}
												className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
											>
												<PencilIcon className="h-5 w-5 mr-2" />
												Edit
											</Link>
											<button
												onClick={() => handleDeleteClick(article.id)}
												className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
											>
												<TrashIcon className="h-5 w-5 mr-2" />
												Delete
											</button>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
					{articles.length < totalArticles && (
						<div className="text-center mt-8">
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
				<div className="text-center py-10 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
					<p className="text-gray-500 dark:text-gray-400">
						No articles found. Try adjusting your search or filters.
					</p>
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{showDeleteModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
						<h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
						<p>Are you sure you want to delete this article?</p>
						<div className="mt-6 flex justify-end space-x-4">
							<button
								onClick={() => setShowDeleteModal(false)}
								className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300"
							>
								Cancel
							</button>
							<button
								onClick={confirmDelete}
								className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}