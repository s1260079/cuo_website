<template>
  <header>
    <div class="c">
    <p style="text-align:left">CUO official website</p>
    <div style="text-align:right">
      <router-link to="/">Home</router-link>
      <!-- <router-link to="/liveinfo">LiveInfo</router-link> -->
      <router-link to="/member">Member</router-link>
      <router-link to="/band">Band</router-link>
      <!-- <router-link to="/movie">Movie</router-link> -->
      <router-link to="/signin" v-if="!authenticatedUser">Signin</router-link>
      <router-link to="/signup" v-if="!authenticatedUser">Signup</router-link>
      <!-- <router-link to="/mypage" v-if="authenticatedUser">Mypage</router-link> -->
      <a @click="signOut" v-if="authenticatedUser">Signout</a>
    </div>
    </div>
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
  $background-color: white;
  header {
    width: 800px;
    color: black;
    width: 100%;
    height: 60px;
    background-color: $background-color;
    display: flex;
    flex-direction: row;
    align-items: center;
    a {
      display: inline-block;
      margin: 0 20px;
    };
    p {
      color: burlywood;
    };
  }
  .c{
    width: 800px;
    margin: auto;
    color: black;
    text-align: right;
  }
</style>
