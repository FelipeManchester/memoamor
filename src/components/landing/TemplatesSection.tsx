'use client'

export default function TemplatesSection() {
  const templates = [
    {
      id: 'petals',
      name: 'Pétalas',
      description: 'Romântico e delicado',
      mood: 'Para quem ama o clássico',
      colors: ['#f0d4ca', '#e8c4b8', '#c49a8a'],
    },
    {
      id: 'hearts',
      name: 'Corações',
      description: 'Apaixonado e caloroso',
      mood: 'Para quem ama com intensidade',
      colors: ['#e8c4b8', '#d4a898', '#c49a8a'],
    },
    {
      id: 'constellations',
      name: 'Constelações',
      description: 'Poético e etéreo',
      mood: 'Para quem ama de forma única',
      colors: ['#2d1515', '#4a2020', '#7a3f3f'],
    },
  ]

  return (
    <section
      style={{
        background: 'var(--color-light)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vw, 72px)' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'var(--color-mauve)',
              marginBottom: 16,
            }}
          >
            Três temas exclusivos
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-wine)',
              marginBottom: 16,
            }}
          >
            Escolha o clima da sua história
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              maxWidth: '48ch',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Cada tema tem animações únicas que se revelam conforme o scroll. O conteúdo é sempre o
            mesmo — só o clima muda.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {templates.map((template) => (
            <a
              key={template.id}
              href={`/demo?template=${template.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                display: 'block',
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid var(--color-rose)',
                background: 'white',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(122, 63, 63, 0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Preview visual do tema */}
              <div
                style={{
                  height: 200,
                  background:
                    template.id === 'constellations'
                      ? 'linear-gradient(135deg, #1a0f0f 0%, #2d1515 100%)'
                      : `linear-gradient(135deg, ${template.colors[0]} 0%, ${template.colors[1]} 100%)`,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Elementos decorativos de cada tema */}
                {template.id === 'petals' && <PetalPreview />}
                {template.id === 'hearts' && <HeartPreview />}
                {template.id === 'constellations' && <ConstellationPreview />}

                {/* Badge "Ver ao vivo" */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: 100,
                    padding: '4px 12px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-wine)',
                  }}
                >
                  Ver ao vivo ↗
                </div>
              </div>

              {/* Info do template */}
              <div style={{ padding: '20px 24px 24px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: 'var(--color-wine)',
                    marginBottom: 6,
                  }}
                >
                  {template.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.78rem',
                    color: 'var(--color-mauve)',
                    marginBottom: 8,
                    letterSpacing: '0.05em',
                  }}
                >
                  {template.description}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.6,
                    borderTop: '1px solid var(--color-blush)',
                    paddingTop: 12,
                    marginTop: 4,
                  }}
                >
                  {template.mood}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Rodapé da seção */}
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            color: 'var(--color-mauve)',
            marginTop: 40,
          }}
        >
          Clique em qualquer tema para ver a página completa ao vivo ↑
        </p>
      </div>
    </section>
  )
}

// ── Previews decorativos de cada tema ─────────

function PetalPreview() {
  const petals = [
    { x: 20, y: 30, r: 12, opacity: 0.3 },
    { x: 60, y: 50, r: 18, opacity: 0.2 },
    { x: 80, y: 20, r: 10, opacity: 0.25 },
    { x: 40, y: 70, r: 14, opacity: 0.2 },
    { x: 70, y: 75, r: 8, opacity: 0.3 },
    { x: 15, y: 65, r: 16, opacity: 0.15 },
  ]

  return (
    <svg
      viewBox="0 0 100 100"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      {petals.map((p, i) => (
        <ellipse
          key={i}
          cx={p.x}
          cy={p.y}
          rx={p.r * 0.4}
          ry={p.r}
          fill="#c49a8a"
          opacity={p.opacity}
          transform={`rotate(${i * 40} ${p.x} ${p.y})`}
        />
      ))}
      <text
        x="50"
        y="55"
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        fontSize="14"
        fill="#7a3f3f"
        opacity="0.6"
      >
        Pétalas
      </text>
    </svg>
  )
}

function HeartPreview() {
  const hearts = [
    { x: 25, y: 35, size: 14, opacity: 0.25 },
    { x: 65, y: 25, size: 10, opacity: 0.2 },
    { x: 75, y: 60, size: 18, opacity: 0.15 },
    { x: 35, y: 65, size: 12, opacity: 0.2 },
    { x: 50, y: 45, size: 8, opacity: 0.3 },
  ]

  return (
    <svg
      viewBox="0 0 100 100"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      {hearts.map((h, i) => {
        const s = h.size * 0.4
        return (
          <path
            key={i}
            d={`M${h.x},${h.y + s * 0.4} C${h.x},${h.y - s * 0.2} ${h.x - s},${h.y - s * 0.2} ${h.x - s},${h.y + s * 0.4} C${h.x - s},${h.y + s * 0.9} ${h.x},${h.y + s * 1.4} ${h.x},${h.y + s * 1.8} C${h.x},${h.y + s * 1.4} ${h.x + s},${h.y + s * 0.9} ${h.x + s},${h.y + s * 0.4} C${h.x + s},${h.y - s * 0.2} ${h.x},${h.y - s * 0.2} ${h.x},${h.y + s * 0.4}Z`}
            fill="#c49a8a"
            opacity={h.opacity}
          />
        )
      })}
      <text
        x="50"
        y="55"
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        fontSize="14"
        fill="#7a3f3f"
        opacity="0.6"
      >
        Corações
      </text>
    </svg>
  )
}

function ConstellationPreview() {
  const stars = [
    { x: 20, y: 25 },
    { x: 45, y: 15 },
    { x: 70, y: 30 },
    { x: 85, y: 60 },
    { x: 60, y: 70 },
    { x: 30, y: 75 },
    { x: 15, y: 55 },
    { x: 50, y: 45 },
  ]

  const lines = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 0],
    [7, 1],
    [7, 4],
  ]

  return (
    <svg
      viewBox="0 0 100 100"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      {lines.map(([a, b], i) => (
        <line
          key={i}
          x1={stars[a].x}
          y1={stars[a].y}
          x2={stars[b].x}
          y2={stars[b].y}
          stroke="#e8c4b8"
          strokeWidth="0.5"
          opacity="0.3"
        />
      ))}
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={i === 7 ? 1.5 : 1}
          fill="#e8c4b8"
          opacity={i === 7 ? 0.9 : 0.6}
        />
      ))}
      <text
        x="50"
        y="92"
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        fontSize="10"
        fill="#e8c4b8"
        opacity="0.7"
      >
        Constelações
      </text>
    </svg>
  )
}
