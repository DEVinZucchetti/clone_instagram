<template>
  <form @submit.prevent="handleCreateAccount" class="form-login">
    <h2>Criar conta</h2>

    <div class="form-element">
      <label for="name"> Nome completo </label>
      <input class="form-input" id="name" v-model="name" />
      <span class="message-error">{{ this.errors.name }}</span>
    </div>

    <div class="form-element">
      <label for="email"> Email </label>
      <input class="form-input" id="email" v-model="email" />
      <span class="message-error">{{ this.errors.email }}</span>
    </div>

    <div class="form-element">
      <label for="phone"> Telefone </label>
      <input class="form-input" id="phone" v-model="phone" />
      <span class="message-error">{{ this.errors.phone }}</span>
    </div>

    <div class="form-element">
      <label for="password"> Senha </label>
      <input class="form-input" id="password" type="password" v-model="password" />
      <span class="message-error">{{ this.errors.password }}</span>
    </div>

    <div class="form-element">
      <label for="verifyPassword"> Confirma senha </label>
      <input class="form-input" id="verifyPassword" type="password" v-model="verifyPassword" />
      <span class="message-error">{{ this.errors.verifyPassword }}</span>
    </div>

    <div class="form-element">
      <label for="sponsor">Patrocinador</label>
      <select id="sponsor" v-model="sponsor" class="form-select">
        <option value="">Sem patrocinador</option>
        <option value="Coca cola">Coca cola</option>
        <option value="Lab 365">Lab 365</option>
        <option value="Zucchetti">Zucchetti</option>
      </select>
    </div>

    <div class="form-element">
      <label for="bio">Sua biografia</label>
      <textarea id="bio" v-model="bio" class="form-textarea"> </textarea>
    </div>

    <div class="form-element">
      <p>Selecione um tipo de plano:</p>

      <div class="form-radio">
        <input id="bronze" type="radio" value="1" v-model="planType" />
        <label for="bronze">Bronze</label>
      </div>

      <div class="form-radio">
        <input id="prata" type="radio" value="2" v-model="planType" />
        <label for="prata">Prata</label>
      </div>

      <div class="form-radio">
        <input id="premium" type="radio" value="3" v-model="planType" />
        <label for="premium">Premium</label>
      </div>
    </div>

    <div class="form-element">
      <label id="confirmTerms">
        <input type="checkbox" id="confirmTerms" v-model="confirmTerms" /> Aceita termos de Uso
      </label>
      <span class="message-error">{{ this.errors.confirmTerms }}</span>
    </div>

    <button type="submit">Criar conta</button>
  </form>
</template>
    
<script>
import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      verifyPassword: '',
      sponsor: '',
      bio: '',
      confirmTerms: true,
      planType: '2',

      errors: {}
    }
  },
  methods: {
    handleCreateAccount() {
      try {
        // 1 - CRIAR SCHEMA VALIDATION
        const schema = yup.object().shape({
          name: yup.string().required('Nome é obrigatório'),
          email: yup.string().email('Email não é valido').required('Email é obrigatório'),
          phone: yup.string().required('Telefone é obrigatório'),
          password: yup
            .string()
            .min(8, 'A senha deve ser maior')
            .max(20, 'Deve ter entre 8-20 letras')
            .required('A senha é obrigatória'),
          verifyPassword: yup
            .string()
            .required('A confirmação necessária')
            .oneOf([yup.ref('password')], 'As senhas devem coincidir'),
          confirmTerms: yup.boolean().isTrue('O termo de uso deve ser aceito')
        })

        schema.validateSync(
          {
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            verifyPassword: this.verifyPassword,
            confirmTerms: this.confirmTerms
          },
          { abortEarly: false } // importante
        )

        // Cadastro de usuario

        axios({
          url: 'http://localhost:3000/api/register',
          method: 'POST',
          data: {
            name: this.name,
            email: this.email,
            contact: this.phone,
            password: this.password,
            sponsor: this.sponsor,
            bio: this.bio,
            confirmTerms: this.confirmTerms,
            planType: this.planType
          }
        })
          .then(() => {
            alert('Cadastrado com sucesso')
            this.$router.push('/')
          })
          .catch((error) => {
            console.log(error)
            if(error.response?.data?.message) {
                alert(error.response.data.message)
            } else {
              alert('Houve uma falha ao tentar cadastrar')
            }
          })

      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error)
          // capturar os errors do yup
          this.errors = captureErrorYup(error)
        }
      }
    }
  }
}
</script>
    
<style scoped>
.form-login {
  margin: 40px auto;
  width: 40%;

  border-radius: 4px;
  border: 1px solid #383737;

  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  padding: 10px;
}

.form-element {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.form-select,
.form-input,
.form-textarea {
  height: 34px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #756767;
  outline: none;
}

.form-textarea {
  height: 68px;
}

.form-radio {
  display: flex;
  align-items: center;
  gap: 5px;
}

.message-error {
  color: red;
  margin: 4px;
}

.input-error {
  border-color: red;
}

button {
  width: 80%;
  height: 54px;
  background-color: #3578e5;

  color: white;
  font-size: 18px;
  border-radius: 8px;
  border: none;
}

button:hover {
  background-color: #286ee0;
}
</style>