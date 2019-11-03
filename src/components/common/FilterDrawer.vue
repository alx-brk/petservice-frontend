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
              label="Животные"
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
              label="Животные"
          ></v-autocomplete>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
    export default {
        name: "FilterDrawer",
        data: () => ({
            drawer: true,
            mini: true,
            filterOptions: {
                city: null,
                animals: [],
                services: []
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
        },

    }
</script>

<style scoped>

</style>