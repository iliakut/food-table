import Vue from 'vue'
import Vuex from 'vuex'
import { emulateGetRequest, emulateDeleteRequest } from './requests'

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
    products: [], // products from JSON
    errorFromServer: false, // error loading data from JSON
    loaded: false, // sets if JSON data loaded
    errorDeleting: false // error deleting
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
    },
    deleteProduct(state, payload) {
      state.products.splice(payload, 1);
    },
    setDeletingError(state, payload) {
      state.errorDeleting = payload;
    }
  },
  actions: {
    getData({ commit }) {
      // get data from JSON
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
    deleteProduct({ commit, state }, payload) {
      // delete data from JSON (not exactly)
      emulateDeleteRequest()
        .then((success) => {
          console.log(success);
          // if success start searching and deleting data in products

          // if we want to delete several products
          if (toString.call(payload) === '[object Array]') {
            for (let i = 0; i < payload.length; i++) {
              for (let j = 0; j < state.products.length; j++) {
                if (state.products[j].id === payload[i].id) {
                  commit("deleteProduct", j);
                }
              }
            }
          }
          // if we want to delete one product
          else if (toString.call(payload) === '[object Object]') {
            for (let j = 0; j < state.products.length; j++) {
              if (state.products[j].id === payload.id) {
                commit("deleteProduct", j)
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
          commit("setDeletingError", true);
        });
    }
  }
})
