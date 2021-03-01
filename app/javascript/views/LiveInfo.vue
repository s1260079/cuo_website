<template>
<div class="box">
  <span class="item-name">
    <input placeholder="バンド名" type="text" class="validate" v-model="band.bandTitle" required="required">
  </span>
  <div class="textarea-wrap">
    <textarea placeholder="メンバー構成"  rows="8" cols="80" v-model="band.bandContent" ></textarea>
  </div>
  <v-btn v-on:click="updateBand">Bandの情報を変更</v-btn>
  <v-btn class="btn #e53935 red darken-1" v-on:click="deleteBand">削除</v-btn>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: "Homeです"
    };
  }
};
</script>

<style lang="scss" scoped>
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
