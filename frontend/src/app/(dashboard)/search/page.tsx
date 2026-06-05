'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PostCard } from '@/components/post/post-card'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import Link from 'next/link'

const mockUsers = [
  {
    name: 'Sarah Anderson',
    handle: 'sarahcodes',
    bio: 'Full-stack developer | Open source enthusiast',
    followers: 5230,
  },
  {
    name: 'Mike Johnson',
    handle: 'mikejohnson',
    bio: 'Software Engineer @TechCorp | Python, JavaScript',
    followers: 3450,
  },
  {
    name: 'Emma Wilson',
    handle: 'emmawilson',
    bio: 'Product Designer | UI/UX Enthusiast',
    followers: 8900,
  },
]

const mockPosts = [
  {
    id: '1',
    author: {
      name: 'Sarah Anderson',
      handle: 'sarahcodes',
      avatar: 'SA',
    },
    timestamp: '2h ago',
    content: 'Just launched my new portfolio website!',
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
    content: 'The best part about being a developer is that moment when your code finally works',
    likes: 456,
    comments: 78,
    shares: 34,
  },
]

const mockHashtags = [
  { tag: '#ReactJS', posts: 1230 },
  { tag: '#WebDevelopment', posts: 5640 },
  { tag: '#JavaScript', posts: 9870 },
  { tag: '#Coding', posts: 15234 },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('posts')

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.handle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredPosts = mockPosts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredHashtags = mockHashtags.filter((h) =>
    h.tag.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Search Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 space-y-4">
          <h2 className="text-xl font-bold">Search</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search posts, people, hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 bg-secondary border-border h-12"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {searchQuery ? (
        <div className="max-w-2xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full rounded-none border-b border-border bg-transparent p-0 h-auto">
              <TabsTrigger
                value="posts"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-4"
              >
                Posts ({filteredPosts.length})
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-4"
              >
                Users ({filteredUsers.length})
              </TabsTrigger>
              <TabsTrigger
                value="hashtags"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-4"
              >
                Hashtags ({filteredHashtags.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-0">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => <PostCard key={post.id} {...post} />)
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No posts found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="users" className="mt-0 space-y-4 p-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <Link key={user.handle} href={`/profile/${user.handle}`}>
                    <div className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors cursor-pointer space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/20" />
                          <div>
                            <p className="font-semibold hover:underline">{user.name}</p>
                            <p className="text-sm text-muted-foreground">@{user.handle}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-border">
                          Follow
                        </Button>
                      </div>
                      <p className="text-sm text-foreground">{user.bio}</p>
                      <p className="text-xs text-muted-foreground">{user.followers} followers</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No users found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="hashtags" className="mt-0 space-y-2 p-4">
              {filteredHashtags.length > 0 ? (
                filteredHashtags.map((hashtag) => (
                  <button
                    key={hashtag.tag}
                    className="w-full text-left border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors space-y-1"
                  >
                    <p className="font-semibold text-primary hover:underline">{hashtag.tag}</p>
                    <p className="text-sm text-muted-foreground">{hashtag.posts} posts</p>
                  </button>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No hashtags found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center space-y-4">
            <Search className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
            <div>
              <p className="text-lg font-medium">Try searching for</p>
              <p className="text-sm text-muted-foreground">
                People, posts, or hashtags to find what you&apos;re looking for
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div>
              <p className="font-semibold mb-4">Trending Hashtags</p>
              <div className="space-y-3">
                {mockHashtags.map((hashtag) => (
                  <button
                    key={hashtag.tag}
                    className="w-full text-left hover:bg-secondary/50 transition-colors rounded p-3 space-y-1"
                  >
                    <p className="font-medium text-primary">{hashtag.tag}</p>
                    <p className="text-xs text-muted-foreground">{hashtag.posts} posts</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold mb-4">Suggested Users</p>
              <div className="space-y-3">
                {mockUsers.map((user) => (
                  <Link key={user.handle} href={`/profile/${user.handle}`}>
                    <div className="hover:bg-secondary/50 transition-colors rounded p-3 space-y-1 cursor-pointer">
                      <p className="font-medium hover:underline">{user.name}</p>
                      <p className="text-xs text-muted-foreground">@{user.handle} • {user.followers} followers</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
