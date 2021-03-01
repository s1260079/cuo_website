<template>
  <div class="signUpWrapper">
    <h1>Welcome to CUO</h1>

    <div class="inputWrapper">
      <div class="in">
        <input class="input mInput" placeholder="ユーザーネーム" v-model="user.username"/>
        <input class="input mInput" placeholder="メールアドレス" v-model="user.email"/>
        <input type='password' class="input pInput" placeholder="パスワード" v-model="user.password"/>
        <input type='password' class="input p2Input" placeholder="パスワード（確認用）" v-model="password2"/>
      </div>
      <v-btn class="Btn loginBtn" @click="signUp()">新規登録</v-btn>
      <div class="alert">
        <p>{{ message }}</p>
        <p class="created">{{ created }}</p>
      </div>
      <router-link to="/signIn">
        <v-btn class="Btn loginBtn">ログイン画面</v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from "axios";
export default {
  data () {
    return {
      created: '',
      password2: '',
      message: '',
      user:{
        username: '',
        password: '',
        email:'',
        part: '',
        likeBand: '',
        message: '',
      }
    }
  },
  methods: {
    mail_vali() {
      if( this.user.email.match(/.+@.+\..+/) == null ) {
        this.message = '※ 有効なメールアドレスではありません。'
        return true
      } else {
        return false
      }
    },
    pass_vali() {
      if(this.user.password.length < 6) {
        this.message = '※ パスワードは6文字以上です。'
        return true
      }
      else return false
    },
    pass12_vali() {
      if(this.user.password != this.password2) {
        this.message = '※ パスワードが確認用パスワードと一致しません。'
        return true
      }
      else return false
    },
    signUp() {
      if( this.mail_vali() ) return
      if( this.pass_vali() ) return
      if( this.pass12_vali() ) return
      this.created = 'しばらくお待ちください。'
      axios.post('/api/users', { user: this.user }).then((error) => {
          console.log(error);
      });
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.password2)
        .then(user => { // eslint-disable-line
          // alert('Create account: ', user.email)
          this.created = '登録が完了しました。'
          this.$router.push('/')
        })
        .catch(error => {
          alert(error.message)
        })

      this.username = ''
      this.email = ''
      this.user.password = ''
      this.password2 = ''
      this.message = ''
    }
  }
}
</script>

<style lang="scss">
.signUpWrapper {

  width: 320px;
  margin: auto;
  h1 {
    color: black;
    font-weight: 900;
    margin-top: 80px;
    font-size: 30px;
  }
  .inputWrapper {
    width: 90%;
    margin: auto;
    .loginTitle {
      width: 100%;
      h2 {
        width: 50%;
        margin: 0 auto;
        display: inline-block;
        font-size: 10px;
        font-weight: normal;
        background-color: white;
        border: 1px solid rgb(201, 205, 210);
        margin-bottom: 0;
        padding: 8px 0;
        box-sizing: border-box;
      }
      .mlogin {
        border-right: 0 solid rgb(201, 205, 210);
      }
      .qlogin {
        background-color: rgb(236, 236, 236);
      }
    }
    .in {
      border-right: 1px solid rgb(201, 205, 210);
      border-left: 1px solid rgb(201, 205, 210);
      border-bottom: 1px solid rgb(201, 205, 210);
      input {
        border: 0;
      }
      .input {
        padding: 8px;
        min-width: 100%;
        display: inline;
        margin: auto;
        box-sizing: border-box;
        border-color: rgb(201, 205, 210);
      }
      .mInput {
        border-top: 1px solid rgb(201, 205, 210);
        border-bottom: 1px solid rgb(201, 205, 210);
      }
      .pInput {
        border-bottom: 1px solid rgb(201, 205, 210);
      }
    }
    .alert {
      height: 18px;
      p {
        font-size: 12px;
        text-align: left;
        color: red;
      }
      .created {
        color: #2c3e50;
        font-size: 16px;
        text-align: center;
      }
    }
    .Btn {
      color: #2c3e50;
      font-size: 16px;
      margin-top: 6px;
      background-color: white;
      padding: 8px 0;
      width: 100%;
      border-color: rgb(201, 205, 210);
    }
    .loginBtn {
      margin-top: 50px;
    }
  }
}
</style>
