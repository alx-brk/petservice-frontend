<template>
    <v-card>
        <v-card-title>Персональные данные</v-card-title>
        <v-card-text class="ma-0">

            <v-card class="ma-0 pa-0 mb-3 elevation-5">
                <v-card-title class="text--secondary mb-0 pb-0">Имя</v-card-title>
                <v-card-actions class="pt-0 pb-1 ma-0">
                    <v-text-field
                            :value="name"
                            :error-messages="nameErrors"
                            @change="updateName"
                    />
                </v-card-actions>
            </v-card>

            <v-card class="ma-0 pa-0 mb-3 elevation-5">
                <v-card-title class="text--secondary mb-0 pb-0">Телефон</v-card-title>
                <v-card-actions class="pt-0 pb-1 ma-0">
                    <v-text-field
                            :value="phone"
                            :error-messages="phoneErrors"
                            @change="updatePhone"
                    />
                </v-card-actions>
            </v-card>

            <v-card class="ma-0 pa-0 mb-3 elevation-5">
                <v-card-title class="text--secondary mb-0 pb-0">Город</v-card-title>
                <v-card-actions class="pt-0 pb-1 ma-0">
                    <v-autocomplete
                            :items="cities"
                            :value="city"
                            :error-messages="cityErrors"
                            @change="updateCity"
                            item-text="name"
                            return-object
                    />
                </v-card-actions>
            </v-card>

        </v-card-text>
        <v-card-actions>
            <v-col cols="12">
                <v-row class="align-baseline">
                    <v-btn @click="previousStep" text class="d-flex">
                        Назад
                    </v-btn>
                    <v-btn color="primary" @click="finish" class="d-flex">
                        Завершить регистрацию
                    </v-btn>
                    <v-spacer/>
                    <v-col class="d-flex flex-column flex-shrink-1 flex-grow-0 align-end">
                        <v-btn dark color="#B8860B" @click="nextStep" class="d-flex">
                            Стать петситтером
                        </v-btn>
                        <div @click="showDetails = !showDetails" class="ma-2">
                            <v-icon>mdi-arrow-down-drop-circle-outline</v-icon>
                            Подробнее
                        </div>
                    </v-col>
                </v-row>
                <v-row v-show="showDetails">
                    <v-card>
                        <v-card-text>Став петситтером вы сможете выполнять заявки клиентов и получать деньги за любовь к животным. Вы также можете стать петситтером в любой момент в личном кабинете.</v-card-text>
                    </v-card>
                </v-row>
            </v-col>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "S2PersonalData",
        props: ['name', 'phone', 'city', 'errors'],
        data: () => ({
           showDetails: false
        }),
        computed: {
            cities() {
                return this.$store.getters.cities
            },
            nameErrors() {
                return (this.errors.name) ? this.errors.name : []
            },
            phoneErrors() {
                return (this.errors.phone) ? this.errors.phone : []
            },
            cityErrors() {
                return (this.errors.city) ? this.errors.city : []
            }
        },
        methods: {
            updateName(value) {
                this.$emit("nameInput", value)
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
            updatePhone(value) {
                this.$emit("phoneInput", value)
            },
            updateCity(value) {
                this.$emit("cityInput", value)
            },
            nextStep(){
                this.$emit("next")
            },
            previousStep(){
                this.$emit('previous')
            },
            finish(){
                this.$emit('finish')
            }
        }
    }
</script>

<style scoped>

</style>
