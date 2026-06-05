'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, UserPlus, Share2 } from 'lucide-react'
import Link from 'next/link'

const mockNotifications = [
  {
    id: '1',
    type: 'like',
    user: { name: 'Sarah Anderson', handle: 'sarahcodes', avatar: 'SA' },
    message: 'liked your post',
    timestamp: '2m ago',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    user: { name: 'Mike Johnson', handle: 'mikejohnson', avatar: 'MJ' },
    message: 'replied to your post',
    timestamp: '15m ago',
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    user: { name: 'Emma Wilson', handle: 'emmawilson', avatar: 'EW' },
    message: 'started following you',
    timestamp: '1h ago',
    read: false,
  },
  {
    id: '4',
    type: 'like',
    user: { name: 'Alex Chen', handle: 'alexchen', avatar: 'AC' },
    message: 'liked your post',
    timestamp: '3h ago',
    read: true,
  },
  {
    id: '5',
    type: 'share',
    user: { name: 'Jessica Lee', handle: 'jessicalee', avatar: 'JL' },
    message: 'shared your post',
    timestamp: '5h ago',
    read: true,
  },
  {
    id: '6',
    type: 'follow',
    user: { name: 'David Brown', handle: 'davidbrown', avatar: 'DB' },
    message: 'started following you',
    timestamp: '1d ago',
    read: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like':
      return <Heart className="w-5 h-5 text-accent" />
    case 'comment':
      return <MessageCircle className="w-5 h-5 text-primary" />
    case 'follow':
      return <UserPlus className="w-5 h-5 text-primary" />
    case 'share':
      return <Share2 className="w-5 h-5 text-primary" />
    default:
      return null
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Notifications</h2>
            {unreadCount > 0 && <p className="text-xs text-muted-foreground">{unreadCount} unread</p>}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} className="text-primary">
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-2xl mx-auto">
        {notifications.length > 0 ? (
          <div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-b border-border px-4 sm:px-6 py-4 hover:bg-secondary/30 transition-colors cursor-pointer group ${
                  !notification.read ? 'bg-primary/5' : ''
                }`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/profile/${notification.user.handle}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p className="font-semibold hover:underline">
                            {notification.user.name}
                          </p>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        {!notification.read && (
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(notification.id)
                          }}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
