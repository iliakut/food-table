<template>
  <v-container>
    <h1>Table UI</h1>
    <hr>
    <v-layout row wrap align-center justify-start>
      <b>Group by: </b>
      <v-layout justify-start row wrap>
        <v-flex v-for="(item, index) in headersData" :key="item.text + index" shrink>
          <v-btn  class="text-none pa-1 ml-1"
                  :color="(selected[0] !== item.value)? 'black': 'primary'"
                  small
                  align-self-start
                  :flat="selected[0] !== item.value"
                  v-if="item.text !== ''"
                  @click="sortBy(item)">
            <span class="font-weight-light">{{ item.text }}</span>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <v-flex>
        <v-select
          v-model="selected"
          :items="headersWithoutLastItem"
          label="0 columns selected"
          multiple
          :single-line="true">
          <template v-slot:prepend-item>
            <v-list-tile
              ripple
              @click="selectAll"
            >
              <v-list-tile-action>
                <v-icon color="indigo darken-4">{{ selectAllIcon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Select All</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider class="mt-2"></v-divider>
          </template>
          <template v-slot:selection="{ item, index }">
            <span
            v-if="index === 0">
              {{ selected.length }} columns selected
            </span>
        </template>
        </v-select>
      </v-flex>
    </v-layout>
      <v-data-table
        :headers="selectedObj"
        :items="desserts"
        select-all
        v-model="selectedDeserts"
        item-key="id"
      >
        <template v-slot:items="props">
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>
              <v-checkbox
                  v-model="props.selected"
                  primary
                  hide-details
              ></v-checkbox>
            </td>
            <td class="text-xs-left"
                v-for="(product, productIndex) in selected"
                :key="product + productIndex"
                :v-if="selected.includes('product')">
              {{ props.item[product] }}
            </td>
            <td class="text-xs-left">
              <v-menu>
                <template v-slot:activator="{ on }">
                  <v-btn flat small color="error"
                         class="text-none hideButton"
                         v-on="on">
                    <v-icon small>
                      delete
                    </v-icon>
                    Delete
                  </v-btn>
                </template>
                <v-card>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title>
                        Are you sure you want to delete
                        <b>{{ props.item.product }}</b>?
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat>Cancel</v-btn>
                    <v-btn color="error" flat @click="deleteProduct(props.item)">Confirm</v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </td>
          </tr>
        </template>
      </v-data-table>
    <v-layout justify-end>
      <v-menu
      >
        <template v-slot:activator="{ on }">
          <v-btn small
                 color="error"
                 v-on="on"
                 :disabled="selectedDeserts.length === 0">
            Delete <span v-if="selectedDeserts.length !== 0">({{ selectedDeserts.length }})</span>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>
                Are you sure you want to delete selected items?
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat>Cancel</v-btn>
            <v-btn color="error" flat @click="deleteProduct(selectedDeserts)">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-layout>
    <hr>
    <v-snackbar
        v-model="errorSnackbar"
        color="error"
        :timeout="3000">
      server is not responding
      <v-btn flat @click="errorSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
  export default {
    props: {
      desserts: {
        type: Array,
        default: () => []
      }
    },
    data: () => ({
      errorSnackbar: false, // tag to show snackBar
      headersData: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          value: 'product'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
        { text: '', value: '', sortable: false}
      ], // default headers data with parameters
      selected: ['product', 'calories', 'fat', 'carbs', 'protein', 'iron'], // selected headers data (which is shown)
      selectedDeserts: [] // selected deserts to delete
    }),
    computed: {
      selectedObj: function() {
        // make an arr from Objects from filtered headers arr
        return this.filterHeaders();
      },
      headersWithoutLastItem: function() {
        // headers without last item - '' (which contains delete button)
        return this.headersData.slice(0, this.headersData.length - 1);
      },
      selectAllIcon () {
        // toggle select all/select none icon
        if (this.selected.length < 6) return 'check';
        else return 'close';
      },
      // errorDeleting - boolean from Vuex which sets to TRUE if deleting error
      ...mapState(["errorDeleting"])
    },
    methods: {
      filterHeaders: function() {
        // filter headers Arr of Objects the same as sorted Arr
        let selectedHeadersWithDeleteColumn = this.selected.concat(['']);
        let filteredArrofObj = [];
        for (let i = 0; i < selectedHeadersWithDeleteColumn.length; i++) {
          for (let j = 0; j < this.headersData.length; j++) {
            if (selectedHeadersWithDeleteColumn[i] === this.headersData[j].value) {
              filteredArrofObj.push(this.headersData[j]);
            }
          }
        }
        return filteredArrofObj;
      },
      selectAll () {
        // select all columns
        if (this.selected.length < this.headersWithoutLastItem.length) {
          let headerNamesArr = this.headersWithoutLastItem.map(function(item) { return item.value });
          this.selected = headerNamesArr.slice();
        }
        else { this.selected = [] }
      },
      sortBy(item) {
        // make item columns the first
        let index = this.selected.indexOf(item.value);
        if (index === -1) return;
        let deletedElem = this.selected.splice(index, 1);
        this.selected.unshift(deletedElem[0]);
      },
      // deleteProduct - call server to delete product
      ...mapActions(["deleteProduct"]),
      // setDeletingError - set deleting error in Vuex
      ...mapMutations(["setDeletingError"])
    },
    watch: {
      errorDeleting: function() {
        // if it is error on server call snackbar
        this.errorSnackbar = true;
      },
      errorSnackbar: function() {
        // if snackbar finished set deletingError on server to false
        this.setDeletingError(false);
      }
    }
  }
</script>

<style>
  .hideButton {
    visibility: hidden;
    transition: 0s !important;
    -webkit-transition: 0s !important;
  }
  .hideButton > * {
    transition: 0s !important;
    -webkit-transition: 0s !important;
  }
  tr:hover .hideButton {
    visibility: visible;
  }
  tr {
    cursor: pointer;
  }
</style>
