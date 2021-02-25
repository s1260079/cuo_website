<template>
  <div class="container">
    <h1 class="#f3e5f5 purple lighten-5 center">Bandの登録</h1>
    <form class="col">
      <div class="row">
        <div class="input-field">
          <input placeholder="Title" type="text" class="validate" v-model="band.Title" required="required">
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input placeholder="Content" type="text" class="validate" v-model="band.Content" required="required">
        </div>
      </div>
       <div class="btn" v-on:click="updateBand(band.id)">Bandの情報を変更</div>
    </form>
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
      }
    }
  }
</script>

<style scoped></style>
