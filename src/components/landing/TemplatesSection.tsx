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
      id="templates"
      className="bg-light relative overflow-hidden"
      style={{ padding: 'clamp(48px, 12vw, 140px) 0' }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 xl:px-20">
        {/* Cabeçalho */}
        <div
          className="text-center"
          style={{ marginBottom: 'clamp(48px, 8vw, 72px)' }}
        >
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-4">
            Três temas exclusivos
          </p>
          <h2
            className="font-serif font-light italic text-wine mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Escolha o clima da sua história
          </h2>
          <p
            className="font-sans text-[0.95rem] text-text-muted mx-auto leading-[1.8]"
            style={{ maxWidth: '48ch' }}
          >
            Cada tema tem animações únicas que se revelam conforme o scroll. O conteúdo é sempre o
            mesmo, só o clima muda.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <a
              key={template.id}
              href={`/demo?template=${template.id}`}
              className="no-underline block rounded-lg overflow-hidden border border-rose bg-white transition-[transform,box-shadow] duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(122,63,63,0.12)]"
            >
              {/* Preview visual do tema */}
              <div
                className="h-[200px] relative overflow-hidden flex items-center justify-center"
                style={{
                  background:
                    template.id === 'constellations'
                      ? 'linear-gradient(135deg, #1a0f0f 0%, #2d1515 100%)'
                      : `linear-gradient(135deg, ${template.colors[0]} 0%, ${template.colors[1]} 100%)`,
                }}
              >
                {template.id === 'petals' && <PetalPreview />}
                {template.id === 'hearts' && <HeartPreview />}
                {template.id === 'constellations' && <ConstellationPreview />}

                {/* Badge "Ver ao vivo" */}
                <div className="absolute bottom-3 right-3 bg-white/90 rounded-full py-1 px-3 font-sans text-[0.6rem] tracking-[0.15em] uppercase text-wine">
                  Ver ao vivo →
                </div>
              </div>

              {/* Info do template */}
              <div className="py-5 px-6 pb-6">
                <h3 className="font-serif text-[1.4rem] italic font-light text-wine mb-1.5">
                  {template.name}
                </h3>
                <p className="font-sans text-[0.78rem] text-mauve mb-2 tracking-[0.05em]">
                  {template.description}
                </p>
                <p className="font-sans text-[0.75rem] text-text-muted leading-[1.6] border-t border-blush pt-3 mt-1">
                  {template.mood}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Rodapé da seção */}
        <p className="text-center font-sans text-[0.78rem] text-mauve mt-10">
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
      className="absolute inset-0 w-full h-full"
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
      className="absolute inset-0 w-full h-full"
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
      className="absolute inset-0 w-full h-full"
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
