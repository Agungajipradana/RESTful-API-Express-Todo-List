import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";
import { getProjectNameValidation } from "../validation/projectNameValidation.js";
import { createTaskValidation, getTaskValidation, searchTaskValidation, updateTaskValidation } from "../validation/taskValidation.js";
import { validate } from "../validation/validation.js";

const checkProjectNameMustExists = async (user, projectNameId) => {
  projectNameId = parseInt(validate(getProjectNameValidation, projectNameId));

  const totalProjectNameInDatabase = await prismaClient.projectName.count({
    where: {
      id: user.id,
      id: projectNameId,
    },
  });

  // Mengecek data project name didatabase
  if (totalProjectNameInDatabase !== 1) {
    throw new ResponseError(404, "user is not found");
  }

  return projectNameId;
};

// Create Task service
const create = async (user, projectNameId, request) => {
  projectNameId = await checkProjectNameMustExists(user, projectNameId);
  // Jika datanya ada, dilakukan divalidasi
  const task = validate(createTaskValidation, request);
  task.projectNameId = projectNameId;

  return prismaClient.task.create({
    data: task,
    select: {
      id: true,
      todoList: true,
      todoListOnProgress: true,
      todoListDone: true,
      createdAt: true,
    },
  });
};

// Get Task service
const get = async (user, projectNameId, taskId) => {
  projectNameId = await checkProjectNameMustExists(user, projectNameId);
  taskId = validate(getTaskValidation, taskId);

  // Mengecek data task didatabase
  const task = await prismaClient.task.findFirst({
    where: {
      id: projectNameId,
      id: taskId,
    },
    select: {
      id: true,
      todoList: true,
      todoListOnProgress: true,
      todoListDone: true,
      projectName: {
        select: {
          id: true,
          title: true,
          userId: true,
        },
      },
    },
  });

  if (!task) {
    throw new ResponseError(404, "Task is not found");
  }

  return task;
};

// Update Task service
const update = async (user, projectNameId, request) => {
  projectNameId = await checkProjectNameMustExists(user, projectNameId);
  const task = validate(updateTaskValidation, request);

  const totalTaskInDatabase = await prismaClient.task.count({
    where: {
      projectNameId: projectNameId,
      id: task.id,
    },
  });

  if (totalTaskInDatabase !== 1) {
    throw new ResponseError(404, "task is not found");
  }

  return prismaClient.task.update({
    where: {
      id: task.id,
    },
    data: {
      todoList: task.todoList,
      todoListOnProgress: task.todoListOnProgress,
      todoListDone: task.todoListDone,
    },
    select: {
      id: true,
      todoList: true,
      todoListOnProgress: true,
      todoListDone: true,
      projectName: {
        select: {
          id: true,
          title: true,
          userId: true,
        },
      },
      updatedAt: true,
    },
  });
};

// Remove Project Name service
const remove = async (user, projectNameId, taskId) => {
  projectNameId = await checkProjectNameMustExists(user, projectNameId);
  taskId = validate(getProjectNameValidation, taskId);

  const totalTaskInDatabase = await prismaClient.task.count({
    where: {
      projectNameId: projectNameId,
      id: taskId,
    },
  });

  if (totalTaskInDatabase !== 1) {
    throw new ResponseError(404, "project name is not found");
  }

  return prismaClient.task.delete({
    where: {
      id: taskId,
    },
  });
};

//    List task service
const list = async (user, projectNameId) => {
  projectNameId = await checkProjectNameMustExists(user, projectNameId);

  return prismaClient.task.findMany({
    where: {
      projectNameId: projectNameId,
    },
    select: {
      id: true,
      todoList: true,
      todoListOnProgress: true,
      todoListDone: true,
      projectName: {
        select: {
          id: true,
          title: true,
          userId: true,
        },
      },
    },
  });
};

// Search Project Name service
const search = async (user, request) => {
  request = validate(searchTaskValidation, request);

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

  if (request.todoList) {
    filters.push({
      OR: [
        {
          todoList: {
            contains: request.todoList,
          },
        },
      ],
    });
  }

  if (request.todoListOnProgress) {
    filters.push({
      OR: [
        {
          todoListOnProgress: {
            contains: request.todoListOnProgress,
          },
        },
      ],
    });
  }

  if (request.todoListDone) {
    filters.push({
      OR: [
        {
          todoListDone: {
            contains: request.todoListDone,
          },
        },
      ],
    });
  }

  const task = await prismaClient.task.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.task.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: task,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default { create, get, update, remove, search, list };
