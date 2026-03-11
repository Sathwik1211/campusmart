import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding blog categories and posts...');

  // Create Categories
  const categoriesData = [
    { name: 'Campus Design', slug: 'campus-design' },
    { name: 'Technology', slug: 'technology' },
    { name: 'Pedagogy', slug: 'pedagogy' },
    { name: 'Infrastructure', slug: 'infrastructure' },
    { name: 'Success Stories', slug: 'success-stories' },
  ];

  const createdCategories = [];
  for (const cat of categoriesData) {
    const existing = await prisma.blogCategory.findUnique({ where: { slug: cat.slug } });
    if (!existing) {
      const created = await prisma.blogCategory.create({ data: cat });
      createdCategories.push(created);
    } else {
      createdCategories.push(existing);
    }
  }

  console.log('Categories seeded:', createdCategories.length);

  // Helper to get category ID by slug
  const getCatId = (slug: string) => createdCategories.find(c => c.slug === slug)?.id || undefined;

  // Create Blog Posts
  const blogPostsData = [
    {
      title: 'Data-Driven Campus Security',
      slug: 'data-driven-campus-security-' + Date.now().toString(),
      excerpt: 'Moving from reactive security cameras to proactive, AI-driven digital sentinels.',
      body: '<p>The modern campus requires more than just passive recording. By using AI over existing CCTV infrastructure, schools can instantly detect anomalies, perimeter breaches, and unusual crowding without constant human monitoring. This shift from reactive to proactive security is the core of our tech-driven campus promise.</p>',
      imageUrl: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=800&q=80',
      published: true,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
      categoryId: getCatId('technology'),
    },
    {
      title: 'The Role of Technology in Special Education',
      slug: 'technology-special-education-' + Date.now().toString(),
      excerpt: 'Leveraging accessible hardware and adaptive software for inclusive learning environments.',
      body: '<p>Every student deserves an equal opportunity to learn. Modern classroom technology, including adaptive keyboards, text-to-speech AI modules, and custom sensory furniture, bridges the gap. By equipping resource rooms with state-of-the-art tools, educational institutions can foster truly inclusive ecosystems.</p>',
      imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80',
      published: true,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      categoryId: getCatId('pedagogy'),
    },
    {
      title: 'Integrating Active Acoustics in Lecture Halls',
      slug: 'active-acoustics-lecture-halls-' + Date.now().toString(),
      excerpt: 'How programmable sound deflectors are eliminating dead zones in campus auditoriums.',
      body: '<p>Sound design is arguably the most critical yet overlooked aspect of a lecture hall. Integrating active acoustics allows the room to adjust its sound profile dynamically depending on whether a single lecturer is speaking or a panel is presenting. This guide explores the architectural implications of smart sound design.</p>',
      imageUrl: 'https://images.unsplash.com/photo-1517520286311-6385afda1076?auto=format&fit=crop&w=800&q=80',
      published: true,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      categoryId: getCatId('campus-design'),
    },
    {
      title: 'Designing Collaborative Labs for Gen Z',
      slug: 'collaborative-labs-gen-z-' + Date.now().toString(),
      excerpt: 'Move beyond traditional front-facing rows to foster dynamic, peer-to-peer STEM education.',
      body: '<p>The lab of the future isn\'t a rigid matrix of identical stations. It is a fluid, reconfigurable space where groups can cluster naturally. We look at the latest modular lab benches, safely integrated localized exhaust systems, and high-visibility glass partition integrations that empower project-based learning.</p>',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      published: true,
      publishedAt: new Date(),
      categoryId: getCatId('infrastructure'),
    },
  ];

  for (const post of blogPostsData) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } });
    if (!existing) {
      await prisma.blogPost.create({ data: post });
    }
  }

  console.log('Blog posts seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
