export interface SellerFormData {
  // Step 2
  displayName: string
  bio: string
  specialty: string
  avatar: File | null

  // Step 3
  portfolioUrl: string
  websiteUrl: string
  linkedinUrl: string
  dribbbleUrl: string

  // Step 4
  templateFile: File | null
  templateTitle: string
  templateDescription: string
  templatePrice: number
  templateCategory: string
}
