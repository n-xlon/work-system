<template>
  <div class="cost_list">
    <ul class="col_list" v-for="(item, index) in costList" :key="index">
      <li class="col_item" v-for="it in labels" :key="it.label">
        <span>{{ it.text }}</span>
        <el-input :disabled="true" type="number" v-if="it.label === 'perCapitalAmount'" class="input-layout input-rlt" size="mini" :value="getAverageMoneny(index)"></el-input>
        <el-input v-else :type="it.label === 'category' ? 'text' : 'number'" class="input-layout input-rlt" size="mini" v-model="item[it.label]"></el-input>
      </li>
    </ul>
    <p class="cost_list-add"><i class="el-icon-circle-plus-outline" @click="addCostList"></i></p>
    <el-button class="submit-btn" type="primary" @click="submitCost">提交</el-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CostList',
  computed: {
    ...mapState('Communication', [
      'communicationData'
    ])
  },
  data () {
    return {
      labels: [
        { text: '项目', label: 'category' },
        { text: '金额 (元)', label: 'amount' },
        { text: '人数', label: 'peopleNumber' },
        { text: '人均 (元)', label: 'perCapitalAmount' }
      ],
      costList: [
        { category: '', amount: '', peopleNumber: '', perCapitalAmount: '' }
      ]
    }
  },
  created () {
    this.communicationData.budgetAmount.details.length && (this.costList = this.communicationData.budgetAmount.details)
  },
  methods: {
    ...mapMutations('Communication', [
      'updateCommunicationData'
    ]),
    addCostList () {
      this.costList.push({ category: '', amount: '', peopleNumber: '', perCapitalAmount: '' })
    },
    submitCost () {
      this.updateCommunicationData({ budgetAmount: { ...this.communicationData.budgetAmount, details: this.costList } })
      this.$router.back()
    },
    getAverageMoneny (index) {
      const { amount, peopleNumber } = this.costList[index]
      let avag = !amount || !peopleNumber ? 0 : (+amount / peopleNumber).toFixed(2)
      this.costList[index].perCapitalAmount = avag
      return avag
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
