<template>
  <div class="department">
    <ul class="list">
      <li class="item" v-for="(item, index) in departmentList" :key="index" @click="choiceDepartment(index)">
        <span>{{ item }}</span>
        <i class="selected el-icon-check" v-if="index === activeIndex"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      departmentList: ['设计部', '研发部', '人事行政部', '销售部', '客服部'],
      activeIndex: -1
    }
  },
  computed: {
    ...mapState([
      'communicationData'
    ])
  },
  created () {
    const _index = this.departmentList.findIndex(it => it === this.communicationData.department)
    this.activeIndex = _index >= 0 ? _index : -1
  },
  methods: {
    ...mapMutations([
      'updateCommunicationData'
    ]),
    choiceDepartment (index) {
      this.activeIndex = index
      this.updateCommunicationData({ department: this.departmentList[this.activeIndex] })
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
  .department {
    .list {
      padding: 0 .4rem;
      box-sizing: border-box;
      background-color: #ffffff;
    }
    .item {
      width: 100%;
      height: 1.2rem;
      /*background-color: #ffffff;*/
      line-height: 1.2rem;
      font-size: .4rem;
      text-align: left;
      border-bottom: 1px solid #EEEEEE;
      position: relative;

      &:last-child {
        border-bottom: none;
      }

      .selected {
        color: green;
        position: absolute;
        right: .3rem;
        top: .4rem;
        font-size: .5rem;
      }
    }
  }
</style>
