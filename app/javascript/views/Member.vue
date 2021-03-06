<template>
  <div class="container">
    <h1 style="text-align:center">Members</h1>
    <div class="c">
    <table style="width:100%" >
      <thead style="text-align:center">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Part</th>
        </tr>
      </thead>
      <tbody style="text-align:center">
        <!-- master -->
        <div class="d" style="text-align:left">院生</div>
        <tr v-for="user in idM" :key="user.id" v-on:click="setUserInfo(user.id)">
          <td>{{user.studentId}}</td>
          <td>{{user.username}}</td>
          <td>{{user.part}}</td>
          <v-btn v-if='hantei' class="btn #e53935 red darken-1" v-on:click="deleteUser(user.id)">削除</v-btn>
        </tr>
        <!-- 学部 -->
        <div class="d" style="text-align:left">学部生</div>
        <tr v-for="user in idS" :key="user.studentId" v-on:click="setUserInfo(user.id)">
          <td>{{user.studentId}}</td>
          <td>{{user.username}}</td>
          <td>{{user.part}}</td>
          <v-btn v-if='hantei' class="btn #e53935 red darken-1" v-on:click="deleteUser(user.id)">削除</v-btn>
        </tr>
        <!-- 短大 -->
        <div class="d" style="text-align:left">短大/産業情報</div>
        <tr v-for="user in idA" :key="user.id" v-on:click="setUserInfo(user.id)">
          <td>{{user.studentId}}</td>
          <td>{{user.username}}</td>
          <td>{{user.part}}</td>
          <v-btn v-if='hantei' class="btn #e53935 red darken-1" v-on:click="deleteUser(user.id)">削除</v-btn>
        </tr>
        <div class="d" style="text-align:left">短大/食物栄養</div>
        <tr v-for="user in idB" :key="user.id" v-on:click="setUserInfo(user.id)">
          <td>{{user.studentId}}</td>
          <td>{{user.username}}</td>
          <td>{{user.part}}</td>
          <v-btn v-if='hantei' class="btn #e53935 red darken-1" v-on:click="deleteUser(user.id)">削除</v-btn>
        </tr>
        <div class="d" style="text-align:left">短大/幼児教育</div>
        <tr v-for="user in idK" :key="user.id" v-on:click="setUserInfo(user.id)">
          <td>{{user.studentId}}</td>
          <td>{{user.username}}</td>
          <td>{{user.part}}</td>
          <v-btn v-if='hantei' class="btn #e53935 red darken-1" v-on:click="deleteUser(user.id)">削除</v-btn>
        </tr>
        <div class="d" style="text-align:left">その他</div>
        <tr v-for="user in idZ" :key="user.id" v-on:click="setUserInfo(user.id)">
          <td>{{user.studentId}}</td>
          <td>{{user.username}}</td>
          <td>{{user.part}}</td>
          <v-btn v-if='hantei' class="btn #e53935 red darken-1" v-on:click="deleteUser(user.id)">削除</v-btn>
        </tr>
      </tbody>
    </table>
    <div  style="text-align:center" class="row" v-show="userInfoBool">
      <div>
        <div>
          <div style="text-align:center">
            <p> </p>
            <span class='e'>
              【{{ userInfo.username }}】
            </span>
            <div >
              <div class='e'>
                ・パート：
              </div>
              <p> {{ userInfo.part }}</p>
            </div>
            <div >
              <div class='e'>
                ・好きなバンド、ジャンルなど：
              </div>
              <p> {{ userInfo.likeBand }}</p>
            </div>
            <div>
              <div class='e'>
                ・一言：
              </div>
              <p>{{ userInfo.message }} </p>
            </div>
             <router-link :to="{ path: `/mypage/${userInfo.id}` }" v-if="authenticatedUser">編集</router-link>
             <v-btn v-if='hantei' class="btn #e53935 red darken-1" v-on:click="deleteUser(user.id)">削除</v-btn>
            </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import firebase from 'firebase'

  export default {
    name: 'Home',
    data: function() {
      return {
        count: '',
        idS: [],
        idM: [],
        idA: [],
        idB: [],
        idK: [],
        idZ: [],
        hantei: '',
        use:'',
        email:'',
        userInfo: {},
        userInfoBool: false,
        users: [
        ],
        authenticatedUser: ''
      }
    },
    mounted: function() {
      this.firebase();
      this.fetchUsers();
      // this.Sort();
    },
    methods: {
      firebase: function(){
        this.use = firebase.auth().currentUser;
        if (this.use != null) {
            this.email = this.use.email;
            if(this.email == 's1260079@u-aizu.ac.jp'){
              this.hantei= true;
            }
        }
      },
      fetchUsers() {
        axios.get('/api/users').then((res) => {
            for(var i = 0; i < res.data.users.length; i++) {
              this.users.push(res.data.users[i])
            }
          for(var i = 0; i < res.data.users.length; i++) {
            this.a = res.data.users[i].studentId.slice( 0, 1 ) ;
              if(this.a == "s"){
                this.idS.push(res.data.users[i]);
                this.count += 1;
              }else if(this.a == "m"){
                this.idM.push(res.data.users[i]);
              }else if(this.a == "a"){
                this.idA.push(res.data.users[i]);
              }else if(this.a == "b"){
                this.idB.push(res.data.users[i]);
              }else if(this.a == "k"){
                this.idK.push(res.data.users[i]);
              }else{
                this.idZ.push(res.data.users[i]);
              }
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
      deleteUser(id) {
      axios.delete(`/api/users/${id}`).then(res => {
        this.users = [];
        this.userInfo = '';
        this.userInfoBool = false;
        this.fetchUsers();
        })
      },
    }
  }
</script>

<style scoped>
thead{
  background-color: #555555
}
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
  background-color: #EEEEEE;
}
.row {
  background-color: white;
}
.d{
  color: black;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
}
.e{
  color: black;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
