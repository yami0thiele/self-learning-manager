import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createBook, findBooksByFts } from "@/types/command/book-command";
import type { BookData } from "@/types/data/book-data";
import { Label } from "@radix-ui/react-label";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import type React from "react";
import { useState } from "react";

export const Route = createLazyFileRoute("/book/create")({
	component: () => {
		const navigate = useNavigate();
		const mutation = useMutation({
			mutationFn: (bookData: BookData) => createBook(bookData),
			onSuccess: () => navigate({ to: "/book" }),
		});

		const [query, setQuery] = useState("");
		const ftsSearchResult = useQuery({
			queryKey: [query],
			queryFn: () => findBooksByFts(query),
			placeholderData: keepPreviousData,
			initialData: [],
		});

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();
			const formData = new FormData(e.target as HTMLFormElement);
			const bookData: BookData = {
				title: formData.get("title") as string,
				author: formData.get("author") as string,
				publisher: formData.get("publisher") as string,
				published_at: formData.get("published_at") as string,
			};
			mutation.mutate(bookData);
		};

		const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
			e.preventDefault();
			const formData = new FormData(e.currentTarget as HTMLFormElement);
			const title = formData.get("title") as string;
			const author = formData.get("author") as string;
			setQuery((title + " " + author).trim());
		};

		return (
			<Card className="w-full">
				<CardHeader>
					<CardTitle>書籍登録</CardTitle>
					<CardDescription>
						ノートを作成する対象となる書籍を登録します。
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit} onBlur={handleChange}>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="title">タイトル</Label>
								<Input id="title" name="title" required />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="author">著者</Label>
								<Input id="author" name="author" />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="publisher">出版社</Label>
								<Input id="publisher" name="publisher" />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="published_at">出版日</Label>
								<Input id="published_at" name="published_at" />
							</div>
							{ftsSearchResult.data.length > 0 && (
								<div className="mt-4">
									<p className="font-semibold">似ている書籍:</p>
									<div className="grid grid-cols-1 gap-2">
										{ftsSearchResult.data.map((book) => (
											<Card
												key={book.id}
												className="p-2 border border-gray-300 rounded"
											>
												<CardContent>
													<p className="font-medium">{book.title}</p>
													<p className="text-sm text-gray-600">{book.author}</p>
												</CardContent>
											</Card>
										))}
									</div>
								</div>
							)}
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button type="submit" disabled={mutation.isPending}>
							{mutation.isPending && <Loader size={18} />}
							{mutation.isPending ? "登録中..." : "登録"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		);
	},
});
