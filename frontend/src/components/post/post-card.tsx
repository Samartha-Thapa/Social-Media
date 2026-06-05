'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

interface PostCardProps {
  id: string
  author: {
    name: string
    handle: string
    avatar: string
  }
  timestamp: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  liked?: boolean
}

export function PostCard({
  id,
  author,
  timestamp,
  content,
  image,
  likes: initialLikes,
  comments,
  shares,
  liked: initialLiked = false,
}: PostCardProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(initialLikes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <article className="border-b border-border bg-background hover:bg-secondary/30 transition-colors p-4 sm:p-6 cursor-pointer group">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Link href={`/profile/${author.handle}`} onClick={(e) => e.stopPropagation()}>
                <p className="font-semibold hover:underline">{author.name}</p>
              </Link>
              <p className="text-muted-foreground text-sm">@{author.handle}</p>
              <span className="text-muted-foreground text-sm">·</span>
              <time className="text-muted-foreground text-sm">{timestamp}</time>
            </div>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              <span className="sr-only">More options</span>
            </Button>
          </div>

          {/* Post Content */}
          <Link href={`/post/${id}`} onClick={(e) => e.stopPropagation()}>
            <p className="text-foreground mt-3 text-base leading-normal break-words">{content}</p>
          </Link>

          {/* Post Image */}
          {image && (
            <Link href={`/post/${id}`} onClick={(e) => e.stopPropagation()}>
              <div className="mt-3 rounded-2xl overflow-hidden border border-border bg-secondary/50 aspect-video">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
              </div>
            </Link>
          )}

          {/* Interactions */}
          <div className="mt-4 flex items-center justify-between text-muted-foreground text-sm max-w-xs">
            <button className="group/interact flex items-center gap-2 hover:text-primary/80 transition-colors">
              <div className="group-hover/interact:bg-primary/10 rounded-full p-2 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs">{comments}</span>
            </button>

            <button className="group/interact flex items-center gap-2 hover:text-accent/80 transition-colors">
              <div className="group-hover/interact:bg-accent/10 rounded-full p-2 transition-colors">
                <Share2 className="w-4 h-4" />
              </div>
              <span className="text-xs">{shares}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                handleLike()
              }}
              className={`group/interact flex items-center gap-2 transition-colors ${
                liked ? 'text-accent' : 'hover:text-accent/80'
              }`}
            >
              <div
                className={`rounded-full p-2 transition-colors ${
                  liked ? 'bg-accent/20' : 'group-hover/interact:bg-accent/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-xs">{likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
