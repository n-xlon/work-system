<template>
  <div class="toast_layout">
    <div class="toast">
      <slot>{{message}}</slot>
      <span class="closs-btn el-icon-close" @click="closeToast" v-if="!duation"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    duation: {
      type: Number,
      default: 0
    }
  },
  created() {
  },
  mounted() {
    if (this.duation) {
      setTimeout(() => {
        this.closeToast()
      }, this.duation)
    }
  },
  methods: {
    closeToast () {
      this.$emit('close')
      document.body.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss">
  .toast_layout {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .toast {
    max-width: 80%;
    min-width: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    font-size: .45rem;
    border-radius: 2px;
    padding: .5rem .5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    text-align: center;
    z-index: 10;

    .closs-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: .4rem;
    }
  }
</style>
