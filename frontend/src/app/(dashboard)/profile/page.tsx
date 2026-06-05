'use client'

import { fetchUserData } from '@/app/api/api';
import { ProfileHeader } from '@/components/profile/profile-header'
import { ProfileTabs } from '@/components/profile/profile-tabs'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
      setLoading(true)
      const data = await fetchUserData();
      if(data && data.user) {
        setUser(data.user);
      }
    }
   catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
  }
  fetchData();
}, []);
if(loading) return <div className="p-4 text-center">Loading profile...</div>
if(!user) return <div className="p-4 text-center">User session not found</div>
  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <ProfileHeader
        name={user.name}
        handle={user.username}
        bio={user.bio || "No bio added yet."}
        location={user.location || "unknown location."}
        website={user.website || ""}
        postsCount={3}
        followersCount={1234}
        followingCount={567}
        isOwnProfile={true}
      />
      <ProfileTabs handle={user.username} />
    </div>
  )
}
