<template>
  <v-card class="ma-10 max-width-1000">
    <v-form class="ma-3">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
                :items="cities"
                v-model="order.city"
                item-text="name"
                return-object
                label="Город"
                prepend-icon="mdi-city"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
                :items="animals"
                v-model="order.animals"
                item-text="name"
                return-object
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
                v-model="order.petServices"
                item-text="name"
                return-object
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
  </v-card>
</template>

<script>
    import * as api from '../../common/api.js';
    import DateField from "../common/DateField";

    export default {
        name: "newOrder",
        components: {
            'date-field': DateField
        },
        data: () => ({
            profile: null,
            order: {
                id: null,
                city: {name: null},
                client: null,
                petsitter: null,
                jobStatus: "Новый",
                animals: [],
                petServices: [],
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
            this.profile = this.$store.getters.profile;
            this.order.city = this.profile.city;
            this.order.client = this.profile;
        },
        methods: {
            createOrder() {
                api.jobController.post("", this.order)
                    .then((response) => {
                        // eslint-disable-next-line no-console
                        console.log(response.data)
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>
  .max-width-1000 {
    max-width: 1000px;
  }
</style>