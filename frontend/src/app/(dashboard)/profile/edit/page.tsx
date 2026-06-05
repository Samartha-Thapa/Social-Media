'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Camera } from 'lucide-react'

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    handle: 'johndoe',
    bio: 'Passionate developer building amazing products. Coffee enthusiast ☕',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In a real app, this would submit to the backend
    router.push('/profile')
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
                <span className="sr-only">Go back</span>
              </Button>
            </Link>
            <p className="font-bold text-lg">Edit Profile</p>
          </div>
          <Button onClick={handleSave} className="font-semibold">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {/* Profile Picture */}
          <Card className="border border-border bg-card p-6 space-y-4">
            <h2 className="font-bold text-lg">Profile Picture</h2>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <Button variant="outline" className="border-border">
                Change Picture
              </Button>
            </div>
          </Card>

          {/* Basic Info */}
          <Card className="border border-border bg-card p-6 space-y-4">
            <h2 className="font-bold text-lg">Basic Information</h2>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="handle" className="text-sm font-medium">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                  <Input
                    id="handle"
                    name="handle"
                    value={formData.handle}
                    onChange={handleChange}
                    className="bg-background border-border pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell people about yourself"
                  className="bg-background border-border resize-none"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">{formData.bio.length}/160 characters</p>
              </div>
            </div>
          </Card>

          {/* Additional Info */}
          <Card className="border border-border bg-card p-6 space-y-4">
            <h2 className="font-bold text-lg">Additional Information</h2>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="website" className="text-sm font-medium">
                  Website
                </label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="bg-background border-border"
                />
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Link href="/profile" className="flex-1">
              <Button variant="outline" className="w-full border-border">
                Cancel
              </Button>
            </Link>
            <Button onClick={handleSave} className="flex-1 font-semibold">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
