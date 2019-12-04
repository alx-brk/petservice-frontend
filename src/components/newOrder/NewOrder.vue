<template>
    <v-card class="ma-10 max-width-1000">
        <v-form class="ma-3">

            <input-field-proxy @clear="order.city = null">
                <template #field>
                    <v-autocomplete
                            :items="cities"
                            v-model="$v.order.city.$model"
                            item-text="name"
                            return-object
                            label="Город"
                            prepend-icon="mdi-city"
                    ></v-autocomplete>
                </template>
                <template #alert>
                    <validation-alert
                            class="flex-grow-1 d-flex"
                            v-if="nullSafetyError($v.order.city)"
                    >Требуется указать город</validation-alert>
                </template>
            </input-field-proxy>

            <input-field-proxy @clear="order.animals = []">
                <template #field>
                    <v-autocomplete
                            :items="animals"
                            v-model.lazy="order.animals"
                            @input="$v.order.animals.$touch()"
                            item-text="name"
                            return-object
                            label="Список животных"
                            prepend-icon="mdi-paw"
                            dense
                            chips
                            multiple
                    ></v-autocomplete>
                </template>
                <template #alert>
                    <validation-alert
                            class="flex-grow-1 d-flex"
                            v-if="nullSafetyError($v.order.animals)"
                    >Требуется указать хотя бы одно животное</validation-alert>
                </template>
            </input-field-proxy>

            <input-field-proxy @clear="order.petServices = []">
                <template #field>
                    <v-autocomplete
                            :items="services"
                            v-model.lazy="order.petServices"
                            @input="$v.order.petServices.$touch()"
                            item-text="name"
                            return-object
                            label="Список услуг"
                            prepend-icon="mdi-dog-service"
                            dense
                            chips
                            multiple
                    ></v-autocomplete>
                </template>
                <template #alert>
                    <validation-alert
                            class="flex-grow-1 d-flex"
                            v-if="nullSafetyError($v.order.petServices)"
                    >Требуется указать хотя бы один сервис</validation-alert>
                </template>
            </input-field-proxy>

            <input-field-proxy @clear="order.description = ''">
                <template #field>
                    <v-textarea
                            v-model="order.description"
                            label="Описание"
                            prepend-icon="mdi-text-subject"
                    ></v-textarea>
                </template>
            </input-field-proxy>

            <v-row class="flex-row align-center justify-space-between flex-wrap">
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                    <input-field-proxy fieldClass="" @clear="order.startDate = ''">
                        <template #field>
                            <date-field
                                    label="Дата начала"
                                    v-model="order.startDate"
                                    icon="mdi-calendar-today"
                                    @input="$v.order.startDate.$touch()"
                                    :no-title="true"
                            ></date-field>
                        </template>
                        <template #alert>
                            <validation-alert
                                    class="flex-grow-1 d-flex"
                                    v-if="nullSafetyError($v.order.startDate)"
                            >Дата не может быть в прошлом</validation-alert>
                        </template>
                    </input-field-proxy>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                    <input-field-proxy fieldClass="" @clear="order.endDate = ''">
                        <template #field>
                            <date-field
                                    label="Дата окончания"
                                    v-model="order.endDate"
                                    icon="mdi-calendar"
                                    @input="$v.order.endDate.$touch()"
                                    :no-title="true"
                            ></date-field>
                        </template>
                        <template #alert>
                            <validation-alert
                                    class="flex-grow-1 d-flex"
                                    v-if="nullSafetyError($v.order.endDate)"
                            >Дата не может быть раньше даты начала</validation-alert>
                        </template>
                    </input-field-proxy>
                </v-col>
            </v-row>

            <v-row class="flex-row align-center justify-start">
                <v-btn
                        class="ma-4"
                        @click="createOrder"
                        color="primary"
                        :disabled="buttonDisabled"
                >
                    <v-icon left>mdi-content-save-move</v-icon>
                    Создать заказ
                </v-btn>
            </v-row>

        </v-form>
    </v-card>
</template>

<script>
    import * as api from '../../common/api.js';
    import {required} from 'vuelidate/lib/validators'
    import DateField from "../common/DateField";
    import ValidationAlert from "../common/ValidationAlert";
    import InputFieldProxy from "./InputFieldProxy";

    const startDateValidator = (startDate) => {
        return (startDate === null || startDate === '') ? true :
        startDate >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toISOString()
    };
    const endDateValidator = (endDate, vm) => {
        return (endDate === null || endDate === '') ? true : endDate > vm.startDate
    };
    const notEmpty = (array) => array.length > 0;


    export default {
        name: "newOrder",
        components: {
            'date-field': DateField,
            'validation-alert': ValidationAlert,
            'input-field-proxy': InputFieldProxy
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
            buttonDisabled() {
                return !this.$v.$anyDirty || this.$v.$anyError
            },
        },
        mounted() {
            this.profile = this.$store.getters.profile;
            this.order.city = this.profile.city;
            this.order.client = this.profile;
        },
        methods: {
            createOrder() {
                if (!this.$v.$anyError) {
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
            },
            nullSafetyError(obj) {
                return (obj === undefined || obj === null) ? false : obj.$invalid && obj.$anyDirty
            },
        },
        validations() {
            return {
                order: {
                    city: {
                        required,
                    },
                    client: {
                        required,
                    },
                    animals: {
                        required,
                        notEmpty
                    },
                    petServices: {
                        required,
                        notEmpty
                    },
                    startDate: {
                        startDateValidator
                    },
                    endDate: {
                        endDateValidator
                    },
                }
            }
        }
    }
</script>

<style scoped>
    .max-width-1000 {
        max-width: 1000px;
    }
</style>