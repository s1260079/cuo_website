<template>
  <header>
    <span>{{ message }}</span>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/signin" v-if="!authenticatedUser">Signin</router-link>
    <router-link to="/signup" v-if="!authenticatedUser">Signup</router-link>
    <router-link to="/mypage">Mypage</router-link>
    <button @click="signOut" v-if="authenticatedUser">Signout</button>
  </header>
</template>
<script>
  import firebase from 'firebase'
  export default {
    data () {
    return {
      message: "Header",
      authenticatedUser: ''
      // msg: 'Welcome to Your Vue.js App',
      // name: firebase.auth().currentUser.email
    }
  },
  mounted() {
    this.firebase();
  },
  methods: {
    firebase: function(){
      firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('login');
        this.authenticatedUser = true;
      } else {
        console.log('logout');
        this.authenticatedUser = false;
      }
    });
    },
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
};
</script>
<style lang="scss" scoped>
  $background-color: skyblue;
  header {
    width: 100%;
    height: 80px;
    background-color: $background-color;
    display: flex;
    flex-direction: row;
    align-items: center;
    a {
      display: inline-block;
      margin: 0 20px;
    }
  }
</style>
