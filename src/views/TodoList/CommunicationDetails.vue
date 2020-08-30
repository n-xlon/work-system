<template>
  <div class="communication-details">
    <template v-if="Object.keys(details).length">
      <div class="apply-msg">
        <div class="item">
          <label>所属部门：</label>
          <span>{{details.Department}}</span>
        </div>
        <div class="item">
          <label>YCN招待人员姓名：</label>
          <span>{{details.UsherName}}</span>
        </div>
        <div class="item">
          <label>交际费内容：</label>
          <span>{{details.Category}}</span>
        </div>
      </div>
      <p class="title"><img src="../../assets/personnel@2x.png" alt=""><span class="name">客户参加人员信息</span></p>
      <div class="application-info">
        <div class="item">
          <label>公司名称：</label>
          <span>{{details.Company}}</span>
        </div>
        <div class="item">
          <label>参加人员数：</label>
          <span>{{details.NumberOfClient}}</span>
        </div>
        <div class="item">
          <label>人员信息：</label>
          <span>{{getPersonInfo}}</span>
        </div>
        <div class="item">
          <label>实行时间：</label>
          <span>{{details.StartDate}}</span>
        </div>
        <div class="item">
          <label>结束时间：</label>
          <span>{{details.EndDate}}</span>
        </div>
        <div class="item">
          <label>实行场所：</label>
          <span>{{details.Place}}</span>
        </div>
        <div class="item">
          <label>实行目的与理由：</label>
          <span>{{details.Purpose}}</span>
        </div>
      </div>
      <p class="title"><img src="../../assets/money@2x.png" alt=""><span class="name">预算金额</span></p>
      <div class="money-info">
        <div class="item">
          <label>总计金额（元）：</label>
          <span>{{details.Amount}}</span>
        </div>
        <div class="item">
          <label>总人数：</label>
          <span>{{details.NumberOfPeople}}</span>
        </div>
        <div class="item">
          <label>人均（元）：</label>
          <span>{{details.PerCapital}}</span>
        </div>
        <div class="item">
          <label>项目：</label>
          <span>{{getProjects}}</span>
        </div>
      </div>
      <p class="others"><span>备注：</span>{{details.Remark}}</p>
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
    </template>
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
  computed: {
    getPersonInfo () {
      if (!Object.keys(this.details).length) return ''
      const [{ name, company, position }] = JSON.parse(this.details.MoreClients)
      return `${name} ( ${company} ${position} )`
      // return ''
    },
    getProjects () {
      const DetailOfBudget = JSON.parse(this.details.DetailOfBudget)
      return DetailOfBudget.map(it => it.category).join(',')
    }
  },
  data () {
    return {
      result: 1,
      comment: '',
      details: {}
    }
  },
  methods: {
    ...mapActions('TodoList', [
      'approvalTask',
      'getCommunicateDetails'
    ]),
    handleApproval () {
      this.approvalTask({
        taskId: this.task.TaskId,
        result: !this.result ? '批准' : '拒绝',
        comment: this.comment
      }).then(data => {
        console.log(data, '提交成功')
        this.$emit('back')
      })
    },
    async initDetails () {
      const { task } = this
      const data = {
        WorkflowNum: task.WorkflowNumber,
        WFInstanceId: task.WorkflowInstanceId
      }
      const loadingDetail = this.$loading({background: 'transparent'})
      try {
        const details = await this.getCommunicateDetails(data)
        loadingDetail.close()
        const { SocialExpensesData, ApprovalHistory } = details
        this.details = SocialExpensesData
        console.log(details)
      } catch (e) {
        loadingDetail.close()
      }
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
