<template>
  <div class="container">
    <h1 style="text-align:center">Band Data</h1>
    <div style="text-align:center">
      <router-link to="/bandcreate" >Bandの登録はこちら</router-link>
      <div class="c"></div>
    </div>
    <div>
      <span class="c" v-for="band in bands" :key="band.id" v-on:click="ShowBtn(band.id)">
        <div style="text-align:center" class="table">
            <p class="title-font">{{ band.bandTitle }}</p>
            <p>{{ band.bandContent }}</p>
        </div>
        <div class="c"></div>
      </span>
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
        showbtn: '',
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
      },
      deleteBand(id) {
      axios.delete(`/api/bands/${id}`).then(res => {
        this.bands = [];
        this.bandInfo = '';
        this.bandInfoBool = false;
        this.fetchBands();
        })
      },
      ShowBtn(id) {
        this.$router.push({ path: `/bandedit/${id}` });
      }
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
  background-color: #F8F8FF;
  margin-top: 20px;
  width: 350px;
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
