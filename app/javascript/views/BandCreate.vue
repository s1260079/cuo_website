<template>
  <div class="container">
    <h1 class="#f3e5f5 purple lighten-5 center">Bandの登録</h1>
    <form class="col">
      <div class="row">
        <div class="input-field">
          <input placeholder="Title" type="text" class="validate" v-model="band.bandTitle" required="required">
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input placeholder="Content" type="text" class="validate" v-model="band.bandContent" required="required">
        </div>
      </div>
      <button class="btn btn-info waves-effect waves-light" v-on:click="createBand">Bandを登録</button>
    </form>
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

<style scoped></style>
