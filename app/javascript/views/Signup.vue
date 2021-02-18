<template>
  <div class="signup">
    <h2>Sign up</h2>
    <input type="text" placeholder="Username" v-model="user.username">
    <input type="text" placeholder="email" v-model="user.email">
    <input type="password" placeholder="Password" v-model="user.password">
    <input type="password" placeholder="Password" v-model="pass">
    <button @click="signUp">Register</button>
    <p>Do you have an account?
      <router-link to="/signin">sign in now!!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from "axios";

export default {
  name: 'Signup',
  data () {
    return {
      pass: '',
      user:{
        username: '',
        password: '',
        email:'',
        part: '',
        likeBand: '',
        message: '',
      }
    }
  },
  methods: {
    signUp: function () {
      if (this.user.password != this.pass){
         alert('Passwordが一致しません');
        return;
      }
      axios.post('/api/users', { user: this.user }).then((error) => {
          console.log(error);
      });
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.pass)
        .then(user => {
          alert('Create account: ', user.email)
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
}
</script>

<style scoped>
 /* 省略 */
</style>
