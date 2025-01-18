import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse/sendResponse';
import httpStatus from 'http-status';
import { resourceServices } from './resource.service';

// Mapping MIME types to resource types
const mimeTypeToResourceType: Record<string, string> = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'application/pdf': 'pdf',
  'text/plain': 'document',
};

const createResources = catchAsync(async (req, res) => {
  const parsedData = JSON.parse(req.body.data);
  const standardObject = Object.assign({}, parsedData);
  const resource = req.files?.map((data) => ({
    name: data.originalname,
    type: mimeTypeToResourceType[data.mimetype] || 'unknown',
    path: data.path,
    size: data.size,
  }));

  const folderData = {
    folderName: standardObject.folderName,
    data: resource,
  };

  const result = await resourceServices.createResourcesIntoDb(folderData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'folder created successfully',
    data: result,
  });
});

const getAllResource = catchAsync(async (req, res) => {
  const result = await resourceServices.getAllResourceFromDb();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All resources retrived  successfully',
    data: result,
  });
});

export const resourceController = {
  createResources,
  getAllResource,
};
