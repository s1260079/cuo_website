<template>
  <div class="container">
    <h1 style="text-align:center">Band Data</h1>
    <div style="text-align:center">
      <router-link to="/bandcreate" >Bandの登録はこちら</router-link>
      <div class="c"></div>
    </div>
    <div>
      <span class="c" v-for="band in bands" :key="band.id">
        <router-link :to="{ path: `/bandedit/${band.id}` }" style="text-decoration:none;" >
        <div style="text-align:center" class="table">
            <p class="title-font">{{ band.bandTitle }}</p>
            <p>{{ band.bandContent }}</p>
            <p>一言：{{ band.message }}</p>
            <p style="text-align:center">
               <v-btn v-if='hantei' class="btn #e53935 red darken-1" v-on:click="deleteBand(band.id)">削除</v-btn>
            </p>
        </div>
        </router-link>
        <div class="c"></div>
      </span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import firebase from 'firebase'

  export default {
    name: 'bandHome',
    data: function() {
      return {
        email: '',
        hantei: '',
        bandInfo: {},
        bandInfoBool: false,
        bands: [],
        showbtn: '',
      }
    },
    mounted: function() {
      this.fetchBands();
      this.firebase();
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
      fetchBands() {
        axios.get('/api/bands').then((res) => {
          for(var i = 0; i < res.data.bands.length; i++) {
            this.bands.push(res.data.bands[i]);
          }
        }, (error) => {
          console.log(error);
        });
      },
      setBandInfo(id){
        axios.get(`api/bands/${id}.json`).then(res => {
          this.bandInfo = res.data;
          this.bandInfoBool = true;
        });
      },
      deleteBand(id) {
      axios.delete(`/api/bands/${id}`).then(res => {
        this.$router.push({ path: '/band' });
        this.bands = [];
        this.bandInfo = '';
        this.bandInfoBool = false;
        this.fetchBands();
        })
      },
    }
  }
</script>

<style scoped>
h1 {
    color: black;
    /* background-color: #F8F8FF; */
    font-weight: 900;
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 30px;
  }
.table {
  color: black;
  text-decoration:none;
  background-color: #EEEEEE;
  margin-top: 20px;
  width: 600px;
  margin: auto;
}
.c {
  margin-top: 20px;
}
p {
  white-space: pre-wrap;
}
.title-font{
  font-weight: 600;
  font-size: 20px;
}
</style>
