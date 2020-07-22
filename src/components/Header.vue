<template>
  <div class="header_layout">
    <i class="back el-icon-arrow-left" v-if="hasBack" @click="handleBack"></i>
    <span class="title"><slot class="title" name="title"></slot></span>
    <span class="right-icon" v-if="rightIcon">
      <slot name="rightIcon">
        <img src="../assets/home@2x.png" alt="home" @click="returnHome">
      </slot>
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    hasBack: {
      type: Boolean,
      default: true
    },
    rightIcon: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState('TodoList', {
      showTodoListDetails: state => state.showTodoListDetails
    })
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations('TodoList', [
      'updateType'
    ]),
    handleBack () {
      if (this.$route.name === 'TodoList') {
        if (this.showTodoListDetails) {
          this.updateType(false)
        } else {
          this.$router.go(-1)
        }
      } else {
        this.$router.go(-1)
      }
    },
    returnHome () {
      this.$router.replace('/home')
    }
  }
}
</script>

<style lang="scss">
  .header_layout {
    width: 100%;
    height: 1.2rem;
    background-color: #004F9A;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 .4rem;
    box-sizing: border-box;
    position: fixed;
    z-index: 10;
    margin-bottom: 1.5rem;

    .back {
      position: absolute;
      left: 0.2rem;
      font-size: .6rem;
    }

    .title {
      font-size: .5rem;
      text-align: center;
    }

    .right-icon {
      position: absolute;
      right: .4rem;

      img {
        width: .6rem;
        margin-top: .2rem;
      }
    }
  }
</style>
