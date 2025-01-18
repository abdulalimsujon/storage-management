import { IResource } from './resource.interface';
import { Resource } from './resource.model';

const createResourcesIntoDb = async (resourceData: IResource) => {
  const resource = new Resource(resourceData);
  await resource.save();
  return resource;
};

export const resourceServices = {
  createResourcesIntoDb,
};
