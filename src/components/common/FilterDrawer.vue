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
              item-text="name"
              return-object
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
              item-text="name"
              @input="updateFilterOptions"
              label="Животные"
              return-object
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
              v-model="filterOptions.petServices"
              @input="updateFilterOptions"
              item-text="name"
              label="Услуги"
              return-object
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

      <v-list-item link v-if="showRating">
        <v-list-item-icon>
          <v-icon>mdi-account-star</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <div class="justify-space-around d-flex flex-row flex-nowrap align-center">
            <v-rating
                v-model="filterOptions.rating"
                empty-icon="mdi-star-outline"
                half-icon="mdi-star-half"
                full-icon="mdi-star"
                half-increments
            ></v-rating>
            <span>{{filterOptions.rating}}</span>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon></v-list-item-icon>
        <v-list-item-content>
          <v-btn
              class="ma-4"
              @click="search"
              color="primary"
          >
            <v-icon left>mdi-magnify</v-icon>
            Поиск
          </v-btn>
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
                petServices: [],
                startDate: null,
                endDate: null,
                creationDate: null,
                rating: null
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
            },
            showRating() {
                return this.type === 'petsitterSearch'
            }
        },
        methods: {
            updateFilterOptions() {
                // const toObjectMapper = item => {
                //     const container = {};
                //     container["name"] = item;
                //     return container;
                // }

                const options = {
                    city: this.filterOptions.city,
                    animals: this.filterOptions.animals,
                    petServices: this.filterOptions.petServices,
                    startDate: this.filterOptions.startDate,
                    endDate: this.filterOptions.endDate,
                    creationDate: this.filterOptions.creationDate,
                    rating: this.filterOptions.rating
                }
                this.$emit('input', options)
            },
            search() {
                this.$emit('search')
            }
        }
    }
</script>

<style scoped>

</style>