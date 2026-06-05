'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PostCard } from '@/components/post/post-card'
import { Zap, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const mockTrendingPosts = [
  {
    id: '1',
    author: {
      name: 'Sarah Anderson',
      handle: 'sarahcodes',
      avatar: 'SA',
    },
    timestamp: '2h ago',
    content: 'Just launched my new portfolio website! Super excited to share my recent projects.',
    image: '/placeholder.png',
    likes: 2340,
    comments: 450,
    shares: 120,
  },
  {
    id: '2',
    author: {
      name: 'Tech Daily',
      handle: 'techdaily',
      avatar: 'TD',
    },
    timestamp: '4h ago',
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
    timestamp: '6h ago',
    content: 'Breaking: New JavaScript feature makes async programming even easier. Here&apos;s what you should know.',
    likes: 3450,
    comments: 567,
    shares: 234,
  },
]

const mockHashtags = [
  { tag: '#ReactJS', posts: 12340, trend: 'up' },
  { tag: '#WebDevelopment', posts: 56420, trend: 'up' },
  { tag: '#JavaScript', posts: 98700, trend: 'stable' },
  { tag: '#Coding', posts: 152340, trend: 'down' },
  { tag: '#UI_Design', posts: 45670, trend: 'up' },
]

const mockSuggestedUsers = [
  {
    name: 'Alex Chen',
    handle: 'alexchen',
    bio: 'Full-stack developer | AI enthusiast',
    followers: 4560,
  },
  {
    name: 'Jessica Lee',
    handle: 'jessicalee',
    bio: 'Product manager | Tech industry insights',
    followers: 3240,
  },
  {
    name: 'David Brown',
    handle: 'davidbrown',
    bio: 'Cloud architect | DevOps specialist',
    followers: 5670,
  },
]

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('trending')

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-xl font-bold">Explore</h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedCategory === 'trending' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Trending Now</h3>
                  <div className="space-y-1 border border-border rounded-lg overflow-hidden">
                    {mockTrendingPosts.map((post, idx) => (
                      <div key={post.id} className="border-b border-border last:border-0">
                        <PostCard {...post} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Hashtags */}
            <div className="border border-border rounded-lg p-6 space-y-4 bg-card">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">Trending Hashtags</h3>
              </div>
              <div className="space-y-3">
                {mockHashtags.map((hashtag) => (
                  <button
                    key={hashtag.tag}
                    className="w-full text-left p-3 rounded-lg hover:bg-secondary/50 transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-primary hover:underline">{hashtag.tag}</p>
                      {hashtag.trend === 'up' && (
                        <span className="text-xs text-accent">↑</span>
                      )}
                      {hashtag.trend === 'down' && (
                        <span className="text-xs text-muted-foreground">↓</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{hashtag.posts} posts</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Users */}
            <div className="border border-border rounded-lg p-6 space-y-4 bg-card">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">Suggested Users</h3>
              </div>
              <div className="space-y-3">
                {mockSuggestedUsers.map((user) => (
                  <Link key={user.handle} href={`/profile/${user.handle}`}>
                    <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors space-y-2 cursor-pointer">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold hover:underline truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground">@{user.handle}</p>
                        </div>
                        <Button size="sm" variant="outline" className="border-border flex-shrink-0">
                          Follow
                        </Button>
                      </div>
                      <p className="text-xs text-foreground">{user.bio}</p>
                      <p className="text-xs text-muted-foreground">{user.followers} followers</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* What&apos;s Happening */}
            <div className="border border-border rounded-lg p-6 space-y-4 bg-card">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">What&apos;s Happening</h3>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Discover new content, connect with people in your interest areas, and see what&apos;s trending in real-time.
                </p>
                <Button className="w-full border-border" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
