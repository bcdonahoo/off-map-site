import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPost } from '@/lib/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Off-Map`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) notFound()

  return (
    <main
      className="min-h-screen pt-32 pb-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-2xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-10 inline-block text-xs transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-text-muted)' }}
        >
          ← All posts
        </Link>

        {/* Meta */}
        <p
          className="mb-3 text-xs"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace' }}
        >
          {post.date}
          {post.author ? ` · ${post.author}` : ''}
        </p>

        {/* Title */}
        <h1
          className="mb-10 text-3xl font-bold leading-tight md:text-4xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {post.title}
        </h1>

        {/* MDX content */}
        <div
          className="prose prose-sm max-w-none"
          style={
            {
              '--tw-prose-body': 'var(--color-text-muted)',
              '--tw-prose-headings': 'var(--color-text-primary)',
              '--tw-prose-links': 'var(--color-accent)',
              '--tw-prose-bold': 'var(--color-text-primary)',
              '--tw-prose-counters': 'var(--color-text-muted)',
              '--tw-prose-bullets': 'var(--color-accent)',
              '--tw-prose-code': 'var(--color-text-primary)',
            } as React.CSSProperties
          }
        >
          <MDXRemote source={post.content} />
        </div>
      </div>
    </main>
  )
}
