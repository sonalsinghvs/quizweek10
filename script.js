var baseURL = 'http://jservice.io/';

Vue.component('streaming-quiz', {
  template: `<div v-bind:class = "['quiz']">
    <h3>{{quiz.question}}</h3>
    <small>{{quiz.answer}}</small>
    <small>{{quiz.category_id}}</small>
    <small>{{quiz.category.title}}</small>

  </div>`,
  props: ['quiz']

});

var vm = new Vue({
  el: '#app',
  data: {
    catogoriesList: ['The history channel: 4276', 'A potpourri of history: 16929', 'Medical talk: 6016', 'World currency: 10641', 'Notable Women: 1957', 'World Captials: 78'],
    defaultCategory: '78',
    questions: []
  },
  methods: {

    getQuestions: function() {
      console.log('defaultCategory is:', this.defaultCategory);

      axios.get(baseURL + 'api/clues', { params: { category: this.defaultCategory } }).then(response => {
        console.log('Response is:', response);
        vm.questions = response.data;
        // debugging info: console.log('Number of Questions', vm.questions.length);
      });
    },

    selectRandomQuestion: function () {
      value = Math.ceil(Math.random() * vm.questions.length)
      question = this.questions[value];
      console.log('You are in second fnuction', value);
      return question.question;
    }
},

  created: function () {
    this.getQuestions();
  }
})