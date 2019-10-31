<template>
  <v-container>
    <v-card class="flex-column">
      <v-layout class="flex-row justify-space-around flex-wrap">
        <v-flex class="d-flex align-center ma-3">
          <span class="text--secondary">Клиент:</span>
          <person-card
              :avatar="order.client.avatar"
              :name="order.client.name"
          ></person-card>
        </v-flex>
        <v-flex class="d-flex align-center ma-3">
          <span class="text--secondary">Петситтер:</span>
          <person-card
              :avatar="order.petsitter.avatar"
              :name="order.petsitter.name"
          ></person-card>
        </v-flex>
        <v-flex class="d-flex align-center ma-3">
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
        </v-flex>
      </v-layout>
      <v-layout class="flex-row justify-space-around flex-wrap">
        <v-flex class="d-flex align-center ma-3">
          <span class="text--secondary">Животные</span>
          <v-flex class="d-flex flex-wrap">
            <readonly-chip-group
              :all-items="animals"
              :selected-items="order.animals"
            ></readonly-chip-group>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
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
            }

        },
    }
</script>

<style scoped>
</style>