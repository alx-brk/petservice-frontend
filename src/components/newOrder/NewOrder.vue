<template>
    <v-card class="ma-10 max-width-1000">
        <v-form class="ma-3">

            <input-field-proxy @clear="clearCity">
                <v-autocomplete
                        :items="cities"
                        :value="order.city"
                        item-text="name"
                        return-object
                        label="Город"
                        prepend-icon="mdi-city"
                        :error-messages="errors.city"
                        @change="cityInput"
                />
            </input-field-proxy>

            <input-field-proxy @clear="clearAnimals">
                <v-autocomplete
                        :items="animals"
                        :value="order.animals"
                        :error-messages="errors.animals"
                        @change="animalsInput"
                        item-text="name"
                        return-object
                        label="Список животных"
                        prepend-icon="mdi-paw"
                        dense
                        chips
                        multiple
                />
            </input-field-proxy>

            <input-field-proxy @clear="clearPetServices">
                <v-autocomplete
                        :items="services"
                        :value="order.petServices"
                        :error-messages="errors.petServices"
                        @change="petServicesInput"
                        item-text="name"
                        return-object
                        label="Список услуг"
                        prepend-icon="mdi-dog-service"
                        dense
                        chips
                        multiple
                />
            </input-field-proxy>

            <input-field-proxy @clear="order.description = ''">
                <v-textarea
                        v-model="order.description"
                        label="Описание"
                        prepend-icon="mdi-text-subject"
                />
            </input-field-proxy>

            <v-row class="flex-row align-center justify-space-between flex-wrap">
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                    <input-field-proxy fieldClass="" @clear="clearStartDate">
                        <date-field
                                label="Дата начала"
                                :value="order.startDate"
                                :errors="errors.startDate"
                                icon="mdi-calendar-today"
                                @input="startDateInput"
                        />
                    </input-field-proxy>
                </v-col>
                <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                    <input-field-proxy fieldClass="" @clear="clearEndDate">
                        <date-field
                                label="Дата окончания"
                                :value="order.endDate"
                                :errors="errors.endDate"
                                icon="mdi-calendar"
                                @input="endDateInput"
                        />
                    </input-field-proxy>
                </v-col>
            </v-row>

            <v-row class="flex-row align-center justify-start">
                <v-btn
                        class="ma-4"
                        @click="createOrder"
                        color="primary"
                >
                    <v-icon left>mdi-content-save-move</v-icon>
                    Создать заказ
                </v-btn>
            </v-row>

        </v-form>
    </v-card>
</template>

<script>
    import {orderValidation, validationConfigs} from "../../common/validation";
    import DateField from "../common/DateField";
    import InputFieldProxy from "./InputFieldProxy";
    import JobService from "../../services/JobService";
    import Job from "../../model/Job";
    import UserService from "../../services/UserService";


    export default {
        name: "newOrder",
        components: {
            'date-field': DateField,
            'input-field-proxy': InputFieldProxy
        },
        data: () => ({
            profile: null,
            order: new Job(),
            errors: {
                city: [],
                animals: [],
                petServices: [],
                startDate: [],
                endDate:[]
            }
        }),
        created() {
            this.profile = UserService.currentUserValue;
            if (!this.profile){
                this.$router.push('/login')
            }
        },
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
            this.order.city = this.profile.city;
            this.order.client = this.profile;
        },
        methods: {
            cityInput(value) {
                orderValidation.inputCity(this, value)
            },
            animalsInput(value) {
                orderValidation.inputAnimals(this, value)
            },
            petServicesInput(value) {
                orderValidation.inputPetServices(this, value)
            },
            startDateInput(value) {
                orderValidation.inputStartDate(this, value)
            },
            endDateInput(value) {
                orderValidation.inputEndDate(this, value)
            },
            clearCity() {
                orderValidation.clearCity(this)
            },
            clearAnimals() {
                orderValidation.clearAnimals(this)
            },
            clearPetServices() {
                orderValidation.clearPetServices(this)
            },
            clearStartDate() {
                orderValidation.clearStartDate(this)
            },
            clearEndDate() {
                orderValidation.clearEndDate(this)
            },
            createOrder() {
                if (this.$v.$invalid){
                    orderValidation.validateForm(this)
                    // eslint-disable-next-line no-console
                    console.log("invalid")
                } else {
                    JobService.createOrder(this.order)
                        .then((response) => {
                            // eslint-disable-next-line no-console
                            console.log('response of order creation')
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
                return (obj) ? obj.$invalid && obj.$anyDirty : false
            },
        },
        validations() {
            return validationConfigs.newOrder();
        }
    }
</script>

<style scoped>
    .max-width-1000 {
        max-width: 1000px;
    }
</style>
