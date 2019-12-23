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
              />
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
                    <v-expansion-panel-header
                            :disable-icon-rotate="errors.name.length > 0 || nullSafetyValid($v.profile.name)">
                        <template v-slot:actions v-if="errors.name.length > 0 || nullSafetyValid($v.profile.name)">
                            <v-icon v-if="errors.name.length > 0" color="error">mdi-alert-circle</v-icon>
                            <v-icon v-if="nullSafetyValid($v.profile.name)" color="teal">mdi-check</v-icon>
                        </template>
                        <exp-panel-header
                                field-name="Имя"
                                v-model="profile.name"
                                @clear="clearName"
                                type="text"
                        />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-text-field
                                :value="profile.name"
                                :error-messages="errors.name"
                                @change="nameInput"
                        />
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header
                            :disable-icon-rotate="errors.phone.length > 0 || nullSafetyValid($v.profile.phone)">
                        <template v-slot:actions v-if="errors.phone.length > 0 || nullSafetyValid($v.profile.phone)">
                            <v-icon v-if="errors.phone.length > 0" color="error">mdi-alert-circle</v-icon>
                            <v-icon v-if="nullSafetyValid($v.profile.phone)" color="teal">mdi-check</v-icon>
                        </template>
                        <exp-panel-header
                                field-name="Телефон"
                                v-model="profile.phone"
                                @clear="clearPhone"
                                type="text"
                        />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-text-field
                                :value="profile.phone"
                                :error-messages="errors.phone"
                                @change="phoneInput"
                        />
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header
                            :disable-icon-rotate="errors.city.length > 0 || nullSafetyValid($v.profile.city)">
                        <template v-slot:actions v-if="errors.city.length > 0 || nullSafetyValid($v.profile.city)">
                            <v-icon v-if="errors.city.length > 0" color="error">mdi-alert-circle</v-icon>
                            <v-icon v-if="nullSafetyValid($v.profile.city)" color="teal">mdi-check</v-icon>
                        </template>
                        <exp-panel-header
                                field-name="Город"
                                v-model="cityName"
                                @clear="clearCity"
                                type="text"
                        />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-autocomplete
                                :items="cities"
                                :value="profile.city"
                                :error-messages="errors.city"
                                @change="cityInput"
                                item-text="name"
                                return-object
                        />
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

            <v-row align="center" justify="start" class="ma-3">
                <v-col cols="4">Данные петситтера</v-col>
                <v-col cols="8">
                    <v-switch
                            v-model="profile.activePetsitter"
                            label="Отображать вас в списке петситтеров"
                    />
                </v-col>
            </v-row>

            <v-expansion-panels popout focusable :disabled="!profile.activePetsitter">
                <v-expansion-panel>
                    <v-expansion-panel-header
                            :disable-icon-rotate="errors.animals.length > 0 || nullSafetyValid($v.profile.animals)">
                        <template v-slot:actions
                                  v-if="errors.animals.length > 0 || nullSafetyValid($v.profile.animals)">
                            <v-icon v-if="errors.animals.length > 0" color="error">mdi-alert-circle</v-icon>
                            <v-icon v-if="nullSafetyValid($v.profile.animals)" color="teal">mdi-check</v-icon>
                        </template>
                        <exp-panel-header
                                field-name="Животные"
                                v-model="profile.animals"
                                @clear="clearAnimals"
                                type="animalChips"
                        />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-autocomplete
                                :items="animals"
                                :value="profile.animals"
                                :error-messages="errors.animals"
                                @change="animalsInput"
                                item-text="name"
                                return-object
                                dense
                                chips
                                multiple
                        />
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header
                            :disable-icon-rotate="showAlert || nullSafetyValidCatalog($v.profile.catalogSet)">
                        <template v-slot:actions v-if="showAlert || nullSafetyValidCatalog($v.profile.catalogSet)">
                            <v-icon v-if="showAlert" color="error">mdi-alert-circle</v-icon>
                            <v-icon v-if="nullSafetyValidCatalog($v.profile.catalogSet)" color="teal">mdi-check</v-icon>
                        </template>
                        <exp-panel-header
                                field-name="Услуги и цены"
                                v-model="notNullCatalog"
                                @clear="clearCatalogSet"
                                type="catalogChips"
                        />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <catalog-set-input
                            :catalog="profile.catalogSet"
                            :errors="errors"
                            @catalogSetChange="catalogSetChange"
                        />
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
                        />
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <v-row no-gutters>
                            <v-col cols="4">Отзывы</v-col>
                            <v-col cols="8" class="text--secondary"
                                   v-text="'Количество отзывов: ' + feedbackCount "/>
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
                                        />
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
    import {required} from 'vuelidate/lib/validators';
    import {profileValidation} from "../../common/validation";
    import ExpPanelHeader from "./ExpPanelHeader";
    import CatalogSetInput from "../common/CatalogSetInput";

    const notEmptyList = (array) => array.length > 0;
    const notEmpty = (value) => value !== undefined && value.id !== null && value.name != null

    export default {
        name: "Profile",
        components: {
            'exp-panel-header': ExpPanelHeader,
            'catalog-set-input': CatalogSetInput
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
            errors: {
                name: [],
                phone: [],
                city: [],
                animals: [],
                catalogSet: []
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
            cityName() {
                return (this.profile.city === undefined || this.profile.city == null) ? '' : this.profile.city.name
            },
            showAlert() {
                return this.errors.catalogSet > 0
            },
        },
        methods: {
            nameInput(value) {
                profileValidation.inputName(this, value)
            },
            phoneInput(value) {
                profileValidation.inputPhone(this, value)
            },
            cityInput(value) {
                profileValidation.inputCity(this, value)
            },
            animalsInput(value) {
                profileValidation.inputAnimals(this, value)
            },
            clearName() {
                profileValidation.clearName(this)
            },
            clearPhone() {
                profileValidation.clearPhone(this)
            },
            clearCity() {
                profileValidation.clearCity(this)
            },
            clearAnimals() {
                profileValidation.clearAnimals(this)
            },
            clearCatalogSet() {
                profileValidation.clearCatalogSet(this)
            },
            catalogSetChange(value) {
                this.profile.catalogSet = value
                profileValidation.catalogSetChange(this)
            },
            saveChanges() {
                if (this.$v.$invalid) {
                    profileValidation.validateForm(this)
                } else {
                    this.profile.avatar = null;
                    this.profile.catalogSet = this.profile.catalogSet.filter(catalog => {
                        return catalog.petService.name != null &&
                            catalog.price != null &&
                            catalog.units != null
                    });

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
            nullSafetyValid(obj) {
                return (obj === undefined || obj === null) ? false : !obj.$invalid && obj.$anyDirty
            },
            nullSafetyValidCatalog(obj) {
                return (obj === undefined || obj === null) ? false : obj.$anyDirty && this.errors.catalogSet.length === 0
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
        },
        validations() {
            if (!this.profile.activePetsitter) {
                return {
                    profile: {
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
                            notEmptyList
                        },
                        catalogSet: {
                            required,
                            notEmptyList,
                            $each: {
                                price: {
                                    required
                                },
                                units: {
                                    required
                                },
                                petService: {
                                    required,
                                    notEmpty
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>