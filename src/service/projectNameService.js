import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";
import { createProjectNameValidation, getProjectNameValidation, searchProjectNameValidation, updateProjectNameValidation } from "../validation/projectNameValidation.js";
import { getUserValidation } from "../validation/userValidation.js";
import { validate } from "../validation/validation.js";

const checkUserMustExists = async (user, userId) => {
  userId = parseInt(validate(getUserValidation, userId));

  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      id: user.id,
      id: userId,
    },
  });

  // Mengecek data user didatabase
  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "user is not found");
  }

  return userId;
};

// Create Project Name service
const create = async (user, userId, request) => {
  userId = await checkUserMustExists(user, userId);
  // Jika datanya ada, dilakukan divalidasi
  const projectName = validate(createProjectNameValidation, request);
  projectName.userId = userId;

  return prismaClient.projectName.create({
    data: projectName,
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });
};

// Get Project Name service
const get = async (user, userId, projectNameId) => {
  userId = await checkUserMustExists(user, userId);
  projectNameId = validate(getProjectNameValidation, projectNameId);

  // Mengecek data project name didatabase
  const projectName = await prismaClient.projectName.findFirst({
    where: {
      id: userId,
      id: projectNameId,
    },
    select: {
      id: true,
      title: true,
      user: {
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
        },
      },
    },
  });

  if (!projectName) {
    throw new ResponseError(404, "project Name is not found");
  }

  return projectName;
};

// Update Project Name service
const update = async (user, userId, request) => {
  userId = await checkUserMustExists(user, userId);
  const projectName = validate(updateProjectNameValidation, request);

  const totalProjectNameInDatabase = await prismaClient.projectName.count({
    where: {
      userId: userId,
      id: projectName.id,
    },
  });

  if (totalProjectNameInDatabase !== 1) {
    throw new ResponseError(404, "project name is not found");
  }

  return prismaClient.projectName.update({
    where: {
      id: projectName.id,
    },
    data: {
      title: projectName.title,
    },
    select: {
      id: true,
      title: true,
      user: {
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
        },
      },
      updatedAt: true,
    },
  });
};

// Remove Project Name service
const remove = async (user, userId, projectNameId) => {
  userId = await checkUserMustExists(user, userId);
  projectNameId = validate(getProjectNameValidation, projectNameId);

  const totalProjectNameInDatabase = await prismaClient.projectName.count({
    where: {
      userId: userId,
      id: projectNameId,
    },
  });

  if (totalProjectNameInDatabase !== 1) {
    throw new ResponseError(404, "project name is not found");
  }

  return prismaClient.projectName.delete({
    where: {
      id: projectNameId,
    },
  });
};

//    List project name service
const list = async (user, userId) => {
  userId = await checkUserMustExists(user, userId);

  return prismaClient.projectName.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      title: true,
      user: {
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
        },
      },
    },
  });
};

// Search Project Name service
const search = async (user, request) => {
  request = validate(searchProjectNameValidation, request);

  /*
  Perhitungan untuk paginate
   1 ((page -1) * size) = 0
   2 ((page -1) * size) = 10
  */
  const skip = (request.page - 1) * request.size;

  // Filters disimpan didalam array
  const filters = [];

  filters.push({
    id: user.id,
  });

  if (request.title) {
    filters.push({
      OR: [
        {
          title: {
            contains: request.title,
          },
        },
      ],
    });
  }

  const projectName = await prismaClient.projectName.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.projectName.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: projectName,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default { create, get, update, remove, search, list };
