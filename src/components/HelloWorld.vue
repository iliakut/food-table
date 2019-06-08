<template>
  <v-container>
    <h1>Table UI</h1>
    <b>Group by:</b>
    <v-btn color="primary"
           small
           v-for="item in headers"
           :key="item.text" v-if="item.text !== ''">{{ item.text }}</v-btn>
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
          <td>{{ props.item.name }}</td>
          <td class="text-xs-left" v-if="choosedHeaders.includes('calories')">{{ props.item.calories }}</td>
          <td class="text-xs-left" v-if="choosedHeaders.includes('fat')">{{ props.item.fat }}</td>
          <td class="text-xs-left" v-if="choosedHeaders.includes('carbs')">{{ props.item.carbs }}</td>
          <td class="text-xs-left" v-if="choosedHeaders.includes('protein')">{{ props.item.protein }}</td>
          <td class="text-xs-left" v-if="choosedHeaders.includes('iron')">{{ props.item.iron }}</td>
          <td class="text-xs-left">
            <v-btn flat small color="error"
                   class="text-none hideButton"
                   @click="deleteItem(props.item)">
              <v-icon
                small
              >
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
      selected: [],
      headers: [
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
      choosedHeaders: ['name', 'calories', 'fat', 'carbs', 'protein', 'iron', '']
    }),
    computed: {
      filteredHeaders: function() {
        return this.filterHeaders();
      },
      defaultHeaders: function() {
        return this.headers.map((item) => { return item.value })
      }
    },
    methods: {
      filterHeaders: function() {
        let filteredArr = [];
        for (let i = 0; i < this.headers.length; i++) {
          if (this.choosedHeaders.includes(this.headers[i].value)) {
            filteredArr.push(this.headers[i]);
          }
        }
        return filteredArr;
      },
      filterComponents: function() {
        let filteredArr = [];
        for (let i = 0; i < this.headers.length; i++) {
          if (this.choosedHeaders.includes(this.headers[i].value)) {
            filteredArr.push(this.headers[i]);
          }
        }
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
