import joi from "joi";

export const createUserSchema = joi.object({
  username: joi.string().required().alphanum().min(3).max(30),
  password: joi.string().required(),
});

export const updateUserSchema = joi.object({
  username: joi.string().required().alphanum().min(3).max(30),
  password: joi.string().required(),
});

export const updateUserStatusSchema = joi.object({
  status: joi.string().required().alphanum(),
});
