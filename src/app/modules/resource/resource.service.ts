import { Folder } from './resource.model';

const createResourcesIntoDb = async (resourceData) => {
  const folder = new Folder(resourceData);
  await folder.save();
  return folder;
};
const getAllResourceFromDb = async () => {
  const totalStorageGB = 20; // Total storage in GB

  const result = await Folder.aggregate([
    {
      $unwind: '$data',
    },
    {
      $group: {
        _id: '$data.type',
        resources: { $push: '$data' },
        totalSize: { $sum: '$data.size' }, // Summing sizes in bytes
        count: { $sum: 1 }, // Counting the number of resources
      },
    },
    {
      $addFields: {
        totalSizeMB: { $round: [{ $divide: ['$totalSize', 1048576] }, 3] }, // Convert size to MB and round to 3 digits
      },
    },
    {
      $group: {
        _id: null,
        resourceTypes: { $push: '$$ROOT' }, // Collect all grouped results
        totalSizeAllTypes: { $sum: '$totalSize' }, // Sum up all sizes in bytes
      },
    },
    {
      $addFields: {
        totalSizeAllTypesGB: {
          $round: [{ $divide: ['$totalSizeAllTypes', 1073741824] }, 3],
        }, // Convert total size to GB and round to 3 digits
        usableStorageGB: {
          $round: [
            {
              $subtract: [
                totalStorageGB,
                { $divide: ['$totalSizeAllTypes', 1073741824] },
              ],
            },
            3,
          ],
        }, // Usable storage in GB
        availableStoragePercent: {
          $round: [
            {
              $multiply: [
                {
                  $divide: [
                    {
                      $subtract: [
                        totalStorageGB,
                        { $divide: ['$totalSizeAllTypes', 1073741824] },
                      ],
                    },
                    totalStorageGB,
                  ],
                },
                100,
              ],
            },
            2,
          ],
        }, // Available storage percentage
      },
    },
    {
      $project: {
        _id: 0,
        resourceTypes: 1,
        totalSizeAllTypesGB: 1,
        usableStorageGB: 1,
        availableStoragePercent: 1,
      },
    },
  ]);

  return result[0]; // Return the result object
};

export const resourceServices = {
  createResourcesIntoDb,
  getAllResourceFromDb,
};
