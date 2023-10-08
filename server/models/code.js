const mongoose = require('mongoose')
const _ = require('lodash')

const Schema = mongoose.Schema

const CodeSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  targetUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

CodeSchema.methods.toJSON = function () {
  const o = this;

  const oObject = o.toObject();

  return _.pick(oObject, ['_id', 'owner', 'targetUrl']);
};

const Code = mongoose.model('Code', CodeSchema);

module.exports = {Code};