<template>
  <v-container>
    <h1>Table UI</h1>
    <hr>
    <v-layout row wrap align-center justify-start>
      <b>Group by: </b>
      <v-btn-toggle mandatory>
        <div v-for="(item, index) in headersData" :key="item.text + index">
          <v-btn @click="sortBy(item)"
                 v-if="item.text !== ''"
                 class="text-none"
                 color="primary">
            <span> {{ item.text }}</span>
          </v-btn>
        </div>
      </v-btn-toggle>
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
          <td>
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td class="text-xs-left" v-for="product in selected" :v-if="selected.includes('product')">{{ props.item[product] }}</td>
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
        </template>
      </v-data-table>
    <v-layout justify-end>
      <v-menu
      >
        <template v-slot:activator="{ on }">
          <v-btn small
                 color="error text-none"
                 v-on="on">
            Delete ({{ selectedDeserts.length }})
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
      errorSnackbar: false,
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
      ],
      selected: ['product', 'calories', 'fat', 'carbs', 'protein', 'iron'],
      selectedDeserts: []
    }),
    computed: {
      selectedObj: function() {
        return this.filterHeaders();
      },
      headersWithoutLastItem: function() {
        return this.headersData.slice(0, this.headersData.length - 1);
      },
      selectAllIcon () {
        if (this.selected.length < 6) return 'check';
        else return 'close';
      },
      ...mapState(["errorDeleting"])
    },
    methods: {
      filterHeaders: function() {
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
        if (this.selected.length < this.headersWithoutLastItem.length) {
          let headerNamesArr = this.headersWithoutLastItem.map(function(item) { return item.value });
          this.selected = headerNamesArr.slice();
        }
        else { this.selected = [] }
      },
      sortBy(item) {
        let index = this.selected.indexOf(item.value);
        if (index === -1) return;
        let deletedElem = this.selected.splice(index, 1);
        this.selected.unshift(deletedElem[0]);
      },
      deleteDeserts(desert) {
        if (toString.call(desert) === '[object Array]') {
          for (let i = 0; i < desert.length; i++) {
            let currentDesertIndex = this.desserts.indexOf(desert[i]);
            this.desserts.splice(currentDesertIndex, 1);
          }
        }
        else {
          let indexOfDesert = this.desserts.indexOf(desert);
          this.desserts.splice(indexOfDesert, 1);
        }
      },
      ...mapActions(["deleteProduct"]),
      ...mapMutations(["setDeletingError"])
    },
    watch: {
      errorDeleting: function() {
        this.errorSnackbar = true;
      },
      errorSnackbar: function() {
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
    visibility: visible
  }
</style>
