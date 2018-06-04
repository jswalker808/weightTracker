let app = new Vue({
  el: '#app',
  data: {
    logs: [
      {

      }
    ],
    logID: '',
    dateId: '',
  },
  created: function() {
    this.getLogs();
  },
  watch: {

  },
  methods: {
    getLogs: function() {
      axios.get('/api/logs/').then(response => {
        this.logs = response.data;
        this.addExerciseProperty();
        this.logs.reverse();
        this.getAllExercises();
        return true;
      }).catch(err => {
      });
    },
    createNewLog: function() {
      axios.post('/api/logs/').then(response => {
        this.getLogs();
        return true;
      }).catch(err => {
      });
    },
    deleteLog: function(log, index) {
      // console.log("In deleteLog function!");
      this.deleteAllExercises(index);
      axios.delete('/api/logs/' + log.id).then(response => {
        this.getLogs();
        return true;
      }).catch(err => {
      });
    },
    getExercises: function(logID, index) {
      // console.log("Within the getExercises function");
      axios.get('/api/logs/' + logID + '/exercises/').then(response => {
        this.logs[index].exercises = response.data;
        this.addSetProperty(index);
        this.getAllSets(index);
        return true;
      }).catch(err => {
      });
    },
    getAllExercises: function() {
      // console.log("Within the getAllExercises function");
      // console.log(this.logs.length);
      for (let i = 0; i < this.logs.length; i++) {
        // console.log("hello there");
        this.getExercises(this.logs[i].id, i);
      }
      console.log(this.logs);
    },
    createNewExercise: function(log, index) {
      axios.post('/api/logs/' + log.id + '/exercises/', {
        name: this.logs[index].exercises.name,
        dateId: log.id,
      }).then(response => {
        this.getExercises(log.id, index);
        return true;
      }).catch(err => {
      });
      console.log(this.logs[index]);
    },
    deleteExercise: function(log, exercise, index, exIndex) {
      this.deleteAllSets(index, exIndex);
      axios.delete('/api/logs/' + log.id + '/exercises/'+ exercise.id).then(response => {
        this.getLogs();
        return true;
      }).catch(err => {
      });
    },
    deleteAllExercises: function(index) {
      for (let i = 0; i < this.logs[index].exercises.length; i++) {
        this.deleteExercise(this.logs[index].id, this.logs[index].exercises[i], index, i);
      }
    },
    addExerciseProperty: function() {
      for (let i = 0; i < this.logs.length; i++) {
        // this.logs[i].exercises = [];
        Vue.set(this.logs[i], 'exercises', []);
      }
    },
    getSet: function(logID, logIndex, exerciseID, exerciseIndex) {
      axios.get('/api/logs/' + logID + '/exercises/' + exerciseID + '/sets').then(response => {
        this.logs[logIndex].exercises[exerciseIndex].sets = response.data;
        return true;
      }).catch(err => {
      });
    },
    getAllSets: function(index) {
      console.log(index);
      console.log(this.logs[index]);
      for (let i = 0; i < this.logs[index].exercises.length; i++) {
        this.getSet(this.logs[index].id, index, this.logs[index].exercises[i].id, i);
      }
    },
    createNewSet: function(log, logIndex, exercise, exerciseIndex) {
      console.log(this.logs[logIndex].exercises[exerciseIndex]);
      axios.post('/api/logs/' + log.id + '/exercises/' + exercise.id + '/sets', {
        reps: this.logs[logIndex].exercises[exerciseIndex].sets.reps,
        weight: this.logs[logIndex].exercises[exerciseIndex].sets.weight,
        exerciseId: exercise.id,
      }).then(response => {
        this.getSet(log.id, logIndex, exercise.id, exerciseIndex);
        return true;
      }).catch(err => {
      });
    },
    deleteSet: function(log, exercise, set) {
      axios.delete('/api/logs/' + log.id + '/exercises/'+ exercise.id + '/sets/' + set.id).then(response => {
        this.getLogs();
        return true;
      }).catch(err => {
      });
    },
    deleteAllSets: function(logIndex, exIndex) {
      console.log("the log index is " + logIndex);
      console.log("the exercise index is " + exIndex);
      for (let i = 0; i < this.logs[logIndex].exercises[exIndex].sets.length; i++) {
        this.deleteSet(this.logs[logIndex], this.logs[logIndex].exercises[exIndex], this.logs[logIndex].exercises[exIndex].sets[i]);
      }
    },
    addSetProperty: function(index) {
      for (let i = 0; i < this.logs[index].exercises.length; i++) {
        Vue.set(this.logs[index].exercises[i], 'sets', []);
      }
    },
  },
});
