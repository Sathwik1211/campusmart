import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { verifyToken, AuthRequest } from '../middleware/auth.middleware';

const router = Router();


// GET /api/wishlist
router.get('/', verifyToken, async (req: AuthRequest, res: Response) => {
    try {
        const items = await prisma.wishlistItem.findMany({
            where: { userId: req.user!.id },
            include: { product: { include: { category: true } } },
        });
        res.json(items);
    } catch {
        res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
});

// POST /api/wishlist
router.post('/', verifyToken, async (req: AuthRequest, res: Response) => {
    try {
        const { productId } = req.body;
        const item = await prisma.wishlistItem.upsert({
            where: { userId_productId: { userId: req.user!.id, productId: Number(productId) } },
            update: {},
            create: { userId: req.user!.id, productId: Number(productId) },
            include: { product: true },
        });
        res.status(201).json(item);
    } catch {
        res.status(500).json({ error: 'Failed to add to wishlist' });
    }
});

// DELETE /api/wishlist/:productId
router.delete('/:productId', verifyToken, async (req: AuthRequest, res: Response) => {
    try {
        await prisma.wishlistItem.deleteMany({
            where: { userId: req.user!.id, productId: Number(req.params.productId) },
        });
        res.json({ message: 'Removed from wishlist' });
    } catch {
        res.status(500).json({ error: 'Failed to remove from wishlist' });
    }
});

export default router;
