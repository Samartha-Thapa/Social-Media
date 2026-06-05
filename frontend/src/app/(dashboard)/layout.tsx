import { Metadata } from "next"
import { Header } from "@/components/navigation/header";
import { Sidebar } from "@/components/navigation/sidebar";
import { BottomNav } from "@/components/navigation/bottom-nav";

export const metadata: Metadata = {
  title: 'SocialHub - Connect & Share',
  description: 'A modern social media platform to connect with friends and share your moments',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function dashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main>
            <Header />
            <div className="flex min-h-screen">
            <Sidebar />
                <main className="flex-1 lg:ml-64">
                    {children}
                </main>
              </div>
              <BottomNav />
            </main>
    )
}