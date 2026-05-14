'use client'

import Link from 'next/link'

interface Props {
  href: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  nextLink?: boolean
}

export default function FloatingHeartButton({ href, children, className, style, nextLink = false }: Props) {
  function spawnHeart(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = e.currentTarget
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const heart = document.createElement('span')
    heart.textContent = '♡'
    heart.style.cssText =
      'position:absolute;top:-2px;right:10px;font-size:11px;color:#e8c4b8;' +
      'pointer-events:none;animation:heartFloat 1.5s ease-out forwards;z-index:10;line-height:1;'
    el.style.position = 'relative'
    el.appendChild(heart)
    setTimeout(() => { if (el.contains(heart)) el.removeChild(heart) }, 1600)
  }

  if (nextLink) {
    return (
      <Link href={href} className={className} style={style} onMouseEnter={spawnHeart}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className} style={style} onMouseEnter={spawnHeart}>
      {children}
    </a>
  )
}
