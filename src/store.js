import Vue from 'vue'
import Vuex from 'vuex'
import { emulateGetRequest, emulateDeleteRequest } from './requests'
//console.log(emulateGetRequest())
//console.log(emulateDeleteRequest())

// Также можно использовать async/await
/*async function getData() {
  try {
    let data = await emulateGetRequest();
    return data;
  }
  catch(err) {
    console.log(err);
  }
}*/

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    errorFromServer: false,
    loaded: false
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    setError(state, payload) {
      state.errorFromServer = payload;
    },
    setLoaded(state, payload) {
      state.loaded = payload;
    }
  },
  actions: {
    getData({ commit }) {
      emulateGetRequest()
        .then((success) => {
          commit('setProducts', success);
          commit('setLoaded', true);
          commit('setError', false);
        })
        .catch((error) => {
          console.log(error);
          commit('setError', true );
          commit('setLoaded', true);
        })
    },
  }
})
