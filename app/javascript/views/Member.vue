<template>
  <div class="container">
    <h1 style="text-align:center">Members</h1>
    <div class="c">
    <table style="width:100%" >
      <thead style="text-align:left">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Part</th>
        </tr>
      </thead>
      <tbody style="text-align:left">
        <!-- master -->
        <tr v-for="user in idM" :key="user.id" v-on:click="setUserInfo(user.id)">
          <td>{{user.studentId}}</td>
          <td>{{user.username}}</td>
          <td>{{user.part}}</td>
          <v-btn v-if='hantei' class="btn #e53935 red darken-1" v-on:click="deleteUser(user.id)">削除</v-btn>
        </tr>
        <!-- 学部 -->
        <tr v-for="user in idS" :key="user.studentId" v-on:click="setUserInfo(user.id)">
          <td>{{user.studentId}}</td>
          <td>{{user.username}}</td>
          <td>{{user.part}}</td>
          <v-btn v-if='hantei' class="btn #e53935 red darken-1" v-on:click="deleteUser(user.id)">削除</v-btn>
        </tr>
        <!-- 短大 -->
        <tr v-for="user in idA" :key="user.id" v-on:click="setUserInfo(user.id)">
          <td>{{user.studentId}}</td>
          <td>{{user.username}}</td>
          <td>{{user.part}}</td>
          <v-btn v-if='hantei' class="btn #e53935 red darken-1" v-on:click="deleteUser(user.id)">削除</v-btn>
        </tr>
        <tr v-for="user in idB" :key="user.id" v-on:click="setUserInfo(user.id)">
          <td>{{user.studentId}}</td>
          <td>{{user.username}}</td>
          <td>{{user.part}}</td>
          <v-btn v-if='hantei' class="btn #e53935 red darken-1" v-on:click="deleteUser(user.id)">削除</v-btn>
        </tr>
        <tr v-for="user in idK" :key="user.id" v-on:click="setUserInfo(user.id)">
          <td>{{user.studentId}}</td>
          <td>{{user.username}}</td>
          <td>{{user.part}}</td>
          <v-btn v-if='hantei' class="btn #e53935 red darken-1" v-on:click="deleteUser(user.id)">削除</v-btn>
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
      this.Sort();
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
            this.users.push(res.data.users[i]);
            this.a = res.data.users[i].studentId.slice( 0, 1 ) ;
              if(this.a == "s"){
                this.idS.push(this.users[i]);
              }else if(this.a == "m"){
                this.idM.push(this.users[i]);
              }else if(this.a == "a"){
                this.idA.push(this.users[i]);
              }else if(this.a == "b"){
                this.idB.push(this.users[i]);
              }else if(this.a == "k"){
                this.idK.push(this.users[i]);
              }else{
                this.idZ.push(this.users[i]);
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
      Sort() {
        // for(var i=0;i<a.length-1;i++){
        //   for(var j=a.length-1;j>i;j--){
	      //     if(a[j]<a[j-1]){
	      //       this.t=a[j];
	      //       a[j]=a[j-1];
	      //       a[j-1]=this.t;
	      //     }
        //   }
        // }
      },
    }
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
