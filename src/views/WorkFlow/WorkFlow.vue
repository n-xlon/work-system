<template>
  <div class="work_flows">
    <div class="search-flows">
      <el-input
        class="search-input"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        @input="inputFilter"
        v-model="searchValue">
      </el-input>
    </div>
    <template v-if="flows.length">
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
    </template>
    <div class="no-results" v-else>
      <span>暂无搜索结果</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchValue: '',
      flows: [],
      backUpFlows: [
        {
          id: 0,
          text: '人事流程',
          img: require('../../assets/portraitse@2x.png'),
          children: [
            { text: '交际费申请单', label: 'communication', path: '/workflow/communication' }
            // { text: '请假单', label: 'communication' }
          ]
        }
        // {
        //   id: 1,
        //   text: '其他流程',
        //   img: require('../../assets/function@2x.png'),
        //   children: [
        //     { text: '合同申请单', item_id: 'contract_application' }
        //   ]
        // }
      ],
      activeItem: [],
      timer: null
    }
  },
  created () {
    this.flows = this.backUpFlows
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
      this.$router.push(path)
    },
    inputFilter (val) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const list = this.backUpFlows.filter(item => item.children.some(it => it.text.indexOf(val) >= 0))
        list.forEach(item => {
          item.children.length && (item.children = item.children.filter(it => it.text.indexOf(val) >= 0))
        })
        this.flows = list
        this.activeItem = [...list.map(it => it.id)]
      }, 500)
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
  .no-results {
    font-size: .4rem;
  }

  .right-arrow {
    font-size: 0.6rem;
    color: #CCCCCC;
  }
</style>
<style lang="scss">
  .search-input input {
    height: 1rem;
  }
</style>
