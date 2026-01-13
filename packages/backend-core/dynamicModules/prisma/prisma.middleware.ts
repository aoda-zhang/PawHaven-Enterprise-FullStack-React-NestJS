export const prismaMiddleware = async (params: any, next: any) => {
  const now = new Date();

  switch (params.action) {
    case 'create':
      params.args.data = {
        ...params.args.data,
        createdAt: params.args.data?.createdAt ?? now,
        updatedAt: now,
        version: 1,
        deletedAt: null,
      };
      break;

    case 'update':
    case 'updateMany':
      params.args.data = {
        ...params.args.data,
        updatedAt: now,
        version: params.args.data?.version ? params.args.data.version + 1 : 1,
      };
      break;

    case 'upsert':
      params.args.create = {
        ...params.args.create,
        createdAt: params.args.create?.createdAt ?? now,
        updatedAt: now,
        version: 1,
        deletedAt: null,
      };
      params.args.update = {
        ...params.args.update,
        updatedAt: now,
        version: params.args.update?.version
          ? params.args.update.version + 1
          : 1,
      };
      break;

    case 'delete':
      params.action = 'update';
      params.args.data = {
        deletedAt: now,
        updatedAt: now,
        version: params.args.data?.version ? params.args.data.version + 1 : 1,
      };
      break;

    case 'deleteMany':
      params.action = 'updateMany';
      params.args.data = {
        deletedAt: now,
        updatedAt: now,
        version: 1,
      };
      break;

    default:
      break;
  }

  return next(params);
};
