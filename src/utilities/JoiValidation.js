import Joi from "joi";

export const schemaMaker = (schema) => {
    return Joi.object(schema);
};

export const requiredString = (label, message = null) => {
    return Joi.string()
        .required()
        .messages({
            "string.empty": `پرکردن فیلد ${label} الزامیست`,
            "any.required": `پرکردن فیلد ${label} الزامیست`,
        });
};

export const requiredStringMin = (label, min, message = null) => {
    return Joi.string()
        .required()
        .min(min)
        .messages({
            "string.empty": `پر کردن فیلد ${label} الزامیست`,
            "string.min": `${label} باید حداقل شامل ${min} حرف باشد`,
            "any.required": `پر کردن فیلد ${label} الزامیست`,
        });
};

export const requiredNumber = (label, message = null) => {
    return Joi.number()
        .required()
        .messages({
            "number.base": `پرکردن فیلد ${label} الزامیست`,
            "string.empty": `پرکردن فیلد ${label} الزامیست`,
            "any.required": `پرکردن فیلد ${label} الزامیست`,
        });
};

export const requiredObject = () => {
    return Joi.object()
        .required()
        .messages({
            "string.empty": `نام کاربری باید پر شود`,
            "string.min": `نام کاربری باید حداقل شامل 3 حرف باشد`,
            "any.required": `پرکردن این فیلد الزامیست`,
        });
};