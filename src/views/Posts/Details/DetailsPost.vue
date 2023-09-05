<template>
  <h1>Detalhes do post</h1>

{{ this.$route.query.titulo}}


</template>

<script>
export default {
  data() {
   
  },
  mounted() {

    console.log(this.$route)
    
    axios({

      data: {
        student_id: this.$route.params.id
      }
    })
  
    
  },
 
}
</script>