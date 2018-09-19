const express = require('express');
const path = require('path');
const cors  = require('cors');
const models = require('./../database/model.js');

const app = express();
// const distFolder = path.join(__dirname, '/../client/dist');

const publicFolder = path.join(__dirname, '/../public');
app.use(express.json(), express.urlencoded({ extended: true }), cors());
app.use(express.static(publicFolder));

app.get('/projects/:id', (req, res) => {
  const projectId = req.params.id;
  models.queryOne(projectId, (err, pledgeList) => {
    if (err) {
      return console.error(err);
    }
    return res.send(pledgeList[0]);
  });
});

app.get('/', (req, res) => {
  models.queryAll((err, pledgeLists) => {
    if (err) {
      return console.error(err);
    }
    return res.send(pledgeLists);
  });
});

app.post('/', (req, res) => {
  console.log('I got a post request');
  res.send('Nothing was posted');
});

app.listen(3001, () => {
  console.log('server is listening at port 3005');
});
