const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const db = require('knex')(config);

app.get('/api/logs/', (req, res) => {
  db('logDates').select().from('logDates').then(logDates => {
    res.send(logDates);
  }).catch(error => {
    res.status(500).json({ error });
  });
});

app.get('/api/logs/:id/exercises/', (req, res) => {
  let id = parseInt(req.params.id);
  db('exercises').select().from('exercises').where({dateId: id}).then(exercises => {
    // console.log(exercises);
    res.send(exercises);
  }).catch(error => {
    res.status(500).json({ error });
  });
});

app.get('/api/logs/:id/exercises/:exID/sets', (req, res) => {
  let id = parseInt(req.params.exID);
  db('sets').select().from('sets').where({exerciseId: id}).then(sets => {
    // console.log(exercises);
    res.send(sets);
  }).catch(error => {
    res.status(500).json({ error });
  });
})

app.post('/api/logs/', (req, res) => {
  db('logDates').insert({date: new Date()}).then(logDates => {
    console.log("New log was created!");
    res.status(200).json({id:logDates[0]});
  }).catch(error => {
    res.status(500).json({ error });
  });
});

app.post('/api/logs/:id/exercises/', (req, res) => {
  db('exercises').insert({name: req.body.name, dateId: req.body.dateId}).then(exercises => {
    // console.log(req.body.name);
    console.log("New exercise was created!");
    res.status(200).json({id:exercises[0]});
  }).catch(error => {
    res.status(500).json({ error });
  });
});

app.post('/api/logs/:id/exercises/:exId/sets', (req, res) => {
  console.log("Within the sets post request");
  db('sets').insert({reps: req.body.reps, weight: req.body.weight, exerciseId: req.body.exerciseId}).then(sets => {
    console.log("New set was created!");
    res.status(200).json({id:sets[0]});
  }).catch(error => {
    res.status(500).json({ error });
  });
});

app.delete('/api/logs/:id', (req, res) => {
  console.log("deleting log from server");
  let id = parseInt(req.params.id);
  db('logDates').where('id',id).del().then(logDates => {
    res.sendStatus(200);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.delete('/api/logs/:logid/exercises/:exerciseid', (req, res) => {
  console.log("deleting exercise from log");
  let id = parseInt(req.params.exerciseid);
  db('exercises').where('id',id).del().then(logDates => {
    res.sendStatus(200);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.delete('/api/logs/:logid/exercises/:exerciseid/sets/:setid', (req, res) => {
  console.log("deleting exercise from log");
  let id = parseInt(req.params.setid);
  db('sets').where('id',id).del().then(sets => {
    res.sendStatus(200);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.listen(3003, () => console.log("Server listening on port 3003!"));
