/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import express from 'express';
import { resourceController } from './resource.controller';

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Save file with a unique timestamp prefix
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Allow only certain file types
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

// Define the upload route
router.post(
  '/upload-resources',
  upload.single('files'), // Accept a single file upload
  resourceController.createResources, // Handle the file upload in the controller
);

export const resourcesRouter = router;
