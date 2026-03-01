/**
 * Production seed runner — compiled to dist/runSeed.js by tsc.
 * Called by the Railway start command to create the admin user and seed
 * homepage content on first deploy (upsert is safe to re-run).
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
    console.log('🌱 Running production seed...');

    // ── Admin user ────────────────────────────────────────────────────────
    const adminHash = await bcrypt.hash('Admin@1234', 10);
    await prisma.user.upsert({
        where: { email: 'admin@campusmart.in' },
        update: {},
        create: {
            name: 'CampusMart Admin',
            email: 'admin@campusmart.in',
            passwordHash: adminHash,
            role: 'admin',
            emailVerified: true,
            phone: '+91 98765 00000',
            institution: 'CampusMart',
        },
    });
    console.log('✓ Admin user ready: admin@campusmart.in / Admin@1234');

    // ── Hero banner ───────────────────────────────────────────────────────
    await prisma.siteContent.upsert({
        where: { key: 'home_hero' },
        update: {},
        create: {
            key: 'home_hero',
            value: JSON.stringify({
                title: 'Your Complete Guide to Campus Infrastructure',
                subtitle: 'Physical + Digital',
                image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            }),
        },
    });

    // ── Service cards ─────────────────────────────────────────────────────
    await prisma.siteContent.upsert({
        where: { key: 'home_services' },
        update: {},
        create: {
            key: 'home_services',
            value: JSON.stringify([
                { title: 'Furniture Design+ Supply', bgColor: '#ef4444', textColor: '#ffffff', href: '/furniture-design-supply' },
                { title: 'Campus Design+ Execution', bgColor: '#a3e635', textColor: '#000000', href: '/campus-design-execution' },
                { title: 'Sports Design+ Execution', bgColor: '#06b6d4', textColor: '#ffffff', href: '/sports-design-execution' },
                { title: 'AI/Digital Design+ Supply', bgColor: '#a855f7', textColor: '#ffffff', href: '/ai-digital-design-supply' },
            ]),
        },
    });

    console.log('✓ Homepage content seeded');

    // ── Pages ─────────────────────────────────────────────────────────────
    const corePages = [
        { slug: 'about-us', title: 'About Us', template: 'corporate' },
        { slug: 'ai-digital-design-supply', title: 'AI/Digital Design & Supply', template: 'ai-digital-design-supply' },
        { slug: 'ai-guide', title: 'AI Guide', template: 'ai-guide' },
        { slug: 'ai-ml', title: 'AI & ML Labs', template: 'ai-ml' },
        { slug: 'ai-stations', title: 'AI Stations', template: 'ai-stations' },
        { slug: 'assessment-system', title: 'Assessment System', template: 'assessment-system' },
        { slug: 'blog', title: 'Blog', template: 'blog' },
        { slug: 'campus-automation', title: 'Campus Automation', template: 'campus-automation' },
        { slug: 'campus-design-execution', title: 'Campus Design & Execution', template: 'campus-design-execution' },
        { slug: 'campus-design', title: 'Campus Design', template: 'campus-design' },
        { slug: 'catalogues', title: 'Catalogues', template: 'catalogues' },
        { slug: 'classifieds', title: 'Classifieds', template: 'classifieds' },
        { slug: 'collaboration', title: 'Collaboration Spaces', template: 'collaboration' },
        { slug: 'contact-us', title: 'Contact Us', template: 'contact-us' },
        { slug: 'corporate', title: 'Corporate Identity', template: 'corporate' },
        { slug: 'digital-transformation', title: 'Digital Transformation', template: 'digital-transformation' },
        { slug: 'furniture-design-supply', title: 'Furniture Design & Supply', template: 'furniture-design-supply' },
        { slug: 'furniture', title: 'Furniture Solutions', template: 'furniture' },
        { slug: 'innovation-centres', title: 'Innovation Centres', template: 'innovation-centres' },
        { slug: 'innovation', title: 'Innovation Ecosystems', template: 'innovation' },
        { slug: 'labs', title: 'Laboratories', template: 'labs' },
        { slug: 'libraries', title: 'Libraries', template: 'libraries' },
        { slug: 'library-management', title: 'Library Management', template: 'library-management' },
        { slug: 'lms', title: 'Learning Management System', template: 'lms' },
        { slug: 'lookbook', title: 'Lookbook', template: 'lookbook' },
        { slug: 'new-environments', title: 'New Learning Environments', template: 'new-environments' },
        { slug: 'partnership', title: 'Partnership', template: 'partnership' },
        { slug: 'privacy-policy', title: 'Privacy Policy', template: 'privacy-policy' },
        { slug: 'setup-college', title: 'Setup Your College', template: 'setup-college' },
        { slug: 'shop', title: 'Shop', template: 'shop' },
        { slug: 'sports-design-execution', title: 'Sports Design & Execution', template: 'sports-design-execution' },
        { slug: 'sports-infra', title: 'Sports Infrastructure', template: 'sports-infra' },
        { slug: 'tech-infra', title: 'Tech Infrastructure', template: 'tech-infra' },
        { slug: 'terms-of-use', title: 'Terms of Use', template: 'terms-of-use' },
    ];

    for (const page of corePages) {
        await prisma.page.upsert({
            where: { slug: page.slug },
            update: { template: page.template, published: true }, // Ensure it stays linked to the right frontend template
            create: {
                title: page.title,
                slug: page.slug,
                template: page.template,
                published: true,
                content: '',
                pageData: '{}'
            }
        });
    }

    console.log(`✓ ${corePages.length} Dynamic Pages seeded`);

    await prisma.$disconnect();
}

seed().catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
});
