"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";
import API from "@/util/api";

export default function CreateArticle() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("draft");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleSave = async (content: any) => {
    try {
      const response = await API.post("/articles", {
        title,
        content,
        status,
        tags: tags.split(",").map((tag) => tag.trim()),
        coverImage,
      });
      router.push(`/articles/${response.data.id}`);
    } catch (error) {
      console.error("Error creating article:", error);
      // TODO: Display error message to the user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Article</h1>
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
          onChange={(e) => setStatus(e.target.value)}
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
        initialContent={{ type: "doc", content: [] }}
        onSave={handleSave}
      />
    </div>
  );
}