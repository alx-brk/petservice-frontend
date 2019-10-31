<template>
  <v-form class="ma-3">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
              :items="cities"
              v-model="profile.city"
              label="Город"
              prepend-icon="mdi-city"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-autocomplete
              :items="animals"
              v-model="order.animals"
              label="Список животных"
              prepend-icon="mdi-paw"
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
              prepend-icon="mdi-dog-service"
              dense
              chips
              multiple
          ></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-textarea
              v-model="order.description"
              label="Описание"
              prepend-icon="mdi-text-subject"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-layout class="flex-wrap">
            <v-flex>
              <date-field
                  label="Дата начала"
                  v-model="order.startDate"
                  icon="mdi-calendar-today"
              ></date-field>
            </v-flex>
            <v-flex>
              <date-field
                  label="Дата окончания"
                  v-model="order.endDate"
                  icon="mdi-calendar"
              ></date-field>
            </v-flex>
          </v-layout>
        </v-col>
      </v-row>
      <v-row>
        <v-btn
            class="ma-4"
            @click="createOrder"
            color="primary"
        >
          <v-icon left>mdi-content-save-move</v-icon>
          Создать заказ
        </v-btn>
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
        },
        methods: {
            createOrder() {
                // TODO implement
            }
        }
    }
</script>

<style scoped>

</style>