<template>
  <div class="signin">
    <h2>Sign in</h2>
    <input type="text" placeholder="email" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signIn">Signin</button>
    <p>You don't have an account?
      <router-link to="/signup">create account now!!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'


export default {
  name: 'Signin',
  data: function () {
    return {
      username: '',
      password: '',
      idToken: null
    }
  },
  methods: {
    updateIdToken(idToken) {
        this.idToken = idToken;
     },
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
        user => {
          alert('Success!')
          // this.updateIdToken(response.data.idToken)
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        }
      )
    }
  }
}
</script>

<style scoped>
 /* 省略 */
</style>
