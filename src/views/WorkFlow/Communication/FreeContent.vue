<template>
  <div class="free_content">
    <ul class="col_list">
      <li class="col_item" v-for="it in list" :key="it.id" @click.self="choiceFree(it)">
        <span>{{ it.text }}</span>
        <i class="selected el-icon-check" v-if="selectItem.includes(it.id)"></i>
        <el-input class="input-text-area input-rlt" @click.stop v-model="text" type="textarea" @change="updateData" v-if="it.id === 3 && selectItem.includes(it.id)"></el-input>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      list: [
        { text: '餐费', id: 0, value: '餐费' },
        { text: '交通费', id: 1, value: '交通费' },
        { text: '住宿费', id: 2, value: '住宿费' },
        { text: '其他 (请填写具体说明)', id: 3, value: '其他' }
      ],
      selectItem: [],
      text: ''
    }
  },
  created () {
    const { content, otherText } = this.communicationData
    this.selectItem = this.list.filter(item => content.includes(item.value)).map(it => it.id)
    this.text = otherText
  },
  computed: {
    ...mapState('Communication', [
      'communicationData'
    ])
  },
  methods: {
    ...mapMutations('Communication', [
      'updateCommunicationData'
    ]),
    choiceFree (item) {
      if (this.selectItem.includes(item.id)) {
        const index = this.selectItem.findIndex(it => it === item.id)
        this.selectItem.splice(index, 1)
      } else {
        this.selectItem.push(item.id)
      }
      const values = this.list.filter(it => this.selectItem.includes(it.id)).map(item => item.value)
      this.updateCommunicationData({ content: values, otherText: this.text, budgetAmount: { ...this.communicationData.budgetAmount, details: values.map(it => ({ category: it, amount: '', peopleNumber: '', perCapitalAmount: '' })) } })
    },
    updateData () {
      this.updateCommunicationData({ otherText: this.text })
    }
  }
}
</script>

<style scoped lang="scss">
  .free_content {
    .input-text-area {
      margin-top: .3rem;
    }
  }
</style>
