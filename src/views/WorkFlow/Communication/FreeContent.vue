<template>
  <div class="free_content">
    <ul class="col_list">
      <li class="col_item" v-for="it in list" :key="it.id" @click="choiceFree(it)">
        <span>{{ it.text }}</span>
        <i class="selected el-icon-check" v-if="it.id === selectItem"></i>
        <el-input class="input-text-area" v-model="text" type="textarea" @change="updateData" v-if="selectItem === 3 && it.id === 3"></el-input>
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
        { text: '餐费', id: 0 },
        { text: '交通费', id: 1 },
        { text: '住宿费', id: 2 },
        { text: '其他 (请填写具体说明)', id: 3 }
      ],
      selectItem: -1,
      text: ''
    }
  },
  created () {
    const { content, otherText } = this.communicationData
    this.selectItem = content
    this.text = otherText
  },
  computed: {
    ...mapState([
      'communicationData'
    ])
  },
  methods: {
    ...mapMutations([
      'updateCommunicationData'
    ]),
    choiceFree (item) {
      this.selectItem = item.id
      this.updateCommunicationData({ content: item.id, otherText: this.text })
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
