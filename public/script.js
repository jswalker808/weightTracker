let app = new Vue({
  el: '#app',
  data: {
    logs: [],
    logID: '',
    dateId: '',
  },
  created: function() {
    this.getLogs();
  },
  computed: {
    
  },
  methods: {
    getLogs: function() {
      axios.get('/api/logs/').then(response => {
        this.logs = response.data;
        for (let i = 0; i < this.logs.length; i++) {
          this.logs[i].exercises = [];
        }
        this.logs.reverse();
        console.log(this.logs);
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
    getExercises: function(logID, index) {
      console.log("Within the getExercises function");
      axios.get('/api/logs/' + logID + '/exercises/').then(response => {
        this.logs[index].exercises = response.data;
        console.log(this.logs[index].exercises);
        return true;
      }).catch(err => {
      });
    },
    // getAllExercises: function() {
    //   console.log("Within the getAllExercises function");
    //   console.log(this.logs.length);
    //   for (let i = 0; i < this.logs.length; i++) {
    //     console.log(this.logs[i].id);
    //     this.getExercises(this.logs[i].id);
    //   }
    // },
    createNewExercise: function(log, index) {
      axios.post('/api/logs/' + log.id + '/exercises/', {
        name: this.logs[index].exercises.name,
        dateId: log.id,
      }).then(response => {
        this.getExercises(log.id, index);
        return true;
      }).catch(err => {
      });
      console.log(this.logs);
    },
  },
});
