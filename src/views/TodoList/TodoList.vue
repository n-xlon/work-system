<template>
  <div class="todo-list">
    <template v-if="!showTodoListDetails">
      <div class="tasks" v-for="(item, index) in list" :key="item.TaskId + index" @click="handleTask(item)">
        <span class="title">{{item.WorkflowName}}</span>
        <span class="sub-title">{{item.ApplicantName}}</span>
        <span class="task-date">{{item.ApplyDate}}</span>
        <i class="arrow el-icon-arrow-right"></i>
      </div>
    </template>
    <div class="task-details" v-if="showTodoListDetails">
      <communication-details :task="currentTask" @back="goBack"/>
    </div>
  </div>
</template>

<script>
import CommunicationDetails from './CommunicationDetails'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    CommunicationDetails
  },
  computed: {
    // ...mapState('TodoList', {
    //   showTodoListDetails: state => state.showTodoListDetails
    // })
  },
  data () {
    return {
      list: [],
      currentTask: {},
      showTodoListDetails: false
    }
  },
  created () {
    this.getTaskList()
  },
  methods: {
    ...mapMutations('TodoList', [
      'updateType'
    ]),
    ...mapActions('TodoList', [
      'getTodoList'
    ]),
    handleTask (task) {
      this.currentTask = task
      this.showTodoListDetails = true
    },
    getTaskList () {
      const loadingTodoList = this.$loading({background: 'transparent'})
      this.getTodoList().then(res => {
        loadingTodoList.close()
        this.list = res
      }).catch(() => {
        loadingTodoList.close()
      })
    },
    goBack () {
      this.showTodoListDetails = false
      this.getTaskList()
    }
  }
}
</script>

<style lang="scss">
  .todo-list {
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .tasks {
      width: 100%;
      height: 1.2rem;
      background-color: #fff;
      line-height: 1.2rem;
      display: flex;
      align-items: center;
      padding: 0 .4rem;
      box-sizing: border-box;
      margin-top: .3rem;
      position: relative;
      &:first-child {
        margin-top: 0;
      }

      .title {
        color: #333333;
        font-size: .4rem;
      }

      .sub-title {
        font-size: .3rem;
        color: #004F9A;
        margin-left: .3rem;
      }

      .task-date {
        font-size: .3rem;
        color: #004F9A;
        margin-left: .3rem;
      }

      .arrow {
        position: absolute;
        top: .3rem;
        right: .5rem;
        font-size: .6rem;
        color: #CCCCCC;
      }
    }
  }
</style>
