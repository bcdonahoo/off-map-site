import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | Off-Map',
  description:
    'Writing on GTM Engineering, AI-powered outbound, and the systems behind modern pipeline generation.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main
      className="min-h-screen pt-32 pb-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Eyebrow */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          Blog
        </p>

        {/* Headline */}
        <h1
          className="mb-16 text-4xl font-bold md:text-5xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          GTM Engineering, written down.
        </h1>

        {posts.length === 0 ? (
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="flex flex-col gap-10">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <div
                  className="rounded-2xl p-6 transition-all duration-200"
                  style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <p
                    className="mb-2 text-xs"
                    style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                  >
                    {post.date}
                  </p>
                  <h2
                    className="mb-2 text-xl font-bold transition-colors group-hover:opacity-80"
                    style={{
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {post.description}
                  </p>
                  <p
                    className="mt-4 text-xs font-semibold transition-opacity group-hover:opacity-70"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Read →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
