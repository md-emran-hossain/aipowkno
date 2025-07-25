"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";

export default function MediumEditor({
	initialContent,
	onSave
}: {
	initialContent: any;
	onSave: (content: any) => void;
}) {
	const [mounted, setMounted] = useState(false);
	const [imageUploading, setImageUploading] = useState(false);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Image.configure({ inline: true }),
			Placeholder.configure({ placeholder: "Write something beautiful..." })
		],
		content: initialContent,
		onUpdate: ({ editor }) => onSave(editor.getJSON()),
		editorProps: {
			attributes: {
				class: "prose prose-sm max-w-none focus:outline-none min-h-[300px]"
			}
		},
		immediatelyRender: false
	});

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleImageUpload = async (file: File) => {
		const formData = new FormData();
		formData.append("image", file);
		setImageUploading(true);
		try {
			const res = await fetch("/api/upload", {
				method: "POST",
				body: formData
			});
			const { url } = await res.json();
			editor?.chain().focus().setImage({ src: url }).run();
		} finally {
			setImageUploading(false);
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		accept: { "image/*": [".png", ".jpg", ".jpeg"] },
		maxFiles: 1,
		onDrop: files => handleImageUpload(files[0])
	});

	if (!mounted || !editor) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-8">
				<div className="min-h-[300px] flex items-center justify-center">
					Loading editor...
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white dark:bg-gray-800 mx-auto max-w-3xl px-4 py-8">
			<div className="flex flex-wrap gap-2 border-b pb-4 mb-6">
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={`p-2 rounded ${
						editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
					}`}
				>
					H1
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={`p-2 rounded ${
						editor.isActive("bold") ? "bg-gray-200" : ""
					}`}
				>
					Bold
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={`p-2 rounded ${
						editor.isActive("italic") ? "bg-gray-200" : ""
					}`}
				>
					Italic
				</button>
				<div {...getRootProps()} className="p-2 border rounded cursor-pointer">
					<input {...getInputProps()} />
					{imageUploading ? "Uploading..." : "Upload Image"}
				</div>
			</div>
			<EditorContent editor={editor} />
		</div>
	);
}
