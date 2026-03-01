import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PAGES_DIR = path.join(__dirname, '../../src/pages');

async function main() {
    console.log('Scanning for existing React pages...');
    const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.tsx'));

    for (const file of files) {
        const slug = file.replace('.tsx', '');
        if (slug === 'home' || slug === 'login' || slug === 'registration') continue;

        // Helper title formatter (e.g. ai-ml => Ai Ml)
        const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        const result = await prisma.page.upsert({
            where: { slug: slug },
            update: {
                template: slug
            },
            create: {
                title: title,
                slug: slug,
                template: slug,
                published: true
            },
        });

        console.log(`Synced page: /${slug}`);
    }

    // Ensure homepage is explicitly seeded
    await prisma.page.upsert({
        where: { slug: 'home' },
        update: { template: 'home' },
        create: { title: 'Home', slug: 'home', template: 'home', published: true }
    });

    console.log('Successfully seeded all pages into the DB.');
    process.exit(0);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
