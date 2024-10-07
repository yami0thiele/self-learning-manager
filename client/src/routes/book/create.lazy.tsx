import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createBook } from '@/types/command/book-command'
import { BookData } from '@/types/data/book-data'
import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import React from 'react'

export const Route = createLazyFileRoute('/book/create')({
  component: () => {
    const navigate = useNavigate()
    const mutation = useMutation({
      mutationFn: (bookData: BookData) => createBook(bookData),
      onSuccess: () => navigate({ to: '/book' }),
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)
      const bookData: BookData = {
        title: formData.get('title') as string,
        author: formData.get('author') as string,
        publisher: formData.get('publisher') as string,
        published_at: formData.get('published_at') as string,
      }
      mutation.mutate(bookData)
    }

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">書籍登録</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="title">タイトル</Label>
            <Input id="title" name="title" required />
          </div>
          <div className="mb-4">
            <Label htmlFor="author">著者</Label>
            <Input id="author" name="author" />
          </div>
          <div className="mb-4">
            <Label htmlFor="publisher">出版社</Label>
            <Input id="publisher" name="publisher" />
          </div>
          <div className="mb-4">
            <Label htmlFor="published_at">出版日</Label>
            <Input id="published_at" name="published_at" />
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? '登録中...' : '登録'}
          </Button>
        </form>
      </div>
    )
  },
})
