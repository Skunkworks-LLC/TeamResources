const mongoose = require('mongoose');
const db = require('./connection.js');

const pledgeListSchema = new mongoose.Schema({
  projectId: Number,
  projectName: String,
  shipToAnywhere: Boolean,
  validLocations: [String],
  pledges: [{
    available: Boolean,
    minimumPledgeAmount: Number,
    pledgeTitle: String,
    pledgeDescription: String,
    pledgeRewards: [String],
    estimatedShipping: String,
    pledgeBackers: Number,
  }],
});

// declare a pledgeList by calling
const pledgeListModel = mongoose.model('PledgeList', pledgeListSchema);


module.exports = pledgeListModel;
