<template>
  <div>
    <h1>Mypage</h1>
    <form>
      <div class="row">
        <div>
          <input placeholder="username" type="text" class="validate" v-model="user.username" required="required">
        </div>
      </div>
      <div class="row">
        <div>
          <input placeholder="part" type="text" class="validate" v-model="user.part" required="required">
        </div>
      </div>
      <div class="row">
        <div>
          <input placeholder="likeBand" type="text" class="validate" v-model="user.likeBand" required="required">
        </div>
      </div>
      <div>
        <div>
          <input placeholder="message" type="text" class="validate" v-model="user.message" required="required">
        </div>
      </div>
      <div class="btn" v-on:click="updateUser">情報を変更</div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data: function () {
    return {
      user: {}
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
      }
    }
  }
</script>

<style scoped></style>
