<template>
  <div id="app">
    <overlay-spinner v-if="isLoading" v-scroll-lock="isLoading" />
    <div class="fav-list">
      <div
        v-lazy-container="{
          selector: 'img',
          error: require('./assets/error.png'),
          loading: require('./assets/puff.svg')
        }"
        v-for="(img, index) in imgs"
        :key="index"
        :style="{ flexGrow: `${img.width * 100 / img.height}`, flexBasis: `${img.width * 240 / img.height}px` }"
      >
        <i
          :style="{ paddingBottom: `${img.height / img.width * 100}%`, backgroundColor: `${placeholderBgColor()}` }"
        />
        <img class="bg-img" :data-src="img.url" />
      </div>
      <div v-for="(i, index) in items" class="placeholder" :key="'b' + index"></div>
    </div>
    <back-to-top visibleoffset="500" text="TOP" :scrollAnimation="scrollAnimation" />
  </div>
</template>

<script>
import OverlaySpinner from './components/OverlaySpinner'
import BackToTop from './components/BackToTop'

import rilakkuma from './utils/rilakkuma.json'
import rilakkumaCafe from './utils/rilakkuma-cafe.json'
import kawaiiRilakkuma from './utils/kawaii-rilakkuma.json'
import korilakkuma from './utils/korilakkuma.json'

const randomColor = require('randomcolor')

export default {
  name: 'app',
  data() {
    return {
      // bgColor: ['lightblue', '#ededed', '#5db7e1', 'salmon'],
      isLoading: true,
      scrollAnimation: true,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      imgs: [
        ...rilakkuma,
        ...rilakkumaCafe,
        ...kawaiiRilakkuma,
        ...korilakkuma
      ]
    }
  },
  components: {
    OverlaySpinner,
    BackToTop
  },
  computed: {
    colorsGenerator() {
      return randomColor({
        count: 20,
        luminosity: 'dark',
        format: 'rgba',
        alpha: 0.4
      });
    }
  },
  methods: {
    placeholderBgColor() {
      return this.colorsGenerator[Math.floor((Math.random() * this.colorsGenerator.length))]
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false
    }, 4000)
  }
}
</script>

<style lang="scss" scoped>
// Remove the blue background of button on mobile
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body {
  margin: 0;
  overflow-x: hidden;
}
.fav-list {
  display: flex;
  flex-wrap: wrap;
  margin: 2px;
}
/* .fav-list::after{
      content: '';
      flex-grow: 999999999;
      order: 999999999;
    } */
.fav-list > div {
  margin: 2px;
  background-color: violet;
  position: relative;
}
.fav-list > div > i {
  display: block;
  // background-color: lightblue;
  /* display: none; */
}
.fav-list > div > img {
  position: absolute;
  vertical-align: bottom;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fav-list > .placeholder {
  flex-grow: 100;
  flex-basis: 240px;
  height: 0;
  margin: 0;
}

.bg-img[lazy="loading"] {
  object-fit: initial;
  width: 50px;
  position: absolute;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
