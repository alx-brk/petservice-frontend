<template>
    <v-navigation-drawer
            v-model="drawer"
            :mini-variant.sync="mini"
            width="400"
            permanent
            right
            clipped
            app
    >
        <v-list-item>
            <v-list-item-icon v-show="mini">
                <v-icon>mdi-arrow-expand-left</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Фильтрация</v-list-item-title>
            <clear-button @input="clearFilterOptions"/>
            <v-btn
                    icon
                    @click.stop="mini = !mini"
            >
                <v-icon>mdi-arrow-collapse-right</v-icon>
            </v-btn>
        </v-list-item>
        <v-divider/>
        <v-list dense>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-city</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-autocomplete
                            :items="cities"
                            v-model="filterOptions.city"
                            item-text="name"
                            return-object
                            @input="updateFilterOptions"
                            label="Город"
                    />
                </v-list-item-content>
            </v-list-item>

            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-paw</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-autocomplete
                            :items="animals"
                            v-model="filterOptions.animals"
                            item-text="name"
                            @input="updateFilterOptions"
                            label="Животные"
                            return-object
                            chips
                            multiple
                    />
                </v-list-item-content>
            </v-list-item>

            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-dog-service</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-autocomplete
                            :items="services"
                            v-model="filterOptions.petServices"
                            @input="updateFilterOptions"
                            item-text="name"
                            label="Услуги"
                            return-object
                            chips
                            multiple
                    />
                </v-list-item-content>
            </v-list-item>

            <v-list-item link v-if="showDates">
                <v-list-item-icon>
                    <v-icon>mdi-calendar-today</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <date-field
                            label="Дата начала"
                            :value="filterOptions.startDate"
                            @input="updateStartDate"
                            :no-title="true"
                    />
                </v-list-item-content>
            </v-list-item>

            <v-list-item link v-if="showDates">
                <v-list-item-icon>
                    <v-icon>mdi-calendar</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <date-field
                            label="Дата окончания"
                            :value="filterOptions.endDate"
                            @input="updateEndDate"
                            :no-title="true"
                    />
                </v-list-item-content>
            </v-list-item>

            <v-list-item link v-if="showDates">
                <v-list-item-icon>
                    <v-icon>mdi-calendar-edit</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <date-field
                            label="Дата создания"
                            :value="filterOptions.creationDate"
                            @input="updateCreationDate"
                            :no-title="true"
                    />
                </v-list-item-content>
            </v-list-item>

            <v-list-item link v-if="showStatus">
                <v-list-item-icon>
                    <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-autocomplete
                            :items="jobStatuses"
                            v-model="filterOptions.jobStatus"
                            @input="updateFilterOptions"
                            label="Статус"
                    />
                </v-list-item-content>
            </v-list-item>

            <v-list-item link v-if="showRating">
                <v-list-item-icon>
                    <v-icon>mdi-account-star</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <div class="justify-space-around d-flex flex-row flex-nowrap align-center">
                        <v-rating
                                v-model="filterOptions.rating"
                                @input="updateFilterOptions"
                                empty-icon="mdi-star-outline"
                                half-icon="mdi-star-half"
                                full-icon="mdi-star"
                                half-increments
                        />
                        <span>{{filterOptions.rating}}</span>
                    </div>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon/>
                <v-list-item-content>
                    <v-btn
                            class="ma-4"
                            @click="search"
                            color="primary"
                    >
                        <v-icon left>mdi-magnify</v-icon>
                        Поиск
                    </v-btn>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import DateField from "./DateField";
    import ClearButton from "./ClearButton";
    import FilterOptions from "../../model/FilterOptions";

    export default {
        name: "FilterDrawer",
        props: {
            type: {
                type: String,
                required: true
            },
        },
        components: {
            'date-field': DateField,
            'clear-button': ClearButton
        },
        data: () => ({
            drawer: true,
            mini: true,
            filterOptions: new FilterOptions()
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
            jobStatuses() {
                return this.$store.getters.jobStatuses
            },
            showDates() {
                return this.type === 'orderSearch'
            },
            showStatus() {
                return this.type === 'orderSearch'
            },
            showRating() {
                return this.type === 'petsitterSearch'
            },
        },
        methods: {
            updateFilterOptions() {
                this.$emit('input', this.filterOptions)
            },
            search() {
                this.$emit('search')
            },
            clearFilterOptions() {
                this.filterOptions = new FilterOptions()
                this.updateFilterOptions()
            },
            updateStartDate(value) {
                this.filterOptions.startDate = value
                this.updateFilterOptions()
            },
            updateEndDate(value) {
                this.filterOptions.endDate = value
                this.updateFilterOptions()
            },
            updateCreationDate(value) {
                this.filterOptions.creationDate = value
                this.updateFilterOptions()
            }
        }

    }
</script>

<style scoped>

</style>