"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/util/api";
import { useAuthToken } from "@/hooks/useAuthToken";
import Link from "next/link";

interface Article {
	id: string;
	title: string;
	content: any;
	status: "published" | "draft";
	tags: string[];
	coverImage?: string;
	articleAuthors: Array<{ userId: string }>;
}

export default function ArticleViewPage({
	params
}: {
	params: { articleId: string };
}) {
	const router = useRouter();
	const { articleId } = params;
	const [article, setArticle] = useState<Article | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [summary, setSummary] = useState<string | null>(null);
	const [summarizing, setSummarizing] = useState(false);
	const { userId } = useAuthToken(); // Assuming useAuthToken provides the current user's ID

	useEffect(() => {
		if (articleId) {
			const fetchArticle = async () => {
				try {
					const response = await API.get(`/articles/${articleId}`);
					setArticle(response.data.article);
				} catch (err) {
					console.error("Error fetching article:", err);
					setError("Failed to load article.");
				} finally {
					setLoading(false);
				}
			};
			fetchArticle();
		}
	}, [articleId]);

	const handleSummarize = async () => {
		if (!articleId) return;
		setSummarizing(true);
		setSummary(null); // Clear previous summary
		try {
			const response = await API.post(`/articles/${articleId}/summarize`);
			setSummary(response.data.summary);
		} catch (err) {
			console.error("Error summarizing article:", err);
			setSummary("Failed to generate summary. Please try again.");
		} finally {
			setSummarizing(false);
		}
	};

	const isAuthor = article?.articleAuthors.some(
		author => author.userId === userId
	);

	if (loading) {
		return <div className="text-center p-10">Loading article...</div>;
	}

	if (error) {
		return <div className="text-center p-10 text-red-500">{error}</div>;
	}

	if (!article) {
		return <div className="text-center p-10">Article not found.</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">{article.title}</h1>
			{article.coverImage && (
				<img
					src={article.coverImage}
					alt={article.title}
					className="w-full h-64 object-cover mb-4 rounded-lg"
				/>
			)}
			<div
				className="prose dark:prose-invert max-w-none"
				dangerouslySetInnerHTML={{ __html: article.content }}
			/>

			<div className="mt-6 flex items-center space-x-4">
				<button
					onClick={handleSummarize}
					disabled={summarizing}
					className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{summarizing ? "Summarizing..." : "Summarize Article"}
				</button>
				{isAuthor && (
					<Link
						href={`/articles/${article.id}/edit`}
						className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Edit Article
					</Link>
				)}
			</div>

			{summary && (
				<div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
					<h2 className="text-xl font-bold mb-2">Summary</h2>
					<p>{summary}</p>
				</div>
			)}
		</div>
	);
}