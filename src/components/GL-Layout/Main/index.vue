<template>
   <gl-scroll :height="nHeight">
          <app-main :cachedViews="cachedViews" />
      </gl-scroll>
</template>

<script>
import { mapGetters } from 'vuex'
import GlScroll from '@/components/GL-Scroll'
import AppMain from './AppMain'
import pub from '../mixins/public'
const EXCLUDE = 124
/**
 * 默认颜色
 */
export default {
  name: 'GLAppMain',
  mixins: [pub],
  components: {
    AppMain,
    GlScroll
  },
  computed: {
    ...mapGetters([
      'clientHeight',
      'cachedViews'
    ]),
    nHeight() {
      return this.clientHeight - EXCLUDE
    }
  }
}
</script>
