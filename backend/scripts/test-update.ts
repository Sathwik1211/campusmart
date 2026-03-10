import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Generate the mocked CMS data for Digital Transformation
    const mockData = {
        heroTitle: "TEST DIGITAL CMS",
        heroSubtitle: "Ensuring rigorous continuous integration with our headless CMS model.",
        cards: [
            { title: "Service A", description: "Alpha" },
            { title: "Service B", description: "Beta" }
        ],
        features: [
            "Feature 1 implemented dynamically",
            "Feature 2 from the SQLite DB"
        ]
    };

    const updated = await prisma.page.update({
        where: { slug: 'digital-transformation' },
        data: {
            pageData: JSON.stringify(mockData)
        }
    });

    console.log('Successfully updated digital-transformation:', updated.pageData);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
