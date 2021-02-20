<template>
<div class="container">
  <hooper></hooper>
  <h1 style="text-align:center">C U O</h1>
  <h1 style="text-align:center">  Comfort Utopian Orchestra</h1>
  <p> </p>
  <p style="text-align:center">CUOの公式webサイトです。</p>
  <p style="text-align:center">入部希望の方はこちらのDMまで</p>
  <p style="text-align:center">
  <a href="https://twitter.com/CUO_aizu?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Eprofile%3ACUO_aizu&ref_url=http%3A%2F%2Fweb-ext.u-aizu.ac.jp%2Fcircles%2Fcuo%2F" >
  cuoの公式アカウント
  </a>
  </p>
  <p style="text-align:center">
  <a href="https://twitter.com/CUO_aizu?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Eprofile%3ACUO_aizu&ref_url=http%3A%2F%2Fweb-ext.u-aizu.ac.jp%2Fcircles%2Fcuo%2F">
  <img src=../components/images/Twitter.jpg  width="200" height="65">
  </a>
  </p>
</div>
</template>


<script>
 import hooper from "../components/Hooper.vue"
export default {
  components: {
      hooper,
  },
  data() {
   return {
     title: "CUO"
   };
 }
}
</script>

<style lang="scss" scoped>
h1 {
    color: black;
    font-weight: 900;
    margin-top: 80px;
    font-size: 30px;
  }
.example {
  color: black;
  margin: 10px auto;
};
</style>
