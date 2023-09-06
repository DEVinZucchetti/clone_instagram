<template>
  <h1>Detalhes do post</h1>
   {{ this.$route.query.titulo }}

   <div>
      <p>Segunda </p>
        <ul>
          <li v-for="workout in segunda" :key="workout.id">

              {{ workout.exercise_description}} -    {{ workout.day}}
          </li>
        </ul> 
   </div>

 
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      workouts: [],
      segunda: []
    }
  },
  methods: {
    pegarList(day) {
      // ......
    }
  },
  computed: {
    dadosSegunda() {
      return this.workouts.filter(item => item.day === 'SEGUNDA')
    }
  },
  mounted() {
    axios({
      url: `http://localhost:3000/workouts?student_id=1`,
      method: 'GET'
    })
      .then((response) => {
        // minha resposta
        this.workouts = response.data.workouts

        this.segunda = response.data.workouts.filter(item => item.day === 'SEGUNDA')
      })
      .catch(() => {})
  }
}
</script>