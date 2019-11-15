<template>
  <v-container>
    <v-layout align="center" justify="start" class="ma-3 flex-wrap flex-row">
      <v-flex>
        <v-avatar>
          <img :src="avatarLink">
        </v-avatar>
      </v-flex>
      <v-flex class="d-flex pr-12">
        <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Выбрать аватар"
            prepend-icon="mdi-camera"
            justify="start"
            align="start"
            v-model="file"
            @change="uploadAvatar"
            flat
            solo
        />
      </v-flex>
      <v-flex align="center" class="text--secondary ma-3" v-text="profile.email"/>
      <v-spacer/>
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
          <span v-text="'Рейтинг петситтера ' + profile.rating"></span>
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
              <v-col cols="8" class="text--secondary" v-text="profile.city.name"></v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-autocomplete :items="cities" v-model="profile.city.name"></v-autocomplete>
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
                class="ma-3"
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
                     v-text="'Количество отзывов: ' + feedbackCount "></v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card
                v-for="(item, index) in profile.feedback"
                :key="index"
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
    <v-row>
      <v-btn
          class="ma-4"
          @click="saveChanges"
          color="primary"
      >
        <v-icon left>mdi-content-save-move</v-icon>
        Сохранить изменения
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
    import * as api from '../../common/api.js';

    export default {
        name: "Profile",
        data: () => ({
            profile: {
                avatar: null,
                email: "",
                name: "",
                phone: "",
                city: "",
                activePetsitter: false,
                catalog: [],
                animals: [],
                description: "",
                rating: null,
                feedback: []
            },
            file: [],
            axiosInst: null
        }),
        computed: {
            notNullCatalog() {
                if (typeof this.profile.catalog !== 'undefined' && this.profile.catalog.length > 0) {
                    return this.profile.catalog.filter(
                        item => (item.service != null && item.price != null)
                    )
                } else {
                    return [];
                }
            },
            feedbackCount() {
                if (typeof this.profile.feedback !== 'undefined') {
                    return this.profile.feedback.length;
                } else {
                    return 0;
                }
            },
            avatarLink() {
                return (this.profile.avatar !== null) ?
                    "http://localhost:8090/image/" + this.profile.avatar.id :
                    "src/assets/logo.png";
            },
            cities() {
                return this.$store.getters.cities.map(item => item.name)
            },
            animals() {
                return this.$store.getters.animals.map(item => item.name)
            },
            services() {
                return this.$store.getters.services.map(item => item.name)
            },
            units() {
                return this.$store.getters.units.map(item => item.name)
            }
        },
        methods: {
            addService() {
                this.profile.catalog.push({service: null, price: null, units: null})
            },
            saveChanges() {
                this.profile.avatar = null;
                api.userController.put("", this.profile)
                    .then((response) => {
                        // eslint-disable-next-line no-console
                        console.log(response.data)
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(error)
                    })
            },
            uploadAvatar() {
                if (this.file !== null) {
                    const formData = new FormData();
                    formData.append("file", this.file);

                    api.imageController.post("/1", formData)
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
        },
        mounted() {
            api.userController.get("", {
                params: {
                    id: null,
                    email: "masha.pupkina@gmail.com"
                }
            })
                .then((response) => {
                    this.profile = response.data;
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                })

        }
    }
</script>

<style scoped>

</style>