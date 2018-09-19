const pledgeListModel = require('./index.js');


module.exports = {
  queryAll: (callback) => {
    pledgeListModel.find({}, (err, pledgeLists) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, pledgeLists);
    });
  },
  queryOne: (projectId, callback) => {
    pledgeListModel.find({ projectId }, (err, pledgeList) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, pledgeList);
    });
  },
};
