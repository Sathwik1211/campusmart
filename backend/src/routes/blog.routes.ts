import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { verifyToken, requireAdmin, AuthRequest } from '../middleware/auth.middleware';
import { uploadImage } from '../middleware/upload.middleware';

const router = Router();


// GET /api/blog/categories
router.get('/categories', async (_req: Request, res: Response) => {
    try {
        const categories = await prisma.blogCategory.findMany({ orderBy: { name: 'asc' } });
        res.json(categories);
    } catch {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// POST /api/blog/categories (admin)
router.post('/categories', verifyToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const { name } = req.body;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const category = await prisma.blogCategory.create({ data: { name, slug } });
        res.status(201).json(category);
    } catch {
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// DELETE /api/blog/categories/:id (admin)
router.delete('/categories/:id', verifyToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        await prisma.blogCategory.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: 'Category deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

// GET /api/blog
router.get('/', async (req: Request, res: Response) => {
    try {
        const { page = '1', limit = '10', all, category } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where: any = all === 'true' ? {} : { published: true };

        if (category) {
            where.category = { slug: String(category) };
        }

        const [posts, total] = await Promise.all([
            prisma.blogPost.findMany({ where, skip, take: Number(limit), orderBy: { publishedAt: 'desc' }, include: { category: true } }),
            prisma.blogPost.count({ where }),
        ]);
        res.json({ posts, total, page: Number(page), limit: Number(limit) });
    } catch {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// GET /api/blog/:slug
router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const post = await prisma.blogPost.findFirst({
            where: { OR: [{ slug: String(req.params.slug) }, { id: Number(req.params.slug) || 0 }] },
            include: { category: true }
        });
        if (!post) { res.status(404).json({ error: 'Post not found' }); return; }
        res.json(post);
    } catch {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});

// POST /api/blog (admin)
router.post('/', verifyToken, requireAdmin, uploadImage.single('image'), async (req: AuthRequest, res: Response) => {
    try {
        const { title, excerpt, body, published, categoryId } = req.body;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();
        const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : req.body.imageUrl;
        const isPublished = published === 'true' || published === true;
        const post = await prisma.blogPost.create({
            data: {
                title, slug, excerpt, body, imageUrl,
                published: isPublished, publishedAt: isPublished ? new Date() : null,
                authorId: req.user!.id,
                ...(categoryId && categoryId !== 'null' ? { categoryId: Number(categoryId) } : {})
            },
            include: { category: true }
        });
        res.status(201).json(post);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to create post';
        res.status(500).json({ error: msg });
    }
});

// PUT /api/blog/:id (admin)
router.put('/:id', verifyToken, requireAdmin, uploadImage.single('image'), async (req: AuthRequest, res: Response) => {
    try {
        const { title, excerpt, body, published, imageUrl: bodyImageUrl, categoryId } = req.body;
        const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : bodyImageUrl;
        const isPublished = published === 'true' || published === true;
        const updateData: any = {
            excerpt, body, published: isPublished,
            publishedAt: isPublished ? new Date() : null,
        };
        if (title) {
            updateData.title = title;
            updateData.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();
        }
        if (imageUrl) updateData.imageUrl = imageUrl;
        if (categoryId !== undefined) {
            updateData.categoryId = categoryId && categoryId !== 'null' ? Number(categoryId) : null;
        }

        const post = await prisma.blogPost.update({
            where: { id: Number(req.params.id) },
            data: updateData,
            include: { category: true }
        });
        res.json(post);
    } catch {
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// DELETE /api/blog/:id (admin)
router.delete('/:id', verifyToken, requireAdmin, async (_req: AuthRequest, res: Response) => {
    try {
        await prisma.blogPost.delete({ where: { id: Number(_req.params.id) } });
        res.json({ message: 'Post deleted' });
    } catch {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

export default router;
