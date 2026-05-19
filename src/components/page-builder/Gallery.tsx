'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

interface GalleryProps {
  photos: string[]
  supabaseUrl: string
}

function getImageUrl(path: string, supabaseUrl: string): string {
  if (path.startsWith('/') || path.startsWith('http')) return path
  return `${supabaseUrl}/storage/v1/object/public/pages/${path}`
}

// Deterministic scatter — slight tilt per polaroid for a hand-placed look
const TILTS = [-4, 3, -2, 4.5, -3.2, 2.4, -1.6, 3.6, -4.4, 1.8]

export default function Gallery({ photos, supabaseUrl }: GalleryProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (photos.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let ctx: any

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      ctx = gsap.context(() => {
        // --- Header reveal ---
        if (headingRef.current) {
          gsap.from(headingRef.current, {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 90%',
            },
          })
        }

        // --- Horizontal scroll ---
        const cards = gsap.utils.toArray<HTMLElement>('.gallery-card')
        if (cards.length === 0) return

        // Calculate total scroll distance
        const getScrollAmount = () => {
          return track.scrollWidth - window.innerWidth
        }

        // Main horizontal scroll animation
        const horizontalScroll = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })

        // --- Individual card animations ---
        cards.forEach((card, i) => {
          const img = card.querySelector('.gallery-card-img') as HTMLElement
          const overlay = card.querySelector('.gallery-card-overlay') as HTMLElement
          const caption = card.querySelector('.gallery-card-caption') as HTMLElement

          // Parallax on images — inner image moves slower than container
          // Start shifted right, end shifted left so the subject stays centered at midpoint
          if (img) {
            gsap.fromTo(
              img,
              { xPercent: 4 },
              {
                xPercent: -4,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalScroll,
                  start: 'left right',
                  end: 'right left',
                  scrub: true,
                },
              }
            )
          }

          // Fade overlay based on distance from center
          if (overlay) {
            gsap.fromTo(
              overlay,
              { opacity: 0.5 },
              {
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalScroll,
                  start: 'left 80%',
                  end: 'left 50%',
                  scrub: true,
                },
              }
            )

            // Bring overlay back as card exits
            gsap.to(overlay, {
              opacity: 0.5,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScroll,
                start: 'right 50%',
                end: 'right 20%',
                scrub: true,
              },
            })
          }

          // Scale-up entrance
          gsap.fromTo(
            card,
            { scale: 0.85, rotateY: 4 },
            {
              scale: 1,
              rotateY: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScroll,
                start: 'left 90%',
                end: 'left 55%',
                scrub: true,
              },
            }
          )

          // Scale-down exit
          gsap.to(card, {
            scale: 0.85,
            rotateY: -4,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalScroll,
              start: 'right 45%',
              end: 'right 10%',
              scrub: true,
            },
          })

          // Caption slide up
          if (caption) {
            gsap.fromTo(
              caption,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalScroll,
                  start: 'left 65%',
                  end: 'left 40%',
                  scrub: true,
                },
              }
            )
          }
        })

        // --- Floating counter indicator ---
        const counter = section.querySelector('.gallery-counter') as HTMLElement
        if (counter) {
          const totalSpan = counter.querySelector('.gallery-total')
          const currentSpan = counter.querySelector('.gallery-current')
          if (totalSpan) totalSpan.textContent = String(cards.length)

          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            scrub: true,
            onUpdate: (self) => {
              const idx = Math.round(self.progress * (cards.length - 1)) + 1
              if (currentSpan) currentSpan.textContent = String(idx)
            },
          })
        }

        // --- Progress bar ---
        const progressBar = section.querySelector('.gallery-progress-fill') as HTMLElement
        if (progressBar) {
          gsap.to(progressBar, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${getScrollAmount()}`,
              scrub: true,
            },
          })
        }
      }, section)
    }

    init()

    return () => {
      ctx?.revert()
    }
  }, [photos.length])

  if (photos.length === 0) return null

  return (
    <section
      ref={sectionRef}
      className="gallery-section relative overflow-hidden"
      style={{
        background: 'var(--color-light)',
      }}
    >
      {/* Heading — visible before pin starts */}
      <div
        ref={headingRef}
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none flex flex-col items-center"
        style={{
          paddingTop: 'clamp(32px, 5vw, 60px)',
        }}
      >
        <p className="font-sans text-[0.65rem] tracking-[0.4em] uppercase text-mauve text-center mb-3">
          Um álbum
        </p>
        <h2
          className="font-serif font-light italic text-wine text-center"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
        >
          Momentos nossos
        </h2>
      </div>

      {/* Counter indicator */}
      <div className="gallery-counter absolute top-6 right-6 z-20 font-sans text-[0.7rem] tracking-[0.15em] text-mauve opacity-60">
        <span className="gallery-current font-serif text-wine text-base">1</span>
        <span className="mx-1">/</span>
        <span className="gallery-total">{photos.length}</span>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex items-center gap-[clamp(20px,4vw,48px)] h-svh will-change-transform"
        style={{
          paddingLeft: 'clamp(60px, 12vw, 180px)',
          paddingRight: 'clamp(60px, 12vw, 180px)',
          perspective: '1200px',
        }}
      >
        {photos.map((path, i) => (
          <div
            key={i}
            className="gallery-card flex-shrink-0 will-change-transform"
            style={{
              width: 'clamp(280px, 80vw, 420px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Polaroid frame — static tilt on inner so GSAP keeps the outer */}
            <div
              className="relative bg-white"
              style={{
                transform: `rotate(${TILTS[i % TILTS.length]}deg)`,
                padding: '16px 16px 0',
                borderRadius: '2px',
                boxShadow:
                  '0 20px 44px rgba(26,22,20,0.30), 0 4px 14px rgba(26,22,20,0.18)',
              }}
            >
              {/* Photo window with overflow for parallax */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '4 / 5', background: '#ece6dd' }}
              >
                <Image
                  src={getImageUrl(path, supabaseUrl)}
                  alt={`Foto ${i + 1}`}
                  width={800}
                  height={1000}
                  quality={90}
                  className="gallery-card-img w-[112%] h-full object-cover object-[center_30%] block will-change-transform"
                  style={{ marginLeft: '-6%' }}
                />
                {/* Soft inner shadow on the print */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 36px rgba(0,0,0,0.14)' }}
                />
              </div>

              {/* Handwritten caption strip */}
              <div
                className="gallery-card-caption flex items-center justify-center"
                style={{ height: 'clamp(52px, 7vh, 74px)' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-handwritten)',
                    fontSize: '1.6rem',
                    lineHeight: 1,
                    color: 'var(--color-wine)',
                  }}
                >
                  nº {i + 1}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar at the bottom */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 rounded-full overflow-hidden"
        style={{
          width: 'clamp(100px, 30vw, 200px)',
          height: '2px',
          background: 'var(--color-rose)',
          opacity: 0.5,
        }}
      >
        <div
          className="gallery-progress-fill h-full origin-left rounded-full"
          style={{
            background: 'var(--color-wine)',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </section>
  )
}
