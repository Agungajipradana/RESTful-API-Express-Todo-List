import Joi from "joi";

// Create Task Validation
const createTaskValidation = Joi.object({
  todoList: Joi.string().max(255).optional(),
  todoListOnProgress: Joi.string().max(255).optional(),
  todoListDone: Joi.string().max(255).optional(),
});

// Get Task Validation
const getTaskValidation = Joi.number().min(1).positive().required();

// Update Task Validation
const updateTaskValidation = Joi.object({
  id: Joi.number().positive().required(),
  todoList: Joi.string().max(255).allow(null),
  todoListOnProgress: Joi.string().max(255).allow(null),
  todoListDone: Joi.string().max(255).allow(null),
}).xor("todoList", "todoListOnProgress", "todoListDone");

// Search Task Validation
const searchTaskValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  todoList: Joi.string().max(255).optional(),
  todoListOnProgress: Joi.string().max(255).optional(),
  todoListDone: Joi.string().max(255).optional(),
});

export { createTaskValidation, getTaskValidation, updateTaskValidation, searchTaskValidation };
