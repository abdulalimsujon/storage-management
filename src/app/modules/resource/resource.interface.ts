export interface IResource {
  name: string;
  type: 'image' | 'document' | 'pdf' | 'txt';
  size: number;
  path: string;
  uploadedAt?: Date;
}

export interface IFolder {
  folderName: string;
  data: IResource[];
}
