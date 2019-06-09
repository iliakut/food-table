<template>
  <v-app>
    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: () => ({}),
  methods: {
    ...mapActions(["getData"])
  },
  mounted: function() {
    this.getData();
  }
}
</script>
