import Vue from 'vue'
import Toast from '../components/Toast'

const toastConstruct = Vue.extend(Toast)
const toastList = []

export function installToast(options) {
  // if (toastList.length) {
  //   toastList.forEach(item => {
  //     const els = document.getElementsByClassName(item)[0]
  //     document.body.removeChild(els)
  //   })
  // }

  const _toast = new toastConstruct({
    propsData: (function () {
      return options.props || {}
    })()
  })

  if (Object.prototype.toString.call(options) === '[object Object]') {
    if (options.slot) {
      _toast.$slot.default = [options.slot]
    }
  } else {
    console.error('TypeError: params is not a object')
    return
  }
  const toastVm = _toast.$mount()
  const toastClass = `toast_${getUniqueId()}`
  toastVm.$el.className += ` ${toastClass}`
  toastList.push(toastClass)
  document.body.appendChild(toastVm.$el)

  toastVm.$on('close', (that) => {
  })
}

function getUniqueId() {
  return new Date().getTime().toString(32)
}
