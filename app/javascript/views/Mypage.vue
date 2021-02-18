<template>
  <div class="container">
    <h1 class="#f3e5f5 purple lighten-5 center">Mypage</h1>
    <div>
      <div v-for="user in users" :key="user.id">
        <div>
          <span v-on:click="setUserInfo(user.id)">
            {{ user.username }}
          </span>
        </div>
      </div>
    </div>
    <div class="row" v-show="userInfoBool">
      <div>
        <div>
          <div>
            <span class="card-title" v-show="!authenticatedUser">
              【{{ userInfo.username }}】
            </span>
            <input placeholder='username' v-show="authenticatedUser" v-model="userInfo.username">
            <div class="detail" v-show="!authenticatedUser">
              ・part：{{ userInfo.part }}
            </div>
            <input placeholder='part' v-show="authenticatedUser" v-model="userInfo.part">
            <div class="detail" v-show="!authenticatedUser">
              ・likeBand：{{ userInfo.likeBand }}
            </div>
            <input placeholder='likeBand' v-show="authenticatedUser" v-model="userInfo.likeBand">
            <div class="detail" v-show="!authenticatedUser">
              ・message：{{ userInfo.message }}
            </div>
            <input placeholder='message' v-show="authenticatedUser" v-model="userInfo.message">
            <!-- <button @click="updateUser">Update</button> -->
            <button class="btn #e53935 red darken-1" v-on:click="deleteUser(userInfo.id)" v-show="authenticatedUser">削除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import firebase from 'firebase'

  export default {
    name: 'Home',
    data: function() {
      return {
        use:'',
        email:'',
        userInfo: {},
        userInfoBool: false,
        users: [],
        authenticatedUser: ''
      }
    },
    mounted: function() {
      this.firebase();
      this.fetchUsers();
    },
    methods: {
      firebase: function(){
      this.use = firebase.auth().currentUser;
      if (this.use != null) {
         this.email = this.use.email;
         this.authenticatedUser = true;
      }else {
        this.authenticatedUser = false;
      }
      },
      fetchUsers() {
        axios.get('/api/users').then((res) => {
          for(var i = 0; i < res.data.users.length; i++) {
            this.users.push(res.data.users[i]);
          }
        }, (error) => {
          console.log(error);
        });
      },
      setUserInfo(id){
        axios.get(`api/users/${id}.json`).then(res => {
          this.userInfo = res.data;
          this.userInfoBool = true;
        });
      },
      deleteUser(id) {
      axios.delete(`/api/users/${id}`).then(res => {
        this.users = [];
        this.userInfo = '';
        this.userInfoBool = false;
        this.fetchUsers();
        })
      }
    },
    // updateUser() {
    //     axios
    //     .put(`/api/users/${this.$route.params.id}`, { user: this.user })
    //     .then(response => {
    //       this.$router.push({ path: '/mypage' });
    //     })
    //     .catch(error => {
    //       console.error(error);
    //       if (error.response.data && error.response.data.errors) {
    //         this.errors = error.response.data.errors;
    //       }
    //     });
    //   }
  }
</script>

<style scoped></style>
