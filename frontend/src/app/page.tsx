'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toogle'
import { Heart, MessageCircle, Share2, Zap } from 'lucide-react'

export default function Home() {
  return (
     <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">SH</span>
            </div>
            <span className="text-xl font-bold">SocialHub</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                Connect with your community
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Share your moments, connect with friends, and discover what&apos;s happening around the world in real-time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto text-base">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">100M+</div>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">1B+</div>
                <p className="text-sm text-muted-foreground">Daily Posts</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">50+</div>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
            </div>
          </div>

          {/* Visual Mockup */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full aspect-square">
              {/* Phone-like container */}
              <div className="absolute inset-0 bg-gradient-to-br from-card to-secondary rounded-3xl shadow-2xl border border-border overflow-hidden">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-background rounded-b-3xl z-10" />
                
                {/* Content inside phone */}
                <div className="pt-12 px-4 h-full bg-gradient-to-b from-card via-background to-card">
                  {/* Sample Post */}
                  <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20" />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-24 bg-muted rounded" />
                        <div className="h-2 w-16 bg-muted/50 rounded" />
                      </div>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="h-3 bg-muted rounded" />
                      <div className="h-3 bg-muted rounded w-5/6" />
                      <div className="h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>234</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>45</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="w-4 h-4" />
                        <span>12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Why choose SocialHub?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to stay connected with the people who matter most
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Connect', description: 'Find and follow people who share your interests' },
              { icon: Zap, title: 'Real-time Feed', description: 'See the latest updates as they happen' },
              { icon: MessageCircle, title: 'Chat & Messages', description: 'Private conversations with your friends' },
              { icon: Share2, title: 'Share Moments', description: 'Post photos, stories, and updates instantly' },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="bg-background border border-border rounded-lg p-6 space-y-3 hover:border-primary/50 transition-colors"
                >
                  <Icon className="w-8 h-8 text-primary" />
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to join the community?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start sharing, connecting, and making meaningful conversations today.
          </p>
        </div>
        <Link href="/register">
          <Button size="lg" className="text-base">
            Sign Up Now
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers'] },
              { title: 'Resources', links: ['Help', 'Community', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
            ].map((column, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-semibold">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">&copy; 2024 SocialHub. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {['Twitter', 'Facebook', 'Instagram'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-sm text-muted-foreground hover:foreground transition-colors"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
