<template>
  <form @submit.prevent="handleCreateAccount" class="form-login">
    <h2>Criar conta</h2>

    <div class="form-element">
      <label for="name"> Nome completo </label>
      <input class="form-input" id="name" v-model="name" />
      {{ this.errors.name }}
    </div>

    <div class="form-element">
      <label for="email"> Email </label>
      <input class="form-input" id="email" v-model="email" />
      {{ this.errors.email }}
    </div>

    <div class="form-element">
      <label for="phone"> Telefone </label>
      <input class="form-input" id="phone" v-model="phone" />
    </div>

    <div class="form-element">
      <label for="password"> Senha </label>
      <input class="form-input" id="password" type="password" v-model="password" />
    </div>

    <div class="form-element">
      <label for="verifyPassword"> Confirma senha </label>
      <input class="form-input" id="verifyPassword" type="password" v-model="verifyPassword" />
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
    </div>

    <button type="submit">Criar conta</button>
  </form>
</template>
    
<script>
import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'

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
          name: yup.string().required('Nome é obrigatório').min(10, "O nome é pequeno").max(20, "O nome é grande demais"),
          email: yup.string().email('Email não é valido').required('Email é obrigatório'),
          phone: yup.string().required('Telefone é obrigatório')
        })

        schema.validateSync(
          {
            name: this.name,
            email: this.email,
            phone: this.phone
          },
          { abortEarly: false }
        )

        console.log('AQUIII')
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

.error-box {
  background: tomato;
  width: 80%;
  color: #fff;
}

.input-area {
  width: 100%;

  display: flex;
  flex-direction: column;
}

.input-area input {
  width: 100%;
}

.texto-erro {
  color: red;
  margin: 4px;
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

.input-error {
  border-color: red;
}
</style>