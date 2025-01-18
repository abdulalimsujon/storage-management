/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { IFolder, IResource } from './resource.interface';
const ResourceSchema: Schema<IResource> = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['image', 'document', 'pdf', 'txt'],
  },
  size: { type: Number, required: true },
  path: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const FolderSchema = new Schema<IFolder>({
  folderName: { type: String, required: true },
  data: { type: [ResourceSchema], required: true },
});

export const Folder = model<IFolder>('Folder', FolderSchema);
