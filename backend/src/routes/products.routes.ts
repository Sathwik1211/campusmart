import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { verifyToken, requireAdmin, AuthRequest } from '../middleware/auth.middleware';
import { uploadImage } from '../middleware/upload.middleware';
import path from 'path';

const router = Router();


// GET /api/products
router.get('/', async (req: Request, res: Response) => {
    try {
        const { category, search, featured, page = '1', limit = '20' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where: Record<string, unknown> = { active: true };
        if (category && category !== 'all') {
            const cat = await prisma.category.findUnique({ where: { slug: String(category) } });
            if (cat) where.categoryId = cat.id;
        }
        if (search) where.name = { contains: String(search) };
        if (featured === 'true') where.featured = true;
        const [products, total] = await Promise.all([
            prisma.product.findMany({ where, include: { category: true }, skip, take: Number(limit), orderBy: { createdAt: 'desc' } }),
            prisma.product.count({ where }),
        ]);
        res.json({ products, total, page: Number(page), limit: Number(limit) });
    } catch {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET /api/products/categories
router.get('/categories', async (_req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// GET /api/products/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.findFirst({
            where: { OR: [{ id: Number(req.params.id) || 0 }, { slug: req.params.id }] },
            include: { category: true },
        });
        if (!product) { res.status(404).json({ error: 'Product not found' }); return; }
        res.json(product);
    } catch {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// POST /api/products (admin)
router.post('/', verifyToken, requireAdmin, uploadImage.single('image'), async (req: AuthRequest, res: Response) => {
    try {
        const { name, description, price, categoryId, rating, reviewCount, stock, active, featured } = req.body;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : req.body.imageUrl;
        const product = await prisma.product.create({
            data: {
                name, slug, description, price: Number(price), categoryId: Number(categoryId),
                imageUrl, rating: Number(rating) || 0, reviewCount: Number(reviewCount) || 0,
                stock: Number(stock) || 100, active: active !== 'false', featured: featured === 'true',
            },
            include: { category: true },
        });
        res.status(201).json(product);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create product';
        res.status(500).json({ error: msg });
    }
});

// PUT /api/products/:id (admin)
router.put('/:id', verifyToken, requireAdmin, uploadImage.single('image'), async (req: AuthRequest, res: Response) => {
    try {
        const { name, description, price, categoryId, rating, reviewCount, stock, active, featured, imageUrl: bodyImageUrl } = req.body;
        const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : bodyImageUrl;
        const updateData: Record<string, unknown> = {
            description, price: Number(price), categoryId: Number(categoryId),
            rating: Number(rating), reviewCount: Number(reviewCount),
            stock: Number(stock), active: active !== 'false', featured: featured === 'true',
        };
        if (name) {
            updateData.name = name;
            updateData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        }
        if (imageUrl) updateData.imageUrl = imageUrl;
        const product = await prisma.product.update({
            where: { id: Number(req.params.id) },
            data: updateData,
            include: { category: true },
        });
        res.json(product);
    } catch {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE /api/products/:id (admin)
router.delete('/:id', verifyToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        await prisma.product.update({ where: { id: Number(req.params.id) }, data: { active: false } });
        res.json({ message: 'Product deactivated' });
    } catch {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

export default router;
