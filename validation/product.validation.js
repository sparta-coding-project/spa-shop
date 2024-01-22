import Joi from "joi";

const productValidationSchema = Joi.object({
  title: Joi.string().required().not(""),
  content: Joi.string().required().not(""),
  author: Joi.string().required().not(""),
  isSales: Joi.string().required().valid('FOR_SALE', "SOLD_OUT").not(""),
  password: Joi.string().min(4).not(""),
});

export default productValidationSchema
