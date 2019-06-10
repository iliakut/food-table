<template>
  <v-container>
    <h1>Table UI</h1>
    <hr>
    <v-layout row wrap align-center justify-start>
      <b>Group by:</b>
      <v-flex v-for="(item, index) in headersData" :key="item.text + index" shrink>
        <v-btn color="primary"
               small
               class="text-none"
               v-if="item.text !== ''"
               @click="sortBy(item)">
          <span class="caption">{{ item.text }}</span>
        </v-btn>
      </v-flex>
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
                  <v-btn color="error" flat @click="deleteDeserts(props.item)">Confirm</v-btn>
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
            <v-btn color="error" flat @click="deleteDeserts(selectedDeserts)">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-layout>
    <hr>
  </v-container>
</template>

<script>

  export default {
    props: {
      desserts: {
        type: Array,
        default: () => []
      }
    },
    data: () => ({
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
      desserts1: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
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
      }
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
