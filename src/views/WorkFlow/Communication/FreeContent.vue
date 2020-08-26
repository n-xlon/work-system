<template>
  <div class="free_content">
    <ul class="col_list">
      <li class="col_item" v-for="it in list" :key="it.id" @click="choiceFree(it)">
        <span>{{ it.text }}</span>
        <i class="selected el-icon-check" v-if="selectItem.includes(it.id)"></i>
        <el-input class="input-text-area input-rlt" v-model="text" type="textarea" @change="updateData" v-if="selectItem === 3 && it.id === 3"></el-input>
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
    this.selectItem = content
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
      if (item.id in this.selectItem) {
        const index = this.list.findIndex(it => it.id === item.id)
        this.selectItem.splice(index, 1)
      } else {
        this.selectItem.push(item.id)
      }
      const values = this.list.filter(it => this.selectItem.includes(it.id)).map(item => item.value)
      this.updateCommunicationData({ content: values, otherText: this.text })
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
