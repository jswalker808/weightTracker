let app = new Vue({
  el: '#app',
  data: {
    logs: [],
    logID: '',
    exercises: [],
    dateId: '',
    exerciseName: '',
  },
  created: function() {
    this.getLogs();
  },
  methods: {
    getLogs: function() {
      axios.get('/api/logs/').then(response => {
        this.logs = response.data;
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
    deleteLog: function(log) {
      console.log("In deleteLog function!");
      axios.delete('/api/logs/' + log.id).then(response => {
        this.getLogs();
        return true;
      }).catch(err => {
      });
    },
    getExercises: function(logID) {
      console.log("Within the getExercises function");
      axios.get('/api/logs/' + logID + '/exercises/').then(response => {
        this.exercises = response.data;
        return true;
      }).catch(err => {
      });
    },
    getAllExercises: function() {
      console.log("Within the getAllExercises function");
      console.log(this.logs.length);
      for (let i = 0; i < this.logs.length; i++) {
        console.log(this.logs[i].id);
        this.getExercises(this.logs[i].id);
      }
    },
    createNewExercise: function(log) {
      console.log("in createNewExercise function");
      axios.post('/api/logs/' + log.id + '/exercises/', {
        name: this.exerciseName,
        dateId: log.id,
      }).then(response => {
        this.getExercises(log.id);
        return true;
      }).catch(err => {
      });
    },
  },
});
