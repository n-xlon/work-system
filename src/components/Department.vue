<template>
  <div class="department">
    <ul class="list">
      <li class="item" v-for="(item, index) in departmentList" :key="item.Title" @click="choiceDepartment(item, index)">
        <span>{{ item.OfficialNameOfOrganizationNative }}</span>
        <i class="selected el-icon-check" v-if="item.Title === activeId"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      departmentList: [
        // {
        //   Title: 1,
        //   IDOfRelatedObject: 3,
        //   OfficialNameOfOrganization: 'zt',
        //   OfficialNameOfOrganizationNative: '设计部',
        //   OrganizationalRank: 1,
        //   UserBeSubstitutedFor: 'xx'
        // },
        // {
        //   Title: 2,
        //   IDOfRelatedObject: 3,
        //   OfficialNameOfOrganization: 'zt',
        //   OfficialNameOfOrganizationNative: '研发部',
        //   OrganizationalRank: 1,
        //   UserBeSubstitutedFor: 'xx'
        // },
        // {
        //   Title: 3,
        //   IDOfRelatedObject: 3,
        //   OfficialNameOfOrganization: 'zt',
        //   OfficialNameOfOrganizationNative: '人事行政部',
        //   OrganizationalRank: 1,
        //   UserBeSubstitutedFor: 'xx'
        // }
      ],
      activeId: ''
    }
  },
  computed: {
    ...mapState({
      communicationData: state => state.Communication.communicationData
    })
  },
  created () {
    this.activeId = this.communicationData.department
    this.getDepartment()
  },
  methods: {
    ...mapMutations('Communication', [
      'updateCommunicationData'
    ]),
    ...mapActions('Department', [
      'getAllDepartment'
    ]),
    getDepartment () {
      const loading = this.$loading({background: 'transparent'})
      this.getAllDepartment().then(res => {
        loading.close()
        this.departmentList = res
      }).catch(() => {
        loading.close()
      })
    },
    choiceDepartment (item, index) {
      this.activeId = item.Title
      this.updateCommunicationData({ department: this.departmentList[index].Title })
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
