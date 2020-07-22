<template>
  <div class="work_flows">
    <div class="search-flows">
      <el-input
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="searchValue">
      </el-input>
    </div>
    <div class="flows-types" v-for="item in flows" :key="item.id">
      <div class="item" @click="handleWorkFlows(item.id)">
        <span class="label">
          <img class="image" :src="item.img" alt="">
          <span class="name">{{item.text}}</span>
        </span><i class="right-arrow el-icon-arrow-right"></i>
      </div>
      <ul v-if="activeItem.includes(item.id)">
        <li class="sub-tasks" @click="jumpToPath(it.path)" v-for="(it, index) in item.children" :key="index">
          <span class="name">{{it.text}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchValue: '',
      flows: [
        {
          id: 0,
          text: '人事流程',
          img: require('../../assets/portraitse@2x.png'),
          children: [
            { text: '交际费申请单', label: 'communication', path: '/workflow/communication' },
            { text: '请假单', label: 'communication' }
          ]
        },
        {
          id: 1,
          text: '其他流程',
          img: require('../../assets/function@2x.png'),
          children: [
            { text: '合同申请单', item_id: 'contract_application' }
          ]
        }
      ],
      activeItem: []
    }
  },
  methods: {
    handleWorkFlows (id) {
      if (this.activeItem.includes(id)) {
        const index = this.activeItem.findIndex(it => it === id)
        index >= 0 && this.activeItem.splice(index, 1)
      } else {
        this.activeItem.push(id)
      }
    },
    jumpToPath (path) {
      console.log(path, 111)
      this.$router.push(path)
    }
  }
}
</script>

<style scoped lang="scss">
  .search-flows {
    margin: .3rem .25rem;
  }
  .flows-types {
    margin-top: .3rem;

    .item {
      width: 100%;
      height: 1.2rem;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 .4rem;
      box-sizing: border-box;
      font-size: .4rem;
      color: #333333;

      .label {
        position: relative;
        .name {
          margin-left: .6rem;
        }
      }

      .image {
        width: .4rem;
        position: absolute;
        top: .08rem;
      }
    }
    .sub-tasks {
      height: 1.2rem;
      line-height: 1.2rem;
      border-bottom: 1px solid #DCDCDC;
      font-size: .4rem;
      text-align: left;
      margin: 0 .5rem;
      box-sizing: border-box;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .right-arrow {
    font-size: 0.6rem;
    color: #CCCCCC;
  }
</style>
