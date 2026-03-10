import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Admin user
    const adminHash = await bcrypt.hash('Admin@1234', 10);
    await prisma.user.upsert({
        where: { email: 'admin@campusmart.in' },
        update: {},
        create: {
            name: 'CampusMart Admin',
            email: 'admin@campusmart.in',
            passwordHash: adminHash,
            role: 'admin',
            phone: '+91 98765 00000',
            institution: 'CampusMart',
        },
    });

    // Demo user
    const userHash = await bcrypt.hash('User@1234', 10);
    await prisma.user.upsert({
        where: { email: 'demo@campusmart.in' },
        update: {},
        create: {
            name: 'Demo User',
            email: 'demo@campusmart.in',
            passwordHash: userHash,
            role: 'user',
            phone: '+91 98765 43210',
            institution: 'ABC International School',
        },
    });

    // Categories
    const categories = [
        { name: 'Furniture', slug: 'furniture' },
        { name: 'Lab Equipment', slug: 'labs' },
        { name: 'Sports', slug: 'sports' },
        { name: 'Technology', slug: 'technology' },
        { name: 'Library', slug: 'library' },
    ];
    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }

    const catMap = await prisma.category.findMany();
    const catBySlug = Object.fromEntries(catMap.map((c) => [c.slug, c.id]));

    // Products
    const products = [
        { name: 'Smart Classroom Desk', slug: 'smart-classroom-desk', description: 'Ergonomic smart desk designed for modern classrooms with cable management and adjustable height.', price: 8500, categorySlug: 'furniture', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80', rating: 4.5, reviewCount: 28, featured: true },
        { name: 'Interactive Whiteboard 75"', slug: 'interactive-whiteboard-75', description: 'Large format 75-inch interactive whiteboard with 4K display and multi-touch capability.', price: 125000, categorySlug: 'technology', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviewCount: 45, featured: true },
        { name: 'Chemistry Lab Setup', slug: 'chemistry-lab-setup', description: 'Complete chemistry lab setup with safety equipment, glassware, and storage solutions.', price: 250000, categorySlug: 'labs', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviewCount: 12, featured: false },
        { name: 'Library Bookshelf Unit', slug: 'library-bookshelf-unit', description: 'Heavy-duty steel bookshelf unit with adjustable shelves, ideal for school and college libraries.', price: 15000, categorySlug: 'library', imageUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=400&q=80', rating: 4.3, reviewCount: 36, featured: false },
        { name: 'Basketball Court Surface', slug: 'basketball-court-surface', description: 'Professional grade indoor basketball court flooring with anti-slip properties.', price: 450000, categorySlug: 'sports', imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80', rating: 4.9, reviewCount: 8, featured: true },
        { name: 'STEM Learning Kit', slug: 'stem-learning-kit', description: 'Comprehensive STEM kit with robotics, electronics, and coding modules for K-12 students.', price: 35000, categorySlug: 'labs', imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?auto=format&fit=crop&w=400&q=80', rating: 4.6, reviewCount: 52, featured: true },
        { name: 'Ergonomic Teacher Chair', slug: 'ergonomic-teacher-chair', description: 'Premium ergonomic chair with lumbar support and adjustable armrests for teachers.', price: 12000, categorySlug: 'furniture', imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=400&q=80', rating: 4.4, reviewCount: 19, featured: false },
        { name: 'Digital Library System', slug: 'digital-library-system', description: 'Complete digital library management system with barcode scanning and RFID tracking.', price: 85000, categorySlug: 'library', imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviewCount: 23, featured: false },
    ];

    for (const p of products) {
        const { categorySlug, ...rest } = p;
        await prisma.product.upsert({
            where: { slug: rest.slug },
            update: {},
            create: { ...rest, categoryId: catBySlug[categorySlug] },
        });
    }

    // Blog posts
    const posts = [
        { title: 'The Future of Smart Classrooms', slug: 'future-of-smart-classrooms', excerpt: 'Explore how technology is transforming traditional classrooms into interactive learning hubs.', body: `<h2>Introduction</h2><p>Smart classrooms are revolutionizing education across India. With the integration of interactive whiteboards, student response systems, and AI-powered learning tools, schools are creating environments that foster deeper engagement and better learning outcomes.</p><h2>Key Technologies</h2><p>Interactive whiteboards, AR/VR tools, and real-time collaboration platforms are at the forefront of this transformation. These technologies allow teachers to deliver content in more dynamic and engaging ways while collecting valuable data on student performance.</p><h2>Implementation Steps</h2><p>Successful implementation requires careful planning, teacher training, and a phased rollout. Schools that invest in professional development alongside technology see the best results.</p><h2>Conclusion</h2><p>The future of education lies in seamlessly blending technology with proven pedagogical approaches. Smart classrooms are not just about gadgets — they are about creating better learning experiences for every student.</p>`, imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80', published: true, publishedAt: new Date('2025-01-15') },
        { title: 'NEP 2020 Implementation Guide', slug: 'nep-2020-implementation-guide', excerpt: 'A comprehensive guide to implementing NEP 2020 in your institution with practical steps and resources.', body: `<h2>Understanding NEP 2020</h2><p>The National Education Policy 2020 represents the most comprehensive education reform in India in decades. It introduces multidisciplinary education, vocational training, and a shift towards competency-based learning.</p><h2>Infrastructure Requirements</h2><p>Implementing NEP 2020 requires significant changes to physical infrastructure, including activity rooms, maker spaces, and flexible classroom designs that support collaborative learning.</p><h2>Curriculum Changes</h2><p>Schools must adopt a 5+3+3+4 curricular structure and integrate coding, AI literacy, and life skills into the mainstream curriculum from an early age.</p><h2>How CampusMart Can Help</h2><p>We offer a complete range of NEP-compliant furniture, technology, and lab equipment to help institutions make a smooth transition. Our team of experts can assess your current setup and recommend the best solutions.</p>`, imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80', published: true, publishedAt: new Date('2025-01-10') },
        { title: 'Sustainable Campus Design', slug: 'sustainable-campus-design', excerpt: 'How to create eco-friendly educational spaces that inspire students and reduce environmental impact.', body: `<h2>Why Sustainability Matters in Education</h2><p>Educational institutions have a unique opportunity to model sustainable practices for students. A green campus not only reduces operational costs but also serves as a living laboratory for environmental education.</p><h2>Key Principles</h2><p>Sustainable campus design incorporates passive solar design, rainwater harvesting, solar energy, native landscaping, and sustainable building materials. These elements work together to create a campus that is comfortable, cost-effective, and environmentally responsible.</p><h2>Furniture and Materials</h2><p>Choosing furniture made from recycled materials, sustainably sourced wood, and low-VOC finishes contributes to healthier indoor environments and reduced environmental impact. CampusMart offers a wide range of eco-certified furniture options.</p>`, imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', published: true, publishedAt: new Date('2025-01-05') },
    ];

    for (const post of posts) {
        await prisma.blogPost.upsert({
            where: { slug: post.slug },
            update: {},
            create: post,
        });
    }

    // Catalogues
    const catalogues = [
        { title: 'Furniture Catalogue 2025', description: 'Complete range of school and college furniture solutions', fileUrl: '/uploads/catalogues/furniture-2025.pdf', thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=300&q=80' },
        { title: 'Lab Equipment Catalogue', description: 'State-of-the-art laboratory setup and equipment', fileUrl: '/uploads/catalogues/lab-equipment.pdf', thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=300&q=80' },
        { title: 'Technology Solutions Catalogue', description: 'Smart classroom and digital learning solutions', fileUrl: '/uploads/catalogues/technology.pdf', thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80' },
    ];

    for (const cat of catalogues) {
        await prisma.catalogue.create({ data: cat });
    }

    // Default site content
    const siteContent = [
        { key: 'hero_title', value: 'Transforming Campus Infrastructure' },
        { key: 'hero_subtitle', value: 'Your trusted partner for creating world-class educational environments. From furniture to technology, we deliver complete campus solutions.' },
        { key: 'about_text', value: 'CampusMart is India\'s leading provider of educational infrastructure solutions, serving 500+ institutions across the country.' },
        { key: 'contact_phone', value: '+91 98765 43210' },
        { key: 'contact_email', value: 'info@campusmart.in' },
        { key: 'contact_address', value: '123, Tech Park, Whitefield, Bangalore, Karnataka - 560066' },
    ];

    for (const content of siteContent) {
        await prisma.siteContent.upsert({
            where: { key: content.key },
            update: {},
            create: content,
        });
    }

    // Pages (CMS)
    const pages = [
        { title: 'Home', slug: 'home' },
        { title: 'AI Digital Design Supply', slug: 'ai-digital-design-supply' },
        { title: 'AI Guide', slug: 'ai-guide' },
        { title: 'AI & ML', slug: 'ai-ml' },
        { title: 'AI Stations', slug: 'ai-stations' },
        { title: 'Assessment System', slug: 'assessment-system' },
        { title: 'Campus Automation', slug: 'campus-automation' },
        { title: 'Campus Design Execution', slug: 'campus-design-execution' },
        { title: 'Campus Design', slug: 'campus-design' },
        { title: 'Collaboration', slug: 'collaboration' },
        { title: 'Corporate', slug: 'corporate' },
        { title: 'Digital Transformation', slug: 'digital-transformation' },
        { title: 'Furniture Design Supply', slug: 'furniture-design-supply' },
        { title: 'Furniture', slug: 'furniture' },
        { title: 'Innovation Centres', slug: 'innovation-centres' },
        { title: 'Innovation', slug: 'innovation' },
        { title: 'Labs', slug: 'labs' },
        { title: 'Libraries', slug: 'libraries' },
        { title: 'Library Management', slug: 'library-management' },
        { title: 'Learning Management System', slug: 'lms' },
        { title: 'Lookbook', slug: 'lookbook' },
        { title: 'New Environments', slug: 'new-environments' },
        { title: 'Partnership', slug: 'partnership' },
        { title: 'Privacy Policy', slug: 'privacy-policy' },
        { title: 'Product Catalog', slug: 'product-catalog' },
        { title: 'Setup College', slug: 'setup-college' },
        { title: 'Sports Design Execution', slug: 'sports-design-execution' },
        { title: 'Sports Infrastructure', slug: 'sports-infra' },
        { title: 'Tech Infrastructure', slug: 'tech-infra' },
        { title: 'Terms of Use', slug: 'terms-of-use' },
        { title: 'UGC Guidelines', slug: 'ugc-guidelines' },
    ];

    for (const page of pages) {
        await prisma.page.upsert({
            where: { slug: page.slug },
            update: {},
            create: {
                title: page.title,
                slug: page.slug,
                template: page.slug,
                pageData: '{}',
                published: true,
            },
        });
    }

    console.log('✅ Database seeded successfully!');
    console.log('📧 Admin: admin@campusmart.in / Admin@1234');
    console.log('📧 Demo User: demo@campusmart.in / User@1234');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
