const mongoose = require('mongoose')
const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')

const Schema = mongoose.Schema

const CodeSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  identifier: String,
  context: [{
    platform: {
      title: String,
      value: String
    },
    active: Boolean,
    url: String,
    title: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

CodeSchema.pre('save', function (next) {

  const obj = this

  obj.identifier = uuidv4();

  next()

})


CodeSchema.methods.toJSON = function () {
  const o = this;

  const oObject = o.toObject();

  return _.pick(oObject, ['_id', 'owner', 'context', 'identifier']);
};

const Code = mongoose.model('Code', CodeSchema);

module.exports = {Code};