<template>
    <v-card class="flex-column max-width-1000">
        <div class="justify-space-between flex-wrap flex-row d-flex">
            <div class="pa-3 mt-0 flex-row d-flex align-center">
                <span class="text--secondary">Клиент:</span>
                <person-card
                        :person="order.client"
                />
            </div>
            <div class="pa-3 mt-0 flex-row d-flex align-center">
                <span class="text--secondary">Петситтер:</span>
                <person-card
                        :person="order.petsitter"
                />
            </div>
            <div class="pa-3 mt-0 flex-row d-flex align-center">
                <span class="text--secondary mr-3">Статус:</span>
                <v-alert
                        class="pa-3"
                        border="bottom"
                        dense
                        text
                        :icon="statusIcon"
                        :color="statusColor"
                >{{ order.jobStatus }}
                </v-alert>
            </div>
        </div>
        <v-row class="justify-space-between flex-wrap d-flex flex-row">
            <v-col xl="2" lg="2" md="2" sm="5" xs="12" class="d-flex flex-wrap flex-column pa-3 mt-0 ml-3">
                <span class="text--secondary">Животные</span>
                <readonly-chip-group
                        :all-items="animals"
                        :selected-items="selectedAnimals"
                />
            </v-col>
            <v-col xl="2" lg="2" md="2" sm="5" xs="12" class="d-flex flex-column flex-wrap pa-3 mt-0 ml-3">
                <span class="text--secondary">Услуги</span>
                <readonly-chip-group
                        :all-items="services"
                        :selected-items="selectedServices"
                />
            </v-col>
            <v-col xl="7" lg="7" md="7" sm="12" xs="12" class="d-flex flex-column flex-wrap pa-3 mt-0 ml-3">
                <span class="text--secondary">Описание</span>
                <span>{{ order.description }}</span>
            </v-col>
        </v-row>
        <div class="justify-space-between flex-wrap flex-row d-flex">
            <div class="d-flex pa-3 mt-0 align-center flex-wrap">
                <span class="text--secondary">Даты:</span>
                <div class="flex-row d-flex align-center">
                    <span class="ml-3">с</span>
                    <v-chip outlined dense class="ma-2" color="primary">{{ order.startDate }}</v-chip>
                </div>
                <div class="flex-row d-flex align-center">
                    <span class="ml-3">по</span>
                    <v-chip v-if="!!order.endDate" outlined dense class="ma-2" color="primary">{{order.endDate }}
                    </v-chip>
                    <v-chip v-else outlined dense class="ma-2" color="primary">Не указано</v-chip>
                </div>
            </div>
            <div class="d-flex align-center pa-3 mt-0">
                <span class="text--secondary">Дата создания:</span>
                <v-chip outlined dense class="ma-2" color="primary">{{order.creationDate }}</v-chip>
            </div>
        </div>
    </v-card>
</template>

<script>
    import PersonCard from "./PersonCard";
    import ReadonlyChipGroup from "./ReadonlyChipGroup";

    export default {
        name: "OrderCard",
        props: {
            order: Object,
            selectedItemsContainer: Object
        },
        components: {
            'person-card': PersonCard,
            'readonly-chip-group': ReadonlyChipGroup
        },
        computed: {
            statusIcon() {
                return (this.order.status === 'Новый')
                    ? 'mdi-checkbox-blank-circle-outline'
                    : 'mdi-checkbox-marked-circle-outline'
            },
            statusColor() {
                return (this.order.status === 'Новый')
                    ? 'blue'
                    : 'green'
            },
            selectedAnimals() {
                return (this.selectedItemsContainer) ? this.selectedItemsContainer.animals : []
            },
            selectedServices() {
                return (this.selectedItemsContainer) ? this.selectedItemsContainer.petServices : []
            },
            services() {
                return (this.order.petServices) ? this.order.petServices : []
            },
            animals() {
                return (this.order.animals) ? this.order.animals: []
            }

        },
    }
</script>

<style scoped>
    .max-width-1000 {
        max-width: 1000px;
    }

</style>
