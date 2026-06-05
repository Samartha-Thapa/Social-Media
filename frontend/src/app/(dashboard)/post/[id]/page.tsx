'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'

const mockPost = {
  id: '1',
  author: {
    name: 'Sarah Anderson',
    handle: 'sarahcodes',
    avatar: 'SA',
  },
  timestamp: '2h ago',
  content: 'Just launched my new portfolio website! Super excited to share my recent projects. Check it out and let me know what you think!',
  image: true,
  likes: 234,
  comments: 45,
  shares: 12,
}

const mockComments = [
  {
    id: '1',
    author: {
      name: 'Mike Johnson',
      handle: 'mikejohnson',
      avatar: 'MJ',
    },
    timestamp: '1h ago',
    content: 'Looks amazing! The design is really clean and professional.',
    likes: 23,
  },
  {
    id: '2',
    author: {
      name: 'Emma Wilson',
      handle: 'emmawilson',
      avatar: 'EW',
    },
    timestamp: '45m ago',
    content: 'Great work Sarah! I especially love the project showcase section.',
    likes: 15,
  },
  {
    id: '3',
    author: {
      name: 'Alex Chen',
      handle: 'alexchen',
      avatar: 'AC',
    },
    timestamp: '30m ago',
    content: 'Do you have the source code on GitHub? I&apos;d love to check it out!',
    likes: 8,
  },
]

interface PostDetailPageProps {
  params: Promise<{ id: string }>
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = use(params)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(mockPost.likes)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState(mockComments)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const handleComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: String(comments.length + 1),
        author: {
          name: 'John Doe',
          handle: 'johndoe',
          avatar: 'JD',
        },
        timestamp: 'now',
        content: commentText,
        likes: 0,
      }
      setComments([newComment, ...comments])
      setCommentText('')
    }
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/home">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Go back</span>
            </Button>
          </Link>
          <p className="font-bold">Post</p>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Post Detail */}
      <div className="max-w-2xl mx-auto">
        <article className="border-b border-border bg-background p-4 sm:p-6 space-y-4">
          {/* Author */}
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20" />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Link href={`/profile/${mockPost.author.handle}`}>
                  <p className="font-semibold hover:underline">{mockPost.author.name}</p>
                </Link>
                <p className="text-muted-foreground text-sm">@{mockPost.author.handle}</p>
              </div>
              <p className="text-muted-foreground text-sm">{mockPost.timestamp}</p>
            </div>
          </div>

          {/* Content */}
          <p className="text-xl leading-normal break-words">{mockPost.content}</p>

          {/* Image */}
          {mockPost.image && (
            <div className="rounded-2xl overflow-hidden border border-border bg-secondary/50 aspect-video">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
            </div>
          )}

          {/* Stats */}
          <div className="flex gap-4 text-sm text-muted-foreground border-y border-border py-4">
            <button className="hover:text-primary transition-colors">
              {likeCount} <span>Likes</span>
            </button>
            <button className="hover:text-primary transition-colors">
              {comments.length + 45} <span>Comments</span>
            </button>
            <button className="hover:text-primary transition-colors">
              {mockPost.shares} <span>Shares</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between py-4 border-b border-border">
            <button
              onClick={handleLike}
              className={`group flex items-center gap-2 transition-colors ${
                liked ? 'text-accent' : 'text-muted-foreground hover:text-accent/80'
              }`}
            >
              <div
                className={`rounded-full p-2 transition-colors ${
                  liked ? 'bg-accent/20' : 'group-hover:bg-accent/10'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-sm">{likeCount}</span>
            </button>

            <button className="group flex items-center gap-2 text-muted-foreground hover:text-primary/80 transition-colors">
              <div className="rounded-full p-2 group-hover:bg-primary/10 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-sm">{comments.length}</span>
            </button>

            <button className="group flex items-center gap-2 text-muted-foreground hover:text-primary/80 transition-colors">
              <div className="rounded-full p-2 group-hover:bg-primary/10 transition-colors">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-sm">{mockPost.shares}</span>
            </button>
          </div>

          {/* Reply Box */}
          <div className="flex gap-4 pt-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Post your reply!"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="resize-none border-border bg-secondary placeholder:text-muted-foreground min-h-20"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  className="font-semibold"
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Comments */}
        <div className="border-t border-border divide-y divide-border">
          {comments.map((comment) => (
            <article key={comment.id} className="p-4 sm:p-6 hover:bg-secondary/30 transition-colors">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link href={`/profile/${comment.author.handle}`}>
                      <p className="font-semibold hover:underline">{comment.author.name}</p>
                    </Link>
                    <p className="text-muted-foreground text-sm">@{comment.author.handle}</p>
                    <span className="text-muted-foreground text-sm">·</span>
                    <time className="text-muted-foreground text-sm">{comment.timestamp}</time>
                  </div>

                  <p className="text-foreground mt-2 break-words">{comment.content}</p>

                  <div className="mt-2 flex gap-4 text-muted-foreground text-sm">
                    <button className="hover:text-primary transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="hover:text-primary transition-colors">
                      {comment.likes} <span className="ml-1">likes</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
