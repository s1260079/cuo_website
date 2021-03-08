<template>
  <header>
    <div class="c">
    <p style="text-align:left">CUO official website</p>
    <div style="text-align:center" >
      <v-btn  elevation="0" large class="btn white"  >
        <router-link to="/" class="d">Home</router-link>
      </v-btn>
      <v-btn  elevation="0" large class="btn #e53935 white" >
        <router-link to="/member" class="d">Member</router-link>
      </v-btn>
      <v-btn elevation="0" large class="btn #e53935 white" >
        <router-link to="/band" class="d">Band</router-link>
      </v-btn>
      <v-btn elevation="0" large class="btn #e53935 white" v-if="!authenticatedUser">
        <router-link to="/signin" v-if="!authenticatedUser" class="d">Signin</router-link>
      </v-btn>
      <v-btn elevation="0" large class="btn #e53935 white" v-if="!authenticatedUser">
        <router-link to="/signup" v-if="!authenticatedUser" class="d">Signup</router-link>
      </v-btn>
      <!-- <v-btn elevation="0" large class="btn #e53935 white" >
        <router-link to="/liveinfo" class="d">LiveInfo</router-link>
      </v-btn> -->
      <v-btn v-if="authenticatedUser" elevation="0" large class="btn #e53935 white" >
        <a @click="signOut" v-if="authenticatedUser" class="d">Signout</a>
      </v-btn>
      <!-- <v-btn elevation="6" large >
        <router-link to="/liveinfo">LiveInfo</router-link>
      </v-btn> -->
      <!-- <router-link to="/liveinfo">LiveInfo</router-link> -->
      <!-- <router-link to="/movie">Movie</router-link> -->
      <!-- <router-link to="/mypage" v-if="authenticatedUser">Mypage</router-link> -->
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
    // text-align: right;
  }
  .d{
    color: black;
    text-decoration:none;
  }
</style>
