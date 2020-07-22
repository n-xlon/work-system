<template>
  <div id="app">
    <Header v-if="$route.name && $route.name !== 'Login'">
      <span slot="title">{{ getTitle }}</span>
    </Header>
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
    <div :class="['contain', $route.name === 'Login' && 'is-login']">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  },
  computed: {
    getTitle () {
      return this.$config.RouteMap.filter(item => item.name === this.$route.name)[0].text
    }
  }
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
}
ul,li {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
  width: 100%;
  height: 100%;
  background-color: #F0EDF1;

  .contain {
    width: 100%;
    position: absolute;
    top: 1.5rem;
  }

  .contain.is-login {
    top: inherit;
    height: 100%;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.col_list {
  padding: 0 .4rem;
  box-sizing: border-box;
  background-color: #ffffff;
}
.col_item {
  width: 100%;
  padding: .3rem 0;
  box-sizing: border-box;
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
    right: .4rem;
    top: .4rem;
    font-size: .5rem;
  }
}
</style>
