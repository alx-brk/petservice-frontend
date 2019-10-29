<template>
  <v-container>
    <v-layout align="center" justify="start" class="ma-3 flex-wrap">
      <v-flex>
        <v-avatar>
          <img :src="profile.avatar">
        </v-avatar>
      </v-flex>
      <v-flex align="center" class="text--secondary ma-3" v-text="profile.email"/>
      <v-flex>
        <v-tooltip bottom>
          <template #activator="{ on }">
            <span v-on="on">
              <v-rating
                  v-model="profile.rating"
                  empty-icon="mdi-star-outline"
                  half-icon="mdi-star-half"
                  full-icon="mdi-star"
                  half-increments
                  readonly
              ></v-rating>
            </span>
          </template>
          <span v-text="'Рейтинг петситтера ' + profile.rating"/>
        </v-tooltip>
      </v-flex>
    </v-layout>

    <v-row align="center" justify="start" class="ma-3">Общие данные</v-row>

    <v-row align="center">
      <v-expansion-panels popout focusable>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Имя</v-col>
              <v-col cols="8" class="text--secondary" v-text="profile.name"></v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field v-model="profile.name"></v-text-field>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Телефон</v-col>
              <v-col cols="8" class="text--secondary" v-text="profile.phone"></v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field v-model="profile.phone"></v-text-field>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Город</v-col>
              <v-col cols="8" class="text--secondary" v-text="profile.city"></v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-autocomplete :items="cities" v-model="profile.city"></v-autocomplete>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-row align="center" justify="start" class="ma-3">
        <v-col cols="4">Данные петситтера</v-col>
        <v-col cols="8">
          <v-switch
              v-model="profile.activePetsitter"
              label="Отображать вас в списке петситтеров"
          ></v-switch>
        </v-col>
      </v-row>

      <v-expansion-panels popout focusable :disabled="!profile.activePetsitter">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Животные</v-col>
              <v-col cols="8">
                <v-chip
                    v-for="animal in profile.animals"
                    v-text="animal"
                    :key="animal"
                    class="ma-1"
                ></v-chip>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-autocomplete
                :items="animals"
                v-model="profile.animals"
                dense
                chips
                multiple
            ></v-autocomplete>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Услуги и цены</v-col>
              <v-col cols="8">
                <v-chip
                    v-for="option in notNullCatalog"
                    v-text="option.service + ' - ' + option.price"
                    :key="option.service"
                    class="ma-1"
                ></v-chip>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table fixed-header>
              <thead>
              <tr>
                <th class="text-left">Услуга</th>
                <th colspan="2" class="text-left">Цена</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="option in profile.catalog" :key="option.service">
                <td>
                  <v-select :items="services" v-model="option.service"></v-select>
                </td>
                <td>
                  <v-text-field v-model="option.price"></v-text-field>
                </td>
                <td>
                  <v-select :items="units" v-model="option.units"></v-select>
                </td>
              </tr>
              </tbody>
            </v-simple-table>
            <v-btn
                class="ma-2"
                block
                @click="addService"
                color="primary"
            >
              <v-icon left>mdi-plus-circle</v-icon>
              Добавить
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">О себе</v-col>
              <v-col cols="8" class="text--secondary" v-text="profile.description"></v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-textarea
                v-model="profile.description"
                auto-grow
            ></v-textarea>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row no-gutters>
              <v-col cols="4">Отзывы</v-col>
              <v-col cols="8" class="text--secondary"
                     v-text="'Количество отзывов: ' + profile.feedback.length "></v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card
                v-for="item in profile.feedback"
                :key="item"
                class="ma-4 elevation-5"
            >
              <v-card-text class="headline" v-text="item.text"/>
              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-avatar>
                    <v-img class="elevation-5" :src="item.avatar"/>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.author"/>
                  </v-list-item-content>
                  <v-row align="center" justify="end">
                    <v-rating
                        v-model="item.mark"
                        empty-icon="mdi-star-outline"
                        half-icon="mdi-star-half"
                        full-icon="mdi-star"
                        half-increments
                        readonly
                    ></v-rating>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "Profile",
        data: () => ({
            profile: {
                avatar: "https://randomuser.me/api/portraits/women/81.jpg",
                email: "masha.pupkina@gmail.com",
                name: "Маша Пупкина",
                phone: "+79047389265",
                city: "Санкт-Петербург",
                activePetsitter: true,
                catalog: [
                    {service: "Выгул", price: 500, units: "руб"},
                ],
                animals: ["Собаки", "Кошки"],
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                rating: 4.6,
                feedback: [
                    {
                        author: "Вася",
                        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                        mark: 4,
                        text: "Not bad"
                    },
                    {
                        author: "Вася",
                        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                        mark: 4,
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    }
                ]
            },
            cities: ["Санкт-Петербург", "Москва"],
            animals: ["Собаки", "Кошки", "Рыбки", "Рептилии", "Птицы", "Грызуны", "Насекомые", "Другое"],
            services: ["Передержка", "Выгул", "Кормление", "Дрессировка", "Стрижка", "Уход за больным животным"],
            units: ["руб/час", "руб/день", "руб"]
        }),
        computed: {
            notNullCatalog() {
                return this.profile.catalog.filter(
                    item => (item.service != null && item.price != null)
                )
            }
        },
        methods: {
            addService() {
                this.profile.catalog.push({service: null, price: null, units: null})
            }
        }
    }
</script>

<style scoped>

</style>