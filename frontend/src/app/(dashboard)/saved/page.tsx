'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PostCard } from '@/components/post/post-card'
import { ArrowLeft, Bookmark } from 'lucide-react'

const mockSavedPosts = [
  {
    id: '1',
    author: {
      name: 'Sarah Anderson',
      handle: 'sarahcodes',
      avatar: 'SA',
    },
    timestamp: '2d ago',
    content: 'Just launched my new portfolio website! Super excited to share my recent projects.',
    image: '/placeholder.png',
    likes: 234,
    comments: 45,
    shares: 12,
  },
  {
    id: '2',
    author: {
      name: 'Tech Daily',
      handle: 'techdaily',
      avatar: 'TD',
    },
    timestamp: '4d ago',
    content: 'The future of web development: What you need to know about the latest frameworks and tools.',
    image: '/placeholder.png',
    likes: 5600,
    comments: 890,
    shares: 340,
  },
  {
    id: '3',
    author: {
      name: 'Dev Insights',
      handle: 'devinsights',
      avatar: 'DI',
    },
    timestamp: '1w ago',
    content: 'Breaking: New JavaScript feature makes async programming even easier.',
    likes: 3450,
    comments: 567,
    shares: 234,
  },
]

export default function SavedPage() {
  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/home">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Go back</span>
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold">Saved Posts</h2>
            <p className="text-xs text-muted-foreground">{mockSavedPosts.length} posts saved</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        {mockSavedPosts.length > 0 ? (
          <div className="border-t border-border">
            {mockSavedPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bookmark className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
            <p className="font-medium text-lg">No saved posts yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Save posts to view them later
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
