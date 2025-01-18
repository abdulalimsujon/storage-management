import { model, Schema } from 'mongoose';
import { IResource, IResourceStats } from './resource.interface';

const ResourceSchema = new Schema<IResource>({
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['image', 'document', 'pdf', 'txt'], // Included 'txt'
  },
  size: { type: Number, required: true },
  path: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

// Schema for resource statistics
const ResourceStatsSchema = new Schema<IResourceStats>({
  type: {
    type: String,
    required: true,
    enum: ['image', 'document', 'pdf', 'txt'], // Included 'txt'
  },
  totalCount: { type: Number, default: 0 },
  totalSize: { type: Number, default: 0 },
});

// Model hooks to update stats on resource creation
ResourceSchema.post('save', async function (this: IResource) {
  const ResourceStats = model<IResourceStats>('ResourceStats');
  const resource = this;

  const stat = await ResourceStats.findOne({ type: resource.type });
  if (stat) {
    stat.totalCount += 1;
    stat.totalSize += resource.size;
    if (stat.totalSize > 20 * 1024 * 1024 * 1024) {
      throw new Error('Total size exceeds the 20GB limit.');
    }
    await stat.save();
  } else {
    await ResourceStats.create({
      type: resource.type,
      totalCount: 1,
      totalSize: resource.size,
    });
  }
});

// Model hooks to update stats on resource deletion
ResourceSchema.post('remove', async function (this: IResource) {
  const ResourceStats = model<IResourceStats>('ResourceStats');
  const resource = this;

  const stat = await ResourceStats.findOne({ type: resource.type });
  if (stat) {
    stat.totalCount -= 1;
    stat.totalSize -= resource.size;
    await stat.save();
  }
});

// Register models
export const Resource = model<IResource>('Resource', ResourceSchema);
export const ResourceStats = model<IResourceStats>(
  'ResourceStats',
  ResourceStatsSchema,
);
