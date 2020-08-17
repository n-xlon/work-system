<template>
  <div class="my-apply">
    <div class="apply-list" v-for="(item, index) in applyList" :key="index">
      <div class="item" @click="item.isChecked = !item.isChecked">
        <span class="apply-name">{{item.WFDefinitionName}}</span>
        <span :class="['apply-status', getApplyStatusStyle(item.Status)]">{{item.Status}}</span>
        <i :class="['arrow', 'el-icon-arrow-right', {'is-open': item.isChecked}]"></i>
      </div>
      <div class="apply-details" v-if="item.isChecked">
        <div class="list"><span>申请时间：{{item.Created}}</span><span>申请金额（元）：{{300}}</span></div>
        <div class="list"><span>审批意见：{{item.Status}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      applyList: []
    }
  },
  created () {
    this.getApply()
  },
  methods: {
    ...mapActions('Apply', [
      'getApplyList'
    ]),
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
        this.applyList = res.map(it => ({...it, isChecked: false}))
        console.log(this.applyList)
      }).catch(() => {
        loading.close()
      })
    }
  }
}
</script>

<style lang="scss">
  .my-apply {
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
  }
</style>
