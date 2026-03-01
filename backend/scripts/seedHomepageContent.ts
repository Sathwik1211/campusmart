/**
 * Seeds the home_hero and home_services keys in SiteContent with correct default values.
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Fix hero image
    await prisma.siteContent.upsert({
        where: { key: 'home_hero' },
        update: {
            value: JSON.stringify({
                title: 'Your Complete Guide to Campus Infrastructure',
                subtitle: 'Physical + Digital',
                image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
            })
        },
        create: {
            key: 'home_hero',
            value: JSON.stringify({
                title: 'Your Complete Guide to Campus Infrastructure',
                subtitle: 'Physical + Digital',
                image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
            })
        }
    });
    console.log('✓ home_hero seeded (hero image fixed)');

    // Service cards
    await prisma.siteContent.upsert({
        where: { key: 'home_services' },
        update: {
            value: JSON.stringify([
                { title: 'Furniture Design+ Supply', bgColor: '#ef4444', textColor: '#ffffff', href: '/furniture-design-supply' },
                { title: 'Campus Design+ Execution', bgColor: '#a3e635', textColor: '#000000', href: '/campus-design-execution' },
                { title: 'Sports Design+ Execution', bgColor: '#06b6d4', textColor: '#ffffff', href: '/sports-design-execution' },
                { title: 'AI/Digital Design+ Supply', bgColor: '#a855f7', textColor: '#ffffff', href: '/ai-digital-design-supply' },
            ])
        },
        create: {
            key: 'home_services',
            value: JSON.stringify([
                { title: 'Furniture Design+ Supply', bgColor: '#ef4444', textColor: '#ffffff', href: '/furniture-design-supply' },
                { title: 'Campus Design+ Execution', bgColor: '#a3e635', textColor: '#000000', href: '/campus-design-execution' },
                { title: 'Sports Design+ Execution', bgColor: '#06b6d4', textColor: '#ffffff', href: '/sports-design-execution' },
                { title: 'AI/Digital Design+ Supply', bgColor: '#a855f7', textColor: '#ffffff', href: '/ai-digital-design-supply' },
            ])
        }
    });
    console.log('✓ home_services seeded (4 service cards)');

    // Sidebar defaults
    await prisma.siteContent.upsert({
        where: { key: 'home_sidebar' },
        update: {
            value: JSON.stringify({
                classifieds: [
                    { label: 'Colleges / Universities for Sale', href: '/classifieds' },
                    { label: 'Education Infra Funding', href: '/classifieds' },
                    { label: 'Partner with Running Colleges', href: '/partnership' },
                ],
                resources: [
                    { label: 'Complete Guide on AI Implementation', href: '/ai-guide' },
                    { label: 'Setting Up a College in India', href: '/setup-college' },
                    { label: 'UGC Guidelines for Digital Campus', href: '/ugc-guidelines' },
                    { label: 'Product Catalog 2025', href: '/product-catalog' },
                    { label: 'Lookbook – Play Furniture', href: '/lookbook' },
                ],
                completedProjects: [
                    { label: 'Campus Master Planning', href: '/catalogues' },
                    { label: '20 Stunning College Buildings', href: '/catalogues' },
                    { label: 'Academic buildings', href: '/catalogues' },
                    { label: 'Research facilities', href: '/catalogues' },
                    { label: 'Student life centers', href: '/catalogues' },
                    { label: 'Athletic complexes', href: '/catalogues' },
                ],
                contacts: [
                    { bg: '#FFD700', title: 'Design & Architecture', contact: 'info@campusmart.in', href: 'mailto:info@campusmart.in', isEmail: true },
                    { bg: '#00c4cc', title: 'Campus Innovations', contact: '9966109191', href: 'tel:+919966109191', isEmail: false },
                    { bg: '#C8FF00', title: 'Partner Campus', contact: '9866091111', href: 'tel:+919866091111', isEmail: false },
                ],
            })
        },
        create: {
            key: 'home_sidebar',
            value: JSON.stringify({
                classifieds: [
                    { label: 'Colleges / Universities for Sale', href: '/classifieds' },
                    { label: 'Education Infra Funding', href: '/classifieds' },
                    { label: 'Partner with Running Colleges', href: '/partnership' },
                ],
                resources: [
                    { label: 'Complete Guide on AI Implementation', href: '/ai-guide' },
                    { label: 'Setting Up a College in India', href: '/setup-college' },
                    { label: 'UGC Guidelines for Digital Campus', href: '/ugc-guidelines' },
                    { label: 'Product Catalog 2025', href: '/product-catalog' },
                    { label: 'Lookbook – Play Furniture', href: '/lookbook' },
                ],
                completedProjects: [
                    { label: 'Campus Master Planning', href: '/catalogues' },
                    { label: '20 Stunning College Buildings', href: '/catalogues' },
                    { label: 'Academic buildings', href: '/catalogues' },
                    { label: 'Research facilities', href: '/catalogues' },
                    { label: 'Student life centers', href: '/catalogues' },
                    { label: 'Athletic complexes', href: '/catalogues' },
                ],
                contacts: [
                    { bg: '#FFD700', title: 'Design & Architecture', contact: 'info@campusmart.in', href: 'mailto:info@campusmart.in', isEmail: true },
                    { bg: '#00c4cc', title: 'Campus Innovations', contact: '9966109191', href: 'tel:+919966109191', isEmail: false },
                    { bg: '#C8FF00', title: 'Partner Campus', contact: '9866091111', href: 'tel:+919866091111', isEmail: false },
                ],
            })
        }
    });
    console.log('✓ home_sidebar seeded');

    process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
