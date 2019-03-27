<template>
  <div class="app" :class="{ fixed: isFixed }">
    <router-view></router-view>
    <app-loading v-if="isShow"></app-loading>
    <app-test></app-test>
  </div>
</template>

<script>

import Loading  from '~common/components/loading';
import Test   from '~common/components/dialogs';

export default {
  name: 'app',
  data () {
    return {}
  },
  computed: {
    isShow () {
      return this.$store.get.state.Loading.isShow;
    },
    isFixed () {
      return this.$store.get.state.App.appFixed;
    },
    styleObj () {
      return this.$store.get.state.App.styleObj;
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  components: {
    'appLoading': Loading,
    'appTest' : Test,
  },
  methods: {
    fetchData () {
      let self = this;

      self.$store.get.commit('reSetText');
      self.$store.get.dispatch({
        type: 'Loading',
        isShow: true,
      });

      self.$nextTick(() => {
        setTimeout(function () {
          self.$store.get.dispatch({
            type: 'Loading',
            isShow: false,
          });
        }, 500);
      });
    }
  }
}
</script>