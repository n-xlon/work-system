<template>
  <div class="communication-details">
    <template v-if="Object.keys(details).length">
      <div class="apply-msg">
        <div class="item">
          <label class="sub-title">所属部门：</label>
          <span class="content">{{details.Department}}</span>
        </div>
        <div class="item">
          <label class="sub-title">YCN招待人员姓名：</label>
          <span class="content">{{details.UsherName}}</span>
        </div>
        <div class="item">
          <label class="sub-title">交际费内容：</label>
          <span class="content">{{details.Category}}</span>
        </div>
      </div>
      <p class="title"><img src="../../assets/personnel@2x.png" alt=""><span class="name">客户参加人员信息</span></p>
      <div class="application-info">
        <div class="item">
          <label class="sub-title">公司名称：</label>
          <span class="content">{{details.Company}}</span>
        </div>
        <div class="item">
          <label class="sub-title">参加人员数：</label>
          <span class="content">{{details.NumberOfClient}}</span>
        </div>
        <div class="item">
          <label class="sub-title">人员信息：</label>
          <span class="content" v-html="getPersonInfo"></span>
        </div>
        <div class="item">
          <label class="sub-title">实行时间：</label>
          <span class="content">{{details.StartDate}}</span>
        </div>
        <div class="item">
          <label class="sub-title">结束时间：</label>
          <span class="content">{{details.EndDate}}</span>
        </div>
        <div class="item">
          <label class="sub-title">实行场所：</label>
          <span class="content">{{details.Place}}</span>
        </div>
        <div class="item">
          <label class="sub-title">实行目的与理由：</label>
          <span class="content">{{details.Purpose}}</span>
        </div>
      </div>
      <p class="title"><img src="../../assets/money@2x.png" alt=""><span class="name">预算金额</span></p>
      <div class="money-info">
        <div class="item">
          <label class="sub-title">总计金额（元）：</label>
          <span class="content">{{details.Amount}}</span>
        </div>
        <div class="item">
          <label class="sub-title">总人数：</label>
          <span class="content">{{details.NumberOfPeople}}</span>
        </div>
        <div class="item">
          <label class="sub-title">人均（元）：</label>
          <span class="content">{{details.PerCapital}}</span>
        </div>
        <div class="item">
          <label class="sub-title">项目：</label>
          <span class="content">{{getProjects}}</span>
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
      <el-button class="approval-btn" type="primary" :loading="loadingApply" @click="handleApproval">提交</el-button>
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
      const moreClients = JSON.parse(this.details.MoreClients)
      if (moreClients.length) {
        let content = ''
        moreClients.forEach((item, index) => {
          const { name, company, position } = item
          content += `<p>${name} ( ${company} ${position} )</p>`
        })
        return content
      } else {
        return ''
      }
    },
    getProjects () {
      const DetailOfBudget = JSON.parse(this.details.DetailOfBudget)
      return DetailOfBudget.map(it => `<p>${it.category}（金额：${it.amount}，人数：${it.peopleNumber}，人均：${it.perCapitalAmount}）</p>`).join(' ')
    }
  },
  data () {
    return {
      result: 1,
      comment: '',
      details: {},
      loadingApply: false
    }
  },
  methods: {
    ...mapActions('TodoList', [
      'approvalTask',
      'getCommunicateDetails'
    ]),
    handleApproval () {
      this.loadingApply = true
      this.approvalTask({
        taskId: this.task.TaskId,
        result: !this.result ? '批准' : '拒绝',
        comment: this.comment
      }).then(data => {
        this.loadingApply = false
        this.$_toast({ props: {message: '提交成功', duation: 3000}})
        this.$emit('back')
      }).catch(() => {
        this.loadingApply = false
        // this.$emit('back')
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
        .sub-title {
          vertical-align: top;
        }
        .content {
          display: inline-block;
          width: calc(100% - 4.2rem);
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
