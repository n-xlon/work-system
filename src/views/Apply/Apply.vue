<template>
  <div class="my-apply">
    <template v-if="list.length">
      <div class="apply-list" v-for="(item, index) in list" :key="index">
        <div class="item" @click="checkDetails(item)">
          <span class="apply-name">{{item.WFDefinitionName}}</span>
          <span :class="['apply-status', getApplyStatusStyle(item.Status)]">{{item.Status}}</span>
          <i :class="['arrow', 'el-icon-arrow-right', {'is-open': item.isChecked}]"></i>
        </div>
        <div class="apply-details" v-if="item.isChecked">
          <div class="list"><span>申请时间：{{getCreatedTime(item)}}</span><span>申请金额（元）：{{item.Amount}}</span></div>
          <div class="list"><span>审批意见：{{item.Status}}</span></div>
        </div>
      </div>
    </template>
    <span class="no-data" v-else>暂无数据</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      applyList: [],
      list: [],
      pageSize: 20,
      page: 1
    }
  },
  created () {
    this.getApply()
  },
  mounted () {
    this.initListenEvent()
  },
  methods: {
    ...mapActions('Apply', [
      'getApplyList'
    ]),
    ...mapActions('TodoList', [
      'getCommunicateDetails'
    ]),
    getCreatedTime (item) {
      return item.Created ? `${item.Created}`.split('.')[0] : ''
    },
    getApplyStatusStyle (status) {
      if (status === '同意') {
        return 'agree'
      } else if (status === '不同意') {
        return 'no-agree'
      } else {
        return 'is-appling'
      }
    },
    getApply () {
      const loading = this.$loading({background: 'transparent'})
      this.getApplyList().then(res => {
        loading.close()
        this.applyList = res.map(it => ({...it, Amount: '', isChecked: false}))
        this.getData()
      }).catch(() => {
        loading.close()
      })
    },
    async checkDetails (item) {
      item.isChecked = !item.isChecked
      if (item.isChecked) {
        const data = {
          WorkflowNum: item.WFInstanceName,
          WFInstanceId: item.WFInstanceId
        }
        const { ApprovalHistory, SocialExpensesData } = await this.getCommunicateDetails(data)
        item.Amount = SocialExpensesData.Amount || 0
      }
    },
    getData () {
      this.list = this.applyList.slice(0, this.page * this.pageSize)
    },
    initListenEvent () {
      const dom = document.querySelector('.my-apply')
      dom && dom.addEventListener('scroll', this.scrollEvent)
    },
    scrollEvent (e) {
      const el = e.target
      const { clientHeight, scrollHeight, scrollTop } = el
      if (clientHeight + scrollTop >= scrollHeight) {
        if (this.page * this.pageSize >= this.applyList.length) {
          this.$_toast({ props: {message: '没有更多数据了', duation: 3000}})
          return
        }
        this.page += 1
        this.getData()
      }
    }
  }
}
</script>

<style lang="scss">
  .my-apply {
    overflow: auto;
    height: 100%;
    /*-webkit-overflow-scrolling: touch;*/
    .apply-list {
      border-bottom: 1px solid #EEEEEE;
      &:last-child {
        border-bottom: 0;
      }
    }
    .item {
      background-color: #ffffff;
      position: relative;
      padding: .3rem .3rem;
      text-align: left;
      .apply-name {
        font-size: .4rem;
      }
      .apply-status {
        font-size: .4rem;
        position: absolute;
        right: 1.5rem;
        &.agree {
          color: #1BB03E;
        }
        &.no-agree {
          color: #FF0000;
        }
        &.is-appling {
          color: #999999;
        }
      }
      .arrow {
        font-size: .6rem;
        color: #CCCCCC;
        position: absolute;
        right: .3rem;
        &.is-open {
          transform: rotate(90deg);
        }
      }
    }
    .apply-details {
      padding: 0.1rem .3rem;
      box-sizing: border-box;
      font-size: .4rem;
      background-color: #F0EDF1;
      .list {
        margin-top: .2rem;
        text-align: left;
        span {
          margin-left: .3rem;
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
    .no-data {
      display: inline-block;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
