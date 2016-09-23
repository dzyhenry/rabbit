'use strict';
const sendJson = require('send-data/json');

module.exports = (req, res, opts, cb) => {
  const body = {
    items: [
      {
        courseName: 'English',
        teacher: 'Henry',
        startTime: '2016-08-10',
        endTime: '2016-08-15',
      },
      {
        courseName: 'Chinese',
        teacher: 'Jim',
        startTime: '2016-08-10',
        endTime: '2016-08-15',
      },
      {
        courseName: 'Math',
        teacher: 'David',
        startTime: '2016-08-10',
        endTime: '2016-08-15',
      },
    ],
    total: 3,
  };
  sendJson(req, res, body, cb);
};
