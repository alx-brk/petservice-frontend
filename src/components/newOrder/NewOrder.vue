<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
              :items="cities"
              v-model="profile.city"
              label="Город"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-autocomplete
              :items="animals"
              v-model="order.animals"
              label="Список животных"
              dense
              chips
              multiple
          ></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-autocomplete
              :items="services"
              v-model="order.services"
              label="Список услуг"
              dense
              chips
              multiple
          ></v-autocomplete>
        </v-col>
        <v-col cols="6">
          <date-field
            :date="order.startDate"
            label="Дата начала"
          ></date-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="order.description"
            label="Описание"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import DateField from "../common/DateField";

    export default {
        name: "newOrder",
        components: {
            'date-field': DateField
        },
        data: () => ({
            profile: {
                email: "masha.pupkina@gmail.com",
                name: "Маша Пупкина",
                city: "Санкт-Петербург",
            },
            order: {
                clientEmail: null,
                city: null,
                animals: [],
                services: [],
                startDate: null,
                endDate: null,
                description: null
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
        mounted() {
            this.order.clientEmail = this.profile.email;
            this.order.city = this.profile.city;
        }
    }
</script>

<style scoped>

</style>