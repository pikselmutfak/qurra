const mongoose = require('mongoose')
const _ = require('lodash')

const LogSchema = new mongoose.Schema({
  identifier: String,
  requestedBy: String,
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

LogSchema.methods.toJSON = function () {
  const o = this;

  const oObject = o.toObject();

  return _.pick(oObject, ['_id', 'owner', 'requestedBy', 'userAgent']);
};

const Log = mongoose.model('Log', LogSchema);

module.exports = {Log};