'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Bell, Lock, Eye, Shield, Trash2 } from 'lucide-react'

const settings = [
  {
    category: 'Privacy & Safety',
    icon: Lock,
    items: [
      { label: 'Private Account', description: 'Only approved followers can see your posts' },
      { label: 'Allow Messages from Anyone', description: 'Control who can send you direct messages' },
      { label: 'Block List', description: 'Manage blocked users' },
    ],
  },
  {
    category: 'Notifications',
    icon: Bell,
    items: [
      { label: 'Email Notifications', description: 'Receive notifications via email' },
      { label: 'Push Notifications', description: 'Receive notifications on mobile' },
      { label: 'Notification Preferences', description: 'Customize what notifications you receive' },
    ],
  },
  {
    category: 'Display',
    icon: Eye,
    items: [
      { label: 'Dark Mode', description: 'Use dark theme across the app' },
      { label: 'Font Size', description: 'Adjust text size for readability' },
      { label: 'Content Language', description: 'Choose your preferred language' },
    ],
  },
  {
    category: 'Security',
    icon: Shield,
    items: [
      { label: 'Two-Factor Authentication', description: 'Add extra security to your account' },
      { label: 'Sessions', description: 'Manage active sessions and devices' },
      { label: 'Password', description: 'Change your account password' },
    ],
  },
]

export default function SettingsPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [toggledSettings, setToggledSettings] = useState<Record<string, boolean>>({
    'Private Account': false,
    'Allow Messages from Anyone': true,
    'Email Notifications': true,
    'Push Notifications': false,
    'Dark Mode': true,
  })

  const handleToggle = (label: string) => {
    setToggledSettings((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/home">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Go back</span>
            </Button>
          </Link>
          <p className="font-bold text-lg">Settings</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Account Section */}
        <Card className="border border-border bg-card p-6 space-y-4">
          <h2 className="font-bold text-lg">Account</h2>
          <div className="space-y-3">
            <Link href="/profile/edit">
              <Button variant="outline" className="w-full border-border justify-start">
                Edit Profile
              </Button>
            </Link>
            <Button variant="outline" className="w-full border-border justify-start">
              Change Email
            </Button>
            <Button variant="outline" className="w-full border-border justify-start">
              Change Password
            </Button>
          </div>
        </Card>

        {/* Settings Sections */}
        {settings.map((section) => {
          const Icon = section.icon
          const isExpanded = expandedCategory === section.category

          return (
            <Card key={section.category} className="border border-border bg-card overflow-hidden">
              <button
                onClick={() =>
                  setExpandedCategory(isExpanded ? null : section.category)
                }
                className="w-full p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <h2 className="font-bold text-lg">{section.category}</h2>
                </div>
                <span className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {isExpanded && (
                <div className="border-t border-border divide-y divide-border">
                  {section.items.map((item) => (
                    <div
                      key={item.label}
                      className="px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={toggledSettings[item.label] ?? false}
                          onChange={() => handleToggle(item.label)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )
        })}

        {/* Danger Zone */}
        <Card className="border border-destructive/30 bg-destructive/5 p-6 space-y-4">
          <h2 className="font-bold text-lg text-destructive">Danger Zone</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full border-destructive/30 justify-start text-destructive hover:bg-destructive/10">
              <Trash2 className="w-4 h-4 mr-2" />
              Download Your Data
            </Button>
            <Button variant="outline" className="w-full border-destructive/30 justify-start text-destructive hover:bg-destructive/10">
              <Trash2 className="w-4 h-4 mr-2" />
              Deactivate Account
            </Button>
            <Button variant="outline" className="w-full border-destructive/30 justify-start text-destructive hover:bg-destructive/10">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground space-y-2 py-8">
          <p>SocialHub v1.0.0</p>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:underline">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
