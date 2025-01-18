import { Folder } from './resource.model';

const createResourcesIntoDb = async (resourceData) => {
  const folder = new Folder(resourceData);
  await folder.save();
  return folder;
};

export const resourceServices = {
  createResourcesIntoDb,
};
