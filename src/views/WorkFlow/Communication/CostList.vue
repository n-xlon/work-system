<template>
  <div class="cost_list">
    <ul class="col_list" v-for="(item, index) in costList" :key="index">
      <li class="col_item" v-for="it in labels" :key="it.label">
        <span>{{ it.text }}</span>
        <el-input class="input-layout" size="mini" v-model="item[it.label]" clearable></el-input>
      </li>
    </ul>
    <p class="cost_list-add"><i class="el-icon-circle-plus-outline" @click="addCostList"></i></p>
    <el-button class="submit-btn" type="primary" @click="submitCost">提交</el-button>
  </div>
</template>

<script>
export default {
  name: 'CostList',
  data () {
    return {
      labels: [
        { text: '项目', label: 'project' },
        { text: '金额 (元)', label: 'cost' },
        { text: '人数', label: 'peopleNum' },
        { text: '人均 (元)', label: 'avg' }
      ],
      costList: [
        { project: '', cost: 0, peopleNum: 0, avg: 0 }
      ]
    }
  },
  methods: {
    addCostList () {
      this.costList.push({ project: '', cost: 0, peopleNum: 0, avg: 0 })
    },
    submitCost () {
    }
  }
}
</script>

<style scoped lang="scss">
  .cost_list {
    .col_list {
      border-bottom: 1px solid #EEEEEE;
    }

    .col_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .25rem 0;

      .input-layout {
        width: 4.5rem;
      }
    }
    .cost_list-add {
      color: #43BB5D;
      padding: .2rem .3rem;
      text-align: right;
      font-size: .6rem;
      margin: 0;
      margin-bottom: 1rem;
      box-sizing: border-box;
    }
    .submit-btn {
      width: 100%;
      background: #004F9A;
      border: none;
      border-radius: 0;
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
</style>
