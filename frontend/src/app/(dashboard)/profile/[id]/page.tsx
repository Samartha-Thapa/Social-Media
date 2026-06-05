'use client'

import { use } from 'react'
import { ProfileHeader } from '@/components/profile/profile-header'
import { ProfileTabs } from '@/components/profile/profile-tabs'

const mockUserData: Record<string, any> = {
  'sarahcodes': {
    name: 'Sarah Anderson',
    handle: 'sarahcodes',
    bio: 'Full-stack developer | Open source enthusiast | Coffee lover ☕',
    location: 'New York, NY',
    website: 'sarahcodes.dev',
    postsCount: 127,
    followersCount: 5230,
    followingCount: 340,
  },
  'mikejohnson': {
    name: 'Mike Johnson',
    handle: 'mikejohnson',
    bio: 'Software Engineer @TechCorp | Python, JavaScript, Go',
    location: 'Austin, TX',
    website: 'mikejohnson.io',
    postsCount: 89,
    followersCount: 3450,
    followingCount: 267,
  },
  'emmawilson': {
    name: 'Emma Wilson',
    handle: 'emmawilson',
    bio: 'Product Designer | UI/UX Enthusiast | Always learning',
    location: 'Seattle, WA',
    website: 'emmadesigns.com',
    postsCount: 203,
    followersCount: 8900,
    followingCount: 512,
  },
}

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { id } = use(params)
  const user = mockUserData[id] || {
    name: 'User',
    handle: id,
    bio: 'A passionate member of our community',
    location: '',
    website: '',
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <ProfileHeader
        name={user.name}
        handle={user.handle}
        bio={user.bio}
        location={user.location}
        website={user.website}
        postsCount={user.postsCount}
        followersCount={user.followersCount}
        followingCount={user.followingCount}
        isOwnProfile={false}
        isFollowing={false}
      />
      <ProfileTabs handle={user.handle} />
    </div>
  )
}
