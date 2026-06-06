'use client'

import { useState, useCallback } from 'react'
import { ChatPanel } from './chat-panel'
import { ArtifactPane } from './artifact-pane'
import {
  WELCOME_MESSAGE,
  SUGGESTED_PROMPTS,
  MOCK_RESPONSES,
  FALLBACK_RESPONSE,
  type Message,
  type PanelId,
} from './mock-responses'

// Ordered from most specific to least specific to avoid false matches
const KEYWORD_MAP: Array<{ keywords: string[]; panelId: PanelId }> = [
  {
    keywords: ['audit', '350', 'brief', '60 min', 'deliverable', 'follow-up', 'week 2'],
    panelId: 3,
  },
  {
    keywords: ['who do you', 'work with', 'ideal client', 'icp', 'series a', 'seed', '$250k'],
    panelId: 2,
  },
  {
    keywords: ['fractional', 'cro', 'different', 'compare', 'retainer', 'sprint', 'services', 'pricing', 'how much', 'cost'],
    panelId: 1,
  },
  {
    keywords: ['what do you do', 'what is off-map', 'what is off map', 'tell me about', 'explain'],
    panelId: 0,
  },
]

function inferPanel(text: string): PanelId | undefined {
  const lower = text.toLowerCase()
  for (const { keywords, panelId } of KEYWORD_MAP) {
    if (keywords.some((k) => lower.includes(k))) return panelId
  }
  return undefined
}

export function OptionCLayout() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [activePanel, setActivePanel] = useState<PanelId>(
    SUGGESTED_PROMPTS[0].panelId
  )
  const [isIdle, setIsIdle] = useState(true)

  // TODO Phase 2: replace mock implementation with real Claude API call
  const sendMessage = useCallback((text: string, panelId?: PanelId) => {
    const visitorMessage: Message = {
      id: `visitor-${Date.now()}`,
      role: 'visitor',
      text,
    }
    setMessages((prev) => [...prev, visitorMessage])
    setIsIdle(false)

    // Drive artifact pane: prefer explicit panelId (from suggested prompt),
    // then keyword inference, then stay on current panel
    const targetPanel = panelId ?? inferPanel(text)
    if (targetPanel !== undefined) {
      setActivePanel(targetPanel)
    }

    const responseText = MOCK_RESPONSES[text] ?? FALLBACK_RESPONSE
    setTimeout(() => {
      const advisorMessage: Message = {
        id: `advisor-${Date.now()}`,
        role: 'advisor',
        text: responseText,
      }
      setMessages((prev) => [...prev, advisorMessage])
    }, 800)
  }, [])

  const handlePanelChange = useCallback((panel: PanelId) => {
    setActivePanel(panel)
  }, [])

  return (
    /*
     * Desktop: side-by-side, chat 45% / artifact 55%, full viewport height minus nav
     * Mobile: stacked, artifact on top (~40vh), chat below filling remaining space
     */
    <div
      className="flex flex-col md:flex-row"
      style={{ height: 'calc(100svh - 64px)', marginTop: '64px' }}
    >
      {/* Artifact pane — top on mobile (40vh), right on desktop (stretches to full flex height) */}
      <div className="order-1 h-[40vh] shrink-0 md:order-2 md:h-auto md:flex-1">
        <div className="h-full">
          <ArtifactPane
            activePanel={activePanel}
            isPaused={!isIdle}
            onPanelChange={handlePanelChange}
          />
        </div>
      </div>

      {/* Chat panel — bottom on mobile, left on desktop */}
      <div className="order-2 min-h-0 flex-1 md:order-1 md:flex-none md:w-[45%]">
        <ChatPanel
          messages={messages}
          suggestedPrompts={SUGGESTED_PROMPTS}
          onSendMessage={sendMessage}
        />
      </div>
    </div>
  )
}
