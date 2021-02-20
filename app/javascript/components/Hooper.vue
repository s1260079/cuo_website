<template>
  <div>
  <agile ref="main" :options="options1" :as-nav-for="asNavFor1" class="main">
    <div class="slide" v-for="(slide, index) in slides" :key="index" :class="`slide--${index}`">
      <img :src="slide">
    </div>
  </agile>
  <agile ref="thumbnails" :options="options2" :as-nav-for="asNavFor2" class="thumbnails">
    <div class="slide slide--thumbniail" v-for="(slide, index) in slides" :key="index" @click="$refs.thumbnails.goTo(index);" :class="`slide--${index}`">
      <img :src="slide">
    </div>
    <template slot="prevButton"><i class="fas fa-chevron-left"></i></template>
    <template slot="nextButton"><i class="fas fa-chevron-right"></i></template>
  </agile>
</div>
</template>

<script>
  import {VueAgile} from 'vue-agile';

  export default {
    components: {
      agile: VueAgile
    },
    data: function () {
    return {
      asNavFor1: [],
      asNavFor2: [],
      slides: [
        require('./band6.JPG'),
        require('./band1.jpg'),
        require('./band4.jpg'),
        require('./band8.JPG')
      ],
      options1: {
      dots: false,
      fade: true,
      navButButtons: false
    },
    options2: {
      autoplay: true,
      centerMode: true,
      dots: false,
      navButtons: false,
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 1000,
          settings: {
            navButtons: true
          }
        }
      ]
    },
    }
  },
  mounted: function () {
      this.asNavFor1.push(this.$refs.thumbnails);
      this.asNavFor2.push(this.$refs.main);
    }
}
</script>

<style lang="scss">
  .main{
  margin-bottom: 30px;
}
.thumbnails {
  margin: 0 -5px;
  width: calc(100% + 10px);
}
.agile__nav-button {
  background: transparent;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 24px;
  -webkit-transition-duration: 0.3s;
          transition-duration: 0.3s;
}
.thumbnails .agile__nav-button {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
}
.thumbnails .agile__nav-button--prev {
  left: -45px;
}
.thumbnails .agile__nav-button--next {
  right: -45px;
}
.agile__nav-button:hover {
  color: #888;
}
.agile__dot {
  margin: 0 10px;
}
.agile__dot button {
  background-color: #eee;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  -webkit-transition-duration: 0.3s;
          transition-duration: 0.3s;
  width: 10px;
}
.agile__dot--current button, .agile__dot:hover button {
  background-color: #888;
}
.slide {
  -webkit-box-align: center;
          align-items: center;
  box-sizing: border-box;
  color: #fff;
  display: -webkit-box;
  display: flex;
  height: 450px;
  -webkit-box-pack: center;
          justify-content: center;
}
.slide--thumbniail {
  cursor: pointer;
  height: 100px;
  padding: 0 5px;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}
.slide--thumbniail:hover {
  opacity: 0.75;
}
.slide img {
  height: 100%;
  -o-object-fit: cover;
     object-fit: cover;
  -o-object-position: center;
     object-position: center;
  width: 100%;
}
</style>
