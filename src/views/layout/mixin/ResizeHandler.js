import store from '@/store'

const { body } = document
const WIDTH = 1024
const RATIO = 3

export default {
  watch: {
    $route(route) {
      this.device === 'mobile' && this.sidebar.opened && store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  },
  beforeMount() {
    window.addEventListener('resize', this._.debounce(() => { this.resizeHandler() }, 400))
  },
  mounted() {
    this.resize()
  },
  methods: {
    isMiniSize() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    setClientHeight() {
      store.dispatch('SetClientHeight', document.body.clientHeight)
    },
    toggleDevice() {
      const isMiniSize = this.isMiniSize()
      store.dispatch('ToggleDevice', isMiniSize ? 'mobile' : 'desktop')
      isMiniSize && store.dispatch('CloseSideBar', { withoutAnimation: true })
    },
    resize() {
      this.setClientHeight()
      this.toggleDevice()
    },
    resizeHandler() {
      !document.hidden && this.resize()
    }
  }
}
