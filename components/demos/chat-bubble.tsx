import React from 'react'

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 h-5 px-1">
      <style>{`
        @keyframes klg-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="block w-1.5 h-1.5 rounded-full"
          style={{
            background: 'var(--color-text-muted)',
            animation: `klg-bounce 1.2s ease-in-out ${delay}ms infinite`,
          }}
        />
      ))}
    </div>
  )
}

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  )
}

function ContentRenderer({ content }: { content: string }) {
  const lines = content.split('\n')
  const nodes: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (!line) {
      nodes.push(<div key={i} className="h-2" />)
    } else {
      nodes.push(
        <p key={i} className={nodes.length > 0 ? 'mt-1.5' : ''}>
          <InlineText text={line} />
        </p>
      )
    }
    i++
  }

  return <>{nodes}</>
}

type ChatBubbleProps = {
  role: 'user' | 'assistant'
  content: string
  isTyping?: boolean
}

export function ChatBubble({ role, content, isTyping }: ChatBubbleProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end px-4">
        <div
          className="max-w-[75%] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed"
          style={{ background: 'var(--color-accent)', color: '#fff' }}
        >
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 px-4">
      <div
        className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-[10px] font-bold tracking-tight mt-0.5"
        style={{
          background: 'var(--color-accent)',
          color: '#fff',
        }}
      >
        KLG
      </div>
      <div
        className="max-w-[80%] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed"
        style={{
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-primary)',
        }}
      >
        {isTyping ? <TypingIndicator /> : <ContentRenderer content={content} />}
      </div>
    </div>
  )
}
