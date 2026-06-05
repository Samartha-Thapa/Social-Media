'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { PostCard } from '@/components/post/post-card'
import { ImagePlus, Smile } from 'lucide-react'

const mockPosts = [
  {
    id: '1',
    author: {
      name: 'Sarah Anderson',
      handle: 'sarahcodes',
      avatar: 'SA',
    },
    timestamp: '2h ago',
    content: 'Just launched my new portfolio website! Super excited to share my recent projects. Check it out and let me know what you think!',
    image: '/placeholder.png',
    likes: 234,
    comments: 45,
    shares: 12,
  },
  {
    id: '2',
    author: {
      name: 'Mike Johnson',
      handle: 'mikejohnson',
      avatar: 'MJ',
    },
    timestamp: '4h ago',
    content: 'The best part about being a developer is that moment when your code finally works after hours of debugging. 😅',
    likes: 456,
    comments: 78,
    shares: 34,
  },
  {
    id: '3',
    author: {
      name: 'Emma Wilson',
      handle: 'emmawilson',
      avatar: 'EW',
    },
    timestamp: '6h ago',
    content: 'Coffee number 3 today. Still debugging. Send help and more coffee ☕',
    image: '/placeholder.png',
    likes: 567,
    comments: 120,
    shares: 89,
  },
  {
    id: '4',
    author: {
      name: 'Alex Chen',
      handle: 'alexchen',
      avatar: 'AC',
    },
    timestamp: '8h ago',
    content: 'Just finished reading this amazing article about web performance optimization. The tips are game-changing! 🚀',
    likes: 345,
    comments: 56,
    shares: 23,
  },
  {
    id: '5',
    author: {
      name: 'Jessica Lee',
      handle: 'jessicalee',
      avatar: 'JL',
    },
    timestamp: '10h ago',
    content: 'Team building day was amazing! Nothing beats working with people who really understand the mission.',
    image: '/placeholder.png',
    likes: 678,
    comments: 94,
    shares: 67,
  },
]

export default function HomePage() {
  const [postContent, setPostContent] = useState('')

  const handlePost = () => {
    // In a real app, this would submit to the backend
    setPostContent('')
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Feed Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6">
          <h2 className="text-xl font-bold">Home</h2>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Create Post Section */}
        <div className="border-b border-border bg-background hover:bg-secondary/30 transition-colors p-4 sm:p-6">
          <div className="flex gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/20" />
            </div>

            {/* Form */}
            <div className="flex-1 space-y-4">
              <Textarea
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="resize-none border-border bg-secondary placeholder:text-muted-foreground text-lg min-h-20"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:bg-primary/10"
                  >
                    <ImagePlus className="w-5 h-5" />
                    <span className="sr-only">Add image</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:bg-primary/10"
                  >
                    <Smile className="w-5 h-5" />
                    <span className="sr-only">Add emoji</span>
                  </Button>
                </div>

                <Button
                  onClick={handlePost}
                  disabled={!postContent.trim()}
                  className="font-semibold px-8"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div>
          {mockPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>

        {/* Load More */}
        <div className="border-t border-border p-6 text-center">
          <Button variant="outline" className="border-border">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  )
}
