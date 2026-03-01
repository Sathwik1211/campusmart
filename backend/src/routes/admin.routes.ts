import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { verifyToken, requireAdmin, AuthRequest } from '../middleware/auth.middleware';

const router = Router();


// GET /api/admin/stats
router.get('/stats', verifyToken, requireAdmin, async (_req: AuthRequest, res: Response) => {
    try {
        const [users, products, orders, enquiries, quotes, classifieds, revenue] = await Promise.all([
            prisma.user.count(),
            prisma.product.count({ where: { active: true } }),
            prisma.order.count(),
            prisma.contactEnquiry.count({ where: { read: false } }),
            prisma.quoteRequest.count({ where: { read: false } }),
            prisma.classified.count({ where: { status: 'pending' } }),
            prisma.order.aggregate({ _sum: { total: true } }),
        ]);
        res.json({
            users, products, orders, unreadEnquiries: enquiries, unreadQuotes: quotes,
            pendingClassifieds: classifieds, totalRevenue: revenue._sum.total || 0,
        });
    } catch {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// GET /api/admin/users
router.get('/users', verifyToken, requireAdmin, async (_req: AuthRequest, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true, phone: true, institution: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(users);
    } catch {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// PUT /api/admin/users/:id/role
router.put('/users/:id/role', verifyToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        const user = await prisma.user.update({ where: { id: Number(req.params.id) }, data: { role: req.body.role } });
        res.json({ id: user.id, name: user.name, role: user.role });
    } catch {
        res.status(500).json({ error: 'Failed to update user role' });
    }
});

// GET /api/admin/enquiries
router.get('/enquiries', verifyToken, requireAdmin, async (_req: AuthRequest, res: Response) => {
    try {
        const [contacts, quotes] = await Promise.all([
            prisma.contactEnquiry.findMany({ orderBy: { createdAt: 'desc' } }),
            prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' } }),
        ]);
        res.json({ contacts, quotes });
    } catch {
        res.status(500).json({ error: 'Failed to fetch enquiries' });
    }
});

// PUT /api/admin/enquiries/contact/:id/read
router.put('/enquiries/contact/:id/read', verifyToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        await prisma.contactEnquiry.update({ where: { id: Number(req.params.id) }, data: { read: true } });
        res.json({ message: 'Marked as read' });
    } catch {
        res.status(500).json({ error: 'Failed to update enquiry' });
    }
});

// PUT /api/admin/enquiries/quote/:id/read
router.put('/enquiries/quote/:id/read', verifyToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
        await prisma.quoteRequest.update({ where: { id: Number(req.params.id) }, data: { read: true } });
        res.json({ message: 'Marked as read' });
    } catch {
        res.status(500).json({ error: 'Failed to update quote' });
    }
});

export default router;
