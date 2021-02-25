<template>
  <div class="container">
    <h1 class="#f3e5f5 purple lighten-5 center">Bands</h1>
    <router-link to="/bandcreate">Bandの登録</router-link>
    <div class="row #e3f2fd blue lighten-5">
      <div class="col s4 m6" v-for="band in bands" :key="band.id">
      <div class="col s12 m12">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">
              【{{ band.bandTitle }}】
            </span>
            <div class="detail">
              ・content：{{ band.bandContent }}
            </div>
            <router-link :to="{ path: `bandedit/${band.id}` }" class="btn">Bandの編集</router-link>
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

  export default {
    name: 'bandHome',
    data: function() {
      return {
        bandInfo: {},
        bandInfoBool: false,
        bands: [],
      }
    },
    mounted: function() {
      this.fetchBands();
    },
    methods: {
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
      }
    }
  }
</script>

<style scoped></style>
