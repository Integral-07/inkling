import { useRef, useState, useEffect } from 'react'
import type { Article } from '@inking/shared-types'
import { SelectionPopover } from './SelectionPopover'

interface ActiveSelection {
  text: string
  rect: DOMRect
  contextQuote?: string
}

function extractContextSentence(range: Range, selectedText: string): string | undefined {
  const startNode = range.startContainer
  const container = startNode.nodeType === Node.TEXT_NODE ? startNode.parentElement : (startNode as Element)
  const block = container?.closest('p, li, blockquote, h1, h2, h3, h4, h5, h6')
  const fullText = block?.textContent?.trim()
  if (!fullText) return undefined

  const sentences = fullText.split(/(?<=[.!?])\s+/)
  return sentences.find((s) => s.includes(selectedText)) ?? fullText.slice(0, 200)
}

interface ArticleContentProps {
  article: Article
  onSaved?: () => void
}



// article.content is sanitized server-side in api/src/lib/readabilityExtractor.ts
// before it's ever stored, so it's safe to render as-is here.
export function ArticleContent({ article, onSaved }: ArticleContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selection, setSelection] = useState<ActiveSelection | null>(null)
  const isPointerDownRef = useRef(false)

  function readSelection() {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      setSelection(null)
      return
    }

    const text = sel.toString().trim()
    if (!text) {
      setSelection(null)
      return
    }

    const range = sel.getRangeAt(0)
    if (!containerRef.current?.contains(range.commonAncestorContainer)) {
      setSelection(null)
      return
    }

    setSelection({
      text,
      rect: range.getBoundingClientRect(),
      contextQuote: extractContextSentence(range, text),
    })
  }

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    function handleSelectionChange() {
      // ドラッグ中(マウス押下中/指でハンドル操作中)は無視。
      // popoverが描画されると、ブラウザのネイティブ選択延長に
      // 巻き込まれて全文選択される事故を防ぐため。
      if (isPointerDownRef.current) return

      clearTimeout(timeoutId)
      timeoutId = setTimeout(readSelection, 150)
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
      clearTimeout(timeoutId)
    }
  }, [])

  function handlePointerDown() {
    isPointerDownRef.current = true
    setSelection(null)
  }

  function handleSelectionEnd() {
    isPointerDownRef.current = false
    readSelection()
  }

  function handlePointerCancel() {
    isPointerDownRef.current = false
    // cancel時は選択が確定しているとは限らないので、
    // 少し待ってから現在の選択状態を読みにいく
    setTimeout(readSelection, 0)
  }

  return (
    <>
      <div
        ref={containerRef}
        className="article-text"
        tabIndex={-1}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        onMouseUp={handleSelectionEnd}
        onTouchEnd={handleSelectionEnd}
        onTouchCancel={handlePointerCancel}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      {selection && (
        <SelectionPopover
          text={selection.text}
          rect={selection.rect}
          articleId={article.id}
          contextQuote={selection.contextQuote}
          onDismiss={() => setSelection(null)}
          onSaved={onSaved}
        />
      )}
    </>
  )
}
