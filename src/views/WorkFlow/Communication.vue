<template>
  <div class="communication">
    <div class="list">
      <div class="item" @click="next('Department')">
        <span>所属部门</span>
        <i class="arrow el-icon-arrow-right"></i>
      </div>
      <div class="item">
        <span>YCN招待人员姓名</span>
        <el-input class="input-layout" size="mini" v-model="communicationData.YCNPersonName"></el-input>
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
        <el-input class="input-layout" size="mini" v-model="communicationData.participantsInfo.bussiness"></el-input>
      </div>
      <div class="item">
        <span>参加人员数</span>
        <el-input class="input-layout" size="mini" v-model="communicationData.participantsInfo.num"></el-input>
      </div>
      <div class="item" @click="next('Participants')">
        <span>参与人员</span>
        <i class="arrow el-icon-arrow-right"></i>
      </div>
      <div class="item">
        <span>开始时间</span>
        <i class="arrow el-icon-arrow-right"></i>
      </div>
      <div class="item">
        <span>结束时间</span>
        <i class="arrow el-icon-arrow-right"></i>
      </div>
      <div class="item">
        <span>实际场所</span>
        <el-input class="input-layout" size="mini" v-model="communicationData.participantsInfo.correntArea"></el-input>
      </div>
      <div class="item">
        <span>实行目的与理由</span>
        <el-input class="input-layout" size="mini" v-model="communicationData.participantsInfo.reason"></el-input>
      </div>
    </div>
    <p class="sub-title"><img src="../../assets/money@2x.png" alt=""><span class="name">预算金额</span></p>
    <div class="list">
      <div class="item">
        <span>总结金额 (元)</span>
        <el-input class="input-layout" size="mini" v-model="communicationData.budgetAmount.totalMoney"></el-input>
      </div>
      <div class="item">
        <span>总人数</span>
        <el-input class="input-layout" size="mini" v-model="communicationData.budgetAmount.totalNum"></el-input>
      </div>
      <div class="item">
        <span>人均 (元)</span>
        <el-input class="input-layout" size="mini" v-model="communicationData.budgetAmount.totalNum"></el-input>
      </div>
      <div class="item" @click="next('CostList')">
        <span>明细</span>
        <i class="arrow el-icon-arrow-right"></i>
      </div>
    </div>
    <el-button class="submit-btn" type="primary">提交</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      communicationData: state => state.communicationData
    })
  },
  data () {
    return {
    }
  },
  methods: {
    next (name) {
      this.$router.push({ name })
    }
  },
  mounted () {
    console.log(this.communicationData)
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
  }
</style>
