"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import API from "@/util/api";
import authTokenStorage from "@/storage/authTokenStorage";

export default function SignUpPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});
	const [message, setMessage] = useState<{
		text: string;
		type: "success" | "error";
	} | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setMessage(null);
		setIsSubmitting(true);

		try {
			const response = API.post("/auth/signup", formData)
				.then(res => res.data)
				.then(res => {
					authTokenStorage.setToken(res.token);
					console.log(res.user);
				})
				.catch(err => {
					console.error("Sign up error:", err);
				});
		} catch (error) {
			setMessage({
				text: "Network error. Please try again.",
				type: "error"
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-center text-gray-800">
					Create Account
				</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="email" className="sr-only">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="password" className="sr-only">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							required
							className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className={`w-full p-3 text-white rounded-md transition-colors ${
							isSubmitting
								? "bg-blue-400 cursor-not-allowed"
								: "bg-blue-600 hover:bg-blue-700"
						}`}
					>
						{isSubmitting ? "Processing..." : "Sign Up"}
					</button>
				</form>

				{message && (
					<p
						className={`p-3 text-center rounded-md ${
							message.type === "success"
								? "bg-green-100 text-green-700"
								: "bg-red-100 text-red-700"
						}`}
					>
						{message.text}
					</p>
				)}

				<p className="text-center text-sm text-gray-600">
					Already have an account?{" "}
					<a href="/auth/signin" className="text-blue-600 hover:underline">
						Sign In
					</a>
				</p>
			</div>
		</div>
	);
}
