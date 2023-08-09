<template>
  <form class="form-login">
    <h2>Criar conta</h2>

    <label for="name"> Nome completo </label>
    <input  id="name" v-model="name" />

    <label for="email"> Email </label>
    <input id="email" v-model="email" />

    <label for="phone"> Telefone </label>
    <input id="phone" v-model="phone" />

    <label for="password"> Senha </label>
    <input id="password" type="password" v-model="password" />

    <label for="verifyPassword"> Confirma senha </label>
    <input id="verifyPassword" type="password" v-model="verifyPassword" />

    {{ sponsor }}

    <label for="sponsor">Patrocinador</label>
    <select id="sponsor" v-model="sponsor">
      <option value="">Sem patrocinador</option>
      <option value="Coca cola">Coca cola</option>
      <option value="Lab 365">Lab 365</option>
      <option value="Zucchetti">Zucchetti</option>
    </select>

    <label for="bio">Sua biografia</label>
    <textarea id="bio" v-model="bio"> </textarea>

    {{ confirmTerms ? 'aceite' : 'nao aceite' }}

    <label id="confirmTerms">
      <input type="checkbox" id="confirmTerms" v-model="confirmTerms" /> Aceita termos de Uso
    </label>

    <input id="bronze" type="radio" value="1" v-model="planType" />
    <label for="bronze">Bronze</label>

    <input id="prata" type="radio" value="2" v-model="planType" /> <label for="prata">Prata</label>

    <input id="premium" type="radio" value="3" v-model="planType" />
    <label for="premium">Premium</label>
  </form>
</template>
    
<script>
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
      planType: '2'
    }
  }
}
</script>
    
<style scoped>
.error-box {
  background: tomato;
  width: 80%;
  color: #fff;
}

.form-login {
  margin: 40px auto;
  width: 40%;

  border-radius: 4px;
  border: 1px solid #383737;

  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  padding: 10px;
}

.input-area {
  width: 80%;

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

input {
  height: 54px;
  width: 80%;
  border-radius: 8px;
  border: 1px solid #756767;
  outline: none;
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