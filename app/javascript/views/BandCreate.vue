<template>
  <div class="container">
    <h1 style="text-align:center">Bandの登録</h1>
    <div class="box">
      <span class="item-name">
        <v-text-field label="バンド名" single-line solo v-model="band.bandTitle"></v-text-field>
      </span>
       <div class="textarea-wrap">
         <textarea placeholder="メンバー構成、一言"  rows="8" cols="80" v-model="band.bandContent" ></textarea>
       </div>
       <p style="text-align:center">
         <v-btn class="resisterBtn" v-on:click="createBand">Bandを登録</v-btn>
       </p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data: function() {
      return {
        band: {
          bandTitle: '',
          bandContent: '',
        }
      }
    },
    methods: {
      createBand: function () {
        if (!this.band.bandTitle) return;
        axios.post('/api/bands', { band: this.band }).then((res) => {
          this.$router.push({ path: '/band' });
        }, (error) => {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
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
  height: 300px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
