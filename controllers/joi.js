const Joi = require('joi');

const productSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': '상품 제목의 형식이 올바르지 않습니다.'
  }),
  content: Joi.string().required().messages({
    'any.required': '상품 내용의 형식이 올바르지 않습니다.'
  }),
  price: Joi.number().required().messages({
    'number.base': '가격은 숫자이어야 합니다.',
    'any.required': '상품 가격의 형식이 올바르지 않습니다.'
  }),
  category: Joi.string().required().messages({
    'any.required': '상품 카테고리의 형식이 올바르지 않습니다.'
  }),
  photo_ip: Joi.string().required().messages({
    'any.required': '상품 사진 주소가 올바르지 않습니다.'
  }),
});

module.exports = {productSchema};
