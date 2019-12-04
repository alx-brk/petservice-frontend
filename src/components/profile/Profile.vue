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
                        <exp-panel-header
                            field-name="Имя"
                            v-model="profile.name"
                            @clear="profile.name = ''"
                            type="text"
                        />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-text-field v-model.lazy="$v.profile.name.$model"></v-text-field>
                        <validation-alert v-if="!$v.profile.name.required">Требуется указать имя</validation-alert>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <exp-panel-header
                                field-name="Телефон"
                                v-model="profile.phone"
                                @clear="profile.phone = ''"
                                type="text"
                        />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-text-field v-model.lazy="$v.profile.phone.$model"></v-text-field>
                        <validation-alert v-if="!$v.profile.phone.required">Требуется указать телефон</validation-alert>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <exp-panel-header
                                field-name="Город"
                                v-model="cityName"
                                @clear="profile.city = null"
                                type="text"
                        />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-autocomplete
                                :items="cities"
                                v-model.lazy="$v.profile.city.$model"
                                item-text="name"
                                return-object
                        ></v-autocomplete>
                        <validation-alert v-if="nullSafetyError($v.profile.city)">Требуется указать город</validation-alert>
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
                        <exp-panel-header
                                field-name="Животные"
                                v-model="profile.animals"
                                @clear="profile.animals = []"
                                type="animalChips"
                        />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-autocomplete
                                :items="animals"
                                v-model.lazy="profile.animals"
                                @input="$v.profile.animals.$touch()"
                                item-text="name"
                                return-object
                                dense
                                chips
                                multiple
                        ></v-autocomplete>
                        <validation-alert v-if="nullSafetyError($v.profile.animals)">Требуется указать хотя бы одно животное</validation-alert>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <exp-panel-header
                                field-name="Услуги и цены"
                                v-model="notNullCatalog"
                                @clear="profile.catalogSet = []"
                                type="catalogChips"
                        />
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
                            <tr v-for="option in profile.catalogSet" :key="option.petService.id">
                                <td>
                                    <v-select
                                            :items="services"
                                            @input="$v.profile.catalogSet.$touch()"
                                            item-text="name"
                                            v-model="option.petService"
                                            return-object
                                    ></v-select>
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
                        <validation-alert v-if="nullSafetyError($v.profile.catalogSet)">Требуется указать хотя бы один сервис</validation-alert>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <exp-panel-header
                                field-name="О себе"
                                v-model="profile.description"
                                @clear="profile.description = ''"
                                type="text"
                        />
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
                    :disabled="buttonDisabled"
            >
                <v-icon left>mdi-content-save-move</v-icon>
                Сохранить изменения
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
    import * as api from '../../common/api.js';
    import {required, email} from 'vuelidate/lib/validators';
    import ValidationAlert from "../common/ValidationAlert";
    import ExpPanelHeader from "./ExpPanelHeader";

    const notEmpty = (array) => array.length > 0;

    export default {
        name: "Profile",
        components: {
            'validation-alert': ValidationAlert,
            'exp-panel-header': ExpPanelHeader
        },
        data: () => ({
            profile: {
                id: null,
                avatar: null,
                email: "",
                name: "",
                phone: "",
                city: "",
                activePetsitter: false,
                catalogSet: [],
                animals: [],
                description: "",
                rating: null,
                feedback: []
            },
            file: [],
            validCities: []
        }),
        computed: {
            notNullCatalog() {
                if (typeof this.profile.catalogSet !== 'undefined' && this.profile.catalogSet.length > 0) {
                    return this.profile.catalogSet.filter(
                        item => (item.petService != null && item.price != null)
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
                    require('@/assets/paw_icon.png');
            },
            cities() {
                return this.$store.getters.cities
            },
            animals() {
                return this.$store.getters.animals
            },
            services() {
                return this.$store.getters.services
            },
            units() {
                return this.$store.getters.units
            },
            buttonDisabled() {
                return !this.$v.$anyDirty || this.$v.$anyError
            },
            cityName() {
                return (this.profile.city === undefined || this.profile.city == null) ? '' : this.profile.city.name
            }
        },
        methods: {
            addService() {
                this.profile.catalogSet.push({petService: {name: null}, price: null, units: null})
            },
            saveChanges() {
                if (!this.$v.$anyError) {
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
                }
            },
            nullSafetyError(obj) {
                return (obj === undefined || obj === null) ? false : obj.$invalid && obj.$anyDirty
            },
            uploadAvatar() {
                if (this.file !== null) {
                    const formData = new FormData();
                    formData.append("file", this.file);

                    api.imageController.post("/" + this.profile.id, formData)
                        .then((response) => {
                            this.profile.avatar = response.data
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
            this.profile = this.$store.getters.profile
            // eslint-disable-next-line no-console
            console.log("mounted profile")
        },
        validations() {
            if (!this.profile.activePetsitter) {
                return {
                    profile: {
                        email: {
                            required,
                            email
                        },
                        name: {
                            required
                        },
                        phone: {
                            required
                        },
                        city: {
                            required
                        }
                    }
                }
            } else {
                return {
                    profile: {
                        email: {
                            required,
                            email
                        },
                        name: {
                            required
                        },
                        phone: {
                            required
                        },
                        city: {
                            required,
                        },
                        animals: {
                            required,
                            notEmpty
                        },
                        catalogSet: {
                            required,
                            notEmpty
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>