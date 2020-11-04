<template>
  <div class="work_flow_layout">
    <router-view/>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
  .work_flow_layout {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    /*-webkit-overflow-scrolling: touch;*/
  }
</style>
