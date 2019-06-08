<template>
  <v-container>
    <h1>Table UI</h1>
    <v-layout row wrap align-center justify-start>
      <b>Group by:</b>
      <v-flex v-for="item in headersData" :key="item.text" shrink>
        <v-btn color="primary"
               small
               v-if="item.text !== ''">{{ item.text }}</v-btn>
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
                <v-icon color="indigo darken-4">{{ selecrAllIcon }}</v-icon>
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
        :headers="filteredHeaders"
        :items="desserts"
        select-all
        v-model="selected"
        item-key="name"
      >
        <template v-slot:items="props">
          <td>
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td class="text-xs-left" v-if="chosedHeadersWithDeleteColumn.includes('name')">{{ props.item.name }}</td>
          <td class="text-xs-left" v-if="chosedHeadersWithDeleteColumn.includes('calories')">{{ props.item.calories }}</td>
          <td class="text-xs-left" v-if="chosedHeadersWithDeleteColumn.includes('fat')">{{ props.item.fat }}</td>
          <td class="text-xs-left" v-if="chosedHeadersWithDeleteColumn.includes('carbs')">{{ props.item.carbs }}</td>
          <td class="text-xs-left" v-if="chosedHeadersWithDeleteColumn.includes('protein')">{{ props.item.protein }}</td>
          <td class="text-xs-left" v-if="chosedHeadersWithDeleteColumn.includes('iron')">{{ props.item.iron }}</td>
          <td class="text-xs-left">
            <v-btn flat small color="error"
                   class="text-none hideButton"
                   @click="deleteItem(props.item)">
              <v-icon small>
                delete
              </v-icon>
               Delete
            </v-btn>
          </td>
        </template>
      </v-data-table>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      headersData: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
        { text: '', value: '', sortable: false}
      ],
      desserts: [
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
      selected: ['name', 'calories', 'fat', 'carbs', 'protein', 'iron']
    }),
    computed: {
      filteredHeaders: function() {
        return this.filterHeaders();
      },
      defaultHeadersText: function() {
        return this.headersData.map((item) => { return item.text })
      },
      chosedHeadersWithDeleteColumn: function() {
        return this.selected.concat(['']);
      },
      headersWithoutLastItem: function() {
        return this.headersData.slice(0, this.headersData.length - 1);
      },
      selecrAllIcon () {
        if (this.selected.length < 6) return 'check';
        else return 'close';
      }
    },
    methods: {
      filterHeaders: function() {
        let filteredArr = [];
        for (let i = 0; i < this.headersData.length; i++) {
          if (this.chosedHeadersWithDeleteColumn.includes(this.headersData[i].value)) {
            filteredArr.push(this.headersData[i]);
          }
        }
        return filteredArr;
      },
      selectAll: function() {
        this.selected = 1;
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
