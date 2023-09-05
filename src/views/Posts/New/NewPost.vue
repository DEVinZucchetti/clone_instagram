<template>
  <v-form @submit.prevent="handleSubmit">
      <button @click="showData">Show</button>
    <input type="date"  v-model="dataInput"/>
    {{dataInput}}

  <v-select 
  :items="['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo']" 
  v-model="day"
  >

  </v-select>

  <VueDatePicker
      v-model="dateBirth"
      :max="new Date()"
      locale="pt-BR"
      cancelText="cancelar"
      selectText="Selecionar"
      :enable-time-picker="false"
    />
   {{ errors?.dateBirth }}

    {{ dateBirth }}
    <v-text-field label="Título" variant="outlined" v-model="title" />
    <span>{{ this.errors.title }} </span>
    <v-textarea label="Descrição" v-model="description" />
    <span>{{ this.errors.description }} </span>
    <v-text-field label="URL" variant="outlined" v-model="url" />
    <span>{{ this.errors.url }} </span>
    <v-btn type="submit">Cadastrar</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'
import * as yup from 'yup'
import { captureErrorYup } from '../../../utils/captureErrorYup'

export default {
  data() {
    return {
      title: '',
      description: '',
      url: '',
      errors: {},
      dateBirth: null,
      dataInput: '',
      day: this.getCurrentDay()
    }
  },
  methods: {
    showData() {
      


    },
    getCurrentDay(){
      const value = new Date().getDay()
      
      const days = [
        {value: 'Segunda', number: 1},
        {value: 'Terça', number: 2},
        {value: 'Quarta', number: 3},
        {value: 'Quinta', number: 4},
        {value: 'Sexta', number: 5},
        {value: 'Sábado', number: 6},
        {value: 'Domingo', number: 0}
      ]

      const option = days.find(item => item.number === value)

      return option.value
    },
    handleSubmit() {
      try {
        // 1 - criar schema validation
        const schema = yup.object().shape({
          title: yup.string().required('Título é obrigatório'),
          url: yup.string().required('URL é obrigatório'),
          description: yup
            .string()
            .required('Descrição é obrigatório')
            .min(20, 'A descrição é pequena demais')
            .max(200, 'A descrição ultrapassou o limite'),
            dateBirth: yup.date()
            .max(new Date(), 'A data é no futuro')
            .required("A data é obrigatória")
        })

        schema.validateSync(
          {
            title: this.title,
            description: this.description,
            url: this.url,
            dateBirth: this.dateBirth
          },
          { abortEarly: false }
        ) // importante

        const token = localStorage.getItem('instagram_token')

        axios({
          url: 'http://localhost:3000/api/posts',
          method: 'post',
          data: {
            title: this.title,
            description: this.description,
            url: this.url,
            date: this.dateBirth
          },
          headers: {
            Authorization: `Bearen ${token}`
          }
        })
          .then(() => {
            alert('Cadastro com sucesso')
            this.title = ''
            this.url = ''
            this.description = ''
          })
          .catch(() => {
            alert('Houve um erro ao realizar o cadastro')
          })

        // ...............
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          // capturar os errors do yup
          this.errors = captureErrorYup(error)
        }
      }
    },
    mounted() {
      axios({
        url: '/exercises'
      })
      .then(response => {
        this.exercises = response.data
      })
    }
  }
}
</script>
