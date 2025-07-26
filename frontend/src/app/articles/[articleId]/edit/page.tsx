"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";
import API from "@/util/api";

interface Article {
  id: string;
  title: string;
  content: any;
  status: "published" | "draft";
  tags: string[];
  coverImage?: string;
}

export default function EditArticlePage({ params }: { params: { articleId: string } }) {
  const router = useRouter();
  const { articleId } = params;
  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("draft");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (articleId) {
      const fetchArticle = async () => {
        try {
          const response = await API.get(`/articles/${articleId}`);
          const fetchedArticle: Article = response.data.article;
          setArticle(fetchedArticle);
          setTitle(fetchedArticle.title);
          setStatus(fetchedArticle.status);
          setTags(fetchedArticle.tags.join(", "));
          setCoverImage(fetchedArticle.coverImage || "");
        } catch (err) {
          console.error("Error fetching article:", err);
          setError("Failed to load article for editing.");
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [articleId]);

  const handleSave = async (content: any) => {
    try {
      await API.put(`/articles/${articleId}`, {
        title,
        content,
        status,
        tags: tags.split(",").map((tag) => tag.trim()),
        coverImage,
      });
      router.push(`/articles/${articleId}`);
    } catch (err) {
      console.error("Error updating article:", err);
      // TODO: Display error message to the user
    }
  };

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
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cover Image URL
        </label>
        <input
          type="text"
          id="coverImage"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as "published" | "draft")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <RichTextEditor
        initialContent={article.content}
        onSave={handleSave}
      />
    </div>
  );
}
