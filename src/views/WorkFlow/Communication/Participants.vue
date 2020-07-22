<template>
  <div class="participants">
    <ul class="col_list" v-for="(item, index) in personInfos" :key="index">
      <li class="col_item" v-for="it in labels" :key="it.label">
        <span>{{ it.text }}</span>
        <el-input class="input-layout" size="mini" v-model="item[it.label]"></el-input>
      </li>
    </ul>
    <p class="add_participants"><i class="el-icon-circle-plus-outline" @click="addParticipants"></i></p>
    <el-button class="submit-btn" type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Participants',
  computed: {
    ...mapState([
      'communicationData'
    ])
  },
  data () {
    return {
      labels: [
        { text: '姓名', label: 'name' },
        { text: '公司 (部门)', label: 'bussiness' },
        { text: '职位', label: 'position' }
      ],
      personInfos: [
        { name: '', bussiness: '', position: '' }
      ]
    }
  },
  created () {
    this.communicationData.participantsInfo.person.length && (this.personInfos = this.communicationData.participantsInfo.person)
  },
  methods: {
    ...mapMutations([
      'updateCommunicationData'
    ]),
    addParticipants () {
      this.personInfos.push({ name: '', bussiness: '', position: '' })
    },
    submit () {
      this.updateCommunicationData({ participantsInfo: { ...this.communicationData.participantsInfo, person: this.personInfos } })
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
  .participants {
    position: relative;
    background-color: #F0EDF1;

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
    .add_participants {
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
