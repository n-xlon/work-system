<template>
  <div class="calendar-mask" v-show="show" @click.self="closeCalendar">
    <transition name="move-bottom">
      <calendar-init
        v-if="show"
        :textTop="['S','M','T','W','T','F','S']"
        @choseDay="chooseDate"
        :sundayStart="true"
      >
      </calendar-init>
    </transition>
  </div>
</template>

<script>
import CalendarInit from 'vue-calendar-component'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  components: {
    CalendarInit
  },
  methods: {
    chooseDate (date) {
      this.$emit('chose', date)
    },
    closeCalendar () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
  .calendar-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    top: 0;
  }
  .wh_container {
    max-width: inherit !important;
    width: 100%;
    position: absolute;
    bottom: 0;
    .wh_content_all {
      background-color: #ffffff !important;
      .wh_top_changge > li {
        color: #000;
        .wh_jiantou1 {
          border-top: 2px solid #000;
          border-left: 2px solid #000;
        }
        .wh_jiantou2 {
          border-top: 2px solid #000;
          border-right: 2px solid #000;
        }
      }
      .wh_content_item {
        color: #000;
        .wh_isToday {
          background: #dddddd;
        }
        .wh_chose_day {
          background: #dddddd;
        }
      }
    }
  }
  .move-bottom-enter-active, .move-bottom-leave-active {
    transition: all 1s;
  }
  .move-bottom-enter {
    bottom: 0;
  }
  .move-bottom-leave-to {
    top: 100%;
  }
</style>
