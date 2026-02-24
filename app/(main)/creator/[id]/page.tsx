import TemplateCard from '@/components/TemplateCard'

const creatorTemplates = [
  { id: '1', title: 'Executive Pro', creator: 'Sarah Chen', price: 24 as const, rating: 4.9 },
  { id: '7', title: 'Finance Analyst', creator: 'Sarah Chen', price: 22 as const, rating: 4.8 },
  { id: '8', title: 'Consulting Edge', creator: 'Sarah Chen', price: 28 as const, rating: 5.0 },
  { id: '9', title: 'C-Suite Classic', creator: 'Sarah Chen', price: 32 as const, rating: 4.9 },
]

export default function CreatorPage({ params }: { params: { id: string } }) {
  const creator = {
    id: params.id,
    name: 'Sarah Chen',
    tagline: 'Helping professionals stand out with clean, ATS-optimized resume designs.',
    location: 'San Francisco, CA',
    memberSince: 'March 2024',
    stats: { templates: 12, sales: 3400, rating: 4.9 },
  }

  return (
    <div style={{ backgroundColor: '#0A0A0B', minHeight: '100vh' }}>

      {/* Profile hero */}
      <div style={{ backgroundColor: '#111113', borderBottom: '1px solid #1F1F23', padding: '64px 80px' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              backgroundColor: '#FF5C0020',
              border: '2px solid #FF5C0040',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                fontSize: '36px',
                color: '#FF5C00',
              }}
            >
              {creator.name[0]}
            </span>
          </div>

          {/* Name, tagline, meta */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '240px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                fontSize: '32px',
                color: '#FFFFFF',
                fontWeight: '400',
                margin: '0',
              }}
            >
              {creator.name}
            </h1>
            <p
              style={{
                color: '#8B8B90',
                fontSize: '15px',
                margin: '0',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                maxWidth: '480px',
                lineHeight: '1.6',
              }}
            >
              {creator.tagline}
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '4px' }}>
              <span style={{ color: '#6B6B70', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                📍 {creator.location}
              </span>
              <span style={{ color: '#6B6B70', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Member since {creator.memberSince}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', flexShrink: 0 }}>
            {[
              { num: String(creator.stats.templates), label: 'Templates' },
              { num: creator.stats.sales.toLocaleString(), label: 'Sales' },
              { num: creator.stats.rating.toFixed(1) + ' ★', label: 'Rating' },
            ].map(({ num, label }, i) => (
              <div
                key={label}
                style={{
                  textAlign: 'center',
                  padding: '0 32px',
                  borderLeft: i > 0 ? '1px solid #1F1F23' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                    fontSize: '28px',
                    color: '#FFFFFF',
                    lineHeight: '1',
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    color: '#8B8B90',
                    fontSize: '12px',
                    marginTop: '6px',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Template grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 80px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: '28px',
              color: '#FFFFFF',
              fontWeight: '400',
              margin: '0',
            }}
          >
            Templates by {creator.name}
          </h2>
          <span style={{ color: '#8B8B90', fontSize: '14px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            {creatorTemplates.length} templates
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {creatorTemplates.map((t) => (
            <TemplateCard key={t.id} {...t} />
          ))}
        </div>
      </div>
    </div>
  )
}
