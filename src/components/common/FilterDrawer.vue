<template>
  <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      width="400"
      permanent
      right
      clipped
      app
  >
    <v-list-item>
      <v-list-item-icon v-show="mini">
        <v-icon>mdi-arrow-expand-left</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Фильтрация</v-list-item-title>
      <v-btn
          icon
          @click.stop="mini = !mini"
      >
        <v-icon>mdi-arrow-collapse-right</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-city</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-autocomplete
              :items="cities"
              v-model="filterOptions.city"
              @input="updateFilterOptions"
              label="Город"
          ></v-autocomplete>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-paw</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-autocomplete
              :items="animals"
              v-model="filterOptions.animals"
              @input="updateFilterOptions"
              label="Животные"
              chips
              multiple
              clearable
          ></v-autocomplete>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-dog-service</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-autocomplete
              :items="services"
              v-model="filterOptions.services"
              @input="updateFilterOptions"
              label="Услуги"
              chips
              multiple
              clearable
          ></v-autocomplete>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link v-if="showDates">
        <v-list-item-icon>
          <v-icon>mdi-calendar-today</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <date-field
              label="Дата начала"
              v-model="filterOptions.startDate"
              @input="updateFilterOptions"
              :no-title="true"
          ></date-field>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link v-if="showDates">
        <v-list-item-icon>
          <v-icon>mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <date-field
              label="Дата окончания"
              v-model="filterOptions.endDate"
              @input="updateFilterOptions"
              :no-title="true"
          ></date-field>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link v-if="showDates">
        <v-list-item-icon>
          <v-icon>mdi-calendar-edit</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <date-field
              label="Дата создания"
              v-model="filterOptions.creationDate"
              @input="updateFilterOptions"
              :no-title="true"
          ></date-field>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
    import DateField from "./DateField";

    export default {
        name: "FilterDrawer",
        props: {
            type: {
                type: String,
                required: true
            },
            value: Object
        },
        components: {
            'date-field': DateField
        },
        data: () => ({
            drawer: true,
            mini: true,
            filterOptions: {
                city: null,
                animals: [],
                services: [],
                startDate: null,
                endDate: null,
                creationDate: null
            }
        }),
        computed: {
            cities() {
                return this.$store.getters.cities
            },
            animals() {
                return this.$store.getters.animals
            },
            services() {
                return this.$store.getters.services
            },
            showDates() {
                return this.type === 'orderSearch'
            }
        },
        methods: {
            updateFilterOptions() {
                this.$emit('input', this.filterOptions)
            }
        }
    }
</script>

<style scoped>

</style>