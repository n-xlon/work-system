<template>
  <div class="communication-details">
    <div class="apply-msg">
      <div class="item">
        <label>所属部门：</label>
        <span>行政人事部</span>
      </div>
      <div class="item">
        <label>YCN招待人员姓名：</label>
        <span>张三</span>
      </div>
      <div class="item">
        <label>交际费内容：</label>
        <span>餐费</span>
      </div>
    </div>
    <p class="title"><img src="../../assets/personnel@2x.png" alt=""><span class="name">客户参加人员信息</span></p>
    <div class="application-info">
      <div class="item">
        <label>公司名称：</label>
        <span>某某网络公司</span>
      </div>
      <div class="item">
        <label>参加人员数：</label>
        <span>2</span>
      </div>
      <div class="item">
        <label>人员信息：</label>
        <span>李思（某某公司 销售经理）</span>
      </div>
      <div class="item">
        <label>实行时间：</label>
        <span>2019-10-11</span>
      </div>
      <div class="item">
        <label>结束时间：</label>
        <span>2019-10-11</span>
      </div>
      <div class="item">
        <label>实行场所：</label>
        <span>某某酒店</span>
      </div>
      <div class="item">
        <label>实行目的与理由：</label>
        <span>客户接待</span>
      </div>
    </div>
    <p class="title"><img src="../../assets/money@2x.png" alt=""><span class="name">预算金额</span></p>
    <div class="money-info">
      <div class="item">
        <label>总计金额（元）：</label>
        <span>300</span>
      </div>
      <div class="item">
        <label>总人数：</label>
        <span>2</span>
      </div>
      <div class="item">
        <label>人均（元）：</label>
        <span>100</span>
      </div>
      <div class="item">
        <label>项目：</label>
        <span>餐费</span>
      </div>
    </div>
    <p class="others"><span>备注：</span>无</p>
    <div class="approval">
      <div class="approval-switch">
        <span>审批：</span>
        <el-radio-group v-model="result">
          <el-radio :label="0">同意</el-radio>
          <el-radio :label="1">不同意</el-radio>
        </el-radio-group>
      </div>
      <div class="approval-content">
        <span>审批意见：</span>
        <el-input type="textarea" v-model="comment"></el-input>
      </div>
    </div>
    <el-button class="approval-btn" type="primary" @click="handleApproval">提交</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    task: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      result: 1,
      comment: 'xxx'
    }
  },
  methods: {
    ...mapActions('TodoList', [
      'approvalTask',
      'getCommunicateDetails'
    ]),
    handleApproval () {
      this.approvalTask({
        taskId: task.TaskId,
        result: !this.result,
        comment: this.comment
      }).then(data => {
        console.log(data, '提交成功')
      })
    },
    initDetails () {
      const { task } = this
      const data = {
        WorkflowNum: task.WorkflowNumber,
        WFInstanceId: task.WorkflowInstanceId
      }
      this.getCommunicateDetails(data)
    }
  },
  mounted () {
    this.initDetails()
  }
}
</script>

<style lang="scss">
  .communication-details {
    .apply-msg, .application-info, .money-info {
      background-color: #ffffff;
      text-align: initial;
      font-size: .4rem;
      font-weight: 400;
      padding: .3rem 0;
      .item {
        margin-top: .3rem;
        &:first-child {
          margin-top: 0;
        }
      }
      label {
        display: inline-block;
        width: 4rem;
        text-align: right;
      }
    }
    .title {
      margin: 0;
      padding: .3rem .2rem;
      font-size: .4rem;
      text-align: left;
      box-sizing: border-box;
      position: relative;

      img {
        width: 0.5rem;
        position: absolute;
        top: .35rem;
      }

      .name {
        margin-left: .7rem;
      }
    }
    .others {
      margin: 0;
      margin-top: .3rem;
      background-color: #ffffff;
      text-align: left;
      font-size: .4rem;
      padding: .3rem .3rem;
    }
    .approval {
      margin-top: .3rem;
      background-color: #ffffff;
      text-align: left;
      font-size: .4rem;
      padding: .2rem .3rem;
      box-sizing: border-box;
      .el-radio-group {
        margin-left: .3rem;
      }
      .el-radio {
        margin-right: .5rem;
      }
    }
    .approval-content {
      margin-top: .3rem;
      .el-textarea {
        margin-top: .2rem;
      }
    }
    .approval-btn {
      background-color: #004F9A;
      margin-top: .3rem;
      width: 100%;
    }
  }
</style>
