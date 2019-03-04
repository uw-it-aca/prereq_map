import Vue from 'vue/dist/vue.js';

import CourseSearch from "./components/course-search.vue";
import CourseDetail from "./components/course-detail.vue";

console.log("I am Vue!")

new Vue({
  delimiters: ['[[', ']]'],
  el: '#vue_course',
  components: {
    'course-search' : CourseSearch,
    'course-detail' : CourseDetail
  }
})
