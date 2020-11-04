<template>
  <div class="communication">
    <div class="list">
      <div class="item">
        <span>所属部门预算编号</span>
        <el-input class="input-layout input-rlt disabled-text" size="mini" :disabled="true" :value="currentUser.CostCenterForWorkFor.slice(currentUser.CostCenterForWorkFor.length - 4)"></el-input>
<!--        <i class="arrow el-icon-arrow-right"></i>-->
      </div>
      <div class="item">
        <span>YCN招待人员</span>
        <el-input class="input-layout input-rlt disabled-text" size="mini" :disabled="true" v-model="currentUser.Title"></el-input>
        <span>{{communicationData.YCNPersonName}}</span>
      </div>
      <div class="item">
        <span>YCN陪同人员</span>
        <el-input class="input-layout input-rlt" size="mini" v-model="communicationData.OtherUsher"></el-input>
      </div>
      <div class="item">
        <span>Yokogawa集团陪同人员</span>
        <el-input class="input-layout input-rlt" size="mini" v-model="communicationData.GroupAttendant"></el-input>
      </div>
      <div class="item" @click="next('FreeContent')">
        <span>交际费内容</span>
        <i class="arrow el-icon-arrow-right"></i>
      </div>
    </div>
    <p class="sub-title"><img src="../../assets/personnel@2x.png" alt=""><span class="name">客户参加人员信息</span></p>
    <div class="list">
      <div class="item">
        <span>公司名称</span>
        <el-input class="input-layout input-rlt" size="mini" v-model="communicationData.participantsInfo.bussiness"></el-input>
      </div>
      <div class="item">
        <span>参加人员数</span>
        <el-input class="input-layout input-rlt" type="number" size="mini" v-model="communicationData.participantsInfo.num"></el-input>
      </div>
      <div class="item" @click="next('Participants')">
        <span>参与人员</span>
        <i class="arrow el-icon-arrow-right"></i>
      </div>
      <div class="item" @click="choseStartTime">
        <span>开始时间</span>
        <span class="time">{{communicationData.participantsInfo.startTime}}</span>
        <i class="arrow el-icon-arrow-right"></i>
      </div>
      <div class="item" @click="choseEndTime">
        <span>结束时间</span>
        <span class="time">{{communicationData.participantsInfo.endTime}}</span>
        <i class="arrow el-icon-arrow-right"></i>
      </div>
      <div class="item">
        <span>申请所属类型</span>
        <el-radio-group :disabled="true" v-model="communicationData.participantsInfo.requestType">
          <el-radio class="area-item" :label="item.label" v-for="item in requestTypeOptions" :key="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </div>
      <div class="item">
        <span>实际场所</span>
        <el-radio-group class="area-list" v-model="communicationData.participantsInfo.correntArea" @change="changeCorrentArea">
          <el-radio class="area-item" :label="item.label" v-for="item in realAreas" :key="item.value">{{item.label}}</el-radio>
        </el-radio-group>
        <el-input class="area-input input-layout input-rlt" type="text" :disabled="communicationData.participantsInfo.correntArea === '国内'" v-model="communicationData.participantsInfo.OverseasPlace" size="mini"></el-input>
      </div>
      <div class="item">
        <span>实行目的与理由</span>
