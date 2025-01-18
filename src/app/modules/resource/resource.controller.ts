import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse/sendResponse';
import { resourceServices } from './resource.service';
import httpStatus from 'http-status';

// Mapping MIME types to resource types
const mimeTypeToResourceType: Record<string, string> = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'application/pdf': 'pdf',
  'text/plain': 'document', // Added support for .txt files
};

const createResources = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File is required.' });
  }

  const { originalname, mimetype, size, path } = req.file;
  const resourceType = mimeTypeToResourceType[mimetype];

  if (!resourceType) {
    return res.status(400).json({
      message: 'Unsupported file type. Allowed types: JPEG, PNG, PDF, TXT.',
    });
  }

  // Save the resource to the database
  const result = await resourceServices.createResourcesIntoDb({
    name: originalname,
    type: resourceType,
    size,
    path,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Resource uploaded successfully!',
    data: result,
  });
});

export const resourceController = {
  createResources,
};
