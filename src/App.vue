<template>
  <v-app>
    <v-content>
      <div v-if="errorFromServer">
        <v-alert
          :value="true"
          color="error"
          icon="warning"
          outline>
          Data loading failed. You can try one more time:
          <v-btn small
                 outline
                 color="info"
                 @click="getData()">
            Try
          </v-btn>
        </v-alert>
      </div>
      <div v-else >
        <HelloWorld v-if="loaded"/>
        <div class="text-xs-center"  v-else>
          <v-progress-circular
            :size="100"
            color="primary"
            indeterminate
          ></v-progress-circular>
          <h2 color="primary">loading data...</h2>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: () => ({}),
  computed: {
    ...mapState(["loaded", "errorFromServer"])
  },
  methods: {
    ...mapActions(["getData"])
  },
  mounted: function() {
    this.getData();
  }
}
</script>

<style>
  .v-progress-circular {
    margin-top: 10%;
  }
</style>
