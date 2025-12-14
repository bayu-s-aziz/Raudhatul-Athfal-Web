# Design Guidelines: RA Al-Islam School Website

## Design Approach
**Reference-Based with Cultural Adaptation**: Drawing from modern educational institutions (Montessori schools, Islamic educational centers) combined with warm, trust-building design patterns. The design will honor Islamic aesthetic principles while maintaining contemporary web standards.

## Brand Integration
**Color Foundation**: The school's green and gold/yellow identity will anchor the entire design system, establishing institutional trust and Islamic heritage.

## Typography System
- **Primary Font**: Poppins (Google Fonts) - Clean, modern, highly legible for Indonesian text
- **Arabic/Islamic Accent**: Amiri or Scheherazade (for Quranic verses or Islamic phrases)
- **Hierarchy**: 
  - Hero headlines: text-4xl to text-6xl, font-semibold
  - Section titles: text-3xl, font-semibold
  - Body text: text-base to text-lg, font-normal
  - Small print: text-sm

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, and 20 for consistent rhythm (p-4, mt-8, py-12, etc.)
- Section padding: py-16 (mobile), py-20 (desktop)
- Component spacing: gap-6 to gap-8
- Container max-width: max-w-7xl with px-4 to px-8

## Component Library

**Navigation**
- Fixed header with logo (left), navigation links (center/right)
- Mobile: Hamburger menu with full-screen overlay
- Include language toggle (Indonesian/English) if needed

**Hero Section**
- Large hero image showing happy children in Islamic learning environment
- Overlay with school logo, name "Raudhatul Athfal Al-Islam", and tagline
- Prominent CTA button: "Daftar Sekarang" (Register Now) with blurred background
- Subtle Islamic geometric pattern overlay (15% opacity)

**Features Grid**
- 3-column layout (desktop) showcasing: Pendidikan Islami, Kurikulum Nasional, Fasilitas Lengkap
- Each card with icon, title, and brief description
- Rounded corners, subtle shadows

**Program Section**
- 2-column layout alternating image-text showcasing different programs
- Images of children in various activities (learning, playing, religious activities)

**Gallery**
- Masonry grid layout (Pinterest-style) or 3-4 column photo grid
- Images of school facilities, student activities, celebrations

**Testimonials**
- 2-column cards with parent testimonials
- Include parent name and student class
- Subtle quotation mark design element

**Contact Section**
- 2-column split: Left (contact form), Right (school information)
- Display complete address: Dusun Sirnagalih, Kecamatan Sindangkasih, Kabupaten Ciamis, Jawa Barat 46268
- Include map embed, phone, email, social media links

**Footer**
- 3-column layout: About, Quick Links, Contact Info
- School logo and brief description
- Social media icons
- Copyright and accreditation information

## Images Required

1. **Hero Image**: Wide shot of school building exterior or children in classroom wearing hijab/Islamic dress, warm natural lighting
2. **Program Images**: 4-6 photos showing different activities (Quran reading, play time, creative activities, outdoor learning)
3. **Facility Images**: Classroom, playground, prayer room, library
4. **Gallery**: 12-15 candid photos of school life and events
5. **Background Elements**: Subtle Islamic geometric patterns for section dividers

## Design Elements

**Islamic Aesthetic Touches**
- Subtle geometric patterns as section backgrounds or dividers (low opacity)
- Rounded arch shapes in headers or image frames (reminiscent of mosque architecture)
- Decorative Arabic calligraphy elements (non-obtrusive)

**Visual Hierarchy**
- Clear separation between sections using whitespace and subtle backgrounds
- Consistent card-based layouts for content modules
- Strategic use of the brand colors for CTAs and accents

**Trust Indicators**
- Accreditation badges/certifications
- Years of operation
- Student count or success metrics
- Teacher credentials section

## Accessibility
- High contrast text on backgrounds
- Form labels clearly associated with inputs
- Alt text for all images
- Keyboard navigation support
- ARIA labels for interactive elements

## Animations
Minimal and purposeful:
- Smooth scroll between sections
- Gentle fade-in on scroll for content blocks
- Hover lift effect on cards (subtle)

**Note**: Create a warm, welcoming, and professional design that reassures parents while celebrating the Islamic educational mission. The website should feel both modern and culturally grounded.