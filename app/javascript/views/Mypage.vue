<template>
  <div class="container">
    <h1 style="text-align:center">Mypage</h1>
    <div class="box">
      <span class="item-name">
        <v-text-field placeholder="名前" single-line solo v-model="user.username"></v-text-field>
        <v-text-field placeholder="パート" single-line solo v-model="user.part" ></v-text-field>
      </span>
       <div class="textarea-wrap">
         <textarea placeholder="好きなバンド、ジャンルなど"  rows="8" cols="80" v-model="user.likeBand"></textarea>
       </div>
       <div class="textarea-wrap">
         <textarea placeholder="一言"  rows="8" cols="80" v-model="user.message"></textarea>
       </div>
       <v-text-field placeholder="ユーザーを　”消去”　する際はここにパスワードを入力してください" single-line solo v-model="passwd2"></v-text-field>
       <p style="text-align:center">
         <v-btn type='password' class="resisterBtn" v-on:click="updateUser">入力完了</v-btn>
       </p>
       <p style="text-align:center">
         <v-btn class="btn #e53935 red darken-1" v-on:click="deleteUser(user.id)">削除</v-btn>
       </p>
       <div class="alert">
        <p>{{ message }}</p>
        <p class="created">{{ created }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import firebase from 'firebase';
  export default {
    data: function () {
    return {
      passwd2: '',
      user: {},
      message: '',
      created: '',
    }
  },
    mounted () {
      this.getUser()
    },
    methods: {
      getUser(){
        axios
      .get(`/api/users/${this.$route.params.id}.json`)
      .then(response => (this.user = response.data))
      },
      updateUser() {
        axios
        .put(`/api/users/${this.$route.params.id}`, { user: this.user })
        .then(response => {
          this.$router.push({ path: '/member' });
        })
        .catch(error => {
          console.error(error);
          if (error.response.data && error.response.data.errors) {
            this.errors = error.response.data.errors;
          }
        });
      },
      pass_vali() {
      if(this.passwd2.length < 1) {
        this.message = '※ パスワードを入力してください'
        return true
      }
      else return false
    },
      pass12_vali() {
      if(this.user.password != this.passwd2) {
        this.message = '※ パスワードが登録済みパスワードと一致しません。'
        return true
      }
      else return false
    },
      deleteUser(id) {
        if( this.pass_vali() ) return
        if( this.pass12_vali() ) return
        firebase.auth().signOut()
      axios.delete(`/api/users/${id}`)
      .then(res => {
        this.$router.push({ path: '/member' });
        })
      }
    }
  }
</script>

<style scoped>
.alert {
  height: 18px;
  font-size: 12px;
  text-align: left;
  color: red;
 }
.box {
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
textarea{
  width: 100%;
  height: 150px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
