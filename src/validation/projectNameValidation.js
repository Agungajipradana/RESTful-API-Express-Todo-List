import Joi from "joi";

// Create Project Name Validation
const createProjectNameValidation = Joi.object({
  title: Joi.string().max(100).required(),
});

// Get Project Name Validation
const getProjectNameValidation = Joi.number().positive().required();

// Validasi parameter permintaan GET
const getProjectListValidation = Joi.object({
  title: Joi.string().min(1).max(255).allow(""), // Judul opsional, minimal 1 karakter, maksimal 255 karakter
}).options({ allowUnknown: true });

// Update Project Name Validation
const updateProjectNameValidation = Joi.object({
  id: Joi.number().positive().required(),
  title: Joi.string().max(100).required(),
});

// Search Project Name Validation
const searchProjectNameValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  title: Joi.string().optional(),
});

export { createProjectNameValidation, getProjectNameValidation, updateProjectNameValidation, searchProjectNameValidation, getProjectListValidation };
