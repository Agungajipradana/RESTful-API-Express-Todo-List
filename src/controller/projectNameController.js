import projectNameService from "../service/projectNameService.js";

// create project name controller
const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const userId = req.params.userId;

    const result = await projectNameService.create(user, userId, request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// get project name controller
const get = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = req.params.userId;
    const projectNameId = req.params.projectNameId;

    const result = await projectNameService.get(user, userId, projectNameId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// update project name controller
const update = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = req.params.userId;
    const projectNameId = req.params.projectNameId;
    const request = req.body;
    request.id = projectNameId;

    const result = await projectNameService.update(user, userId, request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// remove project name controller
const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = req.params.userId;
    const projectNameId = req.params.projectNameId;

    const result = await projectNameService.remove(user, userId, projectNameId);

    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

// list project name controller
const list = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = req.params.userId;

    const result = await projectNameService.list(user, userId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// search project name controller
const search = async (req, res, next) => {
  try {
    /*
    untuk debug gunakan logger.info(req.query)
    logger.info(req.query);
    */
    const user = req.user;
    const request = {
      title: req.query.title,
    };

    const result = await projectNameService.search(user, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

export default { create, get, update, remove, search, list };
