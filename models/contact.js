const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSaveErr } = require('../helpers');

const emailRegexp = /(^[^@.]+)@([^@.]+)\.{1}(\w{1,6}$)/;
const phoneRegexp = /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      match: emailRegexp,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      unique: true,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveErr);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': `"name" should be a type of string`,
    'any.required': `"name" is a required field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.base': `"email" should be a type of string`,
    'any.required': `"email" is a required field`,
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    'string.base': `"phone" should be a type of string`,
    'any.required': `"phone" is a required field`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
