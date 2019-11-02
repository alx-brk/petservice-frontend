<template>
    <v-card class="flex-column max-width-1000">
      <div class="justify-space-between flex-wrap flex-row d-flex">
        <div class="ma-3 mt-0 flex-row d-flex align-center">
          <span class="text--secondary">Клиент:</span>
          <person-card
              :person="order.client"
          ></person-card>
        </div>
        <div class="ma-3 mt-0 flex-row d-flex align-center">
          <span class="text--secondary">Петситтер:</span>
          <person-card
              :person="order.petsitter"
          ></person-card>
        </div>
        <div class="ma-3 mt-0 flex-row d-flex align-center">
          <span class="text--secondary">Статус:</span>
          <v-alert
              class="ma-3"
              border="bottom"
              dense
              text
              :icon="statusIcon"
              :color="statusColor"
          >{{ order.status }}
          </v-alert>
        </div>
      </div>
      <div class="justify-space-between flex-wrap flex-row d-flex">
        <div class="d-flex flex-column ma-3 mt-0 max-width-300">
          <span class="text--secondary">Животные</span>
          <readonly-chip-group
              :all-items="animals"
              :selected-items="order.animals"
          ></readonly-chip-group>
        </div>
        <div class="d-flex flex-column ma-3 mt-0 max-width-300">
          <span class="text--secondary">Услуги</span>
          <readonly-chip-group
              :all-items="services"
              :selected-items="order.services"
          ></readonly-chip-group>
        </div>
        <div class="d-flex flex-column ma-3 mt-0 max-width-300">
          <span class="text--secondary">Описание</span>
          <span>{{ order.description }}</span>
        </div>
      </div>
      <div class="justify-space-between flex-wrap flex-row d-flex">
        <div class="d-flex ma-3 mt-0 align-center">
          <span class="text--secondary">Даты:</span>
          <span class="ml-3">с</span>
          <v-chip outlined dense class="ma-2" color="primary">{{ order.startDate }}</v-chip>
          <span class="ml-3">по</span>
          <v-chip v-if="order.endDate != null" outlined dense class="ma-2" color="primary">{{order.endDate }}</v-chip>
          <v-chip v-else outlined dense class="ma-2" color="primary">Не указано</v-chip>
        </div>
        <div class="d-flex align-center ma-3 mt-0">
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
            order: Object
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
            animals() {
                return this.$store.getters.animals
            },
            services() {
                return this.$store.getters.services
            }

        },
    }
</script>

<style scoped>
  .max-width-1000 {
    max-width: 1000px;
  }

  .max-width-300 {
    max-width: 300px;
  }
</style>