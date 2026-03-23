export interface Template {
  id: string
  title: string
  creator: string
  creatorId: string
  price: number | 'free'
  rating: number
  reviewCount?: number
  category?: string
}

export const templates: Template[] = [
  { id: '1', title: 'Executive Pro', creator: 'Sarah Chen', creatorId: '1', price: 24, rating: 4.9, reviewCount: 128, category: 'Technology' },
  { id: '2', title: 'Minimal Dark', creator: 'James Park', creatorId: '2', price: 18, rating: 4.7, reviewCount: 94, category: 'Design' },
  { id: '3', title: 'Creative Portfolio', creator: 'Mia Torres', creatorId: '3', price: 29, rating: 5.0, reviewCount: 67, category: 'Design' },
  { id: '4', title: 'Clean Modern', creator: 'Aria Lee', creatorId: '4', price: 22, rating: 4.8, reviewCount: 112, category: 'Business' },
  { id: '5', title: 'Academic Scholar', creator: 'Tom Walsh', creatorId: '5', price: 'free', rating: 4.6, reviewCount: 203, category: 'Academic' },
  { id: '6', title: 'Tech Startup', creator: 'Nina Patel', creatorId: '6', price: 26, rating: 4.9, reviewCount: 85, category: 'Technology' },
]

export function getTemplateById(id: string): Template | undefined {
  return templates.find(t => t.id === id)
}
