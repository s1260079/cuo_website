<template>
  <div class="container">
    <h1 style="text-align:center">Members</h1>
    <div class="c">
    <table class="display" style="width:100%" >
      <thead style="text-align:left">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Part</th>
        </tr>
      </thead>
      <tbody style="text-align:left">
        <tr v-for="user in users" :key="user.id" v-on:click="setUserInfo(user.id)">
          <td>{{user.id}}</td>
          <td>{{user.username}}</td>
          <td>{{user.part}}</td>
        </tr>
      </tbody>
    </table>
    <div class="row" v-show="userInfoBool">
      <div>
        <div>
          <div>
            <p> </p>
            <span class="card-title">
              【{{ userInfo.username }}】
            </span>
            <div class="detail">
              ・パート：{{ userInfo.part }}
            </div>
            <div class="detail">
              ・好きなバンド、ジャンルなど：{{ userInfo.likeBand }}
            </div>
            <div class="detail">
              ・一言：{{ userInfo.message }}
            </div>
            <router-link :to="{ path: `/mypage/${userInfo.id}` }" class="btn" v-show="authenticatedUser">編集</router-link>
          </div>
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
        this.authenticatedUser = '';
        axios.get(`api/users/${id}.json`).then(res => {
          this.userInfo = res.data;
          this.userInfoBool = true;
          if (this.userInfo.email == this.email) {
             this.authenticatedUser = true;
          }else {
             this.authenticatedUser = false;
      }
        });
      },
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

<style scoped>
.c{
  width: 800px;
  margin: auto;
}
h1 {
    color: black;
    /* background-color: #F8F8FF; */
    font-weight: 900;
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 30px;
  }
table {
  background-color: #F8F8FF;
}
.row {
  background-color: white;
}
</style>
