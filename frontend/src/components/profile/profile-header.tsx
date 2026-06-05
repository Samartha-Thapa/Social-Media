'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface ProfileHeaderProps {
  name: string
  handle: string
  bio: string
  location?: string
  website?: string
  postsCount: number
  followersCount: number
  followingCount: number
  isOwnProfile?: boolean
  isFollowing?: boolean
}

export function ProfileHeader({
  name,
  handle,
  bio,
  location,
  website,
  postsCount,
  followersCount,
  followingCount,
  isOwnProfile = false,
  isFollowing: initialFollowing = false,
}: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing)

  return (
    <>
      {/* Header with Back Button */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/home">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
                <span className="sr-only">Go back</span>
              </Button>
            </Link>
            <div>
              <p className="font-bold text-lg">{name}</p>
              <p className="text-sm text-muted-foreground">{postsCount} posts</p>
            </div>
          </div>
          {isOwnProfile && (
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-5 h-5" />
              <span className="sr-only">More options</span>
            </Button>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="border-b border-border bg-background">
        <div className="px-4 sm:px-6 py-6 space-y-4">
          {/* Cover Image and Avatar */}
          <div>
            <div className="h-32 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 mb-4" />
            <div className="flex items-start justify-between -mt-12">
              <div className="w-24 h-24 rounded-full border-4 border-background bg-primary/30" />
              {isOwnProfile ? (
                <Link href="/profile/edit">
                  <Button variant="outline" className="border-border">
                    Edit Profile
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={() => setIsFollowing(!isFollowing)}
                  variant={isFollowing ? 'outline' : 'default'}
                  className={isFollowing ? 'border-border' : ''}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-2">
            <div>
              <p className="text-xl font-bold">{name}</p>
              <p className="text-muted-foreground">@{handle}</p>
            </div>
            <p className="text-foreground">{bio}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
              {location && (
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  <span>{location}</span>
                </div>
              )}
              {website && (
                <a href={website} className="text-primary hover:underline flex items-center gap-1">
                  <span>🔗</span>
                  <span>{website}</span>
                </a>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 pt-4">
            <button className="hover:opacity-80 transition-opacity">
              <span className="font-bold text-foreground">{followingCount}</span>
              <p className="text-sm text-muted-foreground">Following</p>
            </button>
            <button className="hover:opacity-80 transition-opacity">
              <span className="font-bold text-foreground">{followersCount}</span>
              <p className="text-sm text-muted-foreground">Followers</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
