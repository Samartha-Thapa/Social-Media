'use client'

import { useState } from 'react'
import { PostCard } from '../post/post-card'

const mockUserPosts = [
  {
    id: '1',
    author: {
      name: 'John Doe',
      handle: 'johndoe',
      avatar: 'JD',
    },
    timestamp: '3d ago',
    content: 'Excited to announce that I just completed my new project! Check it out on GitHub.',
    image: '/placeholder.png',
    likes: 234,
    comments: 45,
    shares: 12,
  },
  {
    id: '2',
    author: {
      name: 'John Doe',
      handle: 'johndoe',
      avatar: 'JD',
    },
    timestamp: '5d ago',
    content: 'Just attended an amazing tech conference. So many great talks and networking opportunities!',
    likes: 456,
    comments: 78,
    shares: 34,
  },
  {
    id: '3',
    author: {
      name: 'John Doe',
      handle: 'johndoe',
      avatar: 'JD',
    },
    timestamp: '1w ago',
    content: 'Web development is constantly evolving. Always learning something new!',
    image: '/placeholder.png',
    likes: 567,
    comments: 120,
    shares: 89,
  },
]

const mockLikedPosts = mockUserPosts.slice(0, 2)

interface ProfileTabsProps {
  handle: string
}

export function ProfileTabs(
    { handle }: ProfileTabsProps

) {
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'likes'>('posts')

  const tabs = [
    { id: 'posts', label: 'Posts', count: mockUserPosts.length },
    { id: 'replies', label: 'Replies', count: 0 },
    { id: 'likes', label: 'Likes', count: mockLikedPosts.length },
  ] as const

  return (
    <>
      {/* Tab Navigation */}
      <div className="sticky top-[113px] z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-0 flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-4 text-center border-b-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              <span className="text-sm ml-2">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-2xl mx-auto">
        {activeTab === 'posts' && (
          <div>
            {mockUserPosts.length > 0 ? (
              mockUserPosts.map((post) => <PostCard key={post.id} {...post} />)
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'replies' && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No replies yet</p>
          </div>
        )}

        {activeTab === 'likes' && (
          <div>
            {mockLikedPosts.length > 0 ? (
              mockLikedPosts.map((post) => <PostCard key={post.id} {...post} liked={true} />)
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No liked posts</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
