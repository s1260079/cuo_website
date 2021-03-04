<template>
  <div class="container">
    <h1 style="text-align:center">Bandの編集</h1>
    <div class="box">
      <span class="item-name">
        <v-text-field label="バンド名" single-line solo v-model="band.bandTitle"></v-text-field>
      </span>
       <div class="textarea-wrap">
         <textarea placeholder="メンバー構成"  rows="8" cols="80" v-model="band.bandContent" ></textarea>
       </div>
       <span class="item-name">
        <v-text-field label="一言" single-line solo v-model="band.message"></v-text-field>
       </span>
       <v-text-field placeholder="ユーザーを　”編集、消去”　する際はここにパスワードを入力してください" single-line solo v-model="passwd2"></v-text-field>
       <div class="alert">
        <p>{{ message }}</p>
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
      passwd2: '',
      message: '',
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
      pass_vali() {
      if(this.passwd2.length < 1) {
        this.message = '※ パスワードを入力してください'
        return true
      }
      else return false
    },
      pass12_vali() {
      if(this.band.password != this.passwd2) {
        this.message = '※ パスワードが登録済みパスワードと一致しません。'
        return true
      }
      else return false
    },
      updateBand() {//バンド情報のアップデート
        if( this.pass_vali() ) return
        if( this.pass12_vali() ) return
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
      deleteBand(id) {//バンドの消去
        if( this.pass_vali() ) return
        if( this.pass12_vali() ) return
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
.alert {
  height: 18px;
  font-size: 12px;
  text-align: left;
  color: red;
 }
</style>
