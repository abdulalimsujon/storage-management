/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import express from 'express';
import { resourceController } from './resource.controller';

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'text/plain', // Added support for text files
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error('Unsupported file type. Allowed types: JPEG, PNG, PDF, TXT.'),
      );
    }
    cb(null, true);
  },
  limits: { fileSize: 20 * 1024 * 1024 }, // Limit file size to 20MB
});

router.post(
  '/upload-resources',
  upload.array('files', 10),
  resourceController.createResources,
);

export const resourcesRouter = router;
