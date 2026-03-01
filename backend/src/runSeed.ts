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
    await prisma.$disconnect();
}

seed().catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
});
