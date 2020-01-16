<template>
  <transition name="back-to-top-fade">
    <div
      class="vue-back-to-top"
      :style="`bottom: ${this.bottom}; right: ${this.right};`"
      v-show="visible"
      @click="backToTop"
    >
      <slot>
        <div class="default">
          <!-- <span>{{text}}</span> -->
          <img class="icon-size" :src="require('../../assets/arrow-up.svg')" alt="">
        </div>
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  props: {
    text: {
      type: String,
      default: 'TOP',
    },
    visibleoffset: {
      type: [String, Number],
      default: 300,
    },
    visibleoffsetbottom: {
      type: [String, Number],
      default: 0,
    },
    right: {
      type: String,
      default: '40px',
    },
    bottom: {
      type: String,
      default: '40px',
    },
    scrollFn: {
      type: Function,
      default: function () {},
    },
    scrollAnimation: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    window.smoothscroll = () => {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        if (this.scrollAnimation) {
          window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 15)))
        } else {
          // No animation
          window.scrollTo(0, document.body)
        }
      }
    }
    window.addEventListener('scroll', this.catchScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.catchScroll)
  },
  methods: {
    /**
     * Catch window scroll event 
     * @return {void}
     */
    catchScroll() {
      const pastTopOffset = window.pageYOffset > parseInt(this.visibleoffset)
      const pastBottomOffset = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - parseInt(this.visibleoffsetbottom)
      this.visible = parseInt(this.visibleoffsetbottom) > 0 ? pastTopOffset && !pastBottomOffset : pastTopOffset
      this.scrollFn(this)
    },
    /**
     * The function who make the magics
     * @return {void}
     */
    backToTop() {
      window.smoothscroll()
      this.$emit('scrolled')
    }
  },
}
</script>

<style lang="scss" scoped>
.back-to-top-fade-enter-active,
.back-to-top-fade-leave-active {
  transition: opacity .5s;
}
.back-to-top-fade-enter,
.back-to-top-fade-leave-to {
  opacity: 0;
}

.vue-back-to-top {
  cursor: pointer;
  position: fixed;
  z-index: 99;
}

.vue-back-to-top .default {
  background-color: #f5c85c;
  border-radius: 50%;
  color: #ffffff;
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 50px;
}

.vue-back-to-top .default span {
  color: #ffffff;
}

.vue-back-to-top--is-footer {
  bottom: 50% !important;
  position: absolute;
  transform: translateY(50%);
}
</style>