import taskService from "../service/taskService.js";

// create task controller
const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const projectNameId = req.params.projectNameId;

    const result = await taskService.create(user, projectNameId, request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// get task controller
const get = async (req, res, next) => {
  try {
    const user = req.user;
    const projectNameId = req.params.projectNameId;
    const taskId = req.params.taskId;

    const result = await taskService.get(user, projectNameId, taskId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// update task controller
const update = async (req, res, next) => {
  try {
    const user = req.user;
    const projectNameId = req.params.projectNameId;
    const taskId = req.params.taskId;
    const request = req.body;
    request.id = taskId;

    const result = await taskService.update(user, projectNameId, request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// remove task controller
const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const projectNameId = req.params.projectNameId;
    const taskId = req.params.taskId;

    const result = await taskService.remove(user, projectNameId, taskId);

    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

// list task controller
const list = async (req, res, next) => {
  try {
    const user = req.user;
    const projectNameId = req.params.projectNameId;

    const result = await taskService.list(user, projectNameId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// search task controller
const search = async (req, res, next) => {
  try {
    /*
    untuk debug gunakan logger.info(req.query)
    logger.info(req.query);
    */
    const user = req.user;
    const request = {
      todoList: req.query.todoList,
      todoListOnProgress: req.query.todoListOnProgress,
      todoListDone: req.query.todoListDone,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await taskService.search(user, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

export default { create, get, update, remove, search, list };
