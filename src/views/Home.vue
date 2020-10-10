<template>
  <div class="home">
    <div class="work_form-list">
      <ul class="item-list">
        <li v-for="item in workList" :key="item.id" @click="handleWorkFlow(item)">
          <span class="title">
            <img class="image" :src="item.img" :alt="item.img" v-if="item.img">
            <span class="name">{{ item.text }}</span>
          </span>
          <span class="badge" v-if="item.id === 1 && taskLen">
            {{taskLen}}
          </span>
          <i class="right-arrow el-icon-arrow-right"></i>
        </li>
      </ul>
      <el-button plain @click="handleTestCode">Test Code</el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Header from '@/components/Header.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    // Header
  },
  data () {
    return {
      title: 'YCN Cyber Space',
      workList: [
        { id: 0, text: '发起流程', path: '/workflow', img: require('../assets/flow@2x.png') },
        { id: 1, text: '我的待办', path: '/todoList', img: require('../assets/commission@2x.png') },
        { id: 2, text: '我的申请', path: '/myApply', img: require('../assets/apply@2x.png') }
        // { id: 3, text: '我参与的', img: require('../assets/joinActivity@2x.png') },
        // { id: 4, text: '委托代理', img: require('../assets/dispose@2x.png') }
      ],
      taskLen: 0
    }
  },
  methods: {
    ...mapActions('TodoList', [
      'getTodoList'
    ]),
    ...mapActions('User', [
      'login3'
    ]),
    handleWorkFlow (item) {
      this.$router.push(item.path)
    },
    async getTask () {
      try {
        const list = await this.getTodoList()
        this.taskLen = list.length
      } catch (e) {
      }
    },
    handleTestCode () {
      this.login3()
    }
  },
  created () {
    this.getTask()
  }
}
</script>

<style lang="scss">
  .home {
    .work_form-list {
      width: 100%;

      .item-list {
        padding: 0;
        margin: 0;

        li {
          width: 100%;
          height: 1.2rem;
          background-color: #ffffff;
          list-style: none;
          margin-top: .2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 .4rem;
          box-sizing: border-box;
          cursor: pointer;
          position: relative;

          &:first-child {
            margin-top: 0;
          }

          .title {
            font-size: .4rem;
            position: relative;

            .image {
              width: 0.5rem;
              position: absolute;
              top: .05rem;
            }

            .name {
              margin-left: .8rem;
            }
          }

          .right-arrow {
            font-size: 0.6rem;
            color: #CCCCCC;
          }
        }
        .badge {
          position: absolute;
          padding: .05rem .3rem;
          box-sizing: border-box;
          display: inline-block;
          right: 1.2rem;
          background-color: #F8B551;
          font-size: .3rem;
          color: #fff;
          border-radius: 20px;
          font-weight: bold;
        }
      }
    }
  }
</style>
