// Interfaces for the schemas
export interface IResource {
  name: string;
  type: 'image' | 'document' | 'pdf' | 'txt'; // Added 'txt'
  size: number;
  path: string;
  uploadedAt?: Date;
}

export interface IResourceStats {
  type: 'image' | 'document' | 'pdf' | 'txt'; // Added 'txt'
  totalCount: number;
  totalSize: number;
}
