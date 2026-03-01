import multer from 'multer';
import path from 'path';
import fs from 'fs';

const createStorage = (folder: string) =>
    multer.diskStorage({
        destination: (_req, _file, cb) => {
            const dir = path.join(__dirname, '../../../uploads', folder);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);
        },
        filename: (_req, file, cb) => {
            const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${unique}${path.extname(file.originalname)}`);
        },
    });

export const uploadImage = multer({
    storage: createStorage('images'),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only image files are allowed'));
    },
});

export const uploadPDF = multer({
    storage: createStorage('catalogues'),
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === 'application/pdf') cb(null, true);
        else cb(new Error('Only PDF files are allowed'));
    },
});
