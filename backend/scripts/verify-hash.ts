import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function check() {
    const email = 'admin@campusmart.in';
    const password = 'Admin@1234';

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        console.log('User not found');
        return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    console.log(`Password for ${email} is ${valid ? 'VALID' : 'INVALID'}`);
    console.log(`Hash in DB: ${user.passwordHash}`);
}

check()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
