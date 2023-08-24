<template>
  <h1>Listagem de posts</h1>

  <ul style="display: none">
    <li v-for="post in posts" :key="post.id">
      <img :src="post.url" width="100" />

      <p>{{ post.title }}</p>
      <p>{{ post.description }}</p>
    </li>
  </ul>
  -----------------------------------------
  <v-card
    v-for="post in posts"
    :key="post.id"
    width="400"
    :title="post.title"
    :subtitle="post.description"
    class="mb-2"
    style="display: none"
  />

  ---------------------------------------
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Código</th>
        <th>URL</th>
        <th class="text-left">Título</th>
        <th>Descrição</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.id }}</td>
        <td><img :src="post.url" width="30" /></td>
        <td>{{ post.title }}</td>
        <td>{{ post.description }}</td>
        <td>
          <v-btn @click="() => deletarPost(post.id)">Deletar</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    this.loadPosts()
  },
  methods: {
    loadPosts() {
      const token = localStorage.getItem('instagram_token')

      axios({
        url: 'http://localhost:3000/api/posts',
        method: 'GET',
        headers: {
          Authorization: `Bearen ${token}`
        }
      })
        .then((response) => {
          this.posts = response.data.posts
        })
        .catch(() => {
          alert('deu ruim')
        })
    },
    deletarPost(id) {
      const token = localStorage.getItem('instagram_token')

      axios({
        url: 'http://localhost:3000/api/posts/' + id,
        method: 'DELETE',
        headers: {
          Authorization: `Bearen ${token}`
        }
      })
        .then(() => {
          alert('Deletado com sucesso')
          // atualizar posts 
          this.loadPosts()
        })
        .catch(() => {
          alert('erro ao deletar o post ')
        })
    }
  }
}
</script>