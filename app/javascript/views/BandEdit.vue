<template>
  <div class="container">
    <h1 style="text-align:center">Bandの編集</h1>
    <div class="box">
      <span class="item-name">
        <v-text-field label="バンド名" single-line solo v-model="band.bandTitle"></v-text-field>
      </span>
       <div class="textarea-wrap">
         <textarea placeholder="メンバー構成、一言"  rows="8" cols="80" v-model="band.bandContent" ></textarea>
       </div>
       <p style="text-align:center">
         <v-btn v-on:click="updateBand">Bandの情報を変更</v-btn>
       </p>
       <p style="text-align:center">
         <v-btn class="btn #e53935 red darken-1" v-on:click="deleteBand(band.id)">削除</v-btn>
       </p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data: function () {
    return {
      band: {}
    }
  },
    mounted () {
      this.getBand()
    },
    methods: {
      getBand(){
        axios
      .get(`/api/bands/${this.$route.params.id}.json`)
      .then(response => (this.band = response.data))
      },
      updateBand() {
        axios
        .put(`/api/bands/${this.$route.params.id}`, { band: this.band })
        .then(response => {
          this.$router.push({ path: '/band' });
        })
        .catch(error => {
          console.error(error);
          if (error.response.data && error.response.data.errors) {
            this.errors = error.response.data.errors;
          }
        });
      },
      deleteBand(id) {
      axios.delete(`/api/bands/${id}`).then(res => {
        this.$router.push({ path: '/band' });
        })
      },
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