<!--        <el-input class="input-layout input-rlt" size="mini" v-model="communicationData.participantsInfo.reason"></el-input>-->
        <el-select v-model="communicationData.participantsInfo.reason" placeholder="请选择">
          <el-option
            v-for="item in reasonOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <p class="sub-title"><img src="../../assets/money@2x.png" alt=""><span class="name">预算金额</span></p>
    <div class="list">
      <div class="item">
        <span>总计金额 (元)</span>
        <el-input class="input-layout input-rlt" type="number" size="mini" v-model="communicationData.budgetAmount.totalMoney"></el-input>
      </div>
      <div class="item">
        <span>总人数</span>
        <el-input class="input-layout input-rlt" type="number" size="mini" v-model="communicationData.budgetAmount.totalNum"></el-input>
      </div>
      <div class="item">
        <span>人均 (元)</span>
        <el-input :disabled="true" class="input-layout input-rlt disabled-text" type="number" size="mini" :value="communicationData.budgetAmount.average ? communicationData.budgetAmount.average.toFixed(2) : '0.00'"></el-input>
      </div>
      <div class="item" @click="next('CostList')">
        <span>明细</span>
        <i class="arrow el-icon-arrow-right"></i>
      </div>
    </div>
    <el-button class="submit-btn" @click="submit" :loading="loadingSubmit" type="primary">提交</el-button>
    <calendar :show="showCalendar" @chose="selectDate" @close="showCalendar = false"/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      communicationData: state => state.Communication.communicationData,
      currentUser: state => state.User.currentUser
    })
  },
  data () {
    return {
      showCalendar: false,
      activeItem: '',
      realAreas: [
        { label: '国内', value: '国内' },
        { label: '海外', value: '海外' }
      ],
      areaValue: '',
      reasonOptions: [
        { value: '业务交流', label: '业务交流' },
        { value: '参观与考察', label: '参观与考察' },
        { value: '会议参加', label: '会议参加' },
        { value: '节日问候', label: '节日问候' },
        { value: '公司周年/年会庆贺', label: '公司周年/年会庆贺' }
      ],
      requestTypeOptions: [
        { label: '事前批准', value: '事前批准' },
        { label: '事后批准', value: '事后批准' }
      ],
      loadingSubmit: false
    }
  },
  watch: {
    'communicationData.budgetAmount': {
      handler (newVal, oldVal) {
        const { totalMoney, totalNum } = newVal
        this.communicationData.budgetAmount.average = isNaN(totalMoney) || isNaN(totalNum) || !totalMoney || !totalNum ? 0 : +totalMoney / +totalNum
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations('Communication', [
      'resetCommunication',
      'updateCommunicationData'
    ]),
    ...mapActions('Communication', [
      'submitCommunicationData'
    ]),
    next (name) {
      this.$router.push({ name })
    },
    submit () {
      let { startTime, endTime, bussiness, num, person, correntArea, requestType, OverseasPlace } = this.communicationData.participantsInfo
      let { totalNum, average, totalMoney, details } = this.communicationData.budgetAmount
      let money = details.length ? details.map(item => +item.amount).reduce((prev, mey) => (prev + mey)) : ''
      let message = ''
      console.log(this.communicationData.content)
      if (!this.communicationData.content || !this.communicationData.content.length) {
        message = '交际费内容不能为空'
      } else if (this.communicationData.content.includes('其他') && !this.communicationData.otherText) {
        message = '交际费内容为其他时，说明不能为空'
      } else if (!bussiness) {
        message = '公司名称不能为空'
      } else if (!num) {
        message = '参加人员数不能为空'
      } else if (!person.length) {
        message = '参加人员详情不能为空'
      } else if (person.length !== +num) {
        message = '参加人员数与人员明细数需一致'
      } else if (person.length && person.filter(item => (!item.name || !item.company || !item.position)).length) {
        message = '参与人员明细内容不为空'
      } else if (!startTime || !endTime) {
        message = '开始时间或结束时间不能为空'
      } else if (new Date(endTime).getTime() < new Date(startTime).getTime()) {
        message = '结束时间要大于开始时间'
      } else if (totalMoney === '') {
        message = '总计金额不能为空'
      } else if (correntArea === '海外' && !OverseasPlace) {
        message = '实行场所对应的输入信息不能为空'
      } else if (correntArea === '国内' && requestType === '事前批准' && +average > 300) {
        message = '国内交际费事前人均不能超300'
      } else if (correntArea === '国内' && requestType === '事后批准' && +totalMoney > 500) {
        message = '国内交际费事后总额不能超500'
      } else if (correntArea === '海外' && +average > 600) {
        message = '海外人均不能超600'
      } else if (+totalNum < +num) {
        message = '总人数不能小于参加人员数'
      } else if (!details.length) {
        message = '预算金额明细不能为空'
      } else if (+money !== +totalMoney) {
        message = '金额不符'
      } else if (details.filter(item => (!item.amount || !item.peopleNumber)).length) {
        message = '金额明细内容不能存在空值'
      } else if (new Date(endTime).getTime() - new Date(startTime).getTime() > 1000 * 60 * 60 * 24 * 14) {
        message = '超过限制天数'
      }

      if (message) {
        this.$_toast({ props: { message, duation: 3000 } })
        return
      }

      this.loadingSubmit = true
      this.submitCommunicationData().then(res => {
        this.loadingSubmit = false
        this.resetCommunication()
        this.$router.push({ path: '/home' })
        this.$_toast({ props: {message: '提交成功', duation: 3000}})
      }).catch(() => {
        this.loadingSubmit = false
      })
    },
    selectDate (date) {
      const info = this.communicationData.participantsInfo
      if (!this.activeItem) return
      if (this.activeItem === 'endTime') {
        this.updateCommunicationData({ participantsInfo: { ...info, [this.activeItem]: date, requestType: new Date(date).getTime() >= Date.now() ? '事前批准' : '事后批准' } })
      } else {
        this.updateCommunicationData({ participantsInfo: { ...info, [this.activeItem]: date } })
      }
      this.showCalendar = false
    },
    choseStartTime () {
      this.showCalendar = true
      this.activeItem = 'startTime'
    },
    choseEndTime () {
      this.showCalendar = true
      this.activeItem = 'endTime'
    },
    changeCorrentArea (val) {
      if (val === '海外') {
        this.updateCommunicationData({ participantsInfo: { ...this.communicationData.participantsInfo, requestType: '事前批准' } })
      }
    }
  },
  mounted () {
  },
  created () {
    this.updateCommunicationData({ YCNPersonName: this.currentUser ? this.currentUser['NameForLocal'] : ''})
  }
}
</script>

<style scoped lang="scss">
  .communication {
    .list {
      width: 100%;
      background-color: #ffffff;
      padding: 0 .3rem;
      box-sizing: border-box;
    }
    .item {
      width: 100%;
      height: 1.2rem;
      font-size: .4rem;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      border-bottom: 1px solid #EEEEEE;
      .time {
        display: inline-block;
        width: calc(100% - 3rem);
        text-align: right;
      }

      .area-input {
        width: 3.5rem;
        border: 1px solid #dddddd;
        border-radius: 2px;
      }
    }
    .sub-title {
      width: 100%;
      height: 1.2rem;
      text-align: left;
      padding: 0 .4rem;
      font-size: .4rem;
      margin: 0;
      line-height: 1.2rem;
      position: relative;

      img {
        width: .5rem;
        position: absolute;
        top: .35rem;
      }

      .name {
        margin-left: 0.7rem;
      }
    }
    .arrow {
      font-size: 0.6rem;
      color: #CCCCCC;
    }
    .input-layout {
      width: 4.5rem;
    }
    .submit-btn {
      width: 100%;
      background: #004F9A;
      border: none;
      border-radius: 0;
    }
    .area-list {
      .area-item {
        margin-left: .5rem;
        margin-right: 0;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
</style>
