import { Card, CardContent } from '@/components/ui/card'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: () => 
    <>
      <Card className='rounded-lg border-none mt-6'>
        <CardContent className='p-6'>
          <div className="flex">
            <div className="flex flex-col relative">
              <h1 className='text-3xl font-bold'>学習管理</h1>
              <p className='text-lg mt-2'>学習管理アプリケーション</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>,
})
